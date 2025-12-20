/**
 * SLOX 다국어 지원 시스템
 * 8개 언어: ko, en, ja, zh, de, fr, es, pt
 */

export type Locale = 'ko' | 'en' | 'ja' | 'zh' | 'de' | 'fr' | 'es' | 'pt';

export const locales: Locale[] = ['ko', 'en', 'ja', 'zh', 'de', 'fr', 'es', 'pt'];

export const localeNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
};

export const localeFlags: Record<Locale, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  ja: '🇯🇵',
  zh: '🇨🇳',
  de: '🇩🇪',
  fr: '🇫🇷',
  es: '🇪🇸',
  pt: '🇧🇷',
};

// 메인 페이지 번역
export const mainPageTranslations: Record<Locale, {
  nav: {
    services: string;
    pricing: string;
    portfolio: string;
    tools: string;
    event: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  banner: {
    reactionTest: { title: string; subtitle: string; cta: string };
    quiz: { title: string; subtitle: string; cta: string };
    iq: { title: string; subtitle: string; cta: string };
    sudoku: { title: string; subtitle: string; cta: string };
    fortune: { title: string; subtitle: string; cta: string };
    quote: { title: string; subtitle: string; cta: string };
    colorGame: { title: string; subtitle: string; cta: string };
    cardMatch: { title: string; subtitle: string; cta: string };
  };
  categories: {
    games: string;
    calculators: string;
    generators: string;
    fortune: string;
    viewAll: string;
  };
  hallOfFame: {
    title: string;
    subtitle: string;
    rank: string;
    noChallengers: string;
    challengeAll: string;
  };
  freeTools: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  services: {
    title: string;
    subtitle: string;
    website: { title: string; desc: string };
    app: { title: string; desc: string };
    chatbot: { title: string; desc: string };
  };
  footer: {
    tagline: string;
    services: string;
    freeTools: string;
    contact: string;
    aboutUs: string;
    privacy: string;
  };
}> = {
  ko: {
    nav: {
      services: '서비스',
      pricing: '가격',
      portfolio: '포트폴리오',
      tools: '도구',
      event: 'EVENT',
      contact: '문의하기',
    },
    hero: {
      title: '아이디어를 현실로',
      subtitle: '당신의 개발 파트너 SLOX',
      cta: '무료 상담',
    },
    banner: {
      reactionTest: { title: '반응속도 테스트', subtitle: '🎁 1등 문화상품권 5천원!', cta: '도전하기' },
      quiz: { title: '상식 퀴즈', subtitle: '당신의 상식은 몇점?', cta: '테스트하기' },
      iq: { title: 'IQ 테스트', subtitle: '나의 IQ는?', cta: '측정하기' },
      sudoku: { title: '스도쿠', subtitle: '두뇌 트레이닝', cta: '플레이하기' },
      fortune: { title: '오늘의 운세', subtitle: '오늘 하루는 어떨까?', cta: '확인하기' },
      quote: { title: '오늘의 명언', subtitle: '하루를 시작하는 한 마디', cta: '보러가기' },
      colorGame: { title: '색깔 찾기', subtitle: '눈썰미 테스트', cta: '도전하기' },
      cardMatch: { title: '카드 맞추기', subtitle: '기억력 게임', cta: '플레이하기' },
    },
    categories: {
      games: '게임',
      calculators: '계산기',
      generators: '생성기',
      fortune: '운세',
      viewAll: '전체보기',
    },
    hallOfFame: {
      title: '🏆 명예의 전당',
      subtitle: '실시간 랭킹',
      rank: '위',
      noChallengers: '아직 도전자가 없어요!',
      challengeAll: '전체 게임 도전하기',
    },
    freeTools: {
      title: '무료 도구',
      subtitle: '26종의 무료 도구를 이용해보세요',
      viewAll: '전체보기',
    },
    services: {
      title: '서비스',
      subtitle: '합리적인 비용으로 고품질 개발',
      website: { title: '홈페이지 제작', desc: '반응형 웹사이트' },
      app: { title: '앱 개발', desc: 'iOS/Android 앱' },
      chatbot: { title: 'AI 챗봇', desc: '24시간 자동 응답' },
    },
    footer: {
      tagline: '당신의 개발 파트너\n아이디어를 현실로 만들어 드립니다',
      services: '서비스',
      freeTools: '무료 도구',
      contact: '연락처',
      aboutUs: '회사소개',
      privacy: '개인정보처리방침',
    },
  },
  en: {
    nav: {
      services: 'Services',
      pricing: 'Pricing',
      portfolio: 'Portfolio',
      tools: 'Tools',
      event: 'EVENT',
      contact: 'Contact',
    },
    hero: {
      title: 'Ideas to Reality',
      subtitle: 'Your Development Partner SLOX',
      cta: 'Free Consultation',
    },
    banner: {
      reactionTest: { title: 'Reaction Test', subtitle: '🎁 Win $5 Gift Card!', cta: 'Challenge' },
      quiz: { title: 'Trivia Quiz', subtitle: 'Test Your Knowledge!', cta: 'Start Quiz' },
      iq: { title: 'IQ Test', subtitle: "What's Your IQ?", cta: 'Take Test' },
      sudoku: { title: 'Sudoku', subtitle: 'Brain Training', cta: 'Play Now' },
      fortune: { title: "Today's Fortune", subtitle: 'What awaits you today?', cta: 'Check Now' },
      quote: { title: 'Daily Quote', subtitle: 'Start your day inspired', cta: 'Get Quote' },
      colorGame: { title: 'Color Finder', subtitle: 'Test Your Eyes', cta: 'Challenge' },
      cardMatch: { title: 'Card Match', subtitle: 'Memory Game', cta: 'Play Now' },
    },
    categories: {
      games: 'Games',
      calculators: 'Calculators',
      generators: 'Generators',
      fortune: 'Fortune',
      viewAll: 'View All',
    },
    hallOfFame: {
      title: '🏆 Hall of Fame',
      subtitle: 'Live Rankings',
      rank: 'th',
      noChallengers: 'No challengers yet!',
      challengeAll: 'Challenge All Games',
    },
    freeTools: {
      title: 'Free Tools',
      subtitle: 'Try our 26 free online tools',
      viewAll: 'View All',
    },
    services: {
      title: 'Services',
      subtitle: 'High quality at reasonable prices',
      website: { title: 'Website', desc: 'Responsive websites' },
      app: { title: 'App Development', desc: 'iOS/Android apps' },
      chatbot: { title: 'AI Chatbot', desc: '24/7 auto response' },
    },
    footer: {
      tagline: 'Your Development Partner\nTurning ideas into reality',
      services: 'Services',
      freeTools: 'Free Tools',
      contact: 'Contact',
      aboutUs: 'About Us',
      privacy: 'Privacy Policy',
    },
  },
  ja: {
    nav: {
      services: 'サービス',
      pricing: '料金',
      portfolio: 'ポートフォリオ',
      tools: 'ツール',
      event: 'EVENT',
      contact: 'お問い合わせ',
    },
    hero: {
      title: 'アイデアを現実に',
      subtitle: '開発パートナー SLOX',
      cta: '無料相談',
    },
    banner: {
      reactionTest: { title: '反応速度テスト', subtitle: '🎁 1位にギフト券進呈!', cta: 'チャレンジ' },
      quiz: { title: '一般常識クイズ', subtitle: 'あなたの常識は何点?', cta: 'テスト開始' },
      iq: { title: 'IQテスト', subtitle: 'あなたのIQは?', cta: '測定する' },
      sudoku: { title: '数独', subtitle: '脳トレーニング', cta: 'プレイ' },
      fortune: { title: '今日の運勢', subtitle: '今日はどんな日?', cta: 'チェック' },
      quote: { title: '今日の名言', subtitle: '一日の始まりに', cta: '見る' },
      colorGame: { title: '色探しゲーム', subtitle: '目のテスト', cta: 'チャレンジ' },
      cardMatch: { title: 'カードマッチ', subtitle: '記憶力ゲーム', cta: 'プレイ' },
    },
    categories: {
      games: 'ゲーム',
      calculators: '計算機',
      generators: '生成器',
      fortune: '占い',
      viewAll: 'すべて見る',
    },
    hallOfFame: {
      title: '🏆 殿堂入り',
      subtitle: 'リアルタイムランキング',
      rank: '位',
      noChallengers: 'まだ挑戦者がいません!',
      challengeAll: '全ゲームに挑戦',
    },
    freeTools: {
      title: '無料ツール',
      subtitle: '26種類の無料ツール',
      viewAll: 'すべて見る',
    },
    services: {
      title: 'サービス',
      subtitle: 'リーズナブルな価格で高品質',
      website: { title: 'ウェブサイト制作', desc: 'レスポンシブサイト' },
      app: { title: 'アプリ開発', desc: 'iOS/Androidアプリ' },
      chatbot: { title: 'AIチャットボット', desc: '24時間自動応答' },
    },
    footer: {
      tagline: '開発パートナー\nアイデアを現実に',
      services: 'サービス',
      freeTools: '無料ツール',
      contact: '連絡先',
      aboutUs: '会社紹介',
      privacy: 'プライバシーポリシー',
    },
  },
  zh: {
    nav: {
      services: '服务',
      pricing: '价格',
      portfolio: '作品集',
      tools: '工具',
      event: '活动',
      contact: '联系',
    },
    hero: {
      title: '将想法变为现实',
      subtitle: '您的开发伙伴 SLOX',
      cta: '免费咨询',
    },
    banner: {
      reactionTest: { title: '反应速度测试', subtitle: '🎁 第一名赢礼品卡!', cta: '挑战' },
      quiz: { title: '常识问答', subtitle: '测试你的知识!', cta: '开始测试' },
      iq: { title: 'IQ测试', subtitle: '你的IQ是多少?', cta: '开始测试' },
      sudoku: { title: '数独', subtitle: '大脑训练', cta: '开始玩' },
      fortune: { title: '今日运势', subtitle: '今天会怎样?', cta: '查看' },
      quote: { title: '每日名言', subtitle: '开启美好的一天', cta: '查看' },
      colorGame: { title: '找颜色', subtitle: '眼力测试', cta: '挑战' },
      cardMatch: { title: '卡片配对', subtitle: '记忆游戏', cta: '开始玩' },
    },
    categories: {
      games: '游戏',
      calculators: '计算器',
      generators: '生成器',
      fortune: '运势',
      viewAll: '查看全部',
    },
    hallOfFame: {
      title: '🏆 名人堂',
      subtitle: '实时排名',
      rank: '名',
      noChallengers: '还没有挑战者!',
      challengeAll: '挑战所有游戏',
    },
    freeTools: {
      title: '免费工具',
      subtitle: '26种免费在线工具',
      viewAll: '查看全部',
    },
    services: {
      title: '服务',
      subtitle: '高性价比的优质开发',
      website: { title: '网站制作', desc: '响应式网站' },
      app: { title: '应用开发', desc: 'iOS/Android应用' },
      chatbot: { title: 'AI聊天机器人', desc: '24小时自动回复' },
    },
    footer: {
      tagline: '您的开发伙伴\n将想法变为现实',
      services: '服务',
      freeTools: '免费工具',
      contact: '联系方式',
      aboutUs: '关于我们',
      privacy: '隐私政策',
    },
  },
  de: {
    nav: {
      services: 'Dienste',
      pricing: 'Preise',
      portfolio: 'Portfolio',
      tools: 'Tools',
      event: 'EVENT',
      contact: 'Kontakt',
    },
    hero: {
      title: 'Ideen Werden Wirklichkeit',
      subtitle: 'Ihr Entwicklungspartner SLOX',
      cta: 'Kostenlose Beratung',
    },
    banner: {
      reactionTest: { title: 'Reaktionstest', subtitle: '🎁 Gewinne einen Gutschein!', cta: 'Herausforderung' },
      quiz: { title: 'Wissensquiz', subtitle: 'Teste dein Wissen!', cta: 'Quiz starten' },
      iq: { title: 'IQ-Test', subtitle: 'Wie hoch ist dein IQ?', cta: 'Test starten' },
      sudoku: { title: 'Sudoku', subtitle: 'Gehirntraining', cta: 'Spielen' },
      fortune: { title: 'Tageshoroskop', subtitle: 'Was erwartet dich heute?', cta: 'Prüfen' },
      quote: { title: 'Zitat des Tages', subtitle: 'Starte inspiriert', cta: 'Ansehen' },
      colorGame: { title: 'Farbe finden', subtitle: 'Augentest', cta: 'Herausforderung' },
      cardMatch: { title: 'Karten-Memory', subtitle: 'Gedächtnisspiel', cta: 'Spielen' },
    },
    categories: {
      games: 'Spiele',
      calculators: 'Rechner',
      generators: 'Generatoren',
      fortune: 'Horoskop',
      viewAll: 'Alle anzeigen',
    },
    hallOfFame: {
      title: '🏆 Hall of Fame',
      subtitle: 'Live-Rangliste',
      rank: '.',
      noChallengers: 'Noch keine Herausforderer!',
      challengeAll: 'Alle Spiele herausfordern',
    },
    freeTools: {
      title: 'Kostenlose Tools',
      subtitle: '26 kostenlose Online-Tools',
      viewAll: 'Alle anzeigen',
    },
    services: {
      title: 'Dienste',
      subtitle: 'Hohe Qualität zu fairen Preisen',
      website: { title: 'Webseiten', desc: 'Responsive Webseiten' },
      app: { title: 'App-Entwicklung', desc: 'iOS/Android Apps' },
      chatbot: { title: 'KI-Chatbot', desc: '24/7 Auto-Antwort' },
    },
    footer: {
      tagline: 'Ihr Entwicklungspartner\nIdeen werden Wirklichkeit',
      services: 'Dienste',
      freeTools: 'Kostenlose Tools',
      contact: 'Kontakt',
      aboutUs: 'Über uns',
      privacy: 'Datenschutz',
    },
  },
  fr: {
    nav: {
      services: 'Services',
      pricing: 'Tarifs',
      portfolio: 'Portfolio',
      tools: 'Outils',
      event: 'ÉVÉNEMENT',
      contact: 'Contact',
    },
    hero: {
      title: 'Vos Idées Deviennent Réalité',
      subtitle: 'Votre Partenaire SLOX',
      cta: 'Consultation Gratuite',
    },
    banner: {
      reactionTest: { title: 'Test de Réaction', subtitle: '🎁 Gagnez une carte cadeau!', cta: 'Défi' },
      quiz: { title: 'Quiz Culture', subtitle: 'Testez vos connaissances!', cta: 'Commencer' },
      iq: { title: 'Test de QI', subtitle: 'Quel est votre QI?', cta: 'Tester' },
      sudoku: { title: 'Sudoku', subtitle: 'Entraînement cérébral', cta: 'Jouer' },
      fortune: { title: 'Horoscope du Jour', subtitle: "Que vous réserve aujourd'hui?", cta: 'Vérifier' },
      quote: { title: 'Citation du Jour', subtitle: 'Commencez inspiré', cta: 'Voir' },
      colorGame: { title: 'Trouver la Couleur', subtitle: 'Test visuel', cta: 'Défi' },
      cardMatch: { title: 'Memory', subtitle: 'Jeu de mémoire', cta: 'Jouer' },
    },
    categories: {
      games: 'Jeux',
      calculators: 'Calculateurs',
      generators: 'Générateurs',
      fortune: 'Horoscope',
      viewAll: 'Voir tout',
    },
    hallOfFame: {
      title: '🏆 Hall of Fame',
      subtitle: 'Classement en direct',
      rank: 'e',
      noChallengers: 'Pas encore de challengers!',
      challengeAll: 'Défier tous les jeux',
    },
    freeTools: {
      title: 'Outils Gratuits',
      subtitle: '26 outils en ligne gratuits',
      viewAll: 'Voir tout',
    },
    services: {
      title: 'Services',
      subtitle: 'Haute qualité à prix raisonnable',
      website: { title: 'Sites Web', desc: 'Sites responsives' },
      app: { title: 'Applications', desc: 'Apps iOS/Android' },
      chatbot: { title: 'Chatbot IA', desc: 'Réponse auto 24/7' },
    },
    footer: {
      tagline: 'Votre Partenaire\nVos idées deviennent réalité',
      services: 'Services',
      freeTools: 'Outils Gratuits',
      contact: 'Contact',
      aboutUs: 'À propos',
      privacy: 'Confidentialité',
    },
  },
  es: {
    nav: {
      services: 'Servicios',
      pricing: 'Precios',
      portfolio: 'Portafolio',
      tools: 'Herramientas',
      event: 'EVENTO',
      contact: 'Contacto',
    },
    hero: {
      title: 'Ideas Hechas Realidad',
      subtitle: 'Tu Socio de Desarrollo SLOX',
      cta: 'Consulta Gratis',
    },
    banner: {
      reactionTest: { title: 'Test de Reacción', subtitle: '🎁 ¡Gana una tarjeta regalo!', cta: 'Desafío' },
      quiz: { title: 'Quiz de Cultura', subtitle: '¡Pon a prueba tus conocimientos!', cta: 'Comenzar' },
      iq: { title: 'Test de IQ', subtitle: '¿Cuál es tu IQ?', cta: 'Probar' },
      sudoku: { title: 'Sudoku', subtitle: 'Entrenamiento cerebral', cta: 'Jugar' },
      fortune: { title: 'Horóscopo del Día', subtitle: '¿Qué te espera hoy?', cta: 'Ver' },
      quote: { title: 'Frase del Día', subtitle: 'Empieza inspirado', cta: 'Ver' },
      colorGame: { title: 'Busca el Color', subtitle: 'Test visual', cta: 'Desafío' },
      cardMatch: { title: 'Memoria', subtitle: 'Juego de memoria', cta: 'Jugar' },
    },
    categories: {
      games: 'Juegos',
      calculators: 'Calculadoras',
      generators: 'Generadores',
      fortune: 'Horóscopo',
      viewAll: 'Ver todo',
    },
    hallOfFame: {
      title: '🏆 Salón de la Fama',
      subtitle: 'Ranking en vivo',
      rank: 'º',
      noChallengers: '¡Aún no hay retadores!',
      challengeAll: 'Desafiar todos los juegos',
    },
    freeTools: {
      title: 'Herramientas Gratis',
      subtitle: '26 herramientas online gratis',
      viewAll: 'Ver todo',
    },
    services: {
      title: 'Servicios',
      subtitle: 'Alta calidad a precios razonables',
      website: { title: 'Sitios Web', desc: 'Webs responsivas' },
      app: { title: 'Apps', desc: 'Apps iOS/Android' },
      chatbot: { title: 'Chatbot IA', desc: 'Respuesta auto 24/7' },
    },
    footer: {
      tagline: 'Tu Socio de Desarrollo\nHacemos tus ideas realidad',
      services: 'Servicios',
      freeTools: 'Herramientas Gratis',
      contact: 'Contacto',
      aboutUs: 'Nosotros',
      privacy: 'Privacidad',
    },
  },
  pt: {
    nav: {
      services: 'Serviços',
      pricing: 'Preços',
      portfolio: 'Portfólio',
      tools: 'Ferramentas',
      event: 'EVENTO',
      contact: 'Contato',
    },
    hero: {
      title: 'Ideias se Tornam Realidade',
      subtitle: 'Seu Parceiro de Desenvolvimento SLOX',
      cta: 'Consulta Grátis',
    },
    banner: {
      reactionTest: { title: 'Teste de Reação', subtitle: '🎁 Ganhe um vale-presente!', cta: 'Desafio' },
      quiz: { title: 'Quiz de Conhecimentos', subtitle: 'Teste seus conhecimentos!', cta: 'Começar' },
      iq: { title: 'Teste de QI', subtitle: 'Qual é seu QI?', cta: 'Testar' },
      sudoku: { title: 'Sudoku', subtitle: 'Treino cerebral', cta: 'Jogar' },
      fortune: { title: 'Horóscopo do Dia', subtitle: 'O que te espera hoje?', cta: 'Ver' },
      quote: { title: 'Frase do Dia', subtitle: 'Comece inspirado', cta: 'Ver' },
      colorGame: { title: 'Encontre a Cor', subtitle: 'Teste visual', cta: 'Desafio' },
      cardMatch: { title: 'Memória', subtitle: 'Jogo de memória', cta: 'Jogar' },
    },
    categories: {
      games: 'Jogos',
      calculators: 'Calculadoras',
      generators: 'Geradores',
      fortune: 'Horóscopo',
      viewAll: 'Ver tudo',
    },
    hallOfFame: {
      title: '🏆 Hall da Fama',
      subtitle: 'Ranking ao vivo',
      rank: 'º',
      noChallengers: 'Ainda sem desafiantes!',
      challengeAll: 'Desafiar todos os jogos',
    },
    freeTools: {
      title: 'Ferramentas Grátis',
      subtitle: '26 ferramentas online grátis',
      viewAll: 'Ver tudo',
    },
    services: {
      title: 'Serviços',
      subtitle: 'Alta qualidade a preços justos',
      website: { title: 'Sites', desc: 'Sites responsivos' },
      app: { title: 'Apps', desc: 'Apps iOS/Android' },
      chatbot: { title: 'Chatbot IA', desc: 'Resposta auto 24/7' },
    },
    footer: {
      tagline: 'Seu Parceiro de Desenvolvimento\nTransformamos ideias em realidade',
      services: 'Serviços',
      freeTools: 'Ferramentas Grátis',
      contact: 'Contato',
      aboutUs: 'Sobre Nós',
      privacy: 'Privacidade',
    },
  },
};

// 게임별 번역
export const gameTranslations: Record<Locale, {
  iq: {
    title: string;
    subtitle: string;
    start: string;
    question: string;
    timeLeft: string;
    result: string;
    score: string;
    correct: string;
    rank: string;
    registerRank: string;
    share: string;
    tryAgain: string;
    grades: { genius: string; gifted: string; superior: string; bright: string; average: string; belowAvg: string };
  };
  quiz: {
    title: string;
    subtitle: string;
    start: string;
    question: string;
    timeLeft: string;
    correct: string;
    wrong: string;
    result: string;
    score: string;
    rank: string;
    registerRank: string;
    share: string;
    tryAgain: string;
  };
  sudoku: {
    title: string;
    subtitle: string;
    easy: string;
    medium: string;
    hard: string;
    mistakes: string;
    time: string;
    newGame: string;
    complete: string;
    rank: string;
  };
  common: {
    nickname: string;
    submit: string;
    cancel: string;
    close: string;
    copied: string;
    shareWithFriends: string;
    imageShare: string;
    later: string;
    newRecord: string;
    currentRank: string;
    vs: string;
    myRecord: string;
  };
}> = {
  ko: {
    iq: {
      title: 'IQ 테스트',
      subtitle: '12문제로 측정하는 나의 IQ',
      start: '테스트 시작',
      question: '문제',
      timeLeft: '남은 시간',
      result: '결과',
      score: '점',
      correct: '정답',
      rank: '순위',
      registerRank: '랭킹 등록하기',
      share: '공유하기',
      tryAgain: '다시 하기',
      grades: { genius: '천재', gifted: '수재', superior: '우수', bright: '영리', average: '보통', belowAvg: '노력형' },
    },
    quiz: {
      title: '상식 퀴즈',
      subtitle: '10문제로 측정하는 나의 상식',
      start: '퀴즈 시작',
      question: '문제',
      timeLeft: '남은 시간',
      correct: '정답!',
      wrong: '오답!',
      result: '결과',
      score: '점',
      rank: '순위',
      registerRank: '랭킹 등록하기',
      share: '공유하기',
      tryAgain: '다시 하기',
    },
    sudoku: {
      title: '스도쿠',
      subtitle: '두뇌 트레이닝 퍼즐',
      easy: '쉬움',
      medium: '보통',
      hard: '어려움',
      mistakes: '실수',
      time: '시간',
      newGame: '새 게임',
      complete: '완료!',
      rank: '순위',
    },
    common: {
      nickname: '닉네임',
      submit: '등록',
      cancel: '취소',
      close: '닫기',
      copied: '복사됨!',
      shareWithFriends: '친구에게 공유하기',
      imageShare: '이미지 공유',
      later: '나중에 할게요',
      newRecord: '새로운 1등!',
      currentRank: '현재 1위',
      vs: 'vs',
      myRecord: '내 기록',
    },
  },
  en: {
    iq: {
      title: 'IQ Test',
      subtitle: 'Measure your IQ with 12 questions',
      start: 'Start Test',
      question: 'Question',
      timeLeft: 'Time Left',
      result: 'Result',
      score: 'pts',
      correct: 'Correct',
      rank: 'Rank',
      registerRank: 'Register Rank',
      share: 'Share',
      tryAgain: 'Try Again',
      grades: { genius: 'Genius', gifted: 'Gifted', superior: 'Superior', bright: 'Bright', average: 'Average', belowAvg: 'Below Avg' },
    },
    quiz: {
      title: 'Trivia Quiz',
      subtitle: 'Test your knowledge with 10 questions',
      start: 'Start Quiz',
      question: 'Question',
      timeLeft: 'Time Left',
      correct: 'Correct!',
      wrong: 'Wrong!',
      result: 'Result',
      score: 'pts',
      rank: 'Rank',
      registerRank: 'Register Rank',
      share: 'Share',
      tryAgain: 'Try Again',
    },
    sudoku: {
      title: 'Sudoku',
      subtitle: 'Brain Training Puzzle',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      mistakes: 'Mistakes',
      time: 'Time',
      newGame: 'New Game',
      complete: 'Complete!',
      rank: 'Rank',
    },
    common: {
      nickname: 'Nickname',
      submit: 'Submit',
      cancel: 'Cancel',
      close: 'Close',
      copied: 'Copied!',
      shareWithFriends: 'Share with Friends',
      imageShare: 'Image Share',
      later: 'Maybe Later',
      newRecord: 'New #1!',
      currentRank: 'Current #1',
      vs: 'vs',
      myRecord: 'My Record',
    },
  },
  ja: {
    iq: {
      title: 'IQテスト',
      subtitle: '12問であなたのIQを測定',
      start: 'テスト開始',
      question: '問題',
      timeLeft: '残り時間',
      result: '結果',
      score: '点',
      correct: '正解',
      rank: '順位',
      registerRank: 'ランキング登録',
      share: '共有',
      tryAgain: 'もう一度',
      grades: { genius: '天才', gifted: '秀才', superior: '優秀', bright: '聡明', average: '平均', belowAvg: '努力型' },
    },
    quiz: {
      title: '一般常識クイズ',
      subtitle: '10問で常識力をチェック',
      start: 'クイズ開始',
      question: '問題',
      timeLeft: '残り時間',
      correct: '正解!',
      wrong: '不正解!',
      result: '結果',
      score: '点',
      rank: '順位',
      registerRank: 'ランキング登録',
      share: '共有',
      tryAgain: 'もう一度',
    },
    sudoku: {
      title: '数独',
      subtitle: '脳トレパズル',
      easy: '簡単',
      medium: '普通',
      hard: '難しい',
      mistakes: 'ミス',
      time: '時間',
      newGame: '新しいゲーム',
      complete: '完了!',
      rank: '順位',
    },
    common: {
      nickname: 'ニックネーム',
      submit: '登録',
      cancel: 'キャンセル',
      close: '閉じる',
      copied: 'コピー!',
      shareWithFriends: '友達にシェア',
      imageShare: '画像を共有',
      later: 'あとで',
      newRecord: '新記録1位!',
      currentRank: '現在1位',
      vs: 'vs',
      myRecord: '私の記録',
    },
  },
  zh: {
    iq: {
      title: 'IQ测试',
      subtitle: '12道题测量你的智商',
      start: '开始测试',
      question: '问题',
      timeLeft: '剩余时间',
      result: '结果',
      score: '分',
      correct: '正确',
      rank: '排名',
      registerRank: '登记排名',
      share: '分享',
      tryAgain: '再试一次',
      grades: { genius: '天才', gifted: '人才', superior: '优秀', bright: '聪明', average: '普通', belowAvg: '努力型' },
    },
    quiz: {
      title: '常识问答',
      subtitle: '10道题测试你的知识',
      start: '开始测试',
      question: '问题',
      timeLeft: '剩余时间',
      correct: '正确!',
      wrong: '错误!',
      result: '结果',
      score: '分',
      rank: '排名',
      registerRank: '登记排名',
      share: '分享',
      tryAgain: '再试一次',
    },
    sudoku: {
      title: '数独',
      subtitle: '大脑训练拼图',
      easy: '简单',
      medium: '中等',
      hard: '困难',
      mistakes: '错误',
      time: '时间',
      newGame: '新游戏',
      complete: '完成!',
      rank: '排名',
    },
    common: {
      nickname: '昵称',
      submit: '提交',
      cancel: '取消',
      close: '关闭',
      copied: '已复制!',
      shareWithFriends: '分享给朋友',
      imageShare: '图片分享',
      later: '以后再说',
      newRecord: '新第一!',
      currentRank: '当前第一',
      vs: 'vs',
      myRecord: '我的记录',
    },
  },
  de: {
    iq: {
      title: 'IQ-Test',
      subtitle: 'Miss deinen IQ mit 12 Fragen',
      start: 'Test starten',
      question: 'Frage',
      timeLeft: 'Verbleibende Zeit',
      result: 'Ergebnis',
      score: 'Pkt',
      correct: 'Richtig',
      rank: 'Rang',
      registerRank: 'Rang registrieren',
      share: 'Teilen',
      tryAgain: 'Nochmal',
      grades: { genius: 'Genie', gifted: 'Begabt', superior: 'Überlegen', bright: 'Klug', average: 'Durchschnitt', belowAvg: 'Unter Durchschnitt' },
    },
    quiz: {
      title: 'Wissensquiz',
      subtitle: 'Teste dein Wissen mit 10 Fragen',
      start: 'Quiz starten',
      question: 'Frage',
      timeLeft: 'Verbleibende Zeit',
      correct: 'Richtig!',
      wrong: 'Falsch!',
      result: 'Ergebnis',
      score: 'Pkt',
      rank: 'Rang',
      registerRank: 'Rang registrieren',
      share: 'Teilen',
      tryAgain: 'Nochmal',
    },
    sudoku: {
      title: 'Sudoku',
      subtitle: 'Gehirntraining-Puzzle',
      easy: 'Einfach',
      medium: 'Mittel',
      hard: 'Schwer',
      mistakes: 'Fehler',
      time: 'Zeit',
      newGame: 'Neues Spiel',
      complete: 'Fertig!',
      rank: 'Rang',
    },
    common: {
      nickname: 'Nickname',
      submit: 'Senden',
      cancel: 'Abbrechen',
      close: 'Schließen',
      copied: 'Kopiert!',
      shareWithFriends: 'Mit Freunden teilen',
      imageShare: 'Bild teilen',
      later: 'Später',
      newRecord: 'Neue #1!',
      currentRank: 'Aktuelle #1',
      vs: 'vs',
      myRecord: 'Mein Rekord',
    },
  },
  fr: {
    iq: {
      title: 'Test de QI',
      subtitle: 'Mesurez votre QI en 12 questions',
      start: 'Commencer',
      question: 'Question',
      timeLeft: 'Temps restant',
      result: 'Résultat',
      score: 'pts',
      correct: 'Correct',
      rank: 'Rang',
      registerRank: 'Enregistrer',
      share: 'Partager',
      tryAgain: 'Réessayer',
      grades: { genius: 'Génie', gifted: 'Doué', superior: 'Supérieur', bright: 'Brillant', average: 'Moyen', belowAvg: 'Sous la moyenne' },
    },
    quiz: {
      title: 'Quiz Culture',
      subtitle: 'Testez vos connaissances en 10 questions',
      start: 'Commencer',
      question: 'Question',
      timeLeft: 'Temps restant',
      correct: 'Correct!',
      wrong: 'Faux!',
      result: 'Résultat',
      score: 'pts',
      rank: 'Rang',
      registerRank: 'Enregistrer',
      share: 'Partager',
      tryAgain: 'Réessayer',
    },
    sudoku: {
      title: 'Sudoku',
      subtitle: 'Puzzle cérébral',
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile',
      mistakes: 'Erreurs',
      time: 'Temps',
      newGame: 'Nouveau jeu',
      complete: 'Terminé!',
      rank: 'Rang',
    },
    common: {
      nickname: 'Pseudo',
      submit: 'Envoyer',
      cancel: 'Annuler',
      close: 'Fermer',
      copied: 'Copié!',
      shareWithFriends: 'Partager avec des amis',
      imageShare: 'Partager image',
      later: 'Plus tard',
      newRecord: 'Nouveau #1!',
      currentRank: '#1 actuel',
      vs: 'vs',
      myRecord: 'Mon record',
    },
  },
  es: {
    iq: {
      title: 'Test de IQ',
      subtitle: 'Mide tu IQ con 12 preguntas',
      start: 'Empezar',
      question: 'Pregunta',
      timeLeft: 'Tiempo restante',
      result: 'Resultado',
      score: 'pts',
      correct: 'Correcto',
      rank: 'Rango',
      registerRank: 'Registrar',
      share: 'Compartir',
      tryAgain: 'Reintentar',
      grades: { genius: 'Genio', gifted: 'Dotado', superior: 'Superior', bright: 'Brillante', average: 'Promedio', belowAvg: 'Bajo promedio' },
    },
    quiz: {
      title: 'Quiz de Cultura',
      subtitle: 'Pon a prueba tus conocimientos',
      start: 'Empezar',
      question: 'Pregunta',
      timeLeft: 'Tiempo restante',
      correct: '¡Correcto!',
      wrong: '¡Incorrecto!',
      result: 'Resultado',
      score: 'pts',
      rank: 'Rango',
      registerRank: 'Registrar',
      share: 'Compartir',
      tryAgain: 'Reintentar',
    },
    sudoku: {
      title: 'Sudoku',
      subtitle: 'Puzzle para el cerebro',
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
      mistakes: 'Errores',
      time: 'Tiempo',
      newGame: 'Nuevo juego',
      complete: '¡Completado!',
      rank: 'Rango',
    },
    common: {
      nickname: 'Apodo',
      submit: 'Enviar',
      cancel: 'Cancelar',
      close: 'Cerrar',
      copied: '¡Copiado!',
      shareWithFriends: 'Compartir con amigos',
      imageShare: 'Compartir imagen',
      later: 'Más tarde',
      newRecord: '¡Nuevo #1!',
      currentRank: '#1 actual',
      vs: 'vs',
      myRecord: 'Mi récord',
    },
  },
  pt: {
    iq: {
      title: 'Teste de QI',
      subtitle: 'Meça seu QI com 12 perguntas',
      start: 'Começar',
      question: 'Pergunta',
      timeLeft: 'Tempo restante',
      result: 'Resultado',
      score: 'pts',
      correct: 'Correto',
      rank: 'Posição',
      registerRank: 'Registrar',
      share: 'Compartilhar',
      tryAgain: 'Tentar novamente',
      grades: { genius: 'Gênio', gifted: 'Dotado', superior: 'Superior', bright: 'Brilhante', average: 'Médio', belowAvg: 'Abaixo da média' },
    },
    quiz: {
      title: 'Quiz de Conhecimentos',
      subtitle: 'Teste seus conhecimentos em 10 perguntas',
      start: 'Começar',
      question: 'Pergunta',
      timeLeft: 'Tempo restante',
      correct: 'Correto!',
      wrong: 'Errado!',
      result: 'Resultado',
      score: 'pts',
      rank: 'Posição',
      registerRank: 'Registrar',
      share: 'Compartilhar',
      tryAgain: 'Tentar novamente',
    },
    sudoku: {
      title: 'Sudoku',
      subtitle: 'Puzzle de treinamento cerebral',
      easy: 'Fácil',
      medium: 'Médio',
      hard: 'Difícil',
      mistakes: 'Erros',
      time: 'Tempo',
      newGame: 'Novo jogo',
      complete: 'Completo!',
      rank: 'Posição',
    },
    common: {
      nickname: 'Apelido',
      submit: 'Enviar',
      cancel: 'Cancelar',
      close: 'Fechar',
      copied: 'Copiado!',
      shareWithFriends: 'Compartilhar com amigos',
      imageShare: 'Compartilhar imagem',
      later: 'Mais tarde',
      newRecord: 'Novo #1!',
      currentRank: '#1 atual',
      vs: 'vs',
      myRecord: 'Meu recorde',
    },
  },
};

// 네비게이션 번역
export const navTranslations: Record<Locale, {
  notice: string;
  tools: string;
  language: string;
  login: string;
  logout: string;
  myProfile: string;
  liveRanking: string;
  rank: string;
  points: string;
}> = {
  ko: {
    notice: '공지',
    tools: '도구',
    language: '한국어',
    login: '로그인',
    logout: '로그아웃',
    myProfile: '내 정보',
    liveRanking: '실시간 랭킹',
    rank: '위',
    points: '점',
  },
  en: {
    notice: 'Notice',
    tools: 'Tools',
    language: 'English',
    login: 'Login',
    logout: 'Logout',
    myProfile: 'Profile',
    liveRanking: 'Live Ranking',
    rank: 'th',
    points: 'pts',
  },
  ja: {
    notice: 'お知らせ',
    tools: 'ツール',
    language: '日本語',
    login: 'ログイン',
    logout: 'ログアウト',
    myProfile: 'マイページ',
    liveRanking: 'リアルタイムランキング',
    rank: '位',
    points: '点',
  },
  zh: {
    notice: '公告',
    tools: '工具',
    language: '中文',
    login: '登录',
    logout: '退出',
    myProfile: '我的资料',
    liveRanking: '实时排名',
    rank: '名',
    points: '分',
  },
  de: {
    notice: 'Hinweis',
    tools: 'Tools',
    language: 'Deutsch',
    login: 'Anmelden',
    logout: 'Abmelden',
    myProfile: 'Mein Profil',
    liveRanking: 'Live-Rangliste',
    rank: '.',
    points: 'Pkt',
  },
  fr: {
    notice: 'Annonces',
    tools: 'Outils',
    language: 'Français',
    login: 'Connexion',
    logout: 'Déconnexion',
    myProfile: 'Mon profil',
    liveRanking: 'Classement Live',
    rank: 'e',
    points: 'pts',
  },
  es: {
    notice: 'Avisos',
    tools: 'Herramientas',
    language: 'Español',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    myProfile: 'Mi perfil',
    liveRanking: 'Ranking en vivo',
    rank: 'º',
    points: 'pts',
  },
  pt: {
    notice: 'Avisos',
    tools: 'Ferramentas',
    language: 'Português',
    login: 'Entrar',
    logout: 'Sair',
    myProfile: 'Meu perfil',
    liveRanking: 'Ranking ao vivo',
    rank: 'º',
    points: 'pts',
  },
};

// 실시간 랭킹 번역
export const liveRankingTranslations: Record<Locale, {
  title: string;
  subtitle: string;
  loading: string;
  noMembers: string;
  firstPlace: string;
  champion: string;
  prizeInfo: string;
  battleInfo: string;
  prizeWinner: string;
  attendance: string;
  days: string;
  top: string;
  viewAll: string;
  viewTop10: string;
  members: string;
  joinCta: string;
  joinDesc: string;
  joinButton: string;
  retry: string;
  errorTitle: string;
  errorDesc: string;
}> = {
  ko: {
    title: '회원 실시간 랭킹',
    subtitle: '출석 + 게임점수 종합 랭킹',
    loading: '랭킹 데이터를 불러오는 중...',
    noMembers: '아직 랭킹에 등록된 회원이 없습니다',
    firstPlace: '1등',
    champion: 'CHAMPION',
    prizeInfo: '매달 종합 1위에게 문화상품권 5,000원 메일 발송!',
    battleInfo: '친구와 배틀! 이기면 상대 점수 5% 강탈!',
    prizeWinner: '상품권 유력',
    attendance: '출석',
    days: '일',
    top: '상위',
    viewAll: '100위까지 전체 보기',
    viewTop10: 'TOP 10만 보기',
    members: '명',
    joinCta: '나도 랭킹에 도전하고 싶다면?',
    joinDesc: '로그인 후 출석체크 + 게임 도전으로 점수를 모아보세요!',
    joinButton: '참여하기',
    retry: '다시 시도',
    errorTitle: '랭킹을 불러오지 못했어요',
    errorDesc: '네트워크 연결을 확인하고 다시 시도해주세요',
  },
  en: {
    title: 'Member Live Ranking',
    subtitle: 'Attendance + Game Score Combined',
    loading: 'Loading rankings...',
    noMembers: 'No members registered yet',
    firstPlace: '#1',
    champion: 'CHAMPION',
    prizeInfo: '$5 gift card for monthly #1!',
    battleInfo: 'Battle friends! Winner steals 5% score!',
    prizeWinner: 'Prize Likely',
    attendance: 'Attendance',
    days: 'days',
    top: 'Top',
    viewAll: 'View all 100',
    viewTop10: 'View Top 10 only',
    members: 'members',
    joinCta: 'Want to join the ranking?',
    joinDesc: 'Login, check-in daily, and challenge games to earn points!',
    joinButton: 'Join Now',
    retry: 'Retry',
    errorTitle: 'Failed to load rankings',
    errorDesc: 'Please check your connection and try again',
  },
  ja: {
    title: '会員リアルタイムランキング',
    subtitle: '出席 + ゲームスコア総合',
    loading: 'ランキングを読み込み中...',
    noMembers: 'まだ登録されたメンバーがいません',
    firstPlace: '1位',
    champion: 'チャンピオン',
    prizeInfo: '毎月1位に5,000円ギフト券プレゼント!',
    battleInfo: '友達とバトル!勝てば相手の5%を獲得!',
    prizeWinner: '賞品有力',
    attendance: '出席',
    days: '日',
    top: '上位',
    viewAll: '100位まで全て見る',
    viewTop10: 'TOP 10のみ表示',
    members: '名',
    joinCta: 'ランキングに挑戦したい?',
    joinDesc: 'ログインして出席チェック + ゲームに挑戦してポイントを貯めよう!',
    joinButton: '参加する',
    retry: '再試行',
    errorTitle: 'ランキングを読み込めませんでした',
    errorDesc: '接続を確認してもう一度お試しください',
  },
  zh: {
    title: '会员实时排名',
    subtitle: '出勤 + 游戏积分综合',
    loading: '正在加载排名...',
    noMembers: '还没有注册会员',
    firstPlace: '第1名',
    champion: '冠军',
    prizeInfo: '每月第一名获赠5美元礼品卡!',
    battleInfo: '和朋友对战!赢家抢夺5%积分!',
    prizeWinner: '奖品有力',
    attendance: '出勤',
    days: '天',
    top: '前',
    viewAll: '查看全部100名',
    viewTop10: '只看前10名',
    members: '人',
    joinCta: '想加入排名吗?',
    joinDesc: '登录后每日签到 + 挑战游戏赚取积分!',
    joinButton: '立即参与',
    retry: '重试',
    errorTitle: '无法加载排名',
    errorDesc: '请检查网络连接后重试',
  },
  de: {
    title: 'Mitglieder Live-Rangliste',
    subtitle: 'Anwesenheit + Spielpunkte Gesamt',
    loading: 'Rangliste wird geladen...',
    noMembers: 'Noch keine Mitglieder registriert',
    firstPlace: '#1',
    champion: 'CHAMPION',
    prizeInfo: '5€ Gutschein für monatlichen #1!',
    battleInfo: 'Kämpfe mit Freunden! Gewinner stiehlt 5%!',
    prizeWinner: 'Preis möglich',
    attendance: 'Anwesenheit',
    days: 'Tage',
    top: 'Top',
    viewAll: 'Alle 100 anzeigen',
    viewTop10: 'Nur Top 10 anzeigen',
    members: 'Mitglieder',
    joinCta: 'Möchtest du der Rangliste beitreten?',
    joinDesc: 'Anmelden, täglich einchecken und Spiele spielen für Punkte!',
    joinButton: 'Jetzt teilnehmen',
    retry: 'Erneut versuchen',
    errorTitle: 'Rangliste konnte nicht geladen werden',
    errorDesc: 'Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut',
  },
  fr: {
    title: 'Classement Membres Live',
    subtitle: 'Présence + Score de jeu combiné',
    loading: 'Chargement du classement...',
    noMembers: 'Aucun membre enregistré pour le moment',
    firstPlace: '#1',
    champion: 'CHAMPION',
    prizeInfo: 'Carte cadeau de 5€ pour le #1 mensuel!',
    battleInfo: 'Défiez vos amis! Le gagnant vole 5%!',
    prizeWinner: 'Prix probable',
    attendance: 'Présence',
    days: 'jours',
    top: 'Top',
    viewAll: 'Voir les 100',
    viewTop10: 'Voir seulement le Top 10',
    members: 'membres',
    joinCta: 'Vous voulez rejoindre le classement?',
    joinDesc: 'Connectez-vous, pointez quotidiennement et jouez pour gagner des points!',
    joinButton: 'Rejoindre',
    retry: 'Réessayer',
    errorTitle: 'Échec du chargement du classement',
    errorDesc: 'Veuillez vérifier votre connexion et réessayer',
  },
  es: {
    title: 'Ranking de Miembros en Vivo',
    subtitle: 'Asistencia + Puntos de juego combinados',
    loading: 'Cargando ranking...',
    noMembers: 'Aún no hay miembros registrados',
    firstPlace: '#1',
    champion: 'CAMPEÓN',
    prizeInfo: '¡Tarjeta regalo de 5€ para el #1 mensual!',
    battleInfo: '¡Batalla con amigos! ¡El ganador roba 5%!',
    prizeWinner: 'Premio probable',
    attendance: 'Asistencia',
    days: 'días',
    top: 'Top',
    viewAll: 'Ver los 100',
    viewTop10: 'Ver solo Top 10',
    members: 'miembros',
    joinCta: '¿Quieres unirte al ranking?',
    joinDesc: '¡Inicia sesión, registra asistencia diaria y juega para ganar puntos!',
    joinButton: 'Unirse ahora',
    retry: 'Reintentar',
    errorTitle: 'Error al cargar el ranking',
    errorDesc: 'Por favor verifica tu conexión e intenta de nuevo',
  },
  pt: {
    title: 'Ranking de Membros ao Vivo',
    subtitle: 'Presença + Pontos de jogo combinados',
    loading: 'Carregando ranking...',
    noMembers: 'Ainda não há membros registrados',
    firstPlace: '#1',
    champion: 'CAMPEÃO',
    prizeInfo: 'Vale-presente de R$25 para o #1 mensal!',
    battleInfo: 'Batalhe com amigos! Vencedor rouba 5%!',
    prizeWinner: 'Prêmio provável',
    attendance: 'Presença',
    days: 'dias',
    top: 'Top',
    viewAll: 'Ver todos os 100',
    viewTop10: 'Ver apenas Top 10',
    members: 'membros',
    joinCta: 'Quer entrar no ranking?',
    joinDesc: 'Faça login, registre presença diariamente e jogue para ganhar pontos!',
    joinButton: 'Participar agora',
    retry: 'Tentar novamente',
    errorTitle: 'Falha ao carregar ranking',
    errorDesc: 'Por favor verifique sua conexão e tente novamente',
  },
};

// 회원가입/로그인 번역
export const authTranslations: Record<Locale, {
  login: {
    title: string;
    subtitle: string;
    googleLogin: string;
    kakaoLogin: string;
    benefits: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
  };
  profile: {
    title: string;
    nickname: string;
    nicknamePlaceholder: string;
    email: string;
    totalScore: string;
    attendance: string;
    rank: string;
    save: string;
    saving: string;
    logout: string;
    deleteAccount: string;
    deleteConfirm: string;
    nicknameRequired: string;
    nicknameTooShort: string;
    nicknameUpdated: string;
    days: string;
    points: string;
  };
  attendance: {
    checkIn: string;
    checkInComplete: string;
    alreadyChecked: string;
    earnedPoints: string;
    consecutiveDays: string;
    bonus: string;
  };
}> = {
  ko: {
    login: {
      title: '로그인',
      subtitle: '소셜 계정으로 간편하게 시작하세요',
      googleLogin: 'Google로 로그인',
      kakaoLogin: 'Kakao로 로그인',
      benefits: '회원 혜택',
      benefit1: '📅 매일 출석체크로 포인트 적립',
      benefit2: '🏆 게임 랭킹 등록 및 경쟁',
      benefit3: '🎁 매월 1위 상품권 지급',
      benefit4: '📊 내 기록 관리 및 분석',
    },
    profile: {
      title: '내 정보',
      nickname: '닉네임',
      nicknamePlaceholder: '닉네임을 입력하세요',
      email: '이메일',
      totalScore: '총 점수',
      attendance: '출석 일수',
      rank: '현재 순위',
      save: '저장',
      saving: '저장 중...',
      logout: '로그아웃',
      deleteAccount: '회원 탈퇴',
      deleteConfirm: '정말로 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.',
      nicknameRequired: '닉네임을 입력해주세요',
      nicknameTooShort: '닉네임은 2자 이상이어야 합니다',
      nicknameUpdated: '닉네임이 변경되었습니다',
      days: '일',
      points: '점',
    },
    attendance: {
      checkIn: '출석체크',
      checkInComplete: '출석 완료!',
      alreadyChecked: '오늘 이미 출석했어요',
      earnedPoints: '포인트 획득',
      consecutiveDays: '연속 출석',
      bonus: '보너스',
    },
  },
  en: {
    login: {
      title: 'Login',
      subtitle: 'Start easily with your social account',
      googleLogin: 'Login with Google',
      kakaoLogin: 'Login with Kakao',
      benefits: 'Member Benefits',
      benefit1: '📅 Earn points with daily check-in',
      benefit2: '🏆 Register and compete in game rankings',
      benefit3: '🎁 Monthly prize for #1',
      benefit4: '📊 Track and analyze your records',
    },
    profile: {
      title: 'My Profile',
      nickname: 'Nickname',
      nicknamePlaceholder: 'Enter your nickname',
      email: 'Email',
      totalScore: 'Total Score',
      attendance: 'Attendance Days',
      rank: 'Current Rank',
      save: 'Save',
      saving: 'Saving...',
      logout: 'Logout',
      deleteAccount: 'Delete Account',
      deleteConfirm: 'Are you sure? All your data will be deleted.',
      nicknameRequired: 'Please enter a nickname',
      nicknameTooShort: 'Nickname must be at least 2 characters',
      nicknameUpdated: 'Nickname updated',
      days: 'days',
      points: 'pts',
    },
    attendance: {
      checkIn: 'Check-in',
      checkInComplete: 'Check-in Complete!',
      alreadyChecked: 'Already checked in today',
      earnedPoints: 'Points earned',
      consecutiveDays: 'Consecutive days',
      bonus: 'Bonus',
    },
  },
  ja: {
    login: {
      title: 'ログイン',
      subtitle: 'ソーシャルアカウントで簡単に始めましょう',
      googleLogin: 'Googleでログイン',
      kakaoLogin: 'Kakaoでログイン',
      benefits: '会員特典',
      benefit1: '📅 毎日の出席でポイント獲得',
      benefit2: '🏆 ゲームランキングに登録して競争',
      benefit3: '🎁 毎月1位に賞品進呈',
      benefit4: '📊 記録の管理と分析',
    },
    profile: {
      title: 'マイページ',
      nickname: 'ニックネーム',
      nicknamePlaceholder: 'ニックネームを入力',
      email: 'メール',
      totalScore: '総得点',
      attendance: '出席日数',
      rank: '現在の順位',
      save: '保存',
      saving: '保存中...',
      logout: 'ログアウト',
      deleteAccount: '退会',
      deleteConfirm: '本当に退会しますか？全てのデータが削除されます。',
      nicknameRequired: 'ニックネームを入力してください',
      nicknameTooShort: 'ニックネームは2文字以上必要です',
      nicknameUpdated: 'ニックネームを変更しました',
      days: '日',
      points: '点',
    },
    attendance: {
      checkIn: '出席チェック',
      checkInComplete: '出席完了!',
      alreadyChecked: '今日はすでに出席しました',
      earnedPoints: 'ポイント獲得',
      consecutiveDays: '連続出席',
      bonus: 'ボーナス',
    },
  },
  zh: {
    login: {
      title: '登录',
      subtitle: '使用社交账号快速开始',
      googleLogin: '使用Google登录',
      kakaoLogin: '使用Kakao登录',
      benefits: '会员福利',
      benefit1: '📅 每日签到赚取积分',
      benefit2: '🏆 注册并参与游戏排名竞争',
      benefit3: '🎁 每月第一名获奖',
      benefit4: '📊 跟踪和分析您的记录',
    },
    profile: {
      title: '我的资料',
      nickname: '昵称',
      nicknamePlaceholder: '输入您的昵称',
      email: '邮箱',
      totalScore: '总积分',
      attendance: '签到天数',
      rank: '当前排名',
      save: '保存',
      saving: '保存中...',
      logout: '退出登录',
      deleteAccount: '删除账户',
      deleteConfirm: '确定要删除吗？所有数据将被删除。',
      nicknameRequired: '请输入昵称',
      nicknameTooShort: '昵称至少需要2个字符',
      nicknameUpdated: '昵称已更新',
      days: '天',
      points: '分',
    },
    attendance: {
      checkIn: '签到',
      checkInComplete: '签到完成!',
      alreadyChecked: '今天已经签到了',
      earnedPoints: '获得积分',
      consecutiveDays: '连续签到',
      bonus: '奖励',
    },
  },
  de: {
    login: {
      title: 'Anmelden',
      subtitle: 'Starten Sie einfach mit Ihrem Social-Konto',
      googleLogin: 'Mit Google anmelden',
      kakaoLogin: 'Mit Kakao anmelden',
      benefits: 'Mitgliedervorteile',
      benefit1: '📅 Punkte sammeln mit täglichem Check-in',
      benefit2: '🏆 Registrieren und in Spielranglisten konkurrieren',
      benefit3: '🎁 Monatlicher Preis für #1',
      benefit4: '📊 Verfolgen und analysieren Sie Ihre Rekorde',
    },
    profile: {
      title: 'Mein Profil',
      nickname: 'Nickname',
      nicknamePlaceholder: 'Geben Sie Ihren Nickname ein',
      email: 'E-Mail',
      totalScore: 'Gesamtpunktzahl',
      attendance: 'Anwesenheitstage',
      rank: 'Aktueller Rang',
      save: 'Speichern',
      saving: 'Speichern...',
      logout: 'Abmelden',
      deleteAccount: 'Konto löschen',
      deleteConfirm: 'Sind Sie sicher? Alle Daten werden gelöscht.',
      nicknameRequired: 'Bitte geben Sie einen Nickname ein',
      nicknameTooShort: 'Nickname muss mindestens 2 Zeichen haben',
      nicknameUpdated: 'Nickname aktualisiert',
      days: 'Tage',
      points: 'Pkt',
    },
    attendance: {
      checkIn: 'Einchecken',
      checkInComplete: 'Check-in abgeschlossen!',
      alreadyChecked: 'Heute bereits eingecheckt',
      earnedPoints: 'Punkte verdient',
      consecutiveDays: 'Aufeinanderfolgende Tage',
      bonus: 'Bonus',
    },
  },
  fr: {
    login: {
      title: 'Connexion',
      subtitle: 'Commencez facilement avec votre compte social',
      googleLogin: 'Se connecter avec Google',
      kakaoLogin: 'Se connecter avec Kakao',
      benefits: 'Avantages membres',
      benefit1: '📅 Gagnez des points avec le check-in quotidien',
      benefit2: '🏆 Inscrivez-vous et rivalisez dans les classements',
      benefit3: '🎁 Prix mensuel pour le #1',
      benefit4: '📊 Suivez et analysez vos records',
    },
    profile: {
      title: 'Mon profil',
      nickname: 'Pseudo',
      nicknamePlaceholder: 'Entrez votre pseudo',
      email: 'E-mail',
      totalScore: 'Score total',
      attendance: 'Jours de présence',
      rank: 'Rang actuel',
      save: 'Enregistrer',
      saving: 'Enregistrement...',
      logout: 'Déconnexion',
      deleteAccount: 'Supprimer le compte',
      deleteConfirm: 'Êtes-vous sûr? Toutes les données seront supprimées.',
      nicknameRequired: 'Veuillez entrer un pseudo',
      nicknameTooShort: 'Le pseudo doit comporter au moins 2 caractères',
      nicknameUpdated: 'Pseudo mis à jour',
      days: 'jours',
      points: 'pts',
    },
    attendance: {
      checkIn: 'Pointer',
      checkInComplete: 'Pointage effectué!',
      alreadyChecked: 'Déjà pointé aujourd\'hui',
      earnedPoints: 'Points gagnés',
      consecutiveDays: 'Jours consécutifs',
      bonus: 'Bonus',
    },
  },
  es: {
    login: {
      title: 'Iniciar sesión',
      subtitle: 'Comienza fácilmente con tu cuenta social',
      googleLogin: 'Iniciar sesión con Google',
      kakaoLogin: 'Iniciar sesión con Kakao',
      benefits: 'Beneficios de miembro',
      benefit1: '📅 Gana puntos con el check-in diario',
      benefit2: '🏆 Regístrate y compite en los rankings',
      benefit3: '🎁 Premio mensual para el #1',
      benefit4: '📊 Rastrea y analiza tus récords',
    },
    profile: {
      title: 'Mi perfil',
      nickname: 'Apodo',
      nicknamePlaceholder: 'Ingresa tu apodo',
      email: 'Correo electrónico',
      totalScore: 'Puntuación total',
      attendance: 'Días de asistencia',
      rank: 'Rango actual',
      save: 'Guardar',
      saving: 'Guardando...',
      logout: 'Cerrar sesión',
      deleteAccount: 'Eliminar cuenta',
      deleteConfirm: '¿Estás seguro? Todos los datos serán eliminados.',
      nicknameRequired: 'Por favor ingresa un apodo',
      nicknameTooShort: 'El apodo debe tener al menos 2 caracteres',
      nicknameUpdated: 'Apodo actualizado',
      days: 'días',
      points: 'pts',
    },
    attendance: {
      checkIn: 'Registrar asistencia',
      checkInComplete: '¡Asistencia registrada!',
      alreadyChecked: 'Ya registraste asistencia hoy',
      earnedPoints: 'Puntos ganados',
      consecutiveDays: 'Días consecutivos',
      bonus: 'Bono',
    },
  },
  pt: {
    login: {
      title: 'Entrar',
      subtitle: 'Comece facilmente com sua conta social',
      googleLogin: 'Entrar com Google',
      kakaoLogin: 'Entrar com Kakao',
      benefits: 'Benefícios de membro',
      benefit1: '📅 Ganhe pontos com check-in diário',
      benefit2: '🏆 Registre-se e compita nos rankings',
      benefit3: '🎁 Prêmio mensal para o #1',
      benefit4: '📊 Acompanhe e analise seus recordes',
    },
    profile: {
      title: 'Meu perfil',
      nickname: 'Apelido',
      nicknamePlaceholder: 'Digite seu apelido',
      email: 'E-mail',
      totalScore: 'Pontuação total',
      attendance: 'Dias de presença',
      rank: 'Posição atual',
      save: 'Salvar',
      saving: 'Salvando...',
      logout: 'Sair',
      deleteAccount: 'Excluir conta',
      deleteConfirm: 'Tem certeza? Todos os dados serão excluídos.',
      nicknameRequired: 'Por favor digite um apelido',
      nicknameTooShort: 'O apelido deve ter pelo menos 2 caracteres',
      nicknameUpdated: 'Apelido atualizado',
      days: 'dias',
      points: 'pts',
    },
    attendance: {
      checkIn: 'Registrar presença',
      checkInComplete: 'Presença registrada!',
      alreadyChecked: 'Você já registrou presença hoje',
      earnedPoints: 'Pontos ganhos',
      consecutiveDays: 'Dias consecutivos',
      bonus: 'Bônus',
    },
  },
};

// 유틸리티 함수
export function getTranslation(locale: Locale) {
  return {
    main: mainPageTranslations[locale],
    game: gameTranslations[locale],
    nav: navTranslations[locale],
    liveRanking: liveRankingTranslations[locale],
    auth: authTranslations[locale],
  };
}

export function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'ko';
  
  const browserLang = navigator.language.split('-')[0];
  if (locales.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }
  return 'en';
}

