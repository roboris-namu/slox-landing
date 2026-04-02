"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";

type Language = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";
type GameState = "intro" | "questions" | "analyzing" | "result";
type AnimalType = "wolf" | "fox" | "lion" | "dolphin" | "owl" | "butterfly" | "bear" | "eagle" | "cat" | "dog" | "parrot" | "rabbit";

const VALID_LANGS: Language[] = ["ko", "en", "ja", "zh", "es", "pt", "de", "fr"];
const ANIMAL_TYPES: AnimalType[] = ["wolf", "fox", "lion", "dolphin", "owl", "butterfly", "bear", "eagle", "cat", "dog", "parrot", "rabbit"];

const animalMeta: Record<AnimalType, { emoji: string; similar: [AnimalType, AnimalType, AnimalType] }> = {
  wolf: { emoji: "🐺", similar: ["fox", "lion", "cat"] },
  fox: { emoji: "🦊", similar: ["wolf", "cat", "owl"] },
  lion: { emoji: "🦁", similar: ["eagle", "wolf", "parrot"] },
  dolphin: { emoji: "🐬", similar: ["parrot", "butterfly", "eagle"] },
  owl: { emoji: "🦉", similar: ["wolf", "fox", "butterfly"] },
  butterfly: { emoji: "🦋", similar: ["owl", "rabbit", "dolphin"] },
  bear: { emoji: "🐻", similar: ["dog", "rabbit", "owl"] },
  eagle: { emoji: "🦅", similar: ["lion", "fox", "dolphin"] },
  cat: { emoji: "🐱", similar: ["fox", "wolf", "rabbit"] },
  dog: { emoji: "🐕", similar: ["bear", "parrot", "rabbit"] },
  parrot: { emoji: "🦜", similar: ["dolphin", "dog", "lion"] },
  rabbit: { emoji: "🐰", similar: ["butterfly", "bear", "cat"] },
};

const ui: Record<Language, {
  title: string; subtitle: string; badge: string; startButton: string;
  questionLabel: string; ofLabel: string; analyzing: string; yourAnimal: string;
  keyTraits: string; funFact: string; similarAnimals: string;
  shareButton: string; retryButton: string; backToMain: string;
  poweredBy: string; shareText: string; copied: string;
  otherTests: string; mbtiTest: string; reactionTest: string;
}> = {
  ko: {
    title: "나는 어떤 동물일까?",
    subtitle: "10가지 성격 질문으로 알아보는 나의 동물 유형!",
    badge: "🐾 동물 성격 테스트",
    startButton: "테스트 시작하기 🐾",
    questionLabel: "질문",
    ofLabel: "/",
    analyzing: "당신의 동물 유형을 분석 중...",
    yourAnimal: "당신의 동물 유형은",
    keyTraits: "핵심 특성",
    funFact: "🔍 재미있는 사실",
    similarAnimals: "비슷한 동물들",
    shareButton: "📤 결과 공유하기",
    retryButton: "🔄 다시 테스트",
    backToMain: "← 메인으로",
    poweredBy: "Powered by",
    shareText: "🐾 동물 성격 테스트 결과!",
    copied: "결과가 클립보드에 복사되었습니다!",
    otherTests: "다른 테스트도 해보세요!",
    mbtiTest: "🧠 MBTI 성격유형 테스트",
    reactionTest: "⚡ 반응속도 테스트",
  },
  en: {
    title: "Which Animal Are You?",
    subtitle: "Discover your animal type with 10 personality questions!",
    badge: "🐾 Animal Personality Quiz",
    startButton: "Start Quiz 🐾",
    questionLabel: "Question",
    ofLabel: "of",
    analyzing: "Analyzing your animal type...",
    yourAnimal: "Your animal type is",
    keyTraits: "Key Traits",
    funFact: "🔍 Fun Fact",
    similarAnimals: "Similar Animals",
    shareButton: "📤 Share Result",
    retryButton: "🔄 Try Again",
    backToMain: "← Home",
    poweredBy: "Powered by",
    shareText: "🐾 Animal Personality Quiz Result!",
    copied: "Result copied to clipboard!",
    otherTests: "Try other tests too!",
    mbtiTest: "🧠 MBTI Personality Test",
    reactionTest: "⚡ Reaction Speed Test",
  },
  ja: {
    title: "あなたはどんな動物？",
    subtitle: "10の性格質問であなたの動物タイプを発見！",
    badge: "🐾 動物性格診断",
    startButton: "テスト開始 🐾",
    questionLabel: "質問",
    ofLabel: "/",
    analyzing: "あなたの動物タイプを分析中...",
    yourAnimal: "あなたの動物タイプは",
    keyTraits: "主な特徴",
    funFact: "🔍 豆知識",
    similarAnimals: "似ている動物",
    shareButton: "📤 結果を共有",
    retryButton: "🔄 もう一度",
    backToMain: "← ホーム",
    poweredBy: "Powered by",
    shareText: "🐾 動物性格診断テスト結果！",
    copied: "結果がクリップボードにコピーされました！",
    otherTests: "他のテストも試してみよう！",
    mbtiTest: "🧠 MBTI性格診断テスト",
    reactionTest: "⚡ 反応速度テスト",
  },
  zh: {
    title: "你是什么动物？",
    subtitle: "通过10个性格问题发现你的动物类型！",
    badge: "🐾 动物性格测试",
    startButton: "开始测试 🐾",
    questionLabel: "问题",
    ofLabel: "/",
    analyzing: "正在分析你的动物类型...",
    yourAnimal: "你的动物类型是",
    keyTraits: "核心特质",
    funFact: "🔍 趣味小知识",
    similarAnimals: "相似的动物",
    shareButton: "📤 分享结果",
    retryButton: "🔄 重新测试",
    backToMain: "← 首页",
    poweredBy: "Powered by",
    shareText: "🐾 动物性格测试结果！",
    copied: "结果已复制到剪贴板！",
    otherTests: "试试其他测试吧！",
    mbtiTest: "🧠 MBTI性格测试",
    reactionTest: "⚡ 反应速度测试",
  },
  de: {
    title: "Welches Tier bist du?",
    subtitle: "Entdecke deinen Tiertyp mit 10 Persönlichkeitsfragen!",
    badge: "🐾 Tier-Persönlichkeitsquiz",
    startButton: "Quiz starten 🐾",
    questionLabel: "Frage",
    ofLabel: "von",
    analyzing: "Dein Tiertyp wird analysiert...",
    yourAnimal: "Dein Tiertyp ist",
    keyTraits: "Hauptmerkmale",
    funFact: "🔍 Wusstest du?",
    similarAnimals: "Ähnliche Tiere",
    shareButton: "📤 Ergebnis teilen",
    retryButton: "🔄 Nochmal",
    backToMain: "← Startseite",
    poweredBy: "Powered by",
    shareText: "🐾 Tier-Persönlichkeitsquiz Ergebnis!",
    copied: "Ergebnis in die Zwischenablage kopiert!",
    otherTests: "Probiere auch andere Tests!",
    mbtiTest: "🧠 MBTI Persönlichkeitstest",
    reactionTest: "⚡ Reaktionsgeschwindigkeitstest",
  },
  fr: {
    title: "Quel animal êtes-vous ?",
    subtitle: "Découvrez votre type animal en 10 questions !",
    badge: "🐾 Quiz Personnalité Animale",
    startButton: "Commencer le quiz 🐾",
    questionLabel: "Question",
    ofLabel: "sur",
    analyzing: "Analyse de votre type animal...",
    yourAnimal: "Votre type animal est",
    keyTraits: "Traits clés",
    funFact: "🔍 Le saviez-vous ?",
    similarAnimals: "Animaux similaires",
    shareButton: "📤 Partager le résultat",
    retryButton: "🔄 Recommencer",
    backToMain: "← Accueil",
    poweredBy: "Powered by",
    shareText: "🐾 Résultat du quiz de personnalité animale !",
    copied: "Résultat copié dans le presse-papiers !",
    otherTests: "Essayez d'autres tests !",
    mbtiTest: "🧠 Test de personnalité MBTI",
    reactionTest: "⚡ Test de vitesse de réaction",
  },
  es: {
    title: "¿Qué animal eres?",
    subtitle: "¡Descubre tu tipo animal con 10 preguntas de personalidad!",
    badge: "🐾 Quiz de Personalidad Animal",
    startButton: "Comenzar quiz 🐾",
    questionLabel: "Pregunta",
    ofLabel: "de",
    analyzing: "Analizando tu tipo animal...",
    yourAnimal: "Tu tipo animal es",
    keyTraits: "Rasgos clave",
    funFact: "🔍 Dato curioso",
    similarAnimals: "Animales similares",
    shareButton: "📤 Compartir resultado",
    retryButton: "🔄 Intentar de nuevo",
    backToMain: "← Inicio",
    poweredBy: "Powered by",
    shareText: "🐾 ¡Resultado del quiz de personalidad animal!",
    copied: "¡Resultado copiado al portapapeles!",
    otherTests: "¡Prueba otros tests también!",
    mbtiTest: "🧠 Test de personalidad MBTI",
    reactionTest: "⚡ Test de velocidad de reacción",
  },
  pt: {
    title: "Qual animal você é?",
    subtitle: "Descubra seu tipo animal com 10 perguntas de personalidade!",
    badge: "🐾 Quiz de Personalidade Animal",
    startButton: "Iniciar quiz 🐾",
    questionLabel: "Pergunta",
    ofLabel: "de",
    analyzing: "Analisando seu tipo animal...",
    yourAnimal: "Seu tipo animal é",
    keyTraits: "Traços-chave",
    funFact: "🔍 Curiosidade",
    similarAnimals: "Animais semelhantes",
    shareButton: "📤 Compartilhar resultado",
    retryButton: "🔄 Tentar novamente",
    backToMain: "← Início",
    poweredBy: "Powered by",
    shareText: "🐾 Resultado do quiz de personalidade animal!",
    copied: "Resultado copiado para a área de transferência!",
    otherTests: "Experimente outros testes também!",
    mbtiTest: "🧠 Teste de personalidade MBTI",
    reactionTest: "⚡ Teste de velocidade de reação",
  },
};

// [question, answerA, answerB, answerC, answerD]
const questions: Record<Language, [string, string, string, string, string][]> = {
  ko: [
    ["자유 시간이 생기면 어떻게 보내나요?", "신나는 파티나 이벤트에 참여한다", "자연 속에서 혼자 시간을 보낸다", "소수의 친한 친구들과 어울린다", "개인 프로젝트나 취미에 몰두한다"],
    ["어려운 문제에 직면했을 때 어떻게 하나요?", "논리적으로 분석하고 전략을 세운다", "직감과 감정을 믿고 따른다", "주변 사람들과 상의한다", "일단 부딪혀보며 해결한다"],
    ["그룹에서 자연스럽게 맡게 되는 역할은?", "결정을 내리는 리더", "분위기를 이끄는 무드메이커", "뒤에서 묵묵히 돕는 조력자", "혼자서 독립적으로 일하는 사람"],
    ["인생에서 가장 중요한 것은?", "성공과 성취", "자유와 창의성", "인간관계와 조화", "지혜와 이해"],
    ["스트레스를 받으면 어떻게 대처하나요?", "적극적으로 맞서서 해결한다", "친구와 이야기하며 풀어낸다", "혼자만의 시간을 가지며 충전한다", "차분하게 참고 견딘다"],
    ["당신의 대화 스타일은?", "직접적이고 자신감 있게", "따뜻하고 격려하는 방식으로", "깊이 있고 사려 깊게", "유쾌하고 재치 있게"],
    ["이상적인 휴가는?", "스릴 넘치는 익스트림 스포츠", "새로운 문화 탐방과 박물관 투어", "조용한 해변에서 힐링", "친구들과 떠나는 로드트립"],
    ["규칙에 대한 당신의 생각은?", "질서를 위해 규칙은 중요하다", "규칙은 참고용일 뿐이다", "나만의 규칙을 만든다", "규칙은 사람을 위해 존재해야 한다"],
    ["사람들이 당신에 대해 가장 부러워하는 점은?", "강한 의지와 결단력", "독특한 창의성과 감성", "따뜻한 마음씨와 친절함", "쿨한 독립성과 여유"],
    ["하나의 초능력을 가질 수 있다면?", "마음을 읽는 능력", "초인적인 힘", "다른 사람을 치유하는 능력", "투명인간 능력"],
  ],
  en: [
    ["What do you do when you have free time?", "Join an exciting party or event", "Spend time alone in nature", "Hang out with a few close friends", "Dive into personal projects or hobbies"],
    ["How do you face a difficult problem?", "Analyze logically and build a strategy", "Trust your intuition and feelings", "Talk it over with people around you", "Jump right in and figure it out"],
    ["What role do you naturally take in a group?", "The decisive leader", "The mood-maker who energizes everyone", "The quiet supporter behind the scenes", "The independent lone worker"],
    ["What matters most in your life?", "Success and achievement", "Freedom and creativity", "Relationships and harmony", "Wisdom and understanding"],
    ["How do you deal with stress?", "Face it head-on and push through", "Talk it out with friends", "Take alone time to recharge", "Stay calm and endure patiently"],
    ["What's your conversation style?", "Direct and confident", "Warm and encouraging", "Deep and thoughtful", "Fun and witty"],
    ["What's your ideal vacation?", "Thrilling extreme sports", "Exploring new cultures and museums", "Relaxing at a quiet beach", "A road trip with friends"],
    ["How do you feel about rules?", "Rules are important for order", "Rules are just suggestions", "I make my own rules", "Rules should serve people"],
    ["What do people admire most about you?", "Your strong will and determination", "Your unique creativity and sensitivity", "Your warm heart and kindness", "Your cool independence and composure"],
    ["If you could have one superpower?", "Reading minds", "Super strength", "Healing others", "Invisibility"],
  ],
  ja: [
    ["自由な時間ができたらどう過ごしますか？", "ワクワクするパーティーやイベントに参加する", "自然の中で一人の時間を過ごす", "少人数の親しい友人と過ごす", "個人的なプロジェクトや趣味に没頭する"],
    ["困難な問題に直面したらどうしますか？", "論理的に分析して戦略を立てる", "直感と感情を信じて従う", "周りの人と相談する", "まず飛び込んで解決していく"],
    ["グループで自然と担う役割は？", "決断を下すリーダー", "雰囲気を盛り上げるムードメーカー", "裏で静かにサポートする助っ人", "一人で独立して動く人"],
    ["人生で最も大切なことは？", "成功と達成", "自由と創造性", "人間関係と調和", "知恵と理解"],
    ["ストレスを感じたらどう対処しますか？", "積極的に立ち向かって解決する", "友達と話して発散する", "一人の時間を持ってリチャージする", "落ち着いて耐え忍ぶ"],
    ["あなたの会話スタイルは？", "率直で自信に満ちている", "温かく励ますような", "深く思慮深い", "楽しくウィットに富んだ"],
    ["理想的な休暇は？", "スリル満点のエクストリームスポーツ", "新しい文化や美術館を探索", "静かなビーチでリラックス", "友達とのロードトリップ"],
    ["ルールについてどう思いますか？", "秩序のためにルールは重要だ", "ルールはあくまで参考程度だ", "自分だけのルールを作る", "ルールは人のために存在すべきだ"],
    ["周りの人があなたについて最も羨ましがることは？", "強い意志と決断力", "ユニークな創造性と感性", "温かい心と優しさ", "クールな独立性と余裕"],
    ["一つの超能力を持てるなら？", "心を読む力", "超人的な力", "他の人を癒す力", "透明人間になる力"],
  ],
  zh: [
    ["有空闲时间时你怎么度过？", "参加热闹的派对或活动", "独自在大自然中度过", "和几个亲密的朋友相处", "沉浸在个人项目或爱好中"],
    ["面对困难问题时你会怎么做？", "逻辑分析并制定策略", "相信直觉和感受", "和身边的人商量", "先行动起来再想办法"],
    ["在团队中你自然承担什么角色？", "做决策的领导者", "带动气氛的活跃分子", "在幕后默默支持的人", "独自独立工作的人"],
    ["人生中最重要的是什么？", "成功与成就", "自由与创意", "人际关系与和谐", "智慧与理解"],
    ["压力大时你如何应对？", "积极面对并解决", "和朋友聊天释放压力", "独处充电恢复能量", "冷静忍耐等待"],
    ["你的对话风格是？", "直接而自信", "温暖而鼓励", "深入而有思想", "有趣而机智"],
    ["理想的假期是？", "刺激的极限运动", "探索新文化和博物馆", "在安静的海边放松", "和朋友一起公路旅行"],
    ["你对规则怎么看？", "规则对维持秩序很重要", "规则只是参考而已", "我制定自己的规则", "规则应该为人服务"],
    ["别人最羡慕你的什么？", "坚强的意志和决断力", "独特的创造力和感性", "温暖的心和善良", "酷酷的独立性和从容"],
    ["如果能拥有一种超能力？", "读心术", "超级力量", "治愈他人的能力", "隐身术"],
  ],
  de: [
    ["Wie verbringst du deine Freizeit?", "Aufregende Partys oder Events besuchen", "Allein in der Natur Zeit verbringen", "Mit wenigen engen Freunden abhängen", "In persönliche Projekte oder Hobbys eintauchen"],
    ["Wie gehst du ein schwieriges Problem an?", "Logisch analysieren und eine Strategie entwickeln", "Auf Intuition und Gefühle vertrauen", "Mit anderen besprechen und Rat holen", "Einfach loslegen und es herausfinden"],
    ["Welche Rolle übernimmst du in einer Gruppe?", "Der entscheidungsfreudige Anführer", "Der Stimmungsmacher, der alle mitreißt", "Der stille Unterstützer im Hintergrund", "Der unabhängige Einzelgänger"],
    ["Was ist dir im Leben am wichtigsten?", "Erfolg und Leistung", "Freiheit und Kreativität", "Beziehungen und Harmonie", "Weisheit und Verständnis"],
    ["Wie gehst du mit Stress um?", "Aktiv angehen und durchsetzen", "Mit Freunden darüber reden", "Allein Zeit nehmen zum Aufladen", "Ruhig bleiben und aushalten"],
    ["Wie ist dein Gesprächsstil?", "Direkt und selbstbewusst", "Warm und ermutigend", "Tiefgründig und nachdenklich", "Lustig und schlagfertig"],
    ["Wie sieht dein idealer Urlaub aus?", "Aufregender Extremsport", "Neue Kulturen und Museen erkunden", "An einem ruhigen Strand entspannen", "Ein Roadtrip mit Freunden"],
    ["Wie stehst du zu Regeln?", "Regeln sind wichtig für Ordnung", "Regeln sind nur Empfehlungen", "Ich mache meine eigenen Regeln", "Regeln sollten den Menschen dienen"],
    ["Was bewundern andere am meisten an dir?", "Deinen starken Willen und deine Entschlossenheit", "Deine einzigartige Kreativität und Sensibilität", "Dein warmes Herz und deine Freundlichkeit", "Deine coole Unabhängigkeit und Gelassenheit"],
    ["Wenn du eine Superkraft haben könntest?", "Gedankenlesen", "Superstärke", "Andere heilen können", "Unsichtbarkeit"],
  ],
  fr: [
    ["Comment passez-vous votre temps libre ?", "Participer à des fêtes ou événements animés", "Passer du temps seul(e) dans la nature", "Traîner avec quelques amis proches", "Se plonger dans des projets personnels ou loisirs"],
    ["Comment abordez-vous un problème difficile ?", "Analyser logiquement et élaborer une stratégie", "Faire confiance à son intuition et ses émotions", "En discuter avec les personnes autour de vous", "Se lancer directement et trouver une solution"],
    ["Quel rôle prenez-vous dans un groupe ?", "Le leader décisif", "L'animateur qui met l'ambiance", "Le soutien discret en coulisses", "Le travailleur indépendant solitaire"],
    ["Qu'est-ce qui compte le plus dans votre vie ?", "Le succès et l'accomplissement", "La liberté et la créativité", "Les relations et l'harmonie", "La sagesse et la compréhension"],
    ["Comment gérez-vous le stress ?", "L'affronter de face et passer à travers", "En parler avec des amis", "Prendre du temps seul(e) pour se ressourcer", "Rester calme et endurer patiemment"],
    ["Quel est votre style de conversation ?", "Direct et confiant", "Chaleureux et encourageant", "Profond et réfléchi", "Amusant et plein d'esprit"],
    ["Quelles sont vos vacances idéales ?", "Des sports extrêmes palpitants", "Explorer de nouvelles cultures et des musées", "Se détendre sur une plage tranquille", "Un road trip entre amis"],
    ["Que pensez-vous des règles ?", "Les règles sont importantes pour l'ordre", "Les règles ne sont que des suggestions", "Je crée mes propres règles", "Les règles devraient servir les gens"],
    ["Qu'est-ce que les gens admirent le plus chez vous ?", "Votre volonté forte et votre détermination", "Votre créativité unique et votre sensibilité", "Votre cœur chaleureux et votre gentillesse", "Votre indépendance cool et votre sang-froid"],
    ["Si vous pouviez avoir un super-pouvoir ?", "Lire dans les pensées", "Super force", "Guérir les autres", "L'invisibilité"],
  ],
  es: [
    ["¿Cómo pasas tu tiempo libre?", "Ir a fiestas o eventos emocionantes", "Pasar tiempo a solas en la naturaleza", "Salir con unos pocos amigos cercanos", "Sumergirte en proyectos personales o hobbies"],
    ["¿Cómo enfrentas un problema difícil?", "Analizar lógicamente y crear una estrategia", "Confiar en tu intuición y sentimientos", "Consultarlo con las personas a tu alrededor", "Lanzarte directamente y resolverlo sobre la marcha"],
    ["¿Qué rol asumes naturalmente en un grupo?", "El líder que toma decisiones", "El animador que llena de energía a todos", "El apoyo silencioso tras bambalinas", "El trabajador independiente y solitario"],
    ["¿Qué es lo más importante en tu vida?", "El éxito y los logros", "La libertad y la creatividad", "Las relaciones y la armonía", "La sabiduría y la comprensión"],
    ["¿Cómo manejas el estrés?", "Enfrentarlo directamente y superarlo", "Hablar con amigos para desahogarte", "Tomar tiempo a solas para recargar", "Mantener la calma y resistir con paciencia"],
    ["¿Cuál es tu estilo de conversación?", "Directo y seguro", "Cálido y alentador", "Profundo y reflexivo", "Divertido e ingenioso"],
    ["¿Cuáles son tus vacaciones ideales?", "Deportes extremos emocionantes", "Explorar nuevas culturas y museos", "Relajarte en una playa tranquila", "Un viaje por carretera con amigos"],
    ["¿Qué opinas de las reglas?", "Las reglas son importantes para el orden", "Las reglas son solo sugerencias", "Yo creo mis propias reglas", "Las reglas deben servir a las personas"],
    ["¿Qué es lo que más admiran de ti?", "Tu fuerte voluntad y determinación", "Tu creatividad única y sensibilidad", "Tu corazón cálido y amabilidad", "Tu independencia cool y serenidad"],
    ["Si pudieras tener un superpoder:", "Leer mentes", "Super fuerza", "Sanar a otros", "Invisibilidad"],
  ],
  pt: [
    ["Como você passa seu tempo livre?", "Ir a festas ou eventos animados", "Passar tempo sozinho(a) na natureza", "Sair com poucos amigos próximos", "Mergulhar em projetos pessoais ou hobbies"],
    ["Como você enfrenta um problema difícil?", "Analisar logicamente e criar uma estratégia", "Confiar na sua intuição e sentimentos", "Conversar com as pessoas ao redor", "Partir para a ação e resolver na prática"],
    ["Qual papel você assume naturalmente em um grupo?", "O líder decisivo", "O animador que energiza todos", "O apoio silencioso nos bastidores", "O trabalhador independente e solitário"],
    ["O que é mais importante na sua vida?", "Sucesso e conquistas", "Liberdade e criatividade", "Relacionamentos e harmonia", "Sabedoria e compreensão"],
    ["Como você lida com o estresse?", "Enfrentar de frente e superar", "Conversar com amigos para desabafar", "Ter um tempo sozinho(a) para recarregar", "Manter a calma e aguentar com paciência"],
    ["Qual é seu estilo de conversa?", "Direto e confiante", "Caloroso e encorajador", "Profundo e reflexivo", "Divertido e espirituoso"],
    ["Qual é sua férias ideal?", "Esportes radicais emocionantes", "Explorar novas culturas e museus", "Relaxar em uma praia tranquila", "Uma viagem de carro com amigos"],
    ["O que você pensa sobre regras?", "Regras são importantes para a ordem", "Regras são apenas sugestões", "Eu faço minhas próprias regras", "Regras devem servir às pessoas"],
    ["O que as pessoas mais admiram em você?", "Sua forte vontade e determinação", "Sua criatividade única e sensibilidade", "Seu coração caloroso e gentileza", "Sua independência cool e serenidade"],
    ["Se pudesse ter um superpoder:", "Ler mentes", "Super força", "Curar outras pessoas", "Invisibilidade"],
  ],
};

const animalInfo: Record<Language, Record<AnimalType, { name: string; desc: string; traits: [string, string, string]; funFact: string }>> = {
  ko: {
    wolf: { name: "늑대", desc: "전략적이고 독립적인 당신은 목표를 향해 끈질기게 나아갑니다. 소수의 깊은 유대를 중시하며, 한번 믿은 사람에게는 끝까지 충성합니다. 조용하지만 강한 리더십으로 무리를 이끕니다.", traits: ["전략적", "독립적", "충성스러운"], funFact: "늑대는 평생 한 번의 짝을 선택하며, 최대 16km까지 울음소리가 전달될 수 있습니다." },
    fox: { name: "여우", desc: "영리하고 호기심이 넘치는 당신은 어떤 상황에서도 빠르게 적응합니다. 끊임없이 새로운 것을 배우고 탐구하며, 남들이 보지 못하는 해결책을 발견합니다. 유연한 사고력이 가장 큰 무기입니다.", traits: ["영리한", "호기심", "적응력"], funFact: "여우는 지구의 자기장을 감지하여 눈 속에 숨은 먹이를 정확히 찾아낼 수 있습니다." },
    lion: { name: "사자", desc: "대담하고 카리스마 넘치는 당신은 타고난 리더입니다. 거대한 목표를 세우고 주저 없이 실행에 옮기며, 주변 사람들에게 자연스럽게 영감을 줍니다. 당당한 존재감으로 어디에서든 주목받습니다.", traits: ["대담한", "카리스마", "야심찬"], funFact: "사자의 포효는 8km 밖에서도 들을 수 있으며, 하루에 최대 20시간을 잡니다." },
    dolphin: { name: "돌고래", desc: "쾌활하고 사교적인 당신은 어디서든 긍정적인 에너지를 퍼뜨립니다. 창의적인 아이디어가 끊임없이 샘솟으며, 새로운 경험을 향한 열정이 넘칩니다. 당신의 밝은 에너지는 모두를 미소 짓게 합니다.", traits: ["쾌활한", "사교적", "창의적"], funFact: "돌고래는 잠잘 때 뇌의 절반만 잠들며, 서로를 고유한 '이름'으로 부릅니다." },
    owl: { name: "올빼미", desc: "지혜롭고 직관적인 당신은 다른 사람이 보지 못하는 것을 봅니다. 깊은 통찰력과 공감 능력으로 주변 사람들을 이해하며, 신비로운 매력을 지니고 있습니다. 조용하지만 당신의 조언은 놀라울 정도로 정확합니다.", traits: ["지혜로운", "직관적", "신비로운"], funFact: "올빼미는 머리를 270도까지 회전할 수 있으며, 완전한 어둠 속에서도 소리만으로 사냥합니다." },
    butterfly: { name: "나비", desc: "자유로운 영혼과 예술적 감성을 가진 당신은 세상을 독특한 시각으로 바라봅니다. 깊은 감정과 풍부한 상상력으로 아름다움을 창조하며, 진정한 자기 표현을 소중히 여깁니다.", traits: ["자유로운", "예술적", "섬세한"], funFact: "나비는 발로 맛을 느끼며, 일부 종은 최대 5,000km를 이동합니다." },
    bear: { name: "곰", desc: "따뜻하고 보호적인 당신은 소중한 사람들을 위해 무엇이든 합니다. 변함없는 신뢰성과 강한 인내심으로 주변에 안정감을 주며, 겉모습과 달리 섬세하고 다정한 마음을 가졌습니다.", traits: ["보호적", "따뜻한", "신뢰할 수 있는"], funFact: "곰의 후각은 개보다 7배 뛰어나며, 동면 중에도 체온이 겨우 몇 도만 내려갑니다." },
    eagle: { name: "독수리", desc: "모험심이 강하고 날카로운 당신은 두려움 없이 도전에 뛰어듭니다. 빠른 판단력과 대담한 행동력으로 기회를 포착하며, 높은 곳에서 세상을 내려다보는 넓은 시야를 가졌습니다.", traits: ["모험적", "날카로운", "두려움 없는"], funFact: "독수리는 인간보다 4~8배 더 먼 거리를 볼 수 있으며, 시속 320km로 급강하합니다." },
    cat: { name: "고양이", desc: "독립적이고 우아한 당신은 자신만의 방식으로 세상을 살아갑니다. 예리한 관찰력으로 모든 것을 파악하면서도 필요한 것만 취하며, 자유로운 영혼이면서도 놀라운 적응력을 발휘합니다.", traits: ["독립적", "우아한", "관찰력"], funFact: "고양이는 하루의 70%를 잠으로 보내며, 인간의 귀로는 들을 수 없는 주파수의 소리를 들을 수 있습니다." },
    dog: { name: "강아지", desc: "충성스럽고 다정한 당신은 주변 모든 사람에게 사랑과 따뜻함을 줍니다. 타인의 감정을 본능적으로 읽어내며, 함께 있는 것만으로도 모두에게 행복을 전파합니다. 당신의 진심은 누구나 느낄 수 있습니다.", traits: ["충성스러운", "다정한", "돌봄"], funFact: "강아지는 인간의 감정을 읽을 수 있으며, 후각은 인간보다 최대 10만 배 뛰어납니다." },
    parrot: { name: "앵무새", desc: "표현력이 풍부하고 카리스마 넘치는 당신은 사람들의 마음을 움직이는 힘이 있습니다. 뛰어난 소통 능력으로 다른 사람들을 격려하고 지지하며, 당신의 에너지는 모임을 빛나게 만듭니다.", traits: ["표현력", "카리스마", "응원형"], funFact: "앵무새는 100개 이상의 단어를 학습할 수 있으며, 일부 종은 80년 이상 살 수 있습니다." },
    rabbit: { name: "토끼", desc: "부드럽고 평화로운 당신은 아름다움과 조화를 추구합니다. 섬세한 감성으로 주변의 작은 것에서도 행복을 발견하며, 조용하지만 확고한 내면의 세계를 가지고 있습니다. 당신의 존재 자체가 위안이 됩니다.", traits: ["부드러운", "평화로운", "감성적"], funFact: "토끼는 거의 360도 시야를 가지고 있으며, 행복할 때 공중에서 뛰며 몸을 비트는 '빈키'를 합니다." },
  },
  en: {
    wolf: { name: "Wolf", desc: "Strategic and independent, you pursue your goals with relentless determination. You value deep bonds with a select few and remain fiercely loyal to those you trust. Your quiet but powerful leadership naturally guides the pack.", traits: ["Strategic", "Independent", "Loyal"], funFact: "Wolves mate for life and their howls can be heard from up to 10 miles away." },
    fox: { name: "Fox", desc: "Clever and endlessly curious, you adapt quickly to any situation. You're always learning and exploring, finding solutions others overlook. Your flexible thinking is your greatest superpower.", traits: ["Clever", "Curious", "Adaptable"], funFact: "Foxes can detect Earth's magnetic field and use it to precisely locate prey hidden under snow." },
    lion: { name: "Lion", desc: "Bold and charismatic, you're a natural-born leader. You set ambitious goals and execute them without hesitation, naturally inspiring those around you. Your commanding presence draws attention wherever you go.", traits: ["Bold", "Charismatic", "Ambitious"], funFact: "A lion's roar can be heard from 5 miles away, and lions sleep up to 20 hours a day." },
    dolphin: { name: "Dolphin", desc: "Cheerful and social, you spread positive energy wherever you go. Creative ideas flow from you endlessly, and you're always passionate about new experiences. Your bright energy makes everyone around you smile.", traits: ["Playful", "Social", "Creative"], funFact: "Dolphins sleep with only half their brain at a time and call each other by unique 'names' (signature whistles)." },
    owl: { name: "Owl", desc: "Wise and intuitive, you see things others miss. With deep insight and empathy, you understand people on a profound level and carry an air of mystery. You're quiet, but your advice is remarkably accurate.", traits: ["Wise", "Intuitive", "Mysterious"], funFact: "Owls can rotate their heads up to 270 degrees and hunt in complete darkness using sound alone." },
    butterfly: { name: "Butterfly", desc: "A free spirit with artistic sensitivity, you see the world through a unique lens. With deep emotions and rich imagination, you create beauty and cherish authentic self-expression above all.", traits: ["Free-spirited", "Artistic", "Sensitive"], funFact: "Butterflies taste with their feet and some species migrate up to 3,000 miles." },
    bear: { name: "Bear", desc: "Warm and protective, you'll do anything for the people you care about. Your unwavering reliability and strong patience create a sense of stability, and beneath your tough exterior lies a tender, caring heart.", traits: ["Protective", "Warm", "Reliable"], funFact: "A bear's sense of smell is 7 times better than a dog's, and their body temperature drops only a few degrees during hibernation." },
    eagle: { name: "Eagle", desc: "Adventurous and sharp-eyed, you dive fearlessly into challenges. With quick judgment and bold action, you seize opportunities others miss. You have the wide perspective that comes from soaring above it all.", traits: ["Adventurous", "Sharp", "Fearless"], funFact: "Eagles can see 4-8 times farther than humans and can dive at speeds over 200 mph." },
    cat: { name: "Cat", desc: "Independent and graceful, you navigate life on your own terms. With sharp observation skills, you notice everything while taking only what you need. A free spirit with remarkable adaptability.", traits: ["Independent", "Graceful", "Observant"], funFact: "Cats spend about 70% of their lives sleeping and can hear frequencies inaudible to humans." },
    dog: { name: "Dog", desc: "Loyal and friendly, you shower everyone around you with love and warmth. You instinctively read others' emotions, and your mere presence spreads happiness. Your genuineness is something everyone can feel.", traits: ["Loyal", "Friendly", "Caring"], funFact: "Dogs can read human emotions and their sense of smell is up to 100,000 times more sensitive than ours." },
    parrot: { name: "Parrot", desc: "Expressive and charismatic, you have the power to move people's hearts. With outstanding communication skills, you encourage and support others, and your energy makes every gathering shine.", traits: ["Expressive", "Charismatic", "Supportive"], funFact: "Parrots can learn over 100 words and some species can live more than 80 years." },
    rabbit: { name: "Rabbit", desc: "Gentle and peaceful, you seek beauty and harmony in all things. With delicate sensitivity, you find happiness in life's small moments, and your quiet but firm inner world is truly special. Your very presence is a comfort.", traits: ["Gentle", "Peaceful", "Aesthetic"], funFact: "Rabbits have nearly 360-degree vision and do a happy jump-twist called a 'binky' when joyful." },
  },
  ja: {
    wolf: { name: "オオカミ", desc: "戦略的で独立心が強いあなたは、目標に向かって粘り強く進みます。少数の深い絆を大切にし、一度信じた人には最後まで忠誠を尽くします。静かながらも力強いリーダーシップで群れを導きます。", traits: ["戦略的", "独立的", "忠実"], funFact: "オオカミは生涯一匹のパートナーを選び、遠吠えは最大16kmまで届きます。" },
    fox: { name: "キツネ", desc: "賢く好奇心旺盛なあなたは、どんな状況にも素早く適応します。常に新しいことを学び探求し、他の人が見逃す解決策を見つけます。柔軟な思考力が最大の武器です。", traits: ["賢い", "好奇心旺盛", "適応力"], funFact: "キツネは地球の磁場を感知して、雪の下に隠れた獲物を正確に見つけることができます。" },
    lion: { name: "ライオン", desc: "大胆でカリスマ性あふれるあなたは、生まれながらのリーダーです。壮大な目標を掲げ躊躇なく実行し、周囲の人々に自然とインスピレーションを与えます。堂々とした存在感でどこでも注目を集めます。", traits: ["大胆", "カリスマ", "野心的"], funFact: "ライオンの咆哮は8km先まで届き、1日最大20時間も眠ります。" },
    dolphin: { name: "イルカ", desc: "明るく社交的なあなたは、どこにいてもポジティブなエネルギーを広げます。創造的なアイデアが尽きることなく湧き出し、新しい体験への情熱に満ちています。あなたの明るいエネルギーは皆を笑顔にします。", traits: ["快活", "社交的", "創造的"], funFact: "イルカは片方の脳だけで眠り、固有の「名前」（シグネチャーホイッスル）でお互いを呼びます。" },
    owl: { name: "フクロウ", desc: "知恵深く直感的なあなたは、他の人が見逃すものを見抜きます。深い洞察力と共感力で周囲の人を理解し、神秘的な魅力を持っています。静かですが、あなたのアドバイスは驚くほど正確です。", traits: ["賢明", "直感的", "神秘的"], funFact: "フクロウは頭を270度まで回転でき、完全な暗闇の中でも音だけで狩りをします。" },
    butterfly: { name: "蝶", desc: "自由な魂と芸術的な感性を持つあなたは、世界を独特の視点で見ています。深い感情と豊かな想像力で美を創造し、本当の自己表現を何よりも大切にしています。", traits: ["自由", "芸術的", "繊細"], funFact: "蝶は足で味を感じ、一部の種は最大5,000kmも移動します。" },
    bear: { name: "クマ", desc: "温かく保護的なあなたは、大切な人のために何でもします。揺るぎない信頼性と強い忍耐力で周囲に安定感を与え、たくましい外見の下には繊細で優しい心が隠れています。", traits: ["保護的", "温かい", "信頼できる"], funFact: "クマの嗅覚は犬の7倍優れており、冬眠中も体温はわずか数度しか下がりません。" },
    eagle: { name: "ワシ", desc: "冒険心旺盛で鋭い目を持つあなたは、恐れることなく挑戦に飛び込みます。素早い判断力と大胆な行動力でチャンスをつかみ、高所から世界を見下ろす広い視野を持っています。", traits: ["冒険的", "鋭い", "恐れ知らず"], funFact: "ワシは人間の4〜8倍遠くを見ることができ、時速320kmで急降下します。" },
    cat: { name: "猫", desc: "独立的で優雅なあなたは、自分なりの方法で世界を生きていきます。鋭い観察力ですべてを把握しながらも必要なものだけを取り、自由な魂でありながら驚くべき適応力を発揮します。", traits: ["独立的", "優雅", "観察力"], funFact: "猫は一生の約70%を睡眠に費やし、人間には聞こえない周波数の音を聞くことができます。" },
    dog: { name: "犬", desc: "忠実でフレンドリーなあなたは、周囲のすべての人に愛と温かさを注ぎます。他人の感情を本能的に読み取り、一緒にいるだけでみんなに幸せを広げます。あなたの真心は誰もが感じられます。", traits: ["忠実", "フレンドリー", "思いやり"], funFact: "犬は人間の感情を読むことができ、嗅覚は人間の最大10万倍も優れています。" },
    parrot: { name: "オウム", desc: "表現力豊かでカリスマ性のあるあなたは、人の心を動かす力を持っています。優れたコミュニケーション能力で他者を励まし支え、あなたのエネルギーは集まりを輝かせます。", traits: ["表現力", "カリスマ", "応援型"], funFact: "オウムは100語以上を学習でき、一部の種は80年以上生きることができます。" },
    rabbit: { name: "ウサギ", desc: "穏やかで平和なあなたは、美しさと調和を追求します。繊細な感性で周りの小さなことからも幸せを見つけ、静かだが確固たる内面世界を持っています。あなたの存在そのものが癒しです。", traits: ["穏やか", "平和", "美的"], funFact: "ウサギはほぼ360度の視野を持ち、嬉しい時にジャンプして体をねじる「ビンキー」をします。" },
  },
  zh: {
    wolf: { name: "狼", desc: "战略性和独立性兼具的你，会坚持不懈地追求目标。你重视与少数人的深厚纽带，对信任的人始终忠诚。以安静而强大的领导力引领群体。", traits: ["战略性", "独立", "忠诚"], funFact: "狼一生只选择一个伴侣，它们的嚎叫声可以传播到16公里以外。" },
    fox: { name: "狐狸", desc: "聪明且充满好奇心的你能迅速适应任何情况。你总是在学习和探索，找到别人忽略的解决方案。灵活的思维是你最强大的武器。", traits: ["聪明", "好奇", "适应力强"], funFact: "狐狸能感知地球磁场，利用它精确定位隐藏在雪下的猎物。" },
    lion: { name: "狮子", desc: "大胆而充满魅力的你是天生的领导者。你设定宏大的目标并毫不犹豫地执行，自然而然地激励周围的人。你威严的存在感无论到哪里都引人注目。", traits: ["大胆", "有魅力", "雄心勃勃"], funFact: "狮子的吼叫声可以传到8公里外，而且狮子每天最多睡20小时。" },
    dolphin: { name: "海豚", desc: "开朗又善于社交的你，走到哪里都传播正能量。创意源源不断，对新体验充满热情。你明亮的能量让身边每个人都忍不住微笑。", traits: ["活泼", "社交", "创意"], funFact: "海豚睡觉时只有一半大脑入睡，它们用独特的'名字'（标志性哨声）互相称呼。" },
    owl: { name: "猫头鹰", desc: "智慧且直觉敏锐的你能看到别人忽略的东西。凭借深刻的洞察力和共情能力理解身边的人，散发着神秘的魅力。虽然安静，但你的建议总是惊人地准确。", traits: ["智慧", "直觉", "神秘"], funFact: "猫头鹰可以将头旋转270度，在完全黑暗中仅凭声音就能狩猎。" },
    butterfly: { name: "蝴蝶", desc: "拥有自由灵魂和艺术敏感性的你，以独特的视角看世界。凭借深厚的情感和丰富的想象力创造美，珍视真正的自我表达。", traits: ["自由", "艺术", "敏感"], funFact: "蝴蝶用脚品尝味道，某些种类的迁徙距离可达5,000公里。" },
    bear: { name: "熊", desc: "温暖而有保护欲的你，会为在乎的人付出一切。以不变的可靠性和强大的耐心为周围人带来安全感，坚强的外表下藏着温柔细腻的心。", traits: ["保护欲强", "温暖", "可靠"], funFact: "熊的嗅觉比狗强7倍，冬眠期间体温仅下降几度。" },
    eagle: { name: "鹰", desc: "冒险心强、目光锐利的你无所畏惧地迎接挑战。凭借快速的判断力和大胆的行动力抓住机会，拥有从高处俯瞰一切的广阔视野。", traits: ["冒险", "敏锐", "无畏"], funFact: "鹰的视力是人类的4-8倍，俯冲速度可达每小时320公里。" },
    cat: { name: "猫", desc: "独立而优雅的你按照自己的方式生活。凭借敏锐的观察力掌握一切，只取所需。既是自由的灵魂，又拥有惊人的适应力。", traits: ["独立", "优雅", "善于观察"], funFact: "猫一生约70%的时间在睡觉，能听到人类无法听到的频率。" },
    dog: { name: "狗", desc: "忠诚而友好的你，给身边每个人带来爱和温暖。本能地读懂他人的情感，你的存在本身就传递着幸福。你的真诚是每个人都能感受到的。", traits: ["忠诚", "友好", "关爱"], funFact: "狗能读懂人类的情感，嗅觉比人类灵敏10万倍。" },
    parrot: { name: "鹦鹉", desc: "表达力丰富、充满魅力的你有打动人心的力量。凭借出色的沟通能力鼓励和支持他人，你的能量让每次聚会都熠熠生辉。", traits: ["表达力", "魅力", "支持型"], funFact: "鹦鹉可以学习100多个单词，有些种类可以活80年以上。" },
    rabbit: { name: "兔子", desc: "温柔而平和的你追求美与和谐。以细腻的感性在生活的小事中发现幸福，拥有安静但坚定的内心世界。你的存在本身就是一种安慰。", traits: ["温柔", "平和", "审美"], funFact: "兔子拥有接近360度的视野，高兴时会跳起来扭动身体，这被称为'binky'。" },
  },
  de: {
    wolf: { name: "Wolf", desc: "Strategisch und unabhängig verfolgst du deine Ziele mit unermüdlicher Entschlossenheit. Du schätzt tiefe Bindungen zu wenigen Auserwählten und bleibst denen, denen du vertraust, treu. Deine ruhige, aber kraftvolle Führung leitet das Rudel.", traits: ["Strategisch", "Unabhängig", "Treu"], funFact: "Wölfe bleiben ein Leben lang zusammen und ihr Heulen kann bis zu 16 km weit gehört werden." },
    fox: { name: "Fuchs", desc: "Clever und endlos neugierig passt du dich schnell an jede Situation an. Du lernst und erforschst ständig und findest Lösungen, die andere übersehen. Dein flexibles Denken ist deine größte Stärke.", traits: ["Clever", "Neugierig", "Anpassungsfähig"], funFact: "Füchse können das Magnetfeld der Erde wahrnehmen und damit Beute unter dem Schnee präzise orten." },
    lion: { name: "Löwe", desc: "Kühn und charismatisch bist du ein geborener Anführer. Du setzt dir ehrgeizige Ziele und setzt sie ohne Zögern um, inspirierst dabei natürlich die Menschen um dich herum. Deine beeindruckende Präsenz zieht überall Aufmerksamkeit auf sich.", traits: ["Kühn", "Charismatisch", "Ehrgeizig"], funFact: "Das Brüllen eines Löwen ist bis zu 8 km weit hörbar, und Löwen schlafen bis zu 20 Stunden am Tag." },
    dolphin: { name: "Delfin", desc: "Fröhlich und gesellig verbreitest du überall positive Energie. Kreative Ideen sprudeln endlos aus dir heraus, und du bist stets begeistert von neuen Erfahrungen. Deine strahlende Energie bringt alle zum Lächeln.", traits: ["Verspielt", "Gesellig", "Kreativ"], funFact: "Delfine schlafen mit nur einer Gehirnhälfte und rufen einander mit einzigartigen 'Namen' (Signaturpfiffen)." },
    owl: { name: "Eule", desc: "Weise und intuitiv siehst du Dinge, die andere übersehen. Mit tiefer Einsicht und Empathie verstehst du Menschen auf einer tiefgründigen Ebene und trägst eine geheimnisvolle Aura. Du bist ruhig, aber dein Rat ist erstaunlich treffsicher.", traits: ["Weise", "Intuitiv", "Geheimnisvoll"], funFact: "Eulen können ihren Kopf bis zu 270 Grad drehen und jagen in völliger Dunkelheit nur mithilfe von Geräuschen." },
    butterfly: { name: "Schmetterling", desc: "Eine freie Seele mit künstlerischer Sensibilität – du siehst die Welt durch eine einzigartige Linse. Mit tiefen Emotionen und reicher Fantasie schaffst du Schönheit und schätzt authentischen Selbstausdruck über alles.", traits: ["Freigeistig", "Künstlerisch", "Feinfühlig"], funFact: "Schmetterlinge schmecken mit ihren Füßen und manche Arten wandern bis zu 5.000 km." },
    bear: { name: "Bär", desc: "Warm und beschützend tust du alles für die Menschen, die dir wichtig sind. Deine unerschütterliche Zuverlässigkeit und starke Geduld schaffen Stabilität, und unter deinem robusten Äußeren verbirgt sich ein zartes, fürsorgliches Herz.", traits: ["Beschützend", "Warmherzig", "Zuverlässig"], funFact: "Der Geruchssinn eines Bären ist 7-mal besser als der eines Hundes, und die Körpertemperatur sinkt im Winterschlaf nur um wenige Grad." },
    eagle: { name: "Adler", desc: "Abenteuerlustig und scharfsinnig stürzt du dich furchtlos in Herausforderungen. Mit schnellem Urteilsvermögen und kühnem Handeln ergreifst du Chancen, die andere verpassen. Du hast die weite Perspektive, die vom Fliegen über allem kommt.", traits: ["Abenteuerlustig", "Scharfsinnig", "Furchtlos"], funFact: "Adler können 4-8 Mal weiter sehen als Menschen und erreichen im Sturzflug über 320 km/h." },
    cat: { name: "Katze", desc: "Unabhängig und anmutig gehst du deinen eigenen Weg durchs Leben. Mit scharfer Beobachtungsgabe nimmst du alles wahr und nimmst nur das, was du brauchst. Ein freier Geist mit bemerkenswerter Anpassungsfähigkeit.", traits: ["Unabhängig", "Anmutig", "Aufmerksam"], funFact: "Katzen verbringen etwa 70% ihres Lebens schlafend und können Frequenzen hören, die für Menschen unhörbar sind." },
    dog: { name: "Hund", desc: "Loyal und freundlich überschüttest du alle um dich herum mit Liebe und Wärme. Du liest instinktiv die Emotionen anderer, und allein deine Anwesenheit verbreitet Glück. Deine Aufrichtigkeit kann jeder spüren.", traits: ["Loyal", "Freundlich", "Fürsorglich"], funFact: "Hunde können menschliche Emotionen lesen, und ihr Geruchssinn ist bis zu 100.000 Mal empfindlicher als unserer." },
    parrot: { name: "Papagei", desc: "Ausdrucksstark und charismatisch hast du die Kraft, Herzen zu bewegen. Mit herausragenden Kommunikationsfähigkeiten ermutigst und unterstützt du andere, und deine Energie lässt jedes Treffen erstrahlen.", traits: ["Ausdrucksstark", "Charismatisch", "Unterstützend"], funFact: "Papageien können über 100 Wörter lernen und manche Arten können über 80 Jahre alt werden." },
    rabbit: { name: "Hase", desc: "Sanft und friedlich suchst du Schönheit und Harmonie in allen Dingen. Mit feiner Sensibilität findest du Glück in den kleinen Momenten des Lebens, und deine ruhige, aber feste innere Welt ist wirklich besonders. Deine bloße Anwesenheit ist ein Trost.", traits: ["Sanft", "Friedlich", "Ästhetisch"], funFact: "Hasen haben ein fast 360-Grad-Sichtfeld und machen einen freudigen Sprung-Twist namens 'Binky', wenn sie glücklich sind." },
  },
  fr: {
    wolf: { name: "Loup", desc: "Stratégique et indépendant(e), vous poursuivez vos objectifs avec une détermination sans faille. Vous valorisez les liens profonds avec quelques élus et restez farouchement loyal(e). Votre leadership calme mais puissant guide naturellement la meute.", traits: ["Stratégique", "Indépendant", "Loyal"], funFact: "Les loups s'accouplent pour la vie et leurs hurlements peuvent être entendus jusqu'à 16 km." },
    fox: { name: "Renard", desc: "Malin(e) et infiniment curieux(se), vous vous adaptez rapidement à toute situation. Toujours en train d'apprendre et d'explorer, vous trouvez des solutions que d'autres ne voient pas. Votre pensée flexible est votre plus grand atout.", traits: ["Malin", "Curieux", "Adaptable"], funFact: "Les renards peuvent détecter le champ magnétique terrestre pour localiser précisément leurs proies sous la neige." },
    lion: { name: "Lion", desc: "Audacieux(se) et charismatique, vous êtes un(e) leader né(e). Vous fixez des objectifs ambitieux et les réalisez sans hésitation, inspirant naturellement votre entourage. Votre présence imposante attire l'attention partout où vous allez.", traits: ["Audacieux", "Charismatique", "Ambitieux"], funFact: "Le rugissement d'un lion peut être entendu à 8 km et les lions dorment jusqu'à 20 heures par jour." },
    dolphin: { name: "Dauphin", desc: "Joyeux(se) et sociable, vous répandez une énergie positive partout où vous allez. Les idées créatives jaillissent de vous sans fin, et vous êtes toujours passionné(e) par de nouvelles expériences. Votre énergie lumineuse fait sourire tout le monde.", traits: ["Joueur", "Sociable", "Créatif"], funFact: "Les dauphins dorment avec seulement la moitié du cerveau et s'appellent par des 'noms' uniques (sifflements signatures)." },
    owl: { name: "Hibou", desc: "Sage et intuitif(ve), vous voyez ce que les autres manquent. Avec une perspicacité profonde et de l'empathie, vous comprenez les gens à un niveau profond et dégagez un air de mystère. Discret(e), mais vos conseils sont remarquablement justes.", traits: ["Sage", "Intuitif", "Mystérieux"], funFact: "Les hiboux peuvent tourner leur tête jusqu'à 270 degrés et chasser dans l'obscurité totale grâce au son uniquement." },
    butterfly: { name: "Papillon", desc: "Esprit libre doté(e) d'une sensibilité artistique, vous voyez le monde à travers un prisme unique. Avec des émotions profondes et une imagination riche, vous créez la beauté et chérissez l'expression de soi authentique.", traits: ["Libre", "Artistique", "Sensible"], funFact: "Les papillons goûtent avec leurs pieds et certaines espèces migrent jusqu'à 5 000 km." },
    bear: { name: "Ours", desc: "Chaleureux(se) et protecteur(trice), vous feriez n'importe quoi pour ceux que vous aimez. Votre fiabilité inébranlable et votre grande patience créent un sentiment de stabilité, et sous votre apparence robuste se cache un cœur tendre et attentionné.", traits: ["Protecteur", "Chaleureux", "Fiable"], funFact: "L'odorat d'un ours est 7 fois supérieur à celui d'un chien, et sa température corporelle ne baisse que de quelques degrés pendant l'hibernation." },
    eagle: { name: "Aigle", desc: "Aventurier(ère) et vif(ve) d'esprit, vous plongez sans peur dans les défis. Avec un jugement rapide et des actions audacieuses, vous saisissez les opportunités que d'autres manquent. Vous avez la perspective large de celui qui plane au-dessus de tout.", traits: ["Aventurier", "Vif", "Intrépide"], funFact: "Les aigles peuvent voir 4 à 8 fois plus loin que les humains et plongent à plus de 320 km/h." },
    cat: { name: "Chat", desc: "Indépendant(e) et gracieux(se), vous vivez la vie selon vos propres termes. Avec une observation aiguë, vous remarquez tout en ne prenant que ce dont vous avez besoin. Un esprit libre avec une adaptabilité remarquable.", traits: ["Indépendant", "Gracieux", "Observateur"], funFact: "Les chats passent environ 70% de leur vie à dormir et peuvent entendre des fréquences inaudibles pour l'humain." },
    dog: { name: "Chien", desc: "Loyal(e) et amical(e), vous couvrez d'amour et de chaleur tous ceux qui vous entourent. Vous lisez instinctivement les émotions des autres, et votre simple présence répand le bonheur. Votre sincérité est ressentie par tous.", traits: ["Loyal", "Amical", "Attentionné"], funFact: "Les chiens peuvent lire les émotions humaines et leur odorat est jusqu'à 100 000 fois plus sensible que le nôtre." },
    parrot: { name: "Perroquet", desc: "Expressif(ve) et charismatique, vous avez le pouvoir de toucher les cœurs. Avec d'excellentes compétences en communication, vous encouragez et soutenez les autres, et votre énergie illumine chaque rassemblement.", traits: ["Expressif", "Charismatique", "Bienveillant"], funFact: "Les perroquets peuvent apprendre plus de 100 mots et certaines espèces vivent plus de 80 ans." },
    rabbit: { name: "Lapin", desc: "Doux(ce) et paisible, vous recherchez la beauté et l'harmonie en toute chose. Avec une sensibilité délicate, vous trouvez le bonheur dans les petits moments de la vie, et votre monde intérieur calme mais ferme est vraiment spécial. Votre présence seule est un réconfort.", traits: ["Doux", "Paisible", "Esthétique"], funFact: "Les lapins ont un champ de vision de presque 360 degrés et font un saut-vrille joyeux appelé 'binky' quand ils sont heureux." },
  },
  es: {
    wolf: { name: "Lobo", desc: "Estratégico e independiente, persigues tus metas con determinación implacable. Valoras los vínculos profundos con unos pocos elegidos y permaneces ferozmente leal a quienes confías. Tu liderazgo silencioso pero poderoso guía a la manada.", traits: ["Estratégico", "Independiente", "Leal"], funFact: "Los lobos eligen una pareja para toda la vida y sus aullidos pueden escucharse a más de 16 km." },
    fox: { name: "Zorro", desc: "Astuto y eternamente curioso, te adaptas rápidamente a cualquier situación. Siempre estás aprendiendo y explorando, encontrando soluciones que otros pasan por alto. Tu pensamiento flexible es tu mayor superpoder.", traits: ["Astuto", "Curioso", "Adaptable"], funFact: "Los zorros pueden detectar el campo magnético terrestre para localizar presas ocultas bajo la nieve." },
    lion: { name: "León", desc: "Audaz y carismático, eres un líder nato. Estableces metas ambiciosas y las ejecutas sin dudar, inspirando naturalmente a quienes te rodean. Tu presencia imponente atrae la atención dondequiera que vayas.", traits: ["Audaz", "Carismático", "Ambicioso"], funFact: "El rugido de un león puede escucharse a 8 km de distancia, y los leones duermen hasta 20 horas al día." },
    dolphin: { name: "Delfín", desc: "Alegre y sociable, esparces energía positiva dondequiera que vayas. Las ideas creativas fluyen de ti sin cesar, y siempre estás apasionado/a por nuevas experiencias. Tu energía brillante hace sonreír a todos a tu alrededor.", traits: ["Juguetón", "Sociable", "Creativo"], funFact: "Los delfines duermen con solo la mitad del cerebro y se llaman entre sí con 'nombres' únicos (silbidos firma)." },
    owl: { name: "Búho", desc: "Sabio e intuitivo, ves cosas que otros no perciben. Con profunda perspicacia y empatía, comprendes a las personas a un nivel profundo y llevas un aura de misterio. Eres callado/a, pero tus consejos son sorprendentemente acertados.", traits: ["Sabio", "Intuitivo", "Misterioso"], funFact: "Los búhos pueden girar la cabeza hasta 270 grados y cazar en completa oscuridad usando solo el sonido." },
    butterfly: { name: "Mariposa", desc: "Un espíritu libre con sensibilidad artística, ves el mundo a través de una lente única. Con emociones profundas e imaginación rica, creas belleza y valoras la expresión auténtica de ti mismo/a por encima de todo.", traits: ["Libre", "Artístico", "Sensible"], funFact: "Las mariposas saborean con sus patas y algunas especies migran hasta 5,000 km." },
    bear: { name: "Oso", desc: "Cálido y protector, harías cualquier cosa por las personas que te importan. Tu fiabilidad inquebrantable y fuerte paciencia crean una sensación de estabilidad, y bajo tu exterior fuerte se esconde un corazón tierno y cariñoso.", traits: ["Protector", "Cálido", "Confiable"], funFact: "El olfato del oso es 7 veces mejor que el del perro, y su temperatura corporal solo baja unos grados durante la hibernación." },
    eagle: { name: "Águila", desc: "Aventurero/a y perspicaz, te lanzas sin miedo a los desafíos. Con juicio rápido y acción audaz, aprovechas oportunidades que otros pierden. Tienes la amplia perspectiva de quien vuela por encima de todo.", traits: ["Aventurero", "Perspicaz", "Intrépido"], funFact: "Las águilas pueden ver 4-8 veces más lejos que los humanos y se lanzan en picada a más de 320 km/h." },
    cat: { name: "Gato", desc: "Independiente y elegante, navegas la vida a tu manera. Con una aguda capacidad de observación, notas todo mientras tomas solo lo que necesitas. Un espíritu libre con una adaptabilidad notable.", traits: ["Independiente", "Elegante", "Observador"], funFact: "Los gatos pasan cerca del 70% de su vida durmiendo y pueden oír frecuencias inaudibles para los humanos." },
    dog: { name: "Perro", desc: "Leal y amistoso, llenas de amor y calidez a todos a tu alrededor. Lees instintivamente las emociones de otros, y tu sola presencia esparce felicidad. Tu autenticidad es algo que todos pueden sentir.", traits: ["Leal", "Amistoso", "Cariñoso"], funFact: "Los perros pueden leer las emociones humanas y su olfato es hasta 100,000 veces más sensible que el nuestro." },
    parrot: { name: "Loro", desc: "Expresivo/a y carismático/a, tienes el poder de conmover corazones. Con habilidades de comunicación sobresalientes, animas y apoyas a los demás, y tu energía hace brillar cada reunión.", traits: ["Expresivo", "Carismático", "Solidario"], funFact: "Los loros pueden aprender más de 100 palabras y algunas especies pueden vivir más de 80 años." },
    rabbit: { name: "Conejo", desc: "Gentil y pacífico/a, buscas la belleza y la armonía en todo. Con una sensibilidad delicada, encuentras la felicidad en los pequeños momentos de la vida, y tu mundo interior tranquilo pero firme es verdaderamente especial. Tu sola presencia es un consuelo.", traits: ["Gentil", "Pacífico", "Estético"], funFact: "Los conejos tienen visión de casi 360 grados y hacen un salto-giro alegre llamado 'binky' cuando están felices." },
  },
  pt: {
    wolf: { name: "Lobo", desc: "Estratégico e independente, você persegue seus objetivos com determinação incansável. Valoriza laços profundos com poucos escolhidos e permanece ferozmente leal a quem confia. Sua liderança calma mas poderosa guia naturalmente a alcateia.", traits: ["Estratégico", "Independente", "Leal"], funFact: "Lobos escolhem um parceiro para a vida toda e seus uivos podem ser ouvidos a mais de 16 km." },
    fox: { name: "Raposa", desc: "Esperta e infinitamente curiosa, você se adapta rapidamente a qualquer situação. Está sempre aprendendo e explorando, encontrando soluções que outros não percebem. Seu pensamento flexível é seu maior superpoder.", traits: ["Esperto", "Curioso", "Adaptável"], funFact: "Raposas podem detectar o campo magnético da Terra para localizar presas escondidas sob a neve." },
    lion: { name: "Leão", desc: "Ousado e carismático, você é um líder nato. Define metas ambiciosas e as executa sem hesitação, inspirando naturalmente as pessoas ao redor. Sua presença imponente atrai atenção por onde passa.", traits: ["Ousado", "Carismático", "Ambicioso"], funFact: "O rugido de um leão pode ser ouvido a 8 km de distância, e leões dormem até 20 horas por dia." },
    dolphin: { name: "Golfinho", desc: "Alegre e sociável, você espalha energia positiva por onde passa. Ideias criativas fluem de você sem parar, e você está sempre apaixonado(a) por novas experiências. Sua energia brilhante faz todos ao redor sorrirem.", traits: ["Brincalhão", "Sociável", "Criativo"], funFact: "Golfinhos dormem com apenas metade do cérebro e chamam uns aos outros por 'nomes' únicos (assobios assinatura)." },
    owl: { name: "Coruja", desc: "Sábia e intuitiva, você vê coisas que outros não percebem. Com profunda percepção e empatia, compreende as pessoas em um nível profundo e carrega um ar de mistério. É discreta, mas seus conselhos são incrivelmente precisos.", traits: ["Sábia", "Intuitiva", "Misteriosa"], funFact: "Corujas podem girar a cabeça até 270 graus e caçar na escuridão total usando apenas o som." },
    butterfly: { name: "Borboleta", desc: "Um espírito livre com sensibilidade artística, você vê o mundo por uma lente única. Com emoções profundas e rica imaginação, cria beleza e valoriza a expressão autêntica de si acima de tudo.", traits: ["Livre", "Artístico", "Sensível"], funFact: "Borboletas sentem o gosto com os pés e algumas espécies migram até 5.000 km." },
    bear: { name: "Urso", desc: "Caloroso e protetor, você faria qualquer coisa pelas pessoas que ama. Sua confiabilidade inabalável e forte paciência criam estabilidade, e sob sua aparência forte se esconde um coração terno e carinhoso.", traits: ["Protetor", "Caloroso", "Confiável"], funFact: "O olfato do urso é 7 vezes melhor que o de um cão, e sua temperatura corporal cai apenas alguns graus durante a hibernação." },
    eagle: { name: "Águia", desc: "Aventureiro(a) e perspicaz, você mergulha sem medo nos desafios. Com julgamento rápido e ação ousada, aproveita oportunidades que outros perdem. Tem a ampla perspectiva de quem voa acima de tudo.", traits: ["Aventureiro", "Perspicaz", "Destemido"], funFact: "Águias podem ver 4-8 vezes mais longe que humanos e mergulham a mais de 320 km/h." },
    cat: { name: "Gato", desc: "Independente e elegante, você navega a vida do seu próprio jeito. Com observação aguçada, percebe tudo e pega apenas o que precisa. Um espírito livre com adaptabilidade notável.", traits: ["Independente", "Elegante", "Observador"], funFact: "Gatos passam cerca de 70% da vida dormindo e podem ouvir frequências inaudíveis para humanos." },
    dog: { name: "Cachorro", desc: "Leal e amigável, você cobre de amor e carinho todos ao seu redor. Lê instintivamente as emoções dos outros, e sua simples presença espalha felicidade. Sua genuinidade é algo que todos podem sentir.", traits: ["Leal", "Amigável", "Carinhoso"], funFact: "Cães podem ler emoções humanas e seu olfato é até 100.000 vezes mais sensível que o nosso." },
    parrot: { name: "Papagaio", desc: "Expressivo(a) e carismático(a), você tem o poder de tocar corações. Com habilidades de comunicação excepcionais, encoraja e apoia os outros, e sua energia faz cada encontro brilhar.", traits: ["Expressivo", "Carismático", "Apoiador"], funFact: "Papagaios podem aprender mais de 100 palavras e algumas espécies vivem mais de 80 anos." },
    rabbit: { name: "Coelho", desc: "Gentil e pacífico(a), você busca beleza e harmonia em tudo. Com sensibilidade delicada, encontra felicidade nos pequenos momentos da vida, e seu mundo interior calmo mas firme é verdadeiramente especial. Sua simples presença é um conforto.", traits: ["Gentil", "Pacífico", "Estético"], funFact: "Coelhos têm visão de quase 360 graus e fazem um salto-giro alegre chamado 'binky' quando estão felizes." },
  },
};

type Scores = Partial<Record<AnimalType, number>>;
const scoring: Scores[][] = [
  // Q0: Free time
  [{ lion: 2, dolphin: 2, parrot: 1, dog: 1 }, { wolf: 2, cat: 1, owl: 1, rabbit: 1 }, { bear: 2, dog: 1, rabbit: 1, parrot: 1 }, { fox: 2, cat: 1, wolf: 1, butterfly: 1 }],
  // Q1: Problem solving
  [{ wolf: 2, fox: 1, lion: 1 }, { owl: 2, butterfly: 1, dolphin: 1 }, { parrot: 2, dog: 1, bear: 1 }, { eagle: 2, cat: 1, fox: 1 }],
  // Q2: Group role
  [{ lion: 2, eagle: 1, wolf: 1 }, { parrot: 2, dolphin: 1, dog: 1 }, { bear: 2, owl: 1, rabbit: 1 }, { cat: 2, fox: 1, butterfly: 1 }],
  // Q3: What matters most
  [{ lion: 2, wolf: 1, eagle: 1 }, { dolphin: 2, butterfly: 1, fox: 1 }, { dog: 2, bear: 1, parrot: 1 }, { owl: 2, rabbit: 1, butterfly: 1 }],
  // Q4: Handle stress
  [{ eagle: 2, lion: 1, wolf: 1 }, { dolphin: 2, parrot: 1, dog: 1 }, { cat: 2, owl: 1, butterfly: 1 }, { bear: 2, rabbit: 1, wolf: 1 }],
  // Q5: Communication style
  [{ lion: 2, wolf: 1, eagle: 1 }, { dog: 2, parrot: 1, bear: 1 }, { owl: 2, butterfly: 1, fox: 1 }, { dolphin: 2, eagle: 1, parrot: 1 }],
  // Q6: Ideal vacation
  [{ eagle: 2, dolphin: 1, lion: 1 }, { fox: 2, owl: 1, butterfly: 1 }, { rabbit: 2, bear: 1, cat: 1 }, { dog: 2, parrot: 1, bear: 1 }],
  // Q7: Rules
  [{ bear: 2, dog: 1, wolf: 1 }, { eagle: 2, fox: 1, dolphin: 1 }, { lion: 2, cat: 1, wolf: 1 }, { butterfly: 2, parrot: 1, rabbit: 1, owl: 1 }],
  // Q8: What others admire
  [{ wolf: 2, lion: 1, bear: 1 }, { butterfly: 2, dolphin: 1, fox: 1 }, { dog: 2, rabbit: 1, parrot: 1 }, { cat: 2, owl: 1, eagle: 1 }],
  // Q9: Superpower
  [{ owl: 2, fox: 1, wolf: 1 }, { eagle: 2, lion: 1, dolphin: 1 }, { dog: 2, bear: 1, parrot: 1, rabbit: 1 }, { cat: 2, rabbit: 1, butterfly: 1 }],
];

const CHOICE_LABELS = ["A", "B", "C", "D"];
const CHOICE_COLORS = [
  "hover:border-emerald-500/50",
  "hover:border-teal-500/50",
  "hover:border-green-500/50",
  "hover:border-lime-500/50",
];
const CHOICE_ACCENT = ["text-emerald-400", "text-teal-400", "text-green-400", "text-lime-400"];

export default function AnimalScan({ locale = "ko" }: { locale?: string }) {
  const lang = (VALID_LANGS.includes(locale as Language) ? locale : "ko") as Language;
  const t = ui[lang];
  const q = questions[lang];

  const resultRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<GameState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [resultAnimal, setResultAnimal] = useState<AnimalType | null>(null);
  const [copied, setCopied] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [spinEmoji, setSpinEmoji] = useState("🐾");

  useEffect(() => {
    if (state !== "analyzing") return;

    const scores: Record<AnimalType, number> = {} as Record<AnimalType, number>;
    ANIMAL_TYPES.forEach((a) => { scores[a] = 0; });
    answers.forEach((answerIdx, qIdx) => {
      const s = scoring[qIdx][answerIdx];
      (Object.entries(s) as [AnimalType, number][]).forEach(([animal, points]) => {
        scores[animal] += points;
      });
    });
    const winner = ANIMAL_TYPES.reduce((best, animal) => scores[animal] > scores[best] ? animal : best);

    const allEmojis = ANIMAL_TYPES.map((a) => animalMeta[a].emoji);
    let idx = 0;
    const spinInterval = setInterval(() => {
      setSpinEmoji(allEmojis[idx % allEmojis.length]);
      idx++;
    }, 150);

    const timeout = setTimeout(() => {
      clearInterval(spinInterval);
      setSpinEmoji(animalMeta[winner].emoji);
      setResultAnimal(winner);
      setState("result");
    }, 2800);

    return () => {
      clearInterval(spinInterval);
      clearTimeout(timeout);
    };
  }, [state, answers]);

  const handleAnswer = useCallback(
    (choiceIdx: number) => {
      const newAnswers = [...answers, choiceIdx];
      setAnswers(newAnswers);

      if (newAnswers.length >= 10) {
        setState("analyzing");
      } else {
        setFadeIn(false);
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
          setFadeIn(true);
        }, 150);
      }
    },
    [answers]
  );

  const restart = useCallback(() => {
    setState("intro");
    setCurrentQuestion(0);
    setAnswers([]);
    setResultAnimal(null);
    setCopied(false);
    setFadeIn(true);
    setSpinEmoji("🐾");
  }, []);

  const shareResult = useCallback(() => {
    if (!resultAnimal) return;
    const info = animalInfo[lang][resultAnimal];
    const meta = animalMeta[resultAnimal];
    const text = [
      t.shareText,
      "",
      `${meta.emoji} ${info.name}`,
      info.desc,
      "",
      `#${info.traits.join(" #")}`,
      "",
      `${lang === "ko" ? "https://www.slox.co.kr/animal-scan" : `https://www.slox.co.kr/${lang}/animal-scan`}`,
    ].join("\n");

    if (navigator.share) {
      navigator.share({ title: t.title, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [resultAnimal, lang, t]);

  const handleImageShare = useCallback(async () => {
    if (!resultRef.current) return;
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#0a0a1a",
        scale: 2,
        useCORS: true,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "animal-scan-result.png", { type: "image/png" });
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file] });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "animal-scan-result.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch { /* noop */ }
  }, []);

  return (
    <div className="min-h-screen bg-dark-950">
      <main className="max-w-lg mx-auto px-4 py-8">
        <Link
          href={lang === "ko" ? "/" : `/${lang}`}
          className="inline-flex items-center text-dark-400 hover:text-white text-sm transition-colors mb-6"
        >
          {t.backToMain}
        </Link>

        <div className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6">
          {state === "intro" && (
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-dark-800 rounded-full text-sm text-emerald-400 mb-6">
                {t.badge}
              </span>
              <h1 className="text-3xl font-bold text-white mb-3">{t.title}</h1>
              <p className="text-dark-400 mb-8">{t.subtitle}</p>

              <div className="grid grid-cols-4 gap-2 mb-8">
                {ANIMAL_TYPES.map((animal) => (
                  <div
                    key={animal}
                    className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-3 text-center hover:bg-dark-800 transition-colors"
                  >
                    <div className="text-2xl mb-1">{animalMeta[animal].emoji}</div>
                    <div className="text-[10px] text-dark-500 truncate">{animalInfo[lang][animal].name}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setState("questions")}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform text-lg"
              >
                {t.startButton}
              </button>
            </div>
          )}

          {state === "questions" && (
            <div>
              <div className="mb-6">
                <div className="flex justify-between text-sm text-dark-400 mb-2">
                  <span>
                    {t.questionLabel} {currentQuestion + 1} {t.ofLabel} 10
                  </span>
                  <span>{Math.round(((currentQuestion + 1) / 10) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div
                className={`transition-all duration-300 ${
                  fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                <h2 className="text-xl font-bold text-white mb-6">{q[currentQuestion][0]}</h2>

                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i - 1)}
                      className={`w-full p-4 bg-dark-800/50 hover:bg-dark-800 border border-dark-700 ${CHOICE_COLORS[i - 1]} rounded-xl text-left text-white transition-all hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <span className={`${CHOICE_ACCENT[i - 1]} font-medium mr-2`}>{CHOICE_LABELS[i - 1]}.</span>
                      {q[currentQuestion][i]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {state === "analyzing" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-8">{t.analyzing}</h2>
              <div className="relative w-28 h-28 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping" />
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center text-6xl animate-bounce">
                  {spinEmoji}
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {state === "result" && resultAnimal && (
            <div ref={resultRef} className="text-center">
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-[1px] rounded-3xl mb-6">
                <div className="bg-dark-900 rounded-3xl p-6">
                  <p className="text-dark-400 text-sm mb-2">{t.yourAnimal}</p>
                  <div className="text-7xl mb-3 animate-bounce" style={{ animationDuration: "2s" }}>
                    {animalMeta[resultAnimal].emoji}
                  </div>
                  <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-4">
                    {animalInfo[lang][resultAnimal].name}
                  </h2>

                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {animalInfo[lang][resultAnimal].traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-400"
                      >
                        #{trait}
                      </span>
                    ))}
                  </div>

                  <p className="text-dark-300 text-sm leading-relaxed mb-6">
                    {animalInfo[lang][resultAnimal].desc}
                  </p>

                  <div className="bg-dark-800/50 rounded-xl p-4 text-left mb-6">
                    <p className="text-emerald-400 text-xs font-medium mb-2">{t.funFact}</p>
                    <p className="text-dark-300 text-sm">{animalInfo[lang][resultAnimal].funFact}</p>
                  </div>

                  <div>
                    <p className="text-dark-400 text-xs font-medium mb-3">{t.similarAnimals}</p>
                    <div className="flex justify-center gap-3">
                      {animalMeta[resultAnimal].similar.map((sim) => (
                        <div key={sim} className="bg-dark-800/50 rounded-xl px-4 py-3 text-center min-w-[80px]">
                          <div className="text-2xl mb-1">{animalMeta[sim].emoji}</div>
                          <div className="text-dark-400 text-xs">{animalInfo[lang][sim].name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={shareResult}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:scale-105 transition-transform"
                >
                  {t.shareButton}
                </button>
                <button
                  onClick={handleImageShare}
                  className="px-6 py-3 bg-white/[0.06] border border-white/[0.1] text-white font-medium rounded-xl hover:bg-white/[0.1] transition-colors"
                >
                  📸 {lang === "ko" ? "이미지로 저장" : lang === "ja" ? "画像で保存" : lang === "zh" ? "保存为图片" : "Save as Image"}
                </button>
                <button
                  onClick={restart}
                  className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-colors"
                >
                  {t.retryButton}
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-dark-800">
                <p className="text-dark-500 text-sm mb-4">{t.otherTests}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href={lang === "ko" ? "/mbti" : `/${lang}/mbti`}
                    className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                  >
                    {t.mbtiTest}
                  </Link>
                  <Link
                    href={lang === "ko" ? "/reaction" : `/${lang}/reaction`}
                    className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                  >
                    {t.reactionTest}
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-dark-500 text-sm mb-2">{t.poweredBy}</p>
            <Link
              href="/"
              className="font-black text-sm text-white tracking-tight hover:opacity-80 transition-opacity"
            >
              SLOX
            </Link>
          </div>
        </div>
      </main>

      {copied && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-dark-800 border border-dark-700 text-white px-6 py-3 rounded-xl shadow-lg z-50">
          ✅ {t.copied}
        </div>
      )}
    </div>
  );
}
