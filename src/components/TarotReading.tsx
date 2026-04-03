"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";

type Language = "ko" | "en" | "ja" | "zh" | "de" | "fr" | "es" | "pt";
type Screen = "intro" | "selecting" | "result";

const VALID_LANGS: Language[] = ["ko", "en", "ja", "zh", "de", "fr", "es", "pt"];

interface Props {
  locale?: string;
}

interface TarotCard {
  id: number;
  numeral: string;
  emoji: string;
  name: Record<Language, string>;
  meaning: Record<Language, string>;
  keywords: Record<Language, [string, string, string]>;
}

/* ─── UI Translations ─── */

const ui: Record<
  Language,
  {
    title: string; titleHL: string; subtitle: string; badge: string;
    start: string; pick: [string, string, string];
    past: string; present: string; future: string;
    overallReading: string; luckyMsg: string;
    share: string; drawAgain: string; back: string;
    copied: string; shareText: string; keywords: string;
  }
> = {
  ko: {
    title: "타로 카드", titleHL: " 리딩",
    subtitle: "신비로운 카드의 세계로 당신을 초대합니다",
    badge: "🔮 타로 리딩",
    start: "리딩 시작하기 ✨",
    pick: ["첫 번째 카드를 선택하세요", "두 번째 카드를 선택하세요", "세 번째 카드를 선택하세요"],
    past: "과거", present: "현재", future: "미래",
    overallReading: "종합 리딩", luckyMsg: "오늘의 행운 메시지",
    share: "📤 결과 공유", drawAgain: "🔄 다시 뽑기", back: "← 메인으로",
    copied: "결과가 클립보드에 복사되었습니다!",
    shareText: "🔮 타로 카드 리딩 결과!", keywords: "키워드",
  },
  en: {
    title: "Tarot Card", titleHL: " Reading",
    subtitle: "Enter the mystical world of tarot cards",
    badge: "🔮 Tarot Reading",
    start: "Start Reading ✨",
    pick: ["Choose your first card", "Choose your second card", "Choose your third card"],
    past: "Past", present: "Present", future: "Future",
    overallReading: "Overall Reading", luckyMsg: "Lucky Message of the Day",
    share: "📤 Share Result", drawAgain: "🔄 Draw Again", back: "← Back",
    copied: "Result copied to clipboard!",
    shareText: "🔮 Tarot Card Reading Result!", keywords: "Keywords",
  },
  ja: {
    title: "タロットカード", titleHL: " リーディング",
    subtitle: "神秘的なカードの世界へようこそ",
    badge: "🔮 タロット占い",
    start: "リーディングを始める ✨",
    pick: ["1枚目のカードを選んでください", "2枚目のカードを選んでください", "3枚目のカードを選んでください"],
    past: "過去", present: "現在", future: "未来",
    overallReading: "総合リーディング", luckyMsg: "今日のラッキーメッセージ",
    share: "📤 結果をシェア", drawAgain: "🔄 もう一度引く", back: "← 戻る",
    copied: "結果がクリップボードにコピーされました！",
    shareText: "🔮 タロットカードリーディング結果！", keywords: "キーワード",
  },
  zh: {
    title: "塔罗牌", titleHL: " 占卜",
    subtitle: "进入神秘的塔罗牌世界",
    badge: "🔮 塔罗占卜",
    start: "开始占卜 ✨",
    pick: ["请选择第一张牌", "请选择第二张牌", "请选择第三张牌"],
    past: "过去", present: "现在", future: "未来",
    overallReading: "综合解读", luckyMsg: "今日幸运寄语",
    share: "📤 分享结果", drawAgain: "🔄 重新抽牌", back: "← 返回",
    copied: "结果已复制到剪贴板！",
    shareText: "🔮 塔罗牌占卜结果！", keywords: "关键词",
  },
  de: {
    title: "Tarotkarten", titleHL: " Lesung",
    subtitle: "Betreten Sie die mystische Welt der Tarotkarten",
    badge: "🔮 Tarot-Lesung",
    start: "Lesung starten ✨",
    pick: ["Wählen Sie Ihre erste Karte", "Wählen Sie Ihre zweite Karte", "Wählen Sie Ihre dritte Karte"],
    past: "Vergangenheit", present: "Gegenwart", future: "Zukunft",
    overallReading: "Gesamtlesung", luckyMsg: "Glücksbotschaft des Tages",
    share: "📤 Ergebnis teilen", drawAgain: "🔄 Nochmal ziehen", back: "← Zurück",
    copied: "Ergebnis in die Zwischenablage kopiert!",
    shareText: "🔮 Tarotkarten-Lesung Ergebnis!", keywords: "Schlüsselwörter",
  },
  fr: {
    title: "Tarot", titleHL: " Divinatoire",
    subtitle: "Entrez dans le monde mystique des cartes de tarot",
    badge: "🔮 Lecture de Tarot",
    start: "Commencer la lecture ✨",
    pick: ["Choisissez votre première carte", "Choisissez votre deuxième carte", "Choisissez votre troisième carte"],
    past: "Passé", present: "Présent", future: "Futur",
    overallReading: "Lecture globale", luckyMsg: "Message chanceux du jour",
    share: "📤 Partager le résultat", drawAgain: "🔄 Tirer à nouveau", back: "← Retour",
    copied: "Résultat copié dans le presse-papiers !",
    shareText: "🔮 Résultat de lecture de Tarot !", keywords: "Mots-clés",
  },
  es: {
    title: "Tarot", titleHL: " Lectura",
    subtitle: "Entra al mundo místico de las cartas del tarot",
    badge: "🔮 Lectura de Tarot",
    start: "Comenzar lectura ✨",
    pick: ["Elige tu primera carta", "Elige tu segunda carta", "Elige tu tercera carta"],
    past: "Pasado", present: "Presente", future: "Futuro",
    overallReading: "Lectura general", luckyMsg: "Mensaje de suerte del día",
    share: "📤 Compartir resultado", drawAgain: "🔄 Sacar de nuevo", back: "← Volver",
    copied: "¡Resultado copiado al portapapeles!",
    shareText: "🔮 ¡Resultado de lectura de Tarot!", keywords: "Palabras clave",
  },
  pt: {
    title: "Tarô", titleHL: " Leitura",
    subtitle: "Entre no mundo místico das cartas de tarô",
    badge: "🔮 Leitura de Tarô",
    start: "Iniciar leitura ✨",
    pick: ["Escolha sua primeira carta", "Escolha sua segunda carta", "Escolha sua terceira carta"],
    past: "Passado", present: "Presente", future: "Futuro",
    overallReading: "Leitura geral", luckyMsg: "Mensagem de sorte do dia",
    share: "📤 Compartilhar resultado", drawAgain: "🔄 Tirar novamente", back: "← Voltar",
    copied: "Resultado copiado para a área de transferência!",
    shareText: "🔮 Resultado da leitura de Tarô!", keywords: "Palavras-chave",
  },
};

/* ─── 22 Major Arcana ─── */

const CARDS: TarotCard[] = [
  {
    id: 0, numeral: "0", emoji: "🃏",
    name: { ko: "광대", en: "The Fool", ja: "愚者", zh: "愚者", de: "Der Narr", fr: "Le Mat", es: "El Loco", pt: "O Louco" },
    meaning: {
      ko: "새로운 시작과 무한한 가능성이 당신 앞에 펼쳐져 있습니다. 두려움 없이 미지의 세계로 발을 내딛으세요. 순수한 마음이 당신을 올바른 길로 인도할 것입니다.",
      en: "A new beginning and infinite possibilities lie before you. Step fearlessly into the unknown. Your pure heart will guide you to the right path.",
      ja: "新たな始まりと無限の可能性があなたの前に広がっています。恐れずに未知の世界へ踏み出しましょう。純粋な心があなたを正しい道へと導くでしょう。",
      zh: "崭新的开始和无限的可能性在你面前展开。无畏地踏入未知的领域。纯净的心灵将引导你走上正确的道路。",
      de: "Ein neuer Anfang und unendliche Möglichkeiten liegen vor Ihnen. Treten Sie furchtlos ins Unbekannte. Ihr reines Herz wird Sie auf den richtigen Weg führen.",
      fr: "Un nouveau départ et des possibilités infinies s'offrent à vous. Avancez sans crainte vers l'inconnu. Votre cœur pur vous guidera sur le bon chemin.",
      es: "Un nuevo comienzo y posibilidades infinitas se extienden ante ti. Da el paso hacia lo desconocido sin miedo. Tu corazón puro te guiará por el camino correcto.",
      pt: "Um novo começo e possibilidades infinitas se abrem diante de você. Dê o passo rumo ao desconhecido sem medo. Seu coração puro o guiará pelo caminho certo.",
    },
    keywords: {
      ko: ["새로운 시작", "모험", "순수"], en: ["New beginnings", "Adventure", "Innocence"],
      ja: ["新たな始まり", "冒険", "純粋"], zh: ["新的开始", "冒险", "纯真"],
      de: ["Neuanfang", "Abenteuer", "Unschuld"], fr: ["Nouveau départ", "Aventure", "Innocence"],
      es: ["Nuevo comienzo", "Aventura", "Inocencia"], pt: ["Novo começo", "Aventura", "Inocência"],
    },
  },
  {
    id: 1, numeral: "I", emoji: "🎩",
    name: { ko: "마법사", en: "The Magician", ja: "魔術師", zh: "魔术师", de: "Der Magier", fr: "Le Bateleur", es: "El Mago", pt: "O Mago" },
    meaning: {
      ko: "당신에게는 원하는 것을 현실로 만들 수 있는 힘이 있습니다. 의지와 집중력으로 놀라운 것을 창조하세요. 모든 도구는 이미 당신의 손 안에 있습니다.",
      en: "You have the power to manifest your desires into reality. Create something amazing with your will and focus. All the tools you need are already in your hands.",
      ja: "あなたには望みを現実に変える力があります。意志と集中力で素晴らしいものを創り出しましょう。必要な道具はすべてあなたの手の中にあります。",
      zh: "你拥有将愿望化为现实的力量。用你的意志和专注创造出令人惊叹的事物。所有工具已在你手中。",
      de: "Sie haben die Kraft, Ihre Wünsche Wirklichkeit werden zu lassen. Erschaffen Sie mit Ihrem Willen und Fokus etwas Erstaunliches. Alle Werkzeuge liegen bereits in Ihren Händen.",
      fr: "Vous avez le pouvoir de transformer vos désirs en réalité. Créez quelque chose d'extraordinaire avec votre volonté et concentration. Tous les outils sont déjà entre vos mains.",
      es: "Tienes el poder de convertir tus deseos en realidad. Crea algo asombroso con tu voluntad y concentración. Todas las herramientas ya están en tus manos.",
      pt: "Você tem o poder de transformar seus desejos em realidade. Crie algo incrível com sua vontade e foco. Todas as ferramentas já estão em suas mãos.",
    },
    keywords: {
      ko: ["창조", "의지력", "능력"], en: ["Creation", "Willpower", "Skill"],
      ja: ["創造", "意志力", "技能"], zh: ["创造", "意志力", "技能"],
      de: ["Schöpfung", "Willenskraft", "Können"], fr: ["Création", "Volonté", "Habileté"],
      es: ["Creación", "Voluntad", "Habilidad"], pt: ["Criação", "Vontade", "Habilidade"],
    },
  },
  {
    id: 2, numeral: "II", emoji: "🌙",
    name: { ko: "여사제", en: "The High Priestess", ja: "女教皇", zh: "女祭司", de: "Die Hohepriesterin", fr: "La Papesse", es: "La Sacerdotisa", pt: "A Sacerdotisa" },
    meaning: {
      ko: "깊은 직감의 목소리에 귀를 기울이세요. 보이지 않는 신비로운 지혜가 당신을 부르고 있습니다. 내면의 진실을 탐구하면 숨겨진 답을 발견할 것입니다.",
      en: "Listen to the voice of your deep intuition. Mysterious wisdom beyond the visible is calling to you. Explore your inner truth and you will discover hidden answers.",
      ja: "深い直感の声に耳を傾けてください。目に見えない神秘的な知恵があなたを呼んでいます。内なる真実を探求すれば、隠された答えを見つけるでしょう。",
      zh: "倾听内心深处直觉的声音。看不见的神秘智慧正在呼唤你。探索内在的真相，你将发现隐藏的答案。",
      de: "Hören Sie auf die Stimme Ihrer tiefen Intuition. Geheimnisvolle Weisheit jenseits des Sichtbaren ruft nach Ihnen. Erforschen Sie Ihre innere Wahrheit und entdecken Sie verborgene Antworten.",
      fr: "Écoutez la voix de votre intuition profonde. Une sagesse mystérieuse au-delà du visible vous appelle. Explorez votre vérité intérieure et vous découvrirez des réponses cachées.",
      es: "Escucha la voz de tu intuición profunda. Una sabiduría misteriosa más allá de lo visible te está llamando. Explora tu verdad interior y descubrirás respuestas ocultas.",
      pt: "Ouça a voz da sua intuição profunda. Uma sabedoria misteriosa além do visível está chamando por você. Explore sua verdade interior e descobrirá respostas ocultas.",
    },
    keywords: {
      ko: ["직감", "신비", "내면의 지혜"], en: ["Intuition", "Mystery", "Inner wisdom"],
      ja: ["直感", "神秘", "内なる知恵"], zh: ["直觉", "神秘", "内在智慧"],
      de: ["Intuition", "Mysterium", "Innere Weisheit"], fr: ["Intuition", "Mystère", "Sagesse intérieure"],
      es: ["Intuición", "Misterio", "Sabiduría interior"], pt: ["Intuição", "Mistério", "Sabedoria interior"],
    },
  },
  {
    id: 3, numeral: "III", emoji: "👑",
    name: { ko: "여황제", en: "The Empress", ja: "女帝", zh: "皇后", de: "Die Herrscherin", fr: "L'Impératrice", es: "La Emperatriz", pt: "A Imperatriz" },
    meaning: {
      ko: "풍요와 창조의 에너지가 당신을 감싸고 있습니다. 사랑과 아름다움이 삶의 모든 곳에서 꽃피고 있습니다. 자연의 풍요로움을 받아들이고 감사하세요.",
      en: "The energy of abundance and creation surrounds you. Love and beauty are blossoming in every aspect of your life. Embrace nature's bounty and be grateful.",
      ja: "豊かさと創造のエネルギーがあなたを包んでいます。愛と美しさが人生のあらゆる場所で花開いています。自然の恵みを受け入れ、感謝しましょう。",
      zh: "丰盛与创造的能量环绕着你。爱与美在生活的每个角落绽放。拥抱大自然的恩赐，心怀感恩。",
      de: "Die Energie von Überfluss und Schöpfung umgibt Sie. Liebe und Schönheit erblühen in allen Bereichen Ihres Lebens. Nehmen Sie die Fülle der Natur an und seien Sie dankbar.",
      fr: "L'énergie d'abondance et de création vous enveloppe. L'amour et la beauté fleurissent dans tous les aspects de votre vie. Accueillez les bienfaits de la nature avec gratitude.",
      es: "La energía de abundancia y creación te rodea. El amor y la belleza florecen en cada aspecto de tu vida. Abraza la generosidad de la naturaleza y sé agradecido.",
      pt: "A energia de abundância e criação envolve você. Amor e beleza florescem em todos os aspectos da sua vida. Acolha a generosidade da natureza e seja grato.",
    },
    keywords: {
      ko: ["풍요", "창조", "자연"], en: ["Abundance", "Creation", "Nature"],
      ja: ["豊かさ", "創造", "自然"], zh: ["丰盛", "创造", "自然"],
      de: ["Überfluss", "Schöpfung", "Natur"], fr: ["Abondance", "Création", "Nature"],
      es: ["Abundancia", "Creación", "Naturaleza"], pt: ["Abundância", "Criação", "Natureza"],
    },
  },
  {
    id: 4, numeral: "IV", emoji: "🏛️",
    name: { ko: "황제", en: "The Emperor", ja: "皇帝", zh: "皇帝", de: "Der Herrscher", fr: "L'Empereur", es: "El Emperador", pt: "O Imperador" },
    meaning: {
      ko: "강한 의지와 리더십으로 당신의 세계를 다스리세요. 확고한 구조와 질서가 성공의 기반이 됩니다. 권위를 가지고 현명하게 결정을 내리세요.",
      en: "Rule your world with strong will and leadership. Firm structure and order form the foundation of success. Make wise decisions with authority and confidence.",
      ja: "強い意志とリーダーシップで自分の世界を治めてください。確固たる構造と秩序が成功の基盤となります。権威を持って賢明な決断を下しましょう。",
      zh: "用坚强的意志和领导力统治你的世界。稳固的结构和秩序是成功的基础。以权威和智慧做出决定。",
      de: "Regieren Sie Ihre Welt mit starkem Willen und Führungsstärke. Feste Strukturen und Ordnung bilden das Fundament des Erfolgs. Treffen Sie weise Entscheidungen mit Autorität.",
      fr: "Gouvernez votre monde avec une volonté forte et du leadership. Une structure solide et l'ordre forment le fondement du succès. Prenez des décisions sages avec autorité.",
      es: "Gobierna tu mundo con voluntad firme y liderazgo. La estructura sólida y el orden son la base del éxito. Toma decisiones sabias con autoridad y confianza.",
      pt: "Governe seu mundo com vontade forte e liderança. Estrutura firme e ordem formam a base do sucesso. Tome decisões sábias com autoridade e confiança.",
    },
    keywords: {
      ko: ["권위", "구조", "리더십"], en: ["Authority", "Structure", "Leadership"],
      ja: ["権威", "構造", "リーダーシップ"], zh: ["权威", "结构", "领导力"],
      de: ["Autorität", "Struktur", "Führung"], fr: ["Autorité", "Structure", "Leadership"],
      es: ["Autoridad", "Estructura", "Liderazgo"], pt: ["Autoridade", "Estrutura", "Liderança"],
    },
  },
  {
    id: 5, numeral: "V", emoji: "📿",
    name: { ko: "교황", en: "The Hierophant", ja: "教皇", zh: "教皇", de: "Der Hierophant", fr: "Le Pape", es: "El Hierofante", pt: "O Hierofante" },
    meaning: {
      ko: "전통의 지혜와 영적 가르침이 당신을 인도합니다. 믿음과 의식을 통해 더 깊은 이해에 도달하세요. 현명한 스승의 가르침에 마음을 열어보세요.",
      en: "Traditional wisdom and spiritual teachings guide you. Reach deeper understanding through faith and ritual. Open your heart to the teachings of a wise mentor.",
      ja: "伝統の知恵と霊的な教えがあなたを導いています。信仰と儀式を通じてより深い理解に到達しましょう。賢い師の教えに心を開いてください。",
      zh: "传统的智慧和灵性教导指引着你。通过信仰和仪式达到更深的理解。向智慧导师的教诲敞开心扉。",
      de: "Traditionelle Weisheit und spirituelle Lehren leiten Sie. Erreichen Sie tieferes Verständnis durch Glauben und Ritual. Öffnen Sie Ihr Herz für die Lehren eines weisen Mentors.",
      fr: "La sagesse traditionnelle et les enseignements spirituels vous guident. Atteignez une compréhension plus profonde par la foi et le rituel. Ouvrez votre cœur aux enseignements d'un sage mentor.",
      es: "La sabiduría tradicional y las enseñanzas espirituales te guían. Alcanza una comprensión más profunda a través de la fe y el ritual. Abre tu corazón a las enseñanzas de un sabio mentor.",
      pt: "A sabedoria tradicional e os ensinamentos espirituais o guiam. Alcance uma compreensão mais profunda através da fé e do ritual. Abra seu coração aos ensinamentos de um sábio mentor.",
    },
    keywords: {
      ko: ["전통", "영성", "가르침"], en: ["Tradition", "Spirituality", "Teaching"],
      ja: ["伝統", "霊性", "教え"], zh: ["传统", "灵性", "教导"],
      de: ["Tradition", "Spiritualität", "Lehre"], fr: ["Tradition", "Spiritualité", "Enseignement"],
      es: ["Tradición", "Espiritualidad", "Enseñanza"], pt: ["Tradição", "Espiritualidade", "Ensinamento"],
    },
  },
  {
    id: 6, numeral: "VI", emoji: "💕",
    name: { ko: "연인", en: "The Lovers", ja: "恋人", zh: "恋人", de: "Die Liebenden", fr: "L'Amoureux", es: "Los Enamorados", pt: "Os Enamorados" },
    meaning: {
      ko: "사랑과 조화의 에너지가 당신의 삶에 흐르고 있습니다. 중요한 선택의 순간에 마음의 소리를 따르세요. 진정한 연결은 서로의 영혼을 비춰주는 거울입니다.",
      en: "The energy of love and harmony flows through your life. Follow your heart's voice at this crucial moment of choice. True connection is a mirror that reflects each other's soul.",
      ja: "愛と調和のエネルギーがあなたの人生に流れています。重要な選択の瞬間に心の声に従いましょう。真のつながりは互いの魂を映す鏡です。",
      zh: "爱与和谐的能量流淌在你的生活中。在重要的选择时刻，跟随内心的声音。真正的连接是映照彼此灵魂的镜子。",
      de: "Die Energie von Liebe und Harmonie fließt durch Ihr Leben. Folgen Sie der Stimme Ihres Herzens in diesem entscheidenden Moment. Wahre Verbindung ist ein Spiegel, der die Seelen beider widerspiegelt.",
      fr: "L'énergie de l'amour et de l'harmonie coule dans votre vie. Suivez la voix de votre cœur en ce moment crucial de choix. La vraie connexion est un miroir qui reflète l'âme de chacun.",
      es: "La energía del amor y la armonía fluye por tu vida. Sigue la voz de tu corazón en este momento crucial de elección. La verdadera conexión es un espejo que refleja el alma del otro.",
      pt: "A energia do amor e da harmonia flui pela sua vida. Siga a voz do seu coração neste momento crucial de escolha. A verdadeira conexão é um espelho que reflete a alma um do outro.",
    },
    keywords: {
      ko: ["사랑", "조화", "선택"], en: ["Love", "Harmony", "Choice"],
      ja: ["愛", "調和", "選択"], zh: ["爱", "和谐", "选择"],
      de: ["Liebe", "Harmonie", "Wahl"], fr: ["Amour", "Harmonie", "Choix"],
      es: ["Amor", "Armonía", "Elección"], pt: ["Amor", "Harmonia", "Escolha"],
    },
  },
  {
    id: 7, numeral: "VII", emoji: "🏇",
    name: { ko: "전차", en: "The Chariot", ja: "戦車", zh: "战车", de: "Der Wagen", fr: "Le Chariot", es: "El Carro", pt: "O Carro" },
    meaning: {
      ko: "강한 결의와 불굴의 의지로 전진하세요. 승리는 당신의 결단력에 달려 있습니다. 대립하는 힘들을 하나로 모아 목표를 향해 돌진하세요.",
      en: "Advance with strong determination and indomitable will. Victory depends on your decisiveness. Unite opposing forces and charge toward your goal.",
      ja: "強い決意と不屈の意志で前進してください。勝利はあなたの決断力にかかっています。対立する力を一つにまとめ、目標に向かって突き進みましょう。",
      zh: "以坚定的决心和不屈的意志前进。胜利取决于你的果断。将对立的力量统一起来，朝着目标勇往直前。",
      de: "Schreiten Sie mit starker Entschlossenheit und unbeugsamen Willen voran. Der Sieg hängt von Ihrer Entschlusskraft ab. Vereinen Sie gegensätzliche Kräfte und stürmen Sie auf Ihr Ziel zu.",
      fr: "Avancez avec une détermination forte et une volonté indomptable. La victoire dépend de votre résolution. Unissez les forces opposées et foncez vers votre objectif.",
      es: "Avanza con fuerte determinación y voluntad inquebrantable. La victoria depende de tu decisión. Une las fuerzas opuestas y avanza hacia tu meta.",
      pt: "Avance com forte determinação e vontade indomável. A vitória depende da sua decisão. Una forças opostas e avance rumo ao seu objetivo.",
    },
    keywords: {
      ko: ["승리", "결단력", "전진"], en: ["Victory", "Determination", "Advance"],
      ja: ["勝利", "決断力", "前進"], zh: ["胜利", "决断力", "前进"],
      de: ["Sieg", "Entschlossenheit", "Vorankommen"], fr: ["Victoire", "Détermination", "Avancée"],
      es: ["Victoria", "Determinación", "Avance"], pt: ["Vitória", "Determinação", "Avanço"],
    },
  },
  {
    id: 8, numeral: "VIII", emoji: "🦁",
    name: { ko: "힘", en: "Strength", ja: "力", zh: "力量", de: "Die Kraft", fr: "La Force", es: "La Fuerza", pt: "A Força" },
    meaning: {
      ko: "내면의 힘과 용기가 모든 도전을 극복하게 해줄 것입니다. 부드러운 인내가 야생의 힘보다 강합니다. 자비와 용기로 두려움을 길들이세요.",
      en: "Inner strength and courage will help you overcome all challenges. Gentle patience is stronger than wild force. Tame your fears with compassion and bravery.",
      ja: "内なる力と勇気があらゆる挑戦を乗り越えさせてくれるでしょう。穏やかな忍耐は野生の力よりも強いです。慈悲と勇気で恐れを手なづけましょう。",
      zh: "内在的力量和勇气将帮助你克服一切挑战。温柔的耐心比野蛮的力量更强大。用慈悲和勇气驯服你的恐惧。",
      de: "Innere Stärke und Mut werden Ihnen helfen, alle Herausforderungen zu meistern. Sanfte Geduld ist stärker als wilde Kraft. Zähmen Sie Ihre Ängste mit Mitgefühl und Tapferkeit.",
      fr: "La force intérieure et le courage vous aideront à surmonter tous les défis. La patience douce est plus forte que la force brute. Apprivoisez vos peurs avec compassion et bravoure.",
      es: "La fuerza interior y el coraje te ayudarán a superar todos los desafíos. La paciencia suave es más fuerte que la fuerza salvaje. Doma tus miedos con compasión y valentía.",
      pt: "A força interior e a coragem o ajudarão a superar todos os desafios. A paciência suave é mais forte que a força selvagem. Dome seus medos com compaixão e bravura.",
    },
    keywords: {
      ko: ["내면의 힘", "용기", "인내"], en: ["Inner strength", "Courage", "Patience"],
      ja: ["内なる力", "勇気", "忍耐"], zh: ["内在力量", "勇气", "耐心"],
      de: ["Innere Stärke", "Mut", "Geduld"], fr: ["Force intérieure", "Courage", "Patience"],
      es: ["Fuerza interior", "Coraje", "Paciencia"], pt: ["Força interior", "Coragem", "Paciência"],
    },
  },
  {
    id: 9, numeral: "IX", emoji: "🏔️",
    name: { ko: "은둔자", en: "The Hermit", ja: "隠者", zh: "隐士", de: "Der Eremit", fr: "L'Ermite", es: "El Ermitaño", pt: "O Eremita" },
    meaning: {
      ko: "고요한 내면의 빛을 따라 자아 성찰의 여정을 떠나세요. 홀로 걷는 길에서 가장 깊은 지혜를 발견할 것입니다. 침묵 속에서 진정한 답을 찾으세요.",
      en: "Follow the quiet inner light on a journey of self-reflection. You will discover the deepest wisdom on the path walked alone. Find your true answers in the silence.",
      ja: "静かな内なる光に従い、自己省察の旅に出かけましょう。一人で歩む道で最も深い知恵を見つけるでしょう。沈黙の中で真の答えを見つけてください。",
      zh: "跟随内心宁静的光芒，踏上自我反思的旅程。在独行的道路上，你将发现最深的智慧。在寂静中找到真正的答案。",
      de: "Folgen Sie dem stillen inneren Licht auf einer Reise der Selbstreflexion. Auf dem einsam beschrittenen Weg werden Sie die tiefste Weisheit entdecken. Finden Sie Ihre wahren Antworten in der Stille.",
      fr: "Suivez la lumière intérieure silencieuse dans un voyage d'introspection. Vous découvrirez la sagesse la plus profonde sur le chemin parcouru seul. Trouvez vos vraies réponses dans le silence.",
      es: "Sigue la luz interior silenciosa en un viaje de autorreflexión. Descubrirás la sabiduría más profunda en el camino recorrido en soledad. Encuentra tus verdaderas respuestas en el silencio.",
      pt: "Siga a luz interior silenciosa em uma jornada de autorreflexão. Você descobrirá a sabedoria mais profunda no caminho percorrido sozinho. Encontre suas verdadeiras respostas no silêncio.",
    },
    keywords: {
      ko: ["성찰", "고독", "지혜"], en: ["Reflection", "Solitude", "Wisdom"],
      ja: ["省察", "孤独", "知恵"], zh: ["反思", "孤独", "智慧"],
      de: ["Besinnung", "Einsamkeit", "Weisheit"], fr: ["Réflexion", "Solitude", "Sagesse"],
      es: ["Reflexión", "Soledad", "Sabiduría"], pt: ["Reflexão", "Solidão", "Sabedoria"],
    },
  },
  {
    id: 10, numeral: "X", emoji: "🎡",
    name: { ko: "운명의 수레바퀴", en: "Wheel of Fortune", ja: "運命の輪", zh: "命运之轮", de: "Rad des Schicksals", fr: "La Roue de Fortune", es: "La Rueda de la Fortuna", pt: "A Roda da Fortuna" },
    meaning: {
      ko: "운명의 수레바퀴가 당신에게 유리한 방향으로 돌아가고 있습니다. 변화의 바람이 불어오니 새로운 기회를 잡으세요. 우주의 순환 속에서 행운이 당신을 찾아옵니다.",
      en: "The wheel of fate is turning in your favor. The winds of change are blowing, so seize new opportunities. Fortune finds you within the cycles of the universe.",
      ja: "運命の車輪があなたに有利な方向に回っています。変化の風が吹いているので、新しいチャンスをつかみましょう。宇宙の循環の中で幸運があなたを見つけます。",
      zh: "命运之轮正朝着有利于你的方向转动。变化之风正在吹来，抓住新的机会。在宇宙的循环中，好运正在找到你。",
      de: "Das Rad des Schicksals dreht sich zu Ihren Gunsten. Die Winde des Wandels wehen, ergreifen Sie neue Gelegenheiten. Das Glück findet Sie in den Zyklen des Universums.",
      fr: "La roue du destin tourne en votre faveur. Les vents du changement soufflent, saisissez les nouvelles opportunités. La fortune vous trouve dans les cycles de l'univers.",
      es: "La rueda del destino gira a tu favor. Los vientos de cambio soplan, así que aprovecha nuevas oportunidades. La fortuna te encuentra en los ciclos del universo.",
      pt: "A roda do destino está girando a seu favor. Os ventos da mudança estão soprando, aproveite novas oportunidades. A fortuna o encontra nos ciclos do universo.",
    },
    keywords: {
      ko: ["운명", "변화", "기회"], en: ["Destiny", "Change", "Opportunity"],
      ja: ["運命", "変化", "機会"], zh: ["命运", "变化", "机会"],
      de: ["Schicksal", "Wandel", "Gelegenheit"], fr: ["Destin", "Changement", "Opportunité"],
      es: ["Destino", "Cambio", "Oportunidad"], pt: ["Destino", "Mudança", "Oportunidade"],
    },
  },
  {
    id: 11, numeral: "XI", emoji: "⚖️",
    name: { ko: "정의", en: "Justice", ja: "正義", zh: "正义", de: "Die Gerechtigkeit", fr: "La Justice", es: "La Justicia", pt: "A Justiça" },
    meaning: {
      ko: "진실과 공정함이 승리할 것입니다. 모든 행동에는 결과가 따르니 현명하게 선택하세요. 균형과 조화를 찾으면 정의로운 결과를 얻게 됩니다.",
      en: "Truth and fairness will prevail. Every action has consequences, so choose wisely. Find balance and harmony, and you will receive a just outcome.",
      ja: "真実と公正さが勝利するでしょう。すべての行動には結果が伴うので、賢く選択してください。バランスと調和を見つければ、正義の結果を得られます。",
      zh: "真相和公正终将获胜。每个行为都有后果，请明智地选择。找到平衡与和谐，你将获得公正的结果。",
      de: "Wahrheit und Gerechtigkeit werden siegen. Jede Handlung hat Konsequenzen, wählen Sie also weise. Finden Sie Gleichgewicht und Harmonie, und Sie werden ein gerechtes Ergebnis erhalten.",
      fr: "La vérité et l'équité prévaudront. Chaque action a des conséquences, alors choisissez sagement. Trouvez l'équilibre et l'harmonie, et vous obtiendrez un résultat juste.",
      es: "La verdad y la justicia prevalecerán. Toda acción tiene consecuencias, así que elige sabiamente. Encuentra el equilibrio y la armonía, y obtendrás un resultado justo.",
      pt: "A verdade e a justiça prevalecerão. Toda ação tem consequências, então escolha sabiamente. Encontre equilíbrio e harmonia, e receberá um resultado justo.",
    },
    keywords: {
      ko: ["정의", "균형", "진실"], en: ["Justice", "Balance", "Truth"],
      ja: ["正義", "バランス", "真実"], zh: ["正义", "平衡", "真相"],
      de: ["Gerechtigkeit", "Gleichgewicht", "Wahrheit"], fr: ["Justice", "Équilibre", "Vérité"],
      es: ["Justicia", "Equilibrio", "Verdad"], pt: ["Justiça", "Equilíbrio", "Verdade"],
    },
  },
  {
    id: 12, numeral: "XII", emoji: "🙃",
    name: { ko: "매달린 사람", en: "The Hanged Man", ja: "吊された男", zh: "倒吊人", de: "Der Gehängte", fr: "Le Pendu", es: "El Colgado", pt: "O Enforcado" },
    meaning: {
      ko: "새로운 시각으로 세상을 바라볼 때입니다. 포기가 아닌 자발적 희생을 통해 깨달음을 얻으세요. 멈춤 속에서 가장 큰 변화가 시작됩니다.",
      en: "It's time to see the world from a new perspective. Gain enlightenment through voluntary sacrifice, not surrender. The greatest transformation begins in stillness.",
      ja: "新しい視点で世界を見る時です。諦めではなく自発的な犠牲を通じて悟りを得ましょう。静止の中で最も大きな変化が始まります。",
      zh: "是时候以全新的视角看待世界了。通过自愿的牺牲而非放弃来获得觉悟。最大的转变始于静止之中。",
      de: "Es ist Zeit, die Welt aus einer neuen Perspektive zu sehen. Erlangen Sie Erleuchtung durch freiwilliges Opfer, nicht Aufgabe. Die größte Transformation beginnt in der Stille.",
      fr: "Il est temps de voir le monde d'une nouvelle perspective. Obtenez l'illumination par le sacrifice volontaire, non l'abandon. La plus grande transformation commence dans l'immobilité.",
      es: "Es momento de ver el mundo desde una nueva perspectiva. Obtén iluminación a través del sacrificio voluntario, no la rendición. La mayor transformación comienza en la quietud.",
      pt: "É hora de ver o mundo de uma nova perspectiva. Obtenha iluminação através do sacrifício voluntário, não da desistência. A maior transformação começa na quietude.",
    },
    keywords: {
      ko: ["희생", "새로운 관점", "깨달음"], en: ["Sacrifice", "New perspective", "Enlightenment"],
      ja: ["犠牲", "新しい視点", "悟り"], zh: ["牺牲", "新视角", "觉悟"],
      de: ["Opfer", "Neue Perspektive", "Erleuchtung"], fr: ["Sacrifice", "Nouvelle perspective", "Illumination"],
      es: ["Sacrificio", "Nueva perspectiva", "Iluminación"], pt: ["Sacrifício", "Nova perspectiva", "Iluminação"],
    },
  },
  {
    id: 13, numeral: "XIII", emoji: "🦋",
    name: { ko: "죽음", en: "Death", ja: "死神", zh: "死神", de: "Der Tod", fr: "La Mort", es: "La Muerte", pt: "A Morte" },
    meaning: {
      ko: "끝남은 곧 새로운 시작을 의미합니다. 낡은 것을 놓아보내야 새로운 것이 찾아옵니다. 변환의 시기를 두려워하지 말고 나비의 탈바꿈처럼 받아들이세요.",
      en: "An ending signifies a new beginning. Let go of the old to welcome the new. Don't fear this time of transformation — embrace it like a butterfly's metamorphosis.",
      ja: "終わりは新しい始まりを意味します。古いものを手放してこそ新しいものが訪れます。変容の時を恐れず、蝶の脱皮のように受け入れましょう。",
      zh: "终结意味着新的开始。放下旧的，才能迎来新的。不要害怕这个转变的时期，像蝴蝶蜕变一样去拥抱它。",
      de: "Ein Ende bedeutet einen neuen Anfang. Lassen Sie das Alte los, um das Neue willkommen zu heißen. Fürchten Sie diese Zeit der Transformation nicht — umarmen Sie sie wie die Metamorphose eines Schmetterlings.",
      fr: "Une fin signifie un nouveau commencement. Laissez partir l'ancien pour accueillir le nouveau. Ne craignez pas ce temps de transformation — embrassez-le comme la métamorphose d'un papillon.",
      es: "Un final significa un nuevo comienzo. Deja ir lo viejo para dar la bienvenida a lo nuevo. No temas este tiempo de transformación — abrázalo como la metamorfosis de una mariposa.",
      pt: "Um final significa um novo começo. Deixe ir o velho para acolher o novo. Não tema este tempo de transformação — abrace-o como a metamorfose de uma borboleta.",
    },
    keywords: {
      ko: ["변환", "끝과 시작", "해방"], en: ["Transformation", "Endings", "Liberation"],
      ja: ["変容", "終わりと始まり", "解放"], zh: ["转变", "终结与开始", "解放"],
      de: ["Transformation", "Enden", "Befreiung"], fr: ["Transformation", "Fins", "Libération"],
      es: ["Transformación", "Finales", "Liberación"], pt: ["Transformação", "Finais", "Libertação"],
    },
  },
  {
    id: 14, numeral: "XIV", emoji: "⚗️",
    name: { ko: "절제", en: "Temperance", ja: "節制", zh: "节制", de: "Die Mäßigkeit", fr: "Tempérance", es: "La Templanza", pt: "A Temperança" },
    meaning: {
      ko: "균형과 조화가 당신의 삶에 평화를 가져옵니다. 인내와 절제를 통해 내면의 연금술이 이루어집니다. 서두르지 말고 흐름에 맡기세요.",
      en: "Balance and harmony bring peace to your life. Inner alchemy is achieved through patience and moderation. Don't rush — let yourself flow with the current.",
      ja: "バランスと調和があなたの人生に平和をもたらします。忍耐と節制を通じて内なる錬金術が実現します。急がず、流れに身を任せましょう。",
      zh: "平衡与和谐为你的生活带来安宁。通过耐心和节制实现内在的炼金术。不要急躁，顺其自然。",
      de: "Gleichgewicht und Harmonie bringen Frieden in Ihr Leben. Innere Alchemie wird durch Geduld und Mäßigung erreicht. Eilen Sie nicht — lassen Sie sich vom Strom tragen.",
      fr: "L'équilibre et l'harmonie apportent la paix dans votre vie. L'alchimie intérieure s'accomplit par la patience et la modération. Ne vous pressez pas — laissez-vous porter par le courant.",
      es: "El equilibrio y la armonía traen paz a tu vida. La alquimia interior se logra con paciencia y moderación. No te apresures — déjate llevar por la corriente.",
      pt: "Equilíbrio e harmonia trazem paz à sua vida. A alquimia interior é alcançada através da paciência e moderação. Não se apresse — deixe-se fluir com a corrente.",
    },
    keywords: {
      ko: ["균형", "인내", "조화"], en: ["Balance", "Patience", "Harmony"],
      ja: ["バランス", "忍耐", "調和"], zh: ["平衡", "耐心", "和谐"],
      de: ["Gleichgewicht", "Geduld", "Harmonie"], fr: ["Équilibre", "Patience", "Harmonie"],
      es: ["Equilibrio", "Paciencia", "Armonía"], pt: ["Equilíbrio", "Paciência", "Harmonia"],
    },
  },
  {
    id: 15, numeral: "XV", emoji: "🔥",
    name: { ko: "악마", en: "The Devil", ja: "悪魔", zh: "恶魔", de: "Der Teufel", fr: "Le Diable", es: "El Diablo", pt: "O Diabo" },
    meaning: {
      ko: "당신을 얽매고 있는 사슬을 인식하세요. 물질적 욕망과 집착에서 벗어날 때 진정한 자유를 찾을 수 있습니다. 유혹을 직시하고 내면의 힘으로 극복하세요.",
      en: "Recognize the chains that bind you. True freedom comes when you break free from material desires and attachments. Face temptation head-on and overcome it with inner strength.",
      ja: "あなたを縛っている鎖を認識してください。物質的な欲望と執着から解放される時、真の自由を見つけることができます。誘惑を直視し、内なる力で克服しましょう。",
      zh: "认清束缚你的锁链。当你摆脱物质欲望和执着时，才能找到真正的自由。直面诱惑，用内在的力量去克服它。",
      de: "Erkennen Sie die Ketten, die Sie binden. Wahre Freiheit kommt, wenn Sie sich von materiellen Wünschen und Anhaftungen befreien. Stellen Sie sich der Versuchung und überwinden Sie sie mit innerer Stärke.",
      fr: "Reconnaissez les chaînes qui vous lient. La vraie liberté vient quand vous vous libérez des désirs matériels et des attachements. Affrontez la tentation et surmontez-la avec votre force intérieure.",
      es: "Reconoce las cadenas que te atan. La verdadera libertad llega cuando te liberas de los deseos materiales y los apegos. Enfrenta la tentación y supérala con tu fuerza interior.",
      pt: "Reconheça as correntes que o prendem. A verdadeira liberdade vem quando você se liberta dos desejos materiais e apegos. Enfrente a tentação e supere-a com sua força interior.",
    },
    keywords: {
      ko: ["유혹", "집착", "해방"], en: ["Temptation", "Attachment", "Liberation"],
      ja: ["誘惑", "執着", "解放"], zh: ["诱惑", "执着", "解放"],
      de: ["Versuchung", "Anhaftung", "Befreiung"], fr: ["Tentation", "Attachement", "Libération"],
      es: ["Tentación", "Apego", "Liberación"], pt: ["Tentação", "Apego", "Libertação"],
    },
  },
  {
    id: 16, numeral: "XVI", emoji: "⚡",
    name: { ko: "탑", en: "The Tower", ja: "塔", zh: "高塔", de: "Der Turm", fr: "La Maison Dieu", es: "La Torre", pt: "A Torre" },
    meaning: {
      ko: "예상치 못한 변화가 기존의 구조를 흔들 것입니다. 무너짐 속에서 새로운 건설의 기회가 숨어 있습니다. 번개처럼 찾아오는 깨달음을 받아들이세요.",
      en: "Unexpected change will shake existing structures. Within destruction lies the opportunity for new construction. Accept the lightning-bolt of revelation that comes your way.",
      ja: "予想外の変化が既存の構造を揺るがすでしょう。崩壊の中に新たな建設の機会が隠れています。稲妻のように訪れる気づきを受け入れましょう。",
      zh: "意想不到的变化将撼动现有的结构。在崩塌之中隐藏着重新建设的机会。接受如闪电般到来的顿悟。",
      de: "Unerwartete Veränderung wird bestehende Strukturen erschüttern. In der Zerstörung verbirgt sich die Gelegenheit für einen Neuaufbau. Akzeptieren Sie die blitzartige Offenbarung.",
      fr: "Un changement inattendu ébranlera les structures existantes. Dans la destruction se cache l'opportunité d'une nouvelle construction. Acceptez la révélation foudroyante qui se présente à vous.",
      es: "Un cambio inesperado sacudirá las estructuras existentes. Dentro de la destrucción se esconde la oportunidad de una nueva construcción. Acepta la revelación que llega como un rayo.",
      pt: "Uma mudança inesperada abalará as estruturas existentes. Na destruição se esconde a oportunidade de uma nova construção. Aceite a revelação que chega como um relâmpago.",
    },
    keywords: {
      ko: ["급변", "깨달음", "해방"], en: ["Upheaval", "Revelation", "Liberation"],
      ja: ["激変", "啓示", "解放"], zh: ["剧变", "启示", "解放"],
      de: ["Umbruch", "Offenbarung", "Befreiung"], fr: ["Bouleversement", "Révélation", "Libération"],
      es: ["Agitación", "Revelación", "Liberación"], pt: ["Revolta", "Revelação", "Libertação"],
    },
  },
  {
    id: 17, numeral: "XVII", emoji: "⭐",
    name: { ko: "별", en: "The Star", ja: "星", zh: "星星", de: "Der Stern", fr: "L'Étoile", es: "La Estrella", pt: "A Estrela" },
    meaning: {
      ko: "희망의 별빛이 어둠 속에서 당신을 인도하고 있습니다. 영감과 치유의 시간이 찾아왔습니다. 우주가 당신의 소원을 듣고 있으니 믿음을 잃지 마세요.",
      en: "The starlight of hope guides you through the darkness. A time of inspiration and healing has arrived. The universe hears your wishes, so never lose faith.",
      ja: "希望の星の光が闇の中であなたを導いています。霊感と癒しの時が訪れました。宇宙があなたの願いを聞いているので、信念を失わないでください。",
      zh: "希望的星光在黑暗中指引着你。灵感与治愈的时刻已经到来。宇宙在聆听你的愿望，不要失去信念。",
      de: "Das Sternenlicht der Hoffnung führt Sie durch die Dunkelheit. Eine Zeit der Inspiration und Heilung ist gekommen. Das Universum hört Ihre Wünsche, verlieren Sie niemals den Glauben.",
      fr: "La lumière des étoiles d'espoir vous guide à travers l'obscurité. Un temps d'inspiration et de guérison est arrivé. L'univers entend vos souhaits, ne perdez jamais la foi.",
      es: "La luz de las estrellas de esperanza te guía a través de la oscuridad. Ha llegado un tiempo de inspiración y sanación. El universo escucha tus deseos, así que nunca pierdas la fe.",
      pt: "A luz das estrelas de esperança o guia através da escuridão. Um tempo de inspiração e cura chegou. O universo ouve seus desejos, então nunca perca a fé.",
    },
    keywords: {
      ko: ["희망", "영감", "치유"], en: ["Hope", "Inspiration", "Healing"],
      ja: ["希望", "霊感", "癒し"], zh: ["希望", "灵感", "治愈"],
      de: ["Hoffnung", "Inspiration", "Heilung"], fr: ["Espoir", "Inspiration", "Guérison"],
      es: ["Esperanza", "Inspiración", "Sanación"], pt: ["Esperança", "Inspiração", "Cura"],
    },
  },
  {
    id: 18, numeral: "XVIII", emoji: "🌕",
    name: { ko: "달", en: "The Moon", ja: "月", zh: "月亮", de: "Der Mond", fr: "La Lune", es: "La Luna", pt: "A Lua" },
    meaning: {
      ko: "환상과 현실 사이의 경계에서 직감을 믿으세요. 무의식 깊은 곳에서 중요한 메시지가 떠오르고 있습니다. 달빛 아래 숨겨진 진실이 서서히 드러날 것입니다.",
      en: "Trust your intuition at the boundary between illusion and reality. Important messages are rising from deep within your subconscious. Hidden truths will gradually reveal themselves under the moonlight.",
      ja: "幻想と現実の境界で直感を信じてください。無意識の深いところから重要なメッセージが浮かび上がっています。月の光の下で隠された真実が徐々に明らかになるでしょう。",
      zh: "在幻想与现实的边界，请相信你的直觉。重要的信息正从潜意识深处浮现。月光下隐藏的真相将逐渐显露。",
      de: "Vertrauen Sie Ihrer Intuition an der Grenze zwischen Illusion und Realität. Wichtige Botschaften steigen aus Ihrem tiefen Unterbewusstsein auf. Verborgene Wahrheiten werden sich allmählich im Mondlicht offenbaren.",
      fr: "Faites confiance à votre intuition à la frontière entre illusion et réalité. Des messages importants émergent des profondeurs de votre subconscient. Les vérités cachées se révéleront progressivement au clair de lune.",
      es: "Confía en tu intuición en la frontera entre la ilusión y la realidad. Mensajes importantes están surgiendo de lo profundo de tu subconsciente. Las verdades ocultas se revelarán gradualmente bajo la luz de la luna.",
      pt: "Confie na sua intuição na fronteira entre ilusão e realidade. Mensagens importantes estão emergindo das profundezas do seu subconsciente. Verdades ocultas se revelarão gradualmente sob a luz da lua.",
    },
    keywords: {
      ko: ["환상", "직감", "무의식"], en: ["Illusion", "Intuition", "Subconscious"],
      ja: ["幻想", "直感", "無意識"], zh: ["幻象", "直觉", "潜意识"],
      de: ["Illusion", "Intuition", "Unterbewusstsein"], fr: ["Illusion", "Intuition", "Subconscient"],
      es: ["Ilusión", "Intuición", "Subconsciente"], pt: ["Ilusão", "Intuição", "Subconsciente"],
    },
  },
  {
    id: 19, numeral: "XIX", emoji: "☀️",
    name: { ko: "태양", en: "The Sun", ja: "太陽", zh: "太阳", de: "Die Sonne", fr: "Le Soleil", es: "El Sol", pt: "O Sol" },
    meaning: {
      ko: "찬란한 태양의 빛이 당신의 삶을 환하게 비추고 있습니다. 기쁨, 성공, 활력이 넘치는 시기가 찾아왔습니다. 순수한 행복을 만끽하고 그 빛을 주변과 나누세요.",
      en: "The brilliant light of the sun illuminates your life. A time of joy, success, and vitality has arrived. Savor pure happiness and share that light with those around you.",
      ja: "輝かしい太陽の光があなたの人生を明るく照らしています。喜び、成功、活力に満ちた時期が訪れました。純粋な幸せを満喫し、その光を周りの人と分かち合いましょう。",
      zh: "灿烂的阳光照亮了你的生活。充满喜悦、成功和活力的时期已经到来。享受纯粹的幸福，并与周围的人分享那份光芒。",
      de: "Das strahlende Licht der Sonne erhellt Ihr Leben. Eine Zeit der Freude, des Erfolgs und der Vitalität ist gekommen. Genießen Sie reines Glück und teilen Sie dieses Licht mit Ihrer Umgebung.",
      fr: "La lumière brillante du soleil illumine votre vie. Un temps de joie, de succès et de vitalité est arrivé. Savourez le bonheur pur et partagez cette lumière avec votre entourage.",
      es: "La brillante luz del sol ilumina tu vida. Ha llegado un tiempo de alegría, éxito y vitalidad. Saborea la felicidad pura y comparte esa luz con quienes te rodean.",
      pt: "A luz brilhante do sol ilumina sua vida. Um tempo de alegria, sucesso e vitalidade chegou. Saboreie a felicidade pura e compartilhe essa luz com aqueles ao seu redor.",
    },
    keywords: {
      ko: ["기쁨", "성공", "활력"], en: ["Joy", "Success", "Vitality"],
      ja: ["喜び", "成功", "活力"], zh: ["喜悦", "成功", "活力"],
      de: ["Freude", "Erfolg", "Vitalität"], fr: ["Joie", "Succès", "Vitalité"],
      es: ["Alegría", "Éxito", "Vitalidad"], pt: ["Alegria", "Sucesso", "Vitalidade"],
    },
  },
  {
    id: 20, numeral: "XX", emoji: "📯",
    name: { ko: "심판", en: "Judgement", ja: "審判", zh: "审判", de: "Das Gericht", fr: "Le Jugement", es: "El Juicio", pt: "O Julgamento" },
    meaning: {
      ko: "과거를 돌아보고 자신을 진정으로 평가할 때입니다. 내면의 부름에 응답하고 새로운 단계로 올라서세요. 해방과 부활의 순간이 가까이 있습니다.",
      en: "It's time to look back and truly evaluate yourself. Answer the inner calling and rise to a new level. The moment of liberation and rebirth is near.",
      ja: "過去を振り返り、自分を真に評価する時です。内なる呼びかけに応え、新たな段階へと上がりましょう。解放と復活の瞬間が近づいています。",
      zh: "是时候回顾过去，真正评价自己了。回应内心的召唤，迈向新的阶段。解放和重生的时刻即将到来。",
      de: "Es ist Zeit, zurückzublicken und sich selbst wahrhaft zu bewerten. Antworten Sie auf den inneren Ruf und erheben Sie sich auf eine neue Ebene. Der Moment der Befreiung und Wiedergeburt ist nah.",
      fr: "Il est temps de regarder en arrière et de vous évaluer sincèrement. Répondez à l'appel intérieur et élevez-vous à un nouveau niveau. Le moment de la libération et de la renaissance est proche.",
      es: "Es momento de mirar atrás y evaluarte verdaderamente. Responde al llamado interior y asciende a un nuevo nivel. El momento de la liberación y el renacimiento está cerca.",
      pt: "É hora de olhar para trás e se avaliar verdadeiramente. Responda ao chamado interior e eleve-se a um novo nível. O momento da libertação e do renascimento está próximo.",
    },
    keywords: {
      ko: ["부활", "심판", "각성"], en: ["Rebirth", "Judgement", "Awakening"],
      ja: ["復活", "審判", "覚醒"], zh: ["重生", "审判", "觉醒"],
      de: ["Wiedergeburt", "Gericht", "Erwachen"], fr: ["Renaissance", "Jugement", "Éveil"],
      es: ["Renacimiento", "Juicio", "Despertar"], pt: ["Renascimento", "Julgamento", "Despertar"],
    },
  },
  {
    id: 21, numeral: "XXI", emoji: "🌍",
    name: { ko: "세계", en: "The World", ja: "世界", zh: "世界", de: "Die Welt", fr: "Le Monde", es: "El Mundo", pt: "O Mundo" },
    meaning: {
      ko: "완성과 성취의 순간이 당신에게 찾아왔습니다. 하나의 순환이 끝나고 새로운 순환이 시작됩니다. 우주와 하나 되는 조화 속에서 충만함을 느끼세요.",
      en: "The moment of completion and achievement has come to you. One cycle ends and a new one begins. Feel the fullness in the harmony of being one with the universe.",
      ja: "完成と達成の瞬間があなたに訪れました。一つの循環が終わり、新たな循環が始まります。宇宙と一つになる調和の中で充実感を感じましょう。",
      zh: "完成与成就的时刻已经来到。一个循环结束，新的循环开始。在与宇宙合一的和谐中感受圆满。",
      de: "Der Moment der Vollendung und Erfüllung ist gekommen. Ein Zyklus endet und ein neuer beginnt. Spüren Sie die Fülle in der Harmonie des Einsseins mit dem Universum.",
      fr: "Le moment de l'accomplissement et de la réussite est arrivé. Un cycle se termine et un nouveau commence. Ressentez la plénitude dans l'harmonie de ne faire qu'un avec l'univers.",
      es: "El momento de la culminación y el logro ha llegado. Un ciclo termina y uno nuevo comienza. Siente la plenitud en la armonía de ser uno con el universo.",
      pt: "O momento de completude e realização chegou. Um ciclo termina e um novo começa. Sinta a plenitude na harmonia de ser um com o universo.",
    },
    keywords: {
      ko: ["완성", "성취", "조화"], en: ["Completion", "Achievement", "Harmony"],
      ja: ["完成", "達成", "調和"], zh: ["完成", "成就", "和谐"],
      de: ["Vollendung", "Erfüllung", "Harmonie"], fr: ["Accomplissement", "Réussite", "Harmonie"],
      es: ["Culminación", "Logro", "Armonía"], pt: ["Completude", "Realização", "Harmonia"],
    },
  },
];

/* ─── Energy & Summary ─── */

const POSITIVE_IDS = new Set([0, 1, 3, 4, 6, 7, 8, 10, 17, 19, 21]);
const CHALLENGING_IDS = new Set([12, 13, 15, 16, 18]);

type SummaryKey = "positive" | "neutral" | "challenging" | "mixed";

const summaryTemplates: Record<SummaryKey, Record<Language, string>> = {
  positive: {
    ko: "카드들이 밝고 희망찬 에너지를 보여주고 있습니다. 당신의 과거 경험이 현재의 힘이 되어 빛나는 미래로 이어질 것입니다. 자신감을 갖고 앞으로 나아가세요.",
    en: "The cards reveal bright and hopeful energy. Your past experiences become your present strength, leading to a shining future. Move forward with confidence.",
    ja: "カードは明るく希望に満ちたエネルギーを示しています。過去の経験が現在の力となり、輝かしい未来へとつながるでしょう。自信を持って前進してください。",
    zh: "牌面展示出明亮而充满希望的能量。你过去的经历成为现在的力量，引领你走向光明的未来。自信地向前迈进吧。",
    de: "Die Karten offenbaren helle und hoffnungsvolle Energie. Ihre vergangenen Erfahrungen werden zu Ihrer gegenwärtigen Stärke und führen zu einer strahlenden Zukunft. Gehen Sie selbstbewusst voran.",
    fr: "Les cartes révèlent une énergie lumineuse et pleine d'espoir. Vos expériences passées deviennent votre force actuelle, menant à un avenir radieux. Avancez avec confiance.",
    es: "Las cartas revelan energía brillante y esperanzadora. Tus experiencias pasadas se convierten en tu fuerza presente, conduciendo a un futuro radiante. Avanza con confianza.",
    pt: "As cartas revelam energia brilhante e esperançosa. Suas experiências passadas tornam-se sua força presente, levando a um futuro radiante. Avance com confiança.",
  },
  neutral: {
    ko: "카드들이 성찰과 균형의 시기를 암시하고 있습니다. 내면의 지혜를 믿고 신중하게 행동할 때 최선의 결과를 얻게 됩니다. 고요한 마음으로 자신의 길을 찾으세요.",
    en: "The cards suggest a time of reflection and balance. Trust your inner wisdom and act thoughtfully for the best outcomes. Find your path with a calm mind.",
    ja: "カードは省察とバランスの時期を示唆しています。内なる知恵を信じ、慎重に行動すれば最良の結果を得られるでしょう。穏やかな心で自分の道を見つけてください。",
    zh: "牌面暗示着反思与平衡的时期。相信内在的智慧，谨慎行事将获得最佳结果。以平静的心态找到自己的路。",
    de: "Die Karten deuten auf eine Zeit der Reflexion und des Gleichgewichts hin. Vertrauen Sie Ihrer inneren Weisheit und handeln Sie bedacht für die besten Ergebnisse. Finden Sie Ihren Weg mit einem ruhigen Geist.",
    fr: "Les cartes suggèrent une période de réflexion et d'équilibre. Faites confiance à votre sagesse intérieure et agissez avec réflexion pour les meilleurs résultats. Trouvez votre chemin avec un esprit calme.",
    es: "Las cartas sugieren un tiempo de reflexión y equilibrio. Confía en tu sabiduría interior y actúa con prudencia para los mejores resultados. Encuentra tu camino con una mente tranquila.",
    pt: "As cartas sugerem um tempo de reflexão e equilíbrio. Confie em sua sabedoria interior e aja com prudência para os melhores resultados. Encontre seu caminho com uma mente calma.",
  },
  challenging: {
    ko: "카드들이 변화와 성장의 시기를 보여주고 있습니다. 도전이 있지만 그 속에서 큰 깨달음과 변환의 기회가 숨어 있습니다. 두려움을 내려놓고 변화를 받아들이세요.",
    en: "The cards show a time of change and growth. There are challenges ahead, but within them lie great opportunities for enlightenment and transformation. Let go of fear and embrace the change.",
    ja: "カードは変化と成長の時期を示しています。挑戦はありますが、その中に大きな気づきと変容の機会が隠れています。恐れを手放し、変化を受け入れましょう。",
    zh: "牌面展示着变化与成长的时期。挑战在前，但其中蕴藏着巨大的觉悟和转变的机会。放下恐惧，拥抱变化。",
    de: "Die Karten zeigen eine Zeit des Wandels und Wachstums. Es gibt Herausforderungen, aber in ihnen liegen große Chancen für Erleuchtung und Transformation. Lassen Sie die Angst los und nehmen Sie den Wandel an.",
    fr: "Les cartes montrent une période de changement et de croissance. Il y a des défis, mais ils recèlent de grandes opportunités d'illumination et de transformation. Lâchez la peur et embrassez le changement.",
    es: "Las cartas muestran un tiempo de cambio y crecimiento. Hay desafíos por delante, pero dentro de ellos yacen grandes oportunidades de iluminación y transformación. Suelta el miedo y abraza el cambio.",
    pt: "As cartas mostram um tempo de mudança e crescimento. Há desafios à frente, mas dentro deles há grandes oportunidades de iluminação e transformação. Solte o medo e abrace a mudança.",
  },
  mixed: {
    ko: "카드들이 복합적인 에너지의 흐름을 보여주고 있습니다. 빛과 그림자가 공존하는 이 시기에 균형을 찾는 것이 중요합니다. 모든 경험은 당신을 더 강하고 현명하게 만들 것입니다.",
    en: "The cards reveal a complex flow of energy. In this time where light and shadow coexist, finding balance is essential. Every experience will make you stronger and wiser.",
    ja: "カードは複合的なエネルギーの流れを示しています。光と影が共存するこの時期にバランスを見つけることが重要です。すべての経験があなたをより強く、賢くするでしょう。",
    zh: "牌面展现出复杂的能量流动。在光明与阴影共存的时期，找到平衡至关重要。每一段经历都会让你变得更强大、更智慧。",
    de: "Die Karten offenbaren einen komplexen Energiefluss. In dieser Zeit, in der Licht und Schatten koexistieren, ist es wichtig, das Gleichgewicht zu finden. Jede Erfahrung wird Sie stärker und weiser machen.",
    fr: "Les cartes révèlent un flux d'énergie complexe. Dans cette période où lumière et ombre coexistent, trouver l'équilibre est essentiel. Chaque expérience vous rendra plus fort et plus sage.",
    es: "Las cartas revelan un flujo complejo de energía. En este tiempo donde la luz y la sombra coexisten, encontrar el equilibrio es esencial. Cada experiencia te hará más fuerte y más sabio.",
    pt: "As cartas revelam um fluxo complexo de energia. Neste momento onde luz e sombra coexistem, encontrar equilíbrio é essencial. Cada experiência o tornará mais forte e mais sábio.",
  },
};

/* ─── Lucky Messages ─── */

const luckyMessages: Record<Language, string[]> = {
  ko: [
    "오늘의 행운의 색은 보라색입니다. 보라색 아이템을 가까이 두세요!",
    "동쪽 방향에서 좋은 기운이 흐르고 있습니다. 동쪽을 향해 소원을 빌어보세요.",
    "오늘 저녁 별을 바라보면 영감이 찾아올 것입니다.",
    "따뜻한 차 한 잔이 당신의 직감을 깨워줄 것입니다.",
    "오늘 만나는 세 번째 사람이 행운의 메신저가 될 수 있습니다.",
    "숫자 7이 오늘 당신에게 행운을 가져다줄 것입니다.",
    "달빛 아래서 깊은 호흡을 하면 내면의 평화를 찾을 수 있습니다.",
    "금색 액세서리가 오늘 당신의 에너지를 높여줄 것입니다.",
  ],
  en: [
    "Your lucky color today is purple. Keep a purple item close to you!",
    "Good energy flows from the east. Make a wish facing east.",
    "Look at the stars tonight and inspiration will come to you.",
    "A warm cup of tea will awaken your intuition.",
    "The third person you meet today could be a lucky messenger.",
    "The number 7 will bring you luck today.",
    "Deep breathing under moonlight will help you find inner peace.",
    "A golden accessory will boost your energy today.",
  ],
  ja: [
    "今日のラッキーカラーは紫です。紫のアイテムを身近に置きましょう！",
    "東の方角から良い気が流れています。東を向いて願い事をしてみましょう。",
    "今夜星を見上げると、インスピレーションが訪れるでしょう。",
    "温かいお茶が直感を目覚めさせてくれるでしょう。",
    "今日出会う3番目の人が幸運のメッセンジャーかもしれません。",
    "数字の7が今日あなたに幸運をもたらすでしょう。",
    "月明かりの下で深呼吸をすると、内なる平和が見つかります。",
    "金色のアクセサリーが今日のエネルギーを高めてくれるでしょう。",
  ],
  zh: [
    "今天你的幸运色是紫色。随身携带紫色的物品吧！",
    "好的能量从东方流来。朝东方许个愿吧。",
    "今晚仰望星空，灵感将会降临。",
    "一杯温暖的茶将唤醒你的直觉。",
    "今天遇到的第三个人可能是幸运的使者。",
    "数字7今天会给你带来好运。",
    "在月光下深呼吸可以帮你找到内心的平静。",
    "金色的饰品今天会提升你的能量。",
  ],
  de: [
    "Ihre Glücksfarbe heute ist Lila. Halten Sie einen lila Gegenstand in Ihrer Nähe!",
    "Gute Energie fließt aus dem Osten. Sprechen Sie einen Wunsch gen Osten.",
    "Schauen Sie heute Nacht die Sterne an und Inspiration wird kommen.",
    "Eine warme Tasse Tee wird Ihre Intuition wecken.",
    "Die dritte Person, die Sie heute treffen, könnte ein Glücksbote sein.",
    "Die Zahl 7 wird Ihnen heute Glück bringen.",
    "Tiefes Atmen im Mondlicht hilft Ihnen, inneren Frieden zu finden.",
    "Ein goldenes Accessoire wird Ihre Energie heute steigern.",
  ],
  fr: [
    "Votre couleur porte-bonheur aujourd'hui est le violet. Gardez un objet violet près de vous !",
    "De la bonne énergie coule de l'est. Faites un vœu en regardant vers l'est.",
    "Regardez les étoiles ce soir et l'inspiration viendra à vous.",
    "Une tasse de thé chaud éveillera votre intuition.",
    "La troisième personne que vous rencontrez aujourd'hui pourrait être un messager de chance.",
    "Le nombre 7 vous portera chance aujourd'hui.",
    "Respirez profondément au clair de lune pour trouver la paix intérieure.",
    "Un accessoire doré boostera votre énergie aujourd'hui.",
  ],
  es: [
    "Tu color de suerte hoy es el morado. ¡Mantén un objeto morado cerca de ti!",
    "Buena energía fluye desde el este. Pide un deseo mirando hacia el este.",
    "Mira las estrellas esta noche y la inspiración vendrá a ti.",
    "Una taza de té caliente despertará tu intuición.",
    "La tercera persona que encuentres hoy podría ser un mensajero de suerte.",
    "El número 7 te traerá suerte hoy.",
    "Respirar profundo bajo la luz de la luna te ayudará a encontrar paz interior.",
    "Un accesorio dorado elevará tu energía hoy.",
  ],
  pt: [
    "Sua cor da sorte hoje é roxo. Mantenha um item roxo perto de você!",
    "Boa energia flui do leste. Faça um pedido olhando para o leste.",
    "Olhe as estrelas hoje à noite e a inspiração virá até você.",
    "Uma xícara de chá quente despertará sua intuição.",
    "A terceira pessoa que você encontrar hoje pode ser um mensageiro da sorte.",
    "O número 7 trará sorte para você hoje.",
    "Respirar profundamente sob o luar ajudará a encontrar paz interior.",
    "Um acessório dourado elevará sua energia hoje.",
  ],
};

/* ─── Helpers ─── */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSummaryKey(cards: TarotCard[]): SummaryKey {
  const pos = cards.filter((c) => POSITIVE_IDS.has(c.id)).length;
  const chal = cards.filter((c) => CHALLENGING_IDS.has(c.id)).length;
  if (pos >= 2) return "positive";
  if (chal >= 2) return "challenging";
  if (pos === 0 && chal === 0) return "neutral";
  return "mixed";
}

/* ─── Component ─── */

export default function TarotReading({ locale = "ko" }: Props) {
  const lang: Language = VALID_LANGS.includes(locale as Language)
    ? (locale as Language)
    : "ko";
  const t = ui[lang];
  const homePath = lang === "ko" ? "/" : `/${lang}`;
  const positions = [t.past, t.present, t.future];

  const [screen, setScreen] = useState<Screen>("intro");
  const [displayCards, setDisplayCards] = useState<number[]>([]);
  const [pickedPositions, setPickedPositions] = useState<number[]>([]);
  const [flippedPositions, setFlippedPositions] = useState<number[]>([]);
  const [canPick, setCanPick] = useState(true);
  const [resultVisible, setResultVisible] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<
    { left: string; top: string; size: number; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 3 + 2}s`,
      }))
    );
  }, []);

  useEffect(() => {
    if (screen === "result") {
      const timer = setTimeout(() => setResultVisible(true), 50);
      return () => clearTimeout(timer);
    }
    setResultVisible(false);
  }, [screen]);

  const startReading = useCallback(() => {
    const shuffled = shuffle(Array.from({ length: 22 }, (_, i) => i));
    setDisplayCards(shuffled.slice(0, 10));
    setPickedPositions([]);
    setFlippedPositions([]);
    setCanPick(true);
    setScreen("selecting");
  }, []);

  const handlePick = useCallback(
    (position: number) => {
      if (!canPick || flippedPositions.includes(position) || pickedPositions.length >= 3)
        return;

      setCanPick(false);
      setFlippedPositions((prev) => [...prev, position]);
      const newPicked = [...pickedPositions, position];
      setPickedPositions(newPicked);

      setTimeout(() => {
        if (newPicked.length >= 3) {
          setTimeout(() => setScreen("result"), 800);
        } else {
          setCanPick(true);
        }
      }, 700);
    },
    [canPick, flippedPositions, pickedPositions]
  );

  const pickedCards = pickedPositions.map((pos) => CARDS[displayCards[pos]]);
  const summaryText =
    pickedCards.length === 3
      ? summaryTemplates[getSummaryKey(pickedCards)][lang]
      : "";
  const luckyText =
    pickedCards.length === 3
      ? luckyMessages[lang][
          pickedCards.reduce((a, c) => a + c.id, 0) % luckyMessages[lang].length
        ]
      : "";

  const handleShare = useCallback(async () => {
    const lines = pickedCards
      .map(
        (card, i) =>
          `${positions[i]}: ${card.name[lang]} (${card.numeral}) ${card.emoji}`
      )
      .join("\n");
    const kws = pickedCards
      .map((card) => card.keywords[lang].join(", "))
      .join(" | ");
    const url = lang === "ko" ? "https://www.slox.co.kr/tarot" : `https://www.slox.co.kr/${lang}/tarot`;
    const text = `${t.shareText}\n\n${lines}\n\n${t.keywords}: ${kws}\n\n${url}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: t.shareText, text });
      } else {
        await navigator.clipboard.writeText(text);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch { /* noop */ }
    }
  }, [pickedCards, positions, lang, t]);

  const handleImageShare = useCallback(async () => {
    if (!resultRef.current) return;
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#1a0a3e",
        scale: 2,
        useCORS: true,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "tarot-result.png", { type: "image/png" });
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file] });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "tarot-result.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch { /* noop */ }
  }, []);

  const drawAgain = useCallback(() => {
    const shuffled = shuffle(Array.from({ length: 22 }, (_, i) => i));
    setDisplayCards(shuffled.slice(0, 10));
    setPickedPositions([]);
    setFlippedPositions([]);
    setCanPick(true);
    setResultVisible(false);
    setScreen("selecting");
  }, []);

  const StarField = (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration} ${s.delay} infinite`,
          }}
        />
      ))}
    </>
  );

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* ─── Intro ─── */}
      {screen === "intro" && (
        <div className="min-h-screen bg-[#1a0a3e] flex flex-col items-center justify-center relative overflow-hidden px-4">
          {StarField}
          <div className="text-center z-10 max-w-lg">
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm bg-white/[0.06] text-white/80 border border-white/[0.08]">
                {t.badge}
              </span>
            </div>
            <div className="text-6xl mb-6">🔮</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {t.title}
              <span className="text-[#FFD700]">{t.titleHL}</span>
            </h1>
            <p className="text-white/60 mb-8 text-sm sm:text-base">
              {t.subtitle}
            </p>
            <button
              onClick={startReading}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a0a3e] font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-[#FFD700]/20"
            >
              {t.start}
            </button>
          </div>
          <div className="absolute bottom-8 z-10">
            <Link
              href={homePath}
              className="text-white/30 text-sm hover:text-white/50 transition-colors"
            >
              {t.back}
            </Link>
          </div>
        </div>
      )}

      {/* ─── Selecting ─── */}
      {screen === "selecting" && (
        <div className="min-h-screen bg-[#1a0a3e] pt-8 pb-16 px-4 relative overflow-hidden">
          {StarField}
          <div className="relative z-10">
            <div className="text-center mb-8">
              <p className="text-[#FFD700] text-lg sm:text-xl font-semibold">
                {pickedPositions.length < 3
                  ? t.pick[pickedPositions.length]
                  : "✨"}
              </p>
              <p className="text-white/40 text-sm mt-1">
                {pickedPositions.length} / 3
              </p>
              <div className="flex justify-center gap-2 mt-3">
                {positions.map((pos, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs border ${
                      i < pickedPositions.length
                        ? "bg-[#FFD700]/20 border-[#FFD700]/40 text-[#FFD700]"
                        : i === pickedPositions.length
                          ? "bg-white/[0.06] border-[#FFD700]/30 text-[#FFD700]/70 animate-pulse"
                          : "bg-white/[0.03] border-white/[0.08] text-white/30"
                    }`}
                  >
                    {pos}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-xs sm:max-w-lg mx-auto">
              {displayCards.map((cardId, i) => {
                const card = CARDS[cardId];
                const isFlipped = flippedPositions.includes(i);
                const isPickable = !isFlipped && canPick && pickedPositions.length < 3;
                return (
                  <div
                    key={i}
                    className={`aspect-[2/3] ${isPickable ? "cursor-pointer" : ""} transition-transform duration-200 ${isPickable ? "hover:scale-105" : ""}`}
                    style={{ perspective: "1000px" }}
                    onClick={() => handlePick(i)}
                  >
                    <div
                      className="relative w-full h-full"
                      style={{
                        transformStyle: "preserve-3d",
                        transition: "transform 0.6s",
                        transform: isFlipped ? "rotateY(180deg)" : "",
                      }}
                    >
                      {/* Card back */}
                      <div
                        className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#2D1B69] via-[#1a0a3e] to-[#2D1B69] border border-[#FFD700]/20 flex flex-col items-center justify-center"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="text-[#FFD700]/20 text-[8px] sm:text-xs tracking-widest">
                          ✦ ✦ ✦
                        </div>
                        <div className="text-[#FFD700]/40 text-xl sm:text-3xl my-1">
                          ✦
                        </div>
                        <div className="text-[#FFD700]/20 text-[8px] sm:text-xs tracking-widest">
                          ✦ ✦ ✦
                        </div>
                      </div>
                      {/* Card face */}
                      <div
                        className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#2D1B69] to-[#1a0a3e] border border-[#FFD700]/50 flex flex-col items-center justify-center gap-0.5 p-1 sm:p-2"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <span className="text-xl sm:text-3xl">
                          {card.emoji}
                        </span>
                        <span className="text-[#FFD700] text-[10px] sm:text-xs font-bold">
                          {card.numeral}
                        </span>
                        <span className="text-white/90 text-[7px] sm:text-[10px] text-center leading-tight">
                          {card.name[lang]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => setScreen("intro")}
                className="text-white/40 text-sm hover:text-white/60 transition-colors"
              >
                {t.back}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Result ─── */}
      {screen === "result" && (
        <div className="min-h-screen bg-[#1a0a3e] pt-8 pb-16 px-4 relative overflow-hidden">
          {StarField}
          <div
            className={`max-w-2xl mx-auto relative z-10 transition-all duration-700 ${resultVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <div ref={resultRef} className="pb-4">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-8">
              🔮{" "}
              <span className="text-[#FFD700]">{t.title}</span>
              {t.titleHL}
            </h2>

            {/* Three-card summary */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
              {pickedCards.map((card, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-5 rounded-xl border border-[#FFD700]/20 bg-white/[0.03]"
                >
                  <span className="text-[#FFD700] text-[10px] sm:text-sm font-semibold uppercase tracking-wide">
                    {positions[i]}
                  </span>
                  <span className="text-3xl sm:text-5xl">{card.emoji}</span>
                  <span className="text-[#FFD700] text-xs sm:text-sm font-bold">
                    {card.numeral}
                  </span>
                  <span className="text-white text-[10px] sm:text-sm font-medium text-center leading-tight">
                    {card.name[lang]}
                  </span>
                </div>
              ))}
            </div>

            {/* Detailed card readings */}
            {pickedCards.map((card, i) => (
              <div
                key={i}
                className="mb-4 border border-white/[0.06] bg-white/[0.02] rounded-2xl p-4 sm:p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{card.emoji}</span>
                  <div>
                    <span className="text-[#FFD700] text-xs sm:text-sm font-semibold uppercase tracking-wide">
                      {positions[i]}
                    </span>
                    <h3 className="text-white font-bold text-sm sm:text-base">
                      {card.numeral} — {card.name[lang]}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {card.keywords[lang].map((kw, j) => (
                    <span
                      key={j}
                      className="rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 text-center"
                      style={{ fontSize: 12, height: 24, lineHeight: "24px", padding: "0 10px", display: "inline-block", verticalAlign: "middle" }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {card.meaning[lang]}
                </p>
              </div>
            ))}

            {/* Overall summary */}
            <div className="mb-4 border border-white/[0.06] bg-white/[0.02] rounded-2xl p-4 sm:p-6">
              <h3 className="text-[#FFD700] font-bold text-sm sm:text-base mb-2">
                ✨ {t.overallReading}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {summaryText}
              </p>
            </div>

            {/* Lucky message */}
            <div className="mb-8 border border-white/[0.06] bg-white/[0.02] rounded-2xl p-4 sm:p-6">
              <h3 className="text-[#FFD700] font-bold text-sm sm:text-base mb-2">
                🌟 {t.luckyMsg}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {luckyText}
              </p>
            </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <button
                onClick={handleShare}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white font-medium text-sm hover:bg-white/[0.1] transition-colors"
              >
                {t.share}
              </button>
              <button
                onClick={handleImageShare}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white font-medium text-sm hover:bg-white/[0.1] transition-colors"
              >
                📸 {lang === "ko" ? "이미지로 저장" : lang === "ja" ? "画像で保存" : lang === "zh" ? "保存为图片" : "Save as Image"}
              </button>
              <button
                onClick={drawAgain}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a0a3e] font-bold text-sm hover:scale-105 transition-transform"
              >
                {t.drawAgain}
              </button>
            </div>

            {/* Back */}
            <div className="text-center">
              <Link
                href={homePath}
                className="text-white/40 text-sm hover:text-white/60 transition-colors"
              >
                {t.back}
              </Link>
            </div>
          </div>

          {/* Copied toast */}
          {showCopied && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#FFD700] text-[#1a0a3e] text-sm font-semibold shadow-lg">
              {t.copied}
            </div>
          )}
        </div>
      )}
    </>
  );
}
