/**
 * useSpeechOutput - 한국어 TTS(텍스트→음성) 훅
 *
 * 사용 패턴:
 *   const { speak, stop, isSpeaking } = useSpeechOutput();
 *   speak("엔진오일은 광유 5,000~7,000km, 합성유 10,000~15,000km입니다.");
 *
 * 핵심 동작:
 *   - SpeechSynthesisUtterance + window.speechSynthesis 사용
 *   - 한국어(ko-KR) 음성 자동 선택 (없으면 기본 음성으로 폴백)
 *   - speak 호출 시 이전 발화는 자동 취소 (중첩 방지)
 *   - 컴포넌트 언마운트 시 자동 cancel
 *
 * 알려진 이슈:
 *   - getVoices() 는 비동기 로드되므로 voiceschanged 이벤트 대기 필요
 *   - 일부 브라우저(특히 iOS)에서 첫 호출은 사용자 제스처 안에서 해야 동작
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { isSpeechSynthesisSupported, preprocessForSpeech } from './speech';

export interface UseSpeechOutputResult {
  /** 현재 읽기 중인지 */
  isSpeaking: boolean;
  /** 브라우저 TTS 지원 여부 */
  isSupported: boolean;
  /**
   * 텍스트를 읽습니다. 호출 시 이전 발화는 즉시 중단되고 새 텍스트로 교체됩니다.
   * 내부적으로 [S1] 마커 제거 등 전처리가 적용됩니다.
   */
  speak: (text: string) => void;
  /** 읽기 즉시 중단 */
  stop: () => void;
}

export function useSpeechOutput(): UseSpeechOutputResult {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 한국어 음성을 캐시 (매번 getVoices 호출 비용 절약 + 사용자 제스처 응답 속도 개선)
  const koVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  // 현재 발화 중인 utterance (cleanup용)
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 사용 가능한 음성 목록에서 한국어 음성 선택
  const pickKoreanVoice = useCallback(() => {
    if (typeof window === 'undefined') return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return;

    // 우선순위: ko-KR > ko-* > 기타 (미선택 시 브라우저 기본)
    const koVoice =
      voices.find((v) => v.lang === 'ko-KR') ??
      voices.find((v) => v.lang.startsWith('ko')) ??
      null;
    koVoiceRef.current = koVoice;
  }, []);

  // 마운트 시 지원 여부 체크 + 음성 목록 로드
  useEffect(() => {
    const supported = isSpeechSynthesisSupported();
    setIsSupported(supported);
    if (!supported) return;

    // 즉시 시도 (이미 로드된 경우)
    pickKoreanVoice();
    // 비동기 로드 대비
    window.speechSynthesis.addEventListener('voiceschanged', pickKoreanVoice);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', pickKoreanVoice);
    };
  }, [pickKoreanVoice]);

  // ---- speak --------------------------------------------------------------
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;
    if (!isSpeechSynthesisSupported()) return;

    const cleanText = preprocessForSpeech(text);
    if (!cleanText) return;

    // 이전 발화 즉시 중단 (사용자 두 번째 답변 받을 때 첫 번째와 겹치지 않도록)
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ko-KR';
    utterance.rate = 1.0; // 속도 (기본 1.0)
    utterance.pitch = 1.0; // 음높이 (기본 1.0)
    utterance.volume = 1.0; // 음량 (기본 1.0)

    if (koVoiceRef.current) {
      utterance.voice = koVoiceRef.current;
    }
    // 한국어 음성이 없을 경우 utterance.lang='ko-KR' 만으로 폴백 동작.
    // 브라우저가 지원 가능한 가장 적합한 음성을 자동 선택합니다.

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    };
    utterance.onerror = (event) => {
      // 'interrupted' 는 cancel() 호출 시 발생하는 정상 흐름이라 조용히 처리
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        // 운영 중 알림이 필요하면 여기서 콜백을 노출하도록 확장 가능
        // 지금은 사일런트 실패 (사용자는 화면에 텍스트로 답변을 볼 수 있음)
      }
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  // ---- stop ---------------------------------------------------------------
  const stop = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!isSpeechSynthesisSupported()) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    currentUtteranceRef.current = null;
  }, []);

  // ---- 언마운트 정리 ------------------------------------------------------
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && isSpeechSynthesisSupported()) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { isSpeaking, isSupported, speak, stop };
}
