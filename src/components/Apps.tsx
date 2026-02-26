"use client";

import { useEffect, useRef } from "react";

const appsData = [
  { emoji: "🔊", ios: "https://apps.apple.com/us/app/sound-meter-decibel-db/id6756865763", android: "https://play.google.com/store/apps/details?id=com.slox.soundmeter" },
  { emoji: "🌊", ios: "https://apps.apple.com/us/app/white-noise-slox/id6757315077", android: null },
  { emoji: "🎙️", ios: "https://apps.apple.com/us/app/voice-recorder-slox/id6756888591", android: null },
  { emoji: "📐", ios: "https://apps.apple.com/us/app/unit-converter-slox/id6756968552", android: "https://play.google.com/store/apps/details?id=com.slox.slox_unit_converter" },
  { emoji: "💵", ios: "https://apps.apple.com/us/app/tip-calculator-slox/id6757491942", android: null },
  { emoji: "⏱️", ios: "https://apps.apple.com/us/app/stopwatch-timer-slox/id6757244071", android: null },
  { emoji: "📷", ios: "https://apps.apple.com/us/app/qr-scanner-slox/id6756880687", android: null },
  { emoji: "📄", ios: "https://apps.apple.com/us/app/pdf-scanner-slox/id6756884443", android: null },
  { emoji: "🪞", ios: "https://apps.apple.com/us/app/mirror-slox/id6757230732", android: null },
  { emoji: "🎵", ios: "https://apps.apple.com/us/app/metronome-slox/id6757317325", android: null },
  { emoji: "🔍", ios: "https://apps.apple.com/us/app/magnifier-slox/id6757490033", android: null },
  { emoji: "🔦", ios: "https://apps.apple.com/us/app/flashlight-slox/id6757238605", android: null },
  { emoji: "🧭", ios: "https://apps.apple.com/us/app/compass-slox/id6757491317", android: "https://play.google.com/store/apps/details?id=com.slox.slox_compass" },
  { emoji: "🧮", ios: "https://apps.apple.com/us/app/calculator-slox/id6757248766", android: null },
  { emoji: "🫁", ios: "https://apps.apple.com/us/app/breathing-slox/id6757317781", android: null },
];

type AppText = { name: string; desc: string };

const appTexts: Record<string, AppText[]> = {
  ko: [
    { name: "소음 측정기", desc: "데시벨 측정" },
    { name: "백색소음", desc: "수면·집중 도우미" },
    { name: "녹음기", desc: "간편 음성 녹음" },
    { name: "단위 변환기", desc: "길이·무게·온도" },
    { name: "팁 계산기", desc: "더치페이·팁 계산" },
    { name: "스톱워치 & 타이머", desc: "시간 측정" },
    { name: "QR 스캐너", desc: "QR 코드 스캔" },
    { name: "PDF 스캐너", desc: "문서 스캔" },
    { name: "거울", desc: "간편 거울 앱" },
    { name: "메트로놈", desc: "박자 연습" },
    { name: "돋보기", desc: "확대경" },
    { name: "손전등", desc: "플래시라이트" },
    { name: "나침반", desc: "방향 탐색" },
    { name: "계산기", desc: "간편 계산기" },
    { name: "호흡", desc: "호흡 훈련" },
  ],
  en: [
    { name: "Sound Meter", desc: "Decibel meter" },
    { name: "White Noise", desc: "Sleep & focus aid" },
    { name: "Voice Recorder", desc: "Easy voice recording" },
    { name: "Unit Converter", desc: "Length, weight, temp" },
    { name: "Tip Calculator", desc: "Split bills & tips" },
    { name: "Stopwatch & Timer", desc: "Time tracking" },
    { name: "QR Scanner", desc: "Scan QR codes" },
    { name: "PDF Scanner", desc: "Document scanning" },
    { name: "Mirror", desc: "Simple mirror app" },
    { name: "Metronome", desc: "Beat practice" },
    { name: "Magnifier", desc: "Magnifying glass" },
    { name: "Flashlight", desc: "Flashlight" },
    { name: "Compass", desc: "Direction finder" },
    { name: "Calculator", desc: "Simple calculator" },
    { name: "Breathing", desc: "Breathing exercise" },
  ],
  ja: [
    { name: "騒音計", desc: "デシベル測定" },
    { name: "ホワイトノイズ", desc: "睡眠・集中サポート" },
    { name: "ボイスレコーダー", desc: "簡単録音" },
    { name: "単位変換", desc: "長さ・重さ・温度" },
    { name: "チップ計算機", desc: "割り勘・チップ計算" },
    { name: "ストップウォッチ", desc: "時間計測" },
    { name: "QRスキャナー", desc: "QRコード読取" },
    { name: "PDFスキャナー", desc: "書類スキャン" },
    { name: "ミラー", desc: "シンプルな鏡" },
    { name: "メトロノーム", desc: "拍子練習" },
    { name: "拡大鏡", desc: "ルーペ" },
    { name: "懐中電灯", desc: "フラッシュライト" },
    { name: "コンパス", desc: "方角ナビ" },
    { name: "電卓", desc: "シンプル電卓" },
    { name: "呼吸", desc: "呼吸トレーニング" },
  ],
  zh: [
    { name: "噪音计", desc: "分贝测量" },
    { name: "白噪音", desc: "睡眠·专注助手" },
    { name: "录音机", desc: "简易录音" },
    { name: "单位转换", desc: "长度·重量·温度" },
    { name: "小费计算", desc: "AA制·小费计算" },
    { name: "秒表和计时器", desc: "时间计量" },
    { name: "QR扫描器", desc: "扫描二维码" },
    { name: "PDF扫描", desc: "文档扫描" },
    { name: "镜子", desc: "简易镜子" },
    { name: "节拍器", desc: "节拍练习" },
    { name: "放大镜", desc: "放大工具" },
    { name: "手电筒", desc: "照明工具" },
    { name: "指南针", desc: "方向导航" },
    { name: "计算器", desc: "简易计算器" },
    { name: "呼吸", desc: "呼吸训练" },
  ],
};

const sectionT: Record<string, { title: string; desc: string; upcoming: string }> = {
  ko: { title: "앱", desc: "App Store와 Google Play에서 만나보세요", upcoming: "출시 예정" },
  en: { title: "Apps", desc: "Available on App Store and Google Play", upcoming: "Coming soon" },
  ja: { title: "アプリ", desc: "App StoreとGoogle Playで配信中", upcoming: "近日公開" },
  zh: { title: "应用", desc: "在App Store和Google Play上下载", upcoming: "即将推出" },
  de: { title: "Apps", desc: "Im App Store und bei Google Play verfügbar", upcoming: "Demnächst" },
  fr: { title: "Apps", desc: "Disponible sur l'App Store et Google Play", upcoming: "Bientôt" },
  es: { title: "Apps", desc: "Disponible en App Store y Google Play", upcoming: "Próximamente" },
  pt: { title: "Apps", desc: "Disponível na App Store e Google Play", upcoming: "Em breve" },
};

export default function Apps({ locale = "ko" }: { locale?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sec = sectionT[locale] || sectionT.en;
  const texts = appTexts[locale] || appTexts.en;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="apps" className="pb-16 md:pb-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="w-12 h-px bg-white/[0.08] mx-auto mb-10" />

        <div className="text-center mb-10">
          <h2 className="animate-on-scroll text-2xl md:text-3xl font-bold text-white mb-2">
            {sec.title}
          </h2>
          <p className="animate-on-scroll text-sm text-white/30" style={{ animationDelay: "0.05s" }}>
            {sec.desc}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {appsData.map((app, i) => (
            <div
              key={texts[i].name}
              className="animate-on-scroll group relative rounded-2xl p-4 border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.04]"
              style={{ animationDelay: `${0.03 * i}s` }}
            >
              <span className="text-2xl block mb-2">{app.emoji}</span>
              <h3 className="font-semibold text-white text-sm mb-0.5">{texts[i].name}</h3>
              <p className="text-[11px] text-white/30 mb-3">{texts[i].desc}</p>

              <div className="flex items-center gap-1.5">
                <a
                  href={app.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] transition-colors text-[10px] text-white/50 hover:text-white/80"
                >
                  <AppleIcon />
                  iOS
                </a>
                {app.android ? (
                  <a
                    href={app.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] transition-colors text-[10px] text-white/50 hover:text-white/80"
                  >
                    <PlayIcon />
                    Android
                  </a>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.03] text-[10px] text-white/15 cursor-default">
                    <PlayIcon />
                    {sec.upcoming}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppleIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
  );
}
