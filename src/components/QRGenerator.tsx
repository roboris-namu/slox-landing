"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Lang = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

const translations: Record<Lang, {
  title: string;
  subtitle: string;
  types: { url: string; text: string; wifi: string; email: string; phone: string };
  urlPlaceholder: string;
  textPlaceholder: string;
  wifiName: string;
  wifiPassword: string;
  wifiSecurity: string;
  emailAddress: string;
  emailSubject: string;
  emailBody: string;
  phoneNumber: string;
  size: string;
  download: string;
  generate: string;
  whatIsQr: string;
  qrExplanation: string;
  useCases: string;
  sharing: string;
  payment: string;
  contact: string;
  otherTools: string;
  backToMain: string;
}> = {
  ko: {
    title: "QR코드 생성기",
    subtitle: "다양한 형식의 QR코드를 무료로 생성하세요",
    types: { url: "URL", text: "텍스트", wifi: "WiFi", email: "이메일", phone: "전화번호" },
    urlPlaceholder: "https://example.com",
    textPlaceholder: "텍스트를 입력하세요...",
    wifiName: "WiFi 이름 (SSID)",
    wifiPassword: "비밀번호",
    wifiSecurity: "보안",
    emailAddress: "이메일 주소",
    emailSubject: "제목",
    emailBody: "내용",
    phoneNumber: "전화번호",
    size: "크기",
    download: "다운로드",
    generate: "QR코드 생성",
    whatIsQr: "QR코드란?",
    qrExplanation: "QR코드(Quick Response Code)는 2차원 바코드로, 스마트폰 카메라로 스캔하면 URL, 텍스트, 연락처 등의 정보를 빠르게 읽을 수 있습니다.",
    useCases: "활용 예시",
    sharing: "URL 공유",
    payment: "결제",
    contact: "연락처 공유",
    otherTools: "다른 도구",
    backToMain: "← 메인으로",
  },
  en: {
    title: "QR Code Generator",
    subtitle: "Generate various QR codes for free",
    types: { url: "URL", text: "Text", wifi: "WiFi", email: "Email", phone: "Phone" },
    urlPlaceholder: "https://example.com",
    textPlaceholder: "Enter your text...",
    wifiName: "WiFi Name (SSID)",
    wifiPassword: "Password",
    wifiSecurity: "Security",
    emailAddress: "Email Address",
    emailSubject: "Subject",
    emailBody: "Body",
    phoneNumber: "Phone Number",
    size: "Size",
    download: "Download",
    generate: "Generate QR Code",
    whatIsQr: "What is QR Code?",
    qrExplanation: "QR Code (Quick Response Code) is a 2D barcode that can be scanned by smartphone cameras to quickly read URLs, text, contacts, and more.",
    useCases: "Use Cases",
    sharing: "URL Sharing",
    payment: "Payment",
    contact: "Contact Sharing",
    otherTools: "Other Tools",
    backToMain: "← Back",
  },
  ja: {
    title: "QRコード生成",
    subtitle: "様々な形式のQRコードを無料で生成",
    types: { url: "URL", text: "テキスト", wifi: "WiFi", email: "メール", phone: "電話" },
    urlPlaceholder: "https://example.com",
    textPlaceholder: "テキストを入力...",
    wifiName: "WiFi名 (SSID)",
    wifiPassword: "パスワード",
    wifiSecurity: "セキュリティ",
    emailAddress: "メールアドレス",
    emailSubject: "件名",
    emailBody: "本文",
    phoneNumber: "電話番号",
    size: "サイズ",
    download: "ダウンロード",
    generate: "QRコード生成",
    whatIsQr: "QRコードとは？",
    qrExplanation: "QRコードは2次元バーコードで、スマートフォンカメラでスキャンするとURL、テキスト、連絡先などの情報を素早く読み取れます。",
    useCases: "活用例",
    sharing: "URL共有",
    payment: "決済",
    contact: "連絡先共有",
    otherTools: "他のツール",
    backToMain: "← 戻る",
  },
  zh: {
    title: "QR码生成器",
    subtitle: "免费生成各种格式的二维码",
    types: { url: "网址", text: "文本", wifi: "WiFi", email: "邮件", phone: "电话" },
    urlPlaceholder: "https://example.com",
    textPlaceholder: "输入文字...",
    wifiName: "WiFi名称 (SSID)",
    wifiPassword: "密码",
    wifiSecurity: "安全类型",
    emailAddress: "邮箱地址",
    emailSubject: "主题",
    emailBody: "内容",
    phoneNumber: "电话号码",
    size: "尺寸",
    download: "下载",
    generate: "生成二维码",
    whatIsQr: "什么是二维码？",
    qrExplanation: "二维码是一种二维条码，用智能手机扫描可以快速读取网址、文字、联系人等信息。",
    useCases: "使用场景",
    sharing: "网址分享",
    payment: "支付",
    contact: "联系人分享",
    otherTools: "其他工具",
    backToMain: "← 返回",
  },
  es: {
    title: "Generador de QR",
    subtitle: "Genera codigos QR de varios formatos gratis",
    types: { url: "URL", text: "Texto", wifi: "WiFi", email: "Email", phone: "Telefono" },
    urlPlaceholder: "https://ejemplo.com",
    textPlaceholder: "Ingresa tu texto...",
    wifiName: "Nombre WiFi (SSID)",
    wifiPassword: "Contrasena",
    wifiSecurity: "Seguridad",
    emailAddress: "Direccion Email",
    emailSubject: "Asunto",
    emailBody: "Cuerpo",
    phoneNumber: "Numero de Telefono",
    size: "Tamano",
    download: "Descargar",
    generate: "Generar Codigo QR",
    whatIsQr: "Que es el Codigo QR?",
    qrExplanation: "El codigo QR es un codigo de barras 2D que se puede escanear con la camara del telefono para leer URLs, texto, contactos y mas.",
    useCases: "Casos de Uso",
    sharing: "Compartir URL",
    payment: "Pago",
    contact: "Compartir Contacto",
    otherTools: "Otras Herramientas",
    backToMain: "← Volver",
  },
  pt: {
    title: "Gerador de QR Code",
    subtitle: "Gere codigos QR de varios formatos gratis",
    types: { url: "URL", text: "Texto", wifi: "WiFi", email: "Email", phone: "Telefone" },
    urlPlaceholder: "https://exemplo.com",
    textPlaceholder: "Digite seu texto...",
    wifiName: "Nome WiFi (SSID)",
    wifiPassword: "Senha",
    wifiSecurity: "Seguranca",
    emailAddress: "Endereco de Email",
    emailSubject: "Assunto",
    emailBody: "Corpo",
    phoneNumber: "Numero de Telefone",
    size: "Tamanho",
    download: "Baixar",
    generate: "Gerar QR Code",
    whatIsQr: "O que e QR Code?",
    qrExplanation: "QR Code e um codigo de barras 2D que pode ser escaneado pela camera do celular para ler URLs, texto, contatos e mais.",
    useCases: "Casos de Uso",
    sharing: "Compartilhar URL",
    payment: "Pagamento",
    contact: "Compartilhar Contato",
    otherTools: "Outras Ferramentas",
    backToMain: "← Voltar",
  },
  de: {
    title: "QR-Code Generator",
    subtitle: "Erstellen Sie verschiedene QR-Codes kostenlos",
    types: { url: "URL", text: "Text", wifi: "WiFi", email: "E-Mail", phone: "Telefon" },
    urlPlaceholder: "https://beispiel.de",
    textPlaceholder: "Text eingeben...",
    wifiName: "WiFi-Name (SSID)",
    wifiPassword: "Passwort",
    wifiSecurity: "Sicherheit",
    emailAddress: "E-Mail-Adresse",
    emailSubject: "Betreff",
    emailBody: "Inhalt",
    phoneNumber: "Telefonnummer",
    size: "Grosse",
    download: "Herunterladen",
    generate: "QR-Code erstellen",
    whatIsQr: "Was ist ein QR-Code?",
    qrExplanation: "Ein QR-Code ist ein 2D-Barcode, der mit der Smartphone-Kamera gescannt werden kann, um URLs, Text, Kontakte und mehr zu lesen.",
    useCases: "Anwendungsfalle",
    sharing: "URL teilen",
    payment: "Zahlung",
    contact: "Kontakt teilen",
    otherTools: "Andere Tools",
    backToMain: "← Zuruck",
  },
  fr: {
    title: "Generateur de QR Code",
    subtitle: "Generez des codes QR de differents formats gratuitement",
    types: { url: "URL", text: "Texte", wifi: "WiFi", email: "Email", phone: "Telephone" },
    urlPlaceholder: "https://exemple.fr",
    textPlaceholder: "Entrez votre texte...",
    wifiName: "Nom WiFi (SSID)",
    wifiPassword: "Mot de passe",
    wifiSecurity: "Securite",
    emailAddress: "Adresse Email",
    emailSubject: "Sujet",
    emailBody: "Corps",
    phoneNumber: "Numero de telephone",
    size: "Taille",
    download: "Telecharger",
    generate: "Generer QR Code",
    whatIsQr: "Qu'est-ce qu'un QR Code?",
    qrExplanation: "Le QR Code est un code-barres 2D qui peut etre scanne par la camera du telephone pour lire des URLs, du texte, des contacts et plus.",
    useCases: "Cas d'utilisation",
    sharing: "Partager URL",
    payment: "Paiement",
    contact: "Partager Contact",
    otherTools: "Autres Outils",
    backToMain: "← Retour",
  },
};

interface QRGeneratorProps {
  lang?: Lang;
}

type QRType = "url" | "text" | "wifi" | "email" | "phone";

const languageOptions: { code: Lang; label: string; flag: string }[] = [
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function QRGenerator({ lang = "ko" }: QRGeneratorProps) {
  const [currentLang] = useState<Lang>(lang);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = translations[currentLang];

  // 언어별 URL 생성
  const getLangUrl = (langCode: string) => {
    return langCode === "ko" ? "/qr" : `/${langCode}/qr`;
  };
  const [qrType, setQrType] = useState<QRType>("url");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState("WPA");
  const [email, setEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState(200);
  const [qrUrl, setQrUrl] = useState("");

  const generateQR = () => {
    let data = "";
    switch (qrType) {
      case "url":
        data = url;
        break;
      case "text":
        data = text;
        break;
      case "wifi":
        data = `WIFI:T:${wifiSecurity};S:${wifiName};P:${wifiPassword};;`;
        break;
      case "email":
        data = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        break;
      case "phone":
        data = `tel:${phone}`;
        break;
    }
    if (data) {
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`);
    }
  };

  useEffect(() => {
    setQrUrl("");
  }, [qrType]);

  const mainPath = currentLang === "ko" ? "/" : `/${currentLang}`;
  const currentLangOption = languageOptions.find(l => l.code === currentLang);
  const types: { id: QRType; label: string; emoji: string }[] = [
    { id: "url", label: t.types.url, emoji: "🔗" },
    { id: "text", label: t.types.text, emoji: "📝" },
    { id: "wifi", label: t.types.wifi, emoji: "📶" },
    { id: "email", label: t.types.email, emoji: "✉️" },
    { id: "phone", label: t.types.phone, emoji: "📞" },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href={mainPath} className="font-black text-xl text-white tracking-tight hover:opacity-80 transition-opacity">
              SLOX
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-800 border border-dark-700 hover:border-dark-600 transition-colors text-sm"
                >
                  <span>{currentLangOption?.flag}</span>
                  <span className="text-dark-300">{currentLangOption?.label}</span>
                  <svg className={`w-3 h-3 text-dark-400 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showLangMenu && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-dark-800 border border-dark-700 rounded-lg shadow-xl overflow-hidden z-50">
                    {languageOptions.map((option) => (
                      <Link
                        key={option.code}
                        href={getLangUrl(option.code)}
                        onClick={() => setShowLangMenu(false)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-dark-700 transition-colors ${
                          currentLang === option.code ? 'bg-dark-700 text-white' : 'text-dark-300'
                        }`}
                      >
                        <span>{option.flag}</span>
                        <span>{option.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href={mainPath} className="text-dark-300 hover:text-white transition-colors text-sm">
                {t.backToMain}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <span className="text-indigo-400 text-sm font-medium">📱 {t.title}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
            <p className="text-dark-400 text-lg">{t.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-xl">
              <div className="flex flex-wrap gap-2 mb-6">
                {types.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setQrType(type.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      qrType === type.id
                        ? "bg-indigo-600 text-white"
                        : "bg-dark-800 text-dark-300 hover:bg-dark-700"
                    }`}
                  >
                    {type.emoji} {type.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {qrType === "url" && (
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t.urlPlaceholder}
                    className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                )}

                {qrType === "text" && (
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={t.textPlaceholder}
                    className="w-full h-32 p-3 bg-dark-800 border border-dark-700 rounded-lg text-white resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                )}

                {qrType === "wifi" && (
                  <>
                    <input
                      type="text"
                      value={wifiName}
                      onChange={(e) => setWifiName(e.target.value)}
                      placeholder={t.wifiName}
                      className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                      type="password"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      placeholder={t.wifiPassword}
                      className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <select
                      value={wifiSecurity}
                      onChange={(e) => setWifiSecurity(e.target.value)}
                      className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None</option>
                    </select>
                  </>
                )}

                {qrType === "email" && (
                  <>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailAddress}
                      className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder={t.emailSubject}
                      className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      placeholder={t.emailBody}
                      className="w-full h-24 p-3 bg-dark-800 border border-dark-700 rounded-lg text-white resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </>
                )}

                {qrType === "phone" && (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phoneNumber}
                    className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                )}

                <div>
                  <label className="block text-dark-300 text-sm mb-2">{t.size}</label>
                  <div className="flex gap-2">
                    {[100, 150, 200, 300, 400].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          size === s ? "bg-indigo-600 text-white" : "bg-dark-700 text-dark-300 hover:bg-dark-600"
                        }`}
                      >
                        {s}px
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateQR}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-all"
                >
                  {t.generate}
                </button>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center">
              {qrUrl ? (
                <>
                  <img src={qrUrl} alt="QR Code" className="mb-4 rounded-lg bg-white p-2" />
                  <a
                    href={qrUrl}
                    download="qrcode.png"
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all"
                  >
                    📥 {t.download}
                  </a>
                </>
              ) : (
                <div className="text-center text-dark-400">
                  <div className="text-6xl mb-4">📱</div>
                  <p>{t.generate}</p>
                </div>
              )}
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl mt-8 mb-8">
            <h3 className="text-white text-xl font-bold mb-4">❓ {t.whatIsQr}</h3>
            <p className="text-dark-300 leading-relaxed">{t.qrExplanation}</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 {t.otherTools}</h3>
            <div className="flex flex-wrap gap-3">
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/password`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🔐 Password</Link>
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/random`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🎲 Random</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-dark-500 text-sm text-center border-t border-dark-800 mt-12">
        <p className="mb-2">Powered by <Link href={mainPath} className="text-white font-semibold hover:text-accent-cyan">SLOX</Link></p>
      </footer>
    </div>
  );
}

