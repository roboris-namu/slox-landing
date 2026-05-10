/**
 * useSpeechInput - 한국어 음성 인식(STT) 훅
 *
 * 사용 패턴:
 *   const { transcript, isListening, start, stop, ... } = useSpeechInput({
 *     onFinal: (text) => sendQuestion(text),
 *   });
 *
 *   <button onClick={start}>마이크</button>
 *
 * 핵심 동작:
 *   - lang='ko-KR' 한국어 강제
 *   - continuous=false: 한 발화 후 자동 종료 (대화형 UX에 적합)
 *   - interimResults=true: 말하는 중에도 실시간 텍스트 보여줌
 *   - 5초 무음 시 자동 종료 (브라우저 기본보다 짧게 강제)
 *   - 권한 거부 / 미지원 / 네트워크 에러를 분리해서 사용자 친화 메시지 제공
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getSpeechRecognitionCtor,
  isSpeechRecognitionSupported,
} from './speech';

// ----------------------------------------------------------------------------
// 에러 코드 → 한국어 메시지 매핑
// ----------------------------------------------------------------------------
const ERROR_MESSAGES: Record<string, string> = {
  'not-allowed':
    '마이크 권한이 필요해요. 브라우저 설정에서 마이크를 허용해주세요.',
  'service-not-allowed':
    '마이크 권한이 필요해요. 브라우저 설정에서 마이크를 허용해주세요.',
  'no-speech': '음성이 감지되지 않았어요. 다시 시도해주세요.',
  'audio-capture': '마이크를 찾을 수 없어요. 마이크가 연결되어 있는지 확인해주세요.',
  network: '네트워크 오류로 음성 인식이 실패했어요. 잠시 후 다시 시도해주세요.',
  aborted: '음성 인식이 취소되었어요.',
};

function getErrorMessage(code: string): string {
  return ERROR_MESSAGES[code] ?? `음성 인식 중 오류가 발생했어요 (${code}).`;
}

// ----------------------------------------------------------------------------
// 훅 옵션 / 반환 타입
// ----------------------------------------------------------------------------

export interface UseSpeechInputOptions {
  /** 최종 결과(말 끝맺음 인식) 도착 시 호출. 자동 전송에 사용. */
  onFinal?: (text: string) => void;
  /** 실시간(interim) 결과 변경 시 호출. 입력창 미리보기에 사용. */
  onInterim?: (text: string) => void;
  /** 무음 자동 종료까지의 시간(ms). 기본 5초. */
  silenceTimeoutMs?: number;
}

export interface UseSpeechInputResult {
  /** 현재까지 인식된 텍스트(final + interim 합본) */
  transcript: string;
  /** 마이크가 듣는 중인지 */
  isListening: boolean;
  /** 브라우저가 SpeechRecognition을 지원하는지 */
  isSupported: boolean;
  /** 마지막 에러 메시지(한국어). 정상화되면 null. */
  error: string | null;
  /** 듣기 시작 */
  start: () => void;
  /** 듣기 강제 종료 (현재까지 인식분은 onFinal로 전달되지 않을 수 있음) */
  stop: () => void;
  /** transcript 와 error 초기화 */
  reset: () => void;
}

// ----------------------------------------------------------------------------
// 훅 본체
// ----------------------------------------------------------------------------
export function useSpeechInput(
  options: UseSpeechInputOptions = {},
): UseSpeechInputResult {
  const { onFinal, onInterim, silenceTimeoutMs = 5000 } = options;

  // ---- 상태 -----------------------------------------------------------------
  // SSR 안전을 위해 초기값은 false로 두고, 마운트 후 실제 지원 여부로 갱신.
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  // ---- ref (재렌더 없이 유지) -----------------------------------------------
  // SpeechRecognition 인스턴스는 한 번만 생성하고 재사용.
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  // 무음 자동 종료용 타이머
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // onFinal/onInterim 콜백을 ref로 보관해 effect 의존성 변동 방지
  const onFinalRef = useRef(onFinal);
  const onInterimRef = useRef(onInterim);

  useEffect(() => {
    onFinalRef.current = onFinal;
    onInterimRef.current = onInterim;
  }, [onFinal, onInterim]);

  // ---- 마운트 시 지원 여부 확인 ---------------------------------------------
  useEffect(() => {
    setIsSupported(isSpeechRecognitionSupported());
  }, []);

  // ---- 무음 타이머 헬퍼 -----------------------------------------------------
  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const restartSilenceTimer = useCallback(() => {
    clearSilenceTimer();
    silenceTimerRef.current = setTimeout(() => {
      // 일정 시간 결과가 없으면 강제 종료. recognition.stop() 호출 시
      // 이미 인식된 부분은 onresult 의 final 로 한 번 더 들어올 수 있음.
      try {
        recognitionRef.current?.stop();
      } catch {
        // 이미 멈춰있으면 throw 가능 — 무시
      }
    }, silenceTimeoutMs);
  }, [silenceTimeoutMs, clearSilenceTimer]);

  // ---- start: 듣기 시작 ----------------------------------------------------
  const start = useCallback(() => {
    setError(null);

    if (!isSpeechRecognitionSupported()) {
      setError(
        '이 브라우저는 음성 인식을 지원하지 않아요. Chrome이나 Safari 최신 버전을 사용해주세요.',
      );
      return;
    }

    // 이미 듣고 있으면 중복 시작 방지
    if (recognitionRef.current && isListening) return;

    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return; // isSupported 체크 후라 사실상 도달 X

    const recognition = new Ctor();
    recognition.lang = 'ko-KR';
    recognition.continuous = false; // 한 발화 후 자동 종료
    recognition.interimResults = true; // 실시간 결과 받기
    recognition.maxAlternatives = 1;

    // 누적 final 텍스트 (interim 은 매번 새로 받으므로 합쳐서 표시)
    let finalText = '';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      // 최신 인덱스부터 results 순회 (continuous=false 라 보통 1개지만 안전하게)
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0]?.transcript ?? '';
        if (result.isFinal) {
          finalText += text;
        } else {
          interim += text;
        }
      }

      const combined = (finalText + interim).trim();
      setTranscript(combined);
      onInterimRef.current?.(combined);

      // 결과가 들어오면 무음 타이머 리셋 (말하는 중이라는 신호)
      restartSilenceTimer();
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // 'aborted' 는 사용자가 stop() 한 정상 종료 흐름이라 무시
      if (event.error === 'aborted') return;
      setError(getErrorMessage(event.error));
    };

    recognition.onstart = () => {
      setIsListening(true);
      restartSilenceTimer();
    };

    recognition.onend = () => {
      clearSilenceTimer();
      setIsListening(false);
      recognitionRef.current = null;

      // 종료 시점에 final 텍스트가 있으면 onFinal 콜백 호출
      const finalTrimmed = finalText.trim();
      if (finalTrimmed) {
        onFinalRef.current?.(finalTrimmed);
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      // 같은 인스턴스로 start 재호출하면 InvalidStateError 가능
      const message = err instanceof Error ? err.message : String(err);
      setError(`음성 인식을 시작하지 못했어요: ${message}`);
      recognitionRef.current = null;
      setIsListening(false);
    }
  }, [isListening, restartSilenceTimer, clearSilenceTimer]);

  // ---- stop: 강제 종료 -----------------------------------------------------
  const stop = useCallback(() => {
    clearSilenceTimer();
    try {
      recognitionRef.current?.stop();
    } catch {
      // 이미 멈춰있으면 무시
    }
  }, [clearSilenceTimer]);

  // ---- reset: 상태 초기화 --------------------------------------------------
  const reset = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  // ---- 언마운트 정리 -------------------------------------------------------
  useEffect(() => {
    return () => {
      clearSilenceTimer();
      try {
        recognitionRef.current?.abort();
      } catch {
        // ignore
      }
    };
  }, [clearSilenceTimer]);

  return {
    transcript,
    isListening,
    isSupported,
    error,
    start,
    stop,
    reset,
  };
}
