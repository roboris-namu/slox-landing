"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Language = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";
type GameState = "intro" | "questions" | "analyzing" | "result";

const VALID_LANGS: Language[] = ["ko", "en", "ja", "zh", "es", "pt", "de", "fr"];

const typeMeta: Record<string, { emoji: string; bestMatch: string; worstMatch: string }> = {
  ISTJ: { emoji: "📋", bestMatch: "ESFP", worstMatch: "ENFP" },
  ISFJ: { emoji: "🛡️", bestMatch: "ESTP", worstMatch: "ENTP" },
  INFJ: { emoji: "🔮", bestMatch: "ENTP", worstMatch: "ESTP" },
  INTJ: { emoji: "🏗️", bestMatch: "ENFP", worstMatch: "ESFP" },
  ISTP: { emoji: "🔧", bestMatch: "ESFJ", worstMatch: "ENFJ" },
  ISFP: { emoji: "🎨", bestMatch: "ESTJ", worstMatch: "ENTJ" },
  INFP: { emoji: "🌸", bestMatch: "ENTJ", worstMatch: "ESTJ" },
  INTP: { emoji: "🧪", bestMatch: "ENFJ", worstMatch: "ESFJ" },
  ESTP: { emoji: "🏄", bestMatch: "ISFJ", worstMatch: "INFJ" },
  ESFP: { emoji: "🎭", bestMatch: "ISTJ", worstMatch: "INTJ" },
  ENFP: { emoji: "🦋", bestMatch: "INTJ", worstMatch: "ISTJ" },
  ENTP: { emoji: "💡", bestMatch: "INFJ", worstMatch: "ISFJ" },
  ESTJ: { emoji: "👔", bestMatch: "ISFP", worstMatch: "INFP" },
  ESFJ: { emoji: "🤝", bestMatch: "ISTP", worstMatch: "INTP" },
  ENFJ: { emoji: "🌟", bestMatch: "INTP", worstMatch: "ISTP" },
  ENTJ: { emoji: "👑", bestMatch: "INFP", worstMatch: "ISFP" },
};

const ui: Record<Language, {
  title: string;
  subtitle: string;
  badge: string;
  startButton: string;
  questionLabel: string;
  ofLabel: string;
  analyzing: string;
  yourType: string;
  keyTraits: string;
  bestMatch: string;
  worstMatch: string;
  shareButton: string;
  retryButton: string;
  otherTests: string;
  reactionTest: string;
  colorGame: string;
  backToMain: string;
  poweredBy: string;
  shareText: string;
  copied: string;
}> = {
  ko: {
    title: "MBTI 성격유형 테스트",
    subtitle: "20개 질문으로 알아보는 나의 MBTI 유형!",
    badge: "🧠 MBTI 성격유형",
    startButton: "테스트 시작하기 🚀",
    questionLabel: "질문",
    ofLabel: "/",
    analyzing: "당신의 성격 유형을 분석 중...",
    yourType: "당신의 MBTI 유형은",
    keyTraits: "핵심 특성",
    bestMatch: "💕 최고의 궁합",
    worstMatch: "⚡ 도전적인 궁합",
    shareButton: "📤 결과 공유하기",
    retryButton: "🔄 다시 테스트",
    otherTests: "다른 테스트도 해보세요!",
    reactionTest: "⚡ 반응속도 테스트",
    colorGame: "🎨 색상 찾기 게임",
    backToMain: "← 메인으로",
    poweredBy: "Powered by",
    shareText: "🧠 MBTI 성격유형 테스트 결과!",
    copied: "결과가 클립보드에 복사되었습니다!",
  },
  en: {
    title: "MBTI Personality Test",
    subtitle: "Discover your MBTI type with 20 questions!",
    badge: "🧠 MBTI Personality",
    startButton: "Start Test 🚀",
    questionLabel: "Question",
    ofLabel: "of",
    analyzing: "Analyzing your personality type...",
    yourType: "Your MBTI type is",
    keyTraits: "Key Traits",
    bestMatch: "💕 Best Match",
    worstMatch: "⚡ Challenging Match",
    shareButton: "📤 Share Result",
    retryButton: "🔄 Try Again",
    otherTests: "Try other tests too!",
    reactionTest: "⚡ Reaction Speed Test",
    colorGame: "🎨 Color Find Game",
    backToMain: "← Home",
    poweredBy: "Powered by",
    shareText: "🧠 MBTI Personality Test Result!",
    copied: "Result copied to clipboard!",
  },
  ja: {
    title: "MBTI性格診断テスト",
    subtitle: "20の質問であなたのMBTIタイプを発見！",
    badge: "🧠 MBTI性格診断",
    startButton: "テスト開始 🚀",
    questionLabel: "質問",
    ofLabel: "/",
    analyzing: "あなたの性格タイプを分析中...",
    yourType: "あなたのMBTIタイプは",
    keyTraits: "主な特徴",
    bestMatch: "💕 最高の相性",
    worstMatch: "⚡ 挑戦的な相性",
    shareButton: "📤 結果を共有",
    retryButton: "🔄 もう一度",
    otherTests: "他のテストも試してみよう！",
    reactionTest: "⚡ 反応速度テスト",
    colorGame: "🎨 色探しゲーム",
    backToMain: "← ホーム",
    poweredBy: "Powered by",
    shareText: "🧠 MBTI性格診断テスト結果！",
    copied: "結果がクリップボードにコピーされました！",
  },
  zh: {
    title: "MBTI性格测试",
    subtitle: "通过20个问题发现你的MBTI类型！",
    badge: "🧠 MBTI性格类型",
    startButton: "开始测试 🚀",
    questionLabel: "问题",
    ofLabel: "/",
    analyzing: "正在分析你的性格类型...",
    yourType: "你的MBTI类型是",
    keyTraits: "核心特质",
    bestMatch: "💕 最佳匹配",
    worstMatch: "⚡ 挑战性匹配",
    shareButton: "📤 分享结果",
    retryButton: "🔄 重新测试",
    otherTests: "试试其他测试吧！",
    reactionTest: "⚡ 反应速度测试",
    colorGame: "🎨 找颜色游戏",
    backToMain: "← 首页",
    poweredBy: "Powered by",
    shareText: "🧠 MBTI性格测试结果！",
    copied: "结果已复制到剪贴板！",
  },
  de: {
    title: "MBTI Persönlichkeitstest",
    subtitle: "Entdecke deinen MBTI-Typ mit 20 Fragen!",
    badge: "🧠 MBTI Persönlichkeit",
    startButton: "Test starten 🚀",
    questionLabel: "Frage",
    ofLabel: "von",
    analyzing: "Dein Persönlichkeitstyp wird analysiert...",
    yourType: "Dein MBTI-Typ ist",
    keyTraits: "Hauptmerkmale",
    bestMatch: "💕 Beste Übereinstimmung",
    worstMatch: "⚡ Herausfordernde Kombination",
    shareButton: "📤 Ergebnis teilen",
    retryButton: "🔄 Nochmal",
    otherTests: "Probiere auch andere Tests!",
    reactionTest: "⚡ Reaktionsgeschwindigkeitstest",
    colorGame: "🎨 Farben-Suchspiel",
    backToMain: "← Startseite",
    poweredBy: "Powered by",
    shareText: "🧠 MBTI Persönlichkeitstest Ergebnis!",
    copied: "Ergebnis in die Zwischenablage kopiert!",
  },
  fr: {
    title: "Test de personnalité MBTI",
    subtitle: "Découvrez votre type MBTI en 20 questions !",
    badge: "🧠 Personnalité MBTI",
    startButton: "Commencer le test 🚀",
    questionLabel: "Question",
    ofLabel: "sur",
    analyzing: "Analyse de votre type de personnalité...",
    yourType: "Votre type MBTI est",
    keyTraits: "Traits clés",
    bestMatch: "💕 Meilleure compatibilité",
    worstMatch: "⚡ Compatibilité difficile",
    shareButton: "📤 Partager le résultat",
    retryButton: "🔄 Recommencer",
    otherTests: "Essayez d'autres tests !",
    reactionTest: "⚡ Test de vitesse de réaction",
    colorGame: "🎨 Jeu de couleurs",
    backToMain: "← Accueil",
    poweredBy: "Powered by",
    shareText: "🧠 Résultat du test de personnalité MBTI !",
    copied: "Résultat copié dans le presse-papiers !",
  },
  es: {
    title: "Test de personalidad MBTI",
    subtitle: "¡Descubre tu tipo MBTI con 20 preguntas!",
    badge: "🧠 Personalidad MBTI",
    startButton: "Comenzar test 🚀",
    questionLabel: "Pregunta",
    ofLabel: "de",
    analyzing: "Analizando tu tipo de personalidad...",
    yourType: "Tu tipo MBTI es",
    keyTraits: "Rasgos clave",
    bestMatch: "💕 Mejor compatibilidad",
    worstMatch: "⚡ Compatibilidad desafiante",
    shareButton: "📤 Compartir resultado",
    retryButton: "🔄 Intentar de nuevo",
    otherTests: "¡Prueba otros tests también!",
    reactionTest: "⚡ Test de velocidad de reacción",
    colorGame: "🎨 Juego de encontrar colores",
    backToMain: "← Inicio",
    poweredBy: "Powered by",
    shareText: "🧠 ¡Resultado del test de personalidad MBTI!",
    copied: "¡Resultado copiado al portapapeles!",
  },
  pt: {
    title: "Teste de personalidade MBTI",
    subtitle: "Descubra seu tipo MBTI com 20 perguntas!",
    badge: "🧠 Personalidade MBTI",
    startButton: "Iniciar teste 🚀",
    questionLabel: "Pergunta",
    ofLabel: "de",
    analyzing: "Analisando seu tipo de personalidade...",
    yourType: "Seu tipo MBTI é",
    keyTraits: "Traços-chave",
    bestMatch: "💕 Melhor combinação",
    worstMatch: "⚡ Combinação desafiadora",
    shareButton: "📤 Compartilhar resultado",
    retryButton: "🔄 Tentar novamente",
    otherTests: "Experimente outros testes também!",
    reactionTest: "⚡ Teste de velocidade de reação",
    colorGame: "🎨 Jogo de encontrar cores",
    backToMain: "← Início",
    poweredBy: "Powered by",
    shareText: "🧠 Resultado do teste de personalidade MBTI!",
    copied: "Resultado copiado para a área de transferência!",
  },
};

// Questions 0-4: E/I, 5-9: S/N, 10-14: T/F, 15-19: J/P
// Each tuple: [question, optionA (E/S/T/J), optionB (I/N/F/P)]
const questions: Record<Language, [string, string, string][]> = {
  ko: [
    ["파티에서 나는 보통...", "여러 사람과 어울리며 에너지를 얻는다", "소수의 친한 친구와 깊은 대화를 나눈다"],
    ["바쁜 한 주가 끝나면...", "친구들을 만나러 나간다", "혼자만의 조용한 시간을 보낸다"],
    ["프로젝트를 진행할 때...", "다른 사람들과 토론하며 아이디어를 낸다", "혼자 깊이 생각한 후에 시작한다"],
    ["나는 에너지가 가장 넘칠 때는...", "많은 사람들에게 둘러싸여 있을 때", "나만의 시간을 가질 때"],
    ["친구들은 나를...", "사교적이고 활발하다고 말한다", "사려 깊고 조용하다고 말한다"],
    ["새로운 것을 배울 때...", "단계별 실용적 설명을 선호한다", "먼저 큰 그림과 이론을 이해하고 싶다"],
    ["나는 더 신뢰하는 것은...", "직접적인 경험과 확인된 사실", "직감과 영감"],
    ["어떤 사건을 설명할 때...", "실제로 일어난 일을 자세히 묘사한다", "그 뒤에 숨겨진 의미나 패턴에 주목한다"],
    ["나는 더 관심 있는 것은...", "실용적이고 검증된 해결책", "혁신적이고 창의적인 가능성"],
    ["대화할 때 나는...", "구체적인 사건과 사실을 이야기하는 것을 좋아한다", "추상적인 아이디어와 미래 가능성을 논하는 것을 좋아한다"],
    ["중요한 결정을 할 때...", "논리와 객관적 분석을 중시한다", "나의 가치관과 다른 사람들의 감정을 고려한다"],
    ["갈등 상황에서 더 중요한 것은...", "감정이 상하더라도 진실을 찾는 것", "감정을 고려하며 조화를 유지하는 것"],
    ["나는 어떤 사람으로 기억되고 싶은가...", "공정하고 능력 있는 사람", "따뜻하고 배려 깊은 사람"],
    ["친구가 실수를 했을 때...", "직접적으로 지적하고 개선을 돕는다", "먼저 위로하고 나중에 부드럽게 이야기한다"],
    ["나를 더 동기부여하는 것은...", "목표 달성과 문제 해결", "타인을 돕고 관계를 쌓는 것"],
    ["나의 작업 공간은 보통...", "깔끔하고 체계적으로 정리되어 있다", "필요한 것들이 손 닿는 곳에 자유롭게 있다"],
    ["여행을 계획할 때...", "세부 일정을 미리 계획한다", "즉흥적으로 결정하는 것을 선호한다"],
    ["마감 기한에 대해 나는...", "여유를 두고 미리 끝내는 편이다", "마감 직전에 집중력이 극대화된다"],
    ["내가 선호하는 생활 방식은...", "구조적이고 규칙적인 일상", "유연하고 변화가 있는 일상"],
    ["계획이 갑자기 바뀌면...", "스트레스를 받고 원래 계획을 고수하고 싶다", "쉽게 적응하고 새로운 상황을 즐긴다"],
  ],
  en: [
    ["At a party, I usually...", "Mingle with many people and enjoy the energy", "Have deep conversations with a few close friends"],
    ["After a busy week, I recharge by...", "Going out to meet friends", "Spending quiet time alone"],
    ["When working on a project, I prefer to...", "Brainstorm ideas through group discussion", "Think deeply on my own before starting"],
    ["I feel most energized when...", "I'm surrounded by many people", "I have time to myself"],
    ["My friends describe me as...", "Outgoing and sociable", "Thoughtful and reserved"],
    ["When learning something new, I prefer...", "Step-by-step practical instructions", "Understanding the big picture and theory first"],
    ["I tend to trust more...", "Direct experience and verified facts", "My intuition and inspiration"],
    ["When describing an event, I...", "Describe what actually happened in detail", "Focus on the meaning or pattern behind it"],
    ["I'm more interested in...", "Practical, proven solutions", "Innovative, creative possibilities"],
    ["In conversations, I enjoy...", "Talking about specific events and facts", "Discussing abstract ideas and future possibilities"],
    ["When making important decisions...", "I prioritize logic and objective analysis", "I consider my values and others' feelings"],
    ["In a conflict, what matters more is...", "Finding the truth, even if feelings get hurt", "Maintaining harmony while considering emotions"],
    ["I want to be remembered as...", "Someone fair and competent", "Someone warm and compassionate"],
    ["When a friend makes a mistake...", "I point it out directly and help them improve", "I comfort them first and bring it up gently later"],
    ["I'm more motivated by...", "Achieving goals and solving problems", "Helping others and building relationships"],
    ["My workspace is usually...", "Neat and systematically organized", "Flexible with things within easy reach"],
    ["When planning a trip...", "I plan the detailed itinerary in advance", "I prefer deciding spontaneously"],
    ["Regarding deadlines, I...", "Finish well ahead of time", "Focus best right before the deadline"],
    ["I prefer a lifestyle that is...", "Structured with regular routines", "Flexible with room for change"],
    ["When plans change suddenly...", "I feel stressed and want to stick to the original plan", "I adapt easily and enjoy the new situation"],
  ],
  ja: [
    ["パーティーでは通常...", "多くの人と交流してエネルギーを得る", "少数の親しい友人と深い会話をする"],
    ["忙しい一週間の後は...", "友達に会いに出かける", "一人で静かな時間を過ごす"],
    ["プロジェクトに取り組む時...", "グループで話し合いながらアイデアを出す", "まず一人でじっくり考える"],
    ["最もエネルギーを感じるのは...", "多くの人に囲まれている時", "自分だけの時間がある時"],
    ["友人たちは私を...", "社交的で活発だと言う", "思慮深く落ち着いていると言う"],
    ["新しいことを学ぶ時...", "段階的で実践的な説明を好む", "まず全体像と理論を理解したい"],
    ["より信頼するのは...", "直接的な経験と確認された事実", "直感とひらめき"],
    ["出来事を説明する時...", "実際に起きたことを詳しく描写する", "その背後にある意味やパターンに注目する"],
    ["より興味があるのは...", "実用的で検証された解決策", "革新的で創造的な可能性"],
    ["会話では...", "具体的な出来事や事実を話すのが好き", "抽象的なアイデアや将来の可能性を論じるのが好き"],
    ["重要な決断をする時...", "論理と客観的分析を重視する", "自分の価値観と他人の感情を考慮する"],
    ["対立の場面でより大切なのは...", "感情を傷つけても真実を見つけること", "感情に配慮しながら調和を保つこと"],
    ["私はどんな人として記憶されたいか...", "公正で有能な人", "温かく思いやりのある人"],
    ["友人が間違いを犯した時...", "直接指摘して改善を助ける", "まず慰めて後で優しく伝える"],
    ["より動機づけられるのは...", "目標達成と問題解決", "人を助けて関係を築くこと"],
    ["私の作業スペースは通常...", "きちんと体系的に整理されている", "必要なものが手の届くところに自由にある"],
    ["旅行を計画する時...", "詳細な日程を事前に計画する", "その場で決めるのを好む"],
    ["締め切りについて私は...", "余裕を持って早めに終わらせる", "締め切り直前に最も集中できる"],
    ["好みのライフスタイルは...", "構造的で規則的な日常", "柔軟で変化のある日常"],
    ["計画が急に変わると...", "ストレスを感じ元の計画を守りたい", "すぐに適応して新しい状況を楽しむ"],
  ],
  zh: [
    ["在派对上，我通常...", "与很多人交流并从中获取能量", "与少数亲密朋友进行深入交谈"],
    ["忙碌一周后，我会...", "出去见朋友", "独自享受安静时光"],
    ["做项目时，我倾向于...", "通过小组讨论来头脑风暴", "先独自深入思考"],
    ["我最有活力的时候是...", "被很多人包围的时候", "拥有独处时间的时候"],
    ["朋友们形容我...", "外向且善于社交", "深思熟虑且内敛"],
    ["学习新东西时，我偏好...", "循序渐进的实用说明", "先了解整体框架和理论"],
    ["我更信赖...", "直接经验和已验证的事实", "直觉和灵感"],
    ["描述一件事时，我会...", "详细描述实际发生的事情", "关注背后的含义或规律"],
    ["我更感兴趣的是...", "实用且经过验证的解决方案", "创新的、有创意的可能性"],
    ["在对话中，我喜欢...", "谈论具体的事件和事实", "讨论抽象的想法和未来的可能性"],
    ["做重要决定时...", "我重视逻辑和客观分析", "我考虑自己的价值观和他人的感受"],
    ["在冲突中更重要的是...", "即使伤害感情也要找到真相", "顾及感受并维持和谐"],
    ["我希望被记住为...", "公正且有能力的人", "温暖且有同情心的人"],
    ["当朋友犯错时...", "直接指出并帮助改进", "先安慰，之后委婉地提出"],
    ["更能激励我的是...", "实现目标和解决问题", "帮助他人和建立关系"],
    ["我的工作空间通常...", "整洁且有系统地整理", "灵活，需要的东西触手可及"],
    ["计划旅行时...", "提前制定详细行程", "喜欢即兴决定"],
    ["关于截止日期，我...", "提前完成，留有余地", "临近截止时最能集中注意力"],
    ["我偏好的生活方式是...", "有结构和规律的日常", "灵活且富有变化的日常"],
    ["当计划突然改变时...", "感到压力，想坚持原计划", "轻松适应并享受新情况"],
  ],
  de: [
    ["Auf einer Party...", "Spreche ich mit vielen Leuten und genieße die Energie", "Führe ich tiefe Gespräche mit wenigen engen Freunden"],
    ["Nach einer stressigen Woche...", "Gehe ich raus und treffe Freunde", "Verbringe ich ruhige Zeit allein"],
    ["Bei einem Projekt bevorzuge ich...", "Brainstorming durch Gruppendiskussion", "Erst allein gründlich nachzudenken"],
    ["Ich fühle mich am energiegeladensten, wenn...", "Ich von vielen Menschen umgeben bin", "Ich Zeit für mich habe"],
    ["Meine Freunde beschreiben mich als...", "Kontaktfreudig und gesellig", "Nachdenklich und zurückhaltend"],
    ["Beim Lernen bevorzuge ich...", "Schrittweise praktische Anleitungen", "Zuerst das Gesamtbild und die Theorie zu verstehen"],
    ["Ich vertraue mehr auf...", "Direkte Erfahrung und überprüfte Fakten", "Meine Intuition und Inspiration"],
    ["Wenn ich ein Ereignis beschreibe...", "Schildere ich detailliert, was passiert ist", "Konzentriere ich mich auf die Bedeutung dahinter"],
    ["Mich interessiert mehr...", "Praktische, bewährte Lösungen", "Innovative, kreative Möglichkeiten"],
    ["In Gesprächen...", "Spreche ich gerne über konkrete Ereignisse und Fakten", "Diskutiere ich gerne abstrakte Ideen und Zukunftsmöglichkeiten"],
    ["Bei wichtigen Entscheidungen...", "Lege ich Wert auf Logik und objektive Analyse", "Berücksichtige ich meine Werte und die Gefühle anderer"],
    ["In einem Konflikt ist wichtiger...", "Die Wahrheit zu finden, auch wenn Gefühle verletzt werden", "Harmonie zu bewahren und Gefühle zu berücksichtigen"],
    ["Ich möchte in Erinnerung bleiben als...", "Fair und kompetent", "Warmherzig und mitfühlend"],
    ["Wenn ein Freund einen Fehler macht...", "Weise ich direkt darauf hin und helfe bei der Verbesserung", "Tröste ich zuerst und spreche es später sanft an"],
    ["Was mich mehr motiviert...", "Ziele erreichen und Probleme lösen", "Anderen helfen und Beziehungen aufbauen"],
    ["Mein Arbeitsplatz ist normalerweise...", "Ordentlich und systematisch organisiert", "Flexibel mit allem in Reichweite"],
    ["Bei der Reiseplanung...", "Plane ich die Details im Voraus", "Entscheide ich lieber spontan"],
    ["Bei Fristen...", "Bin ich frühzeitig fertig", "Bin ich kurz vor der Frist am konzentriertesten"],
    ["Ich bevorzuge einen Lebensstil, der...", "Strukturiert und routiniert ist", "Flexibel und abwechslungsreich ist"],
    ["Wenn sich Pläne plötzlich ändern...", "Fühle ich mich gestresst und möchte am ursprünglichen Plan festhalten", "Passe ich mich leicht an und genieße die neue Situation"],
  ],
  fr: [
    ["Lors d'une fête, je...", "Discute avec beaucoup de gens et profite de l'énergie", "Ai des conversations profondes avec quelques amis proches"],
    ["Après une semaine chargée...", "Je sors retrouver des amis", "Je passe du temps seul(e) au calme"],
    ["Pour un projet, je préfère...", "Réfléchir en groupe par la discussion", "D'abord réfléchir seul(e) en profondeur"],
    ["Je me sens le plus énergique quand...", "Je suis entouré(e) de beaucoup de gens", "J'ai du temps pour moi"],
    ["Mes amis me décrivent comme...", "Sociable et extraverti(e)", "Réfléchi(e) et réservé(e)"],
    ["En apprenant quelque chose de nouveau...", "Je préfère des instructions pratiques étape par étape", "Je veux d'abord comprendre la vue d'ensemble et la théorie"],
    ["Je fais davantage confiance à...", "L'expérience directe et les faits vérifiés", "Mon intuition et mon inspiration"],
    ["En décrivant un événement...", "Je décris en détail ce qui s'est passé", "Je me concentre sur le sens ou le schéma derrière"],
    ["Ce qui m'intéresse le plus...", "Les solutions pratiques et éprouvées", "Les possibilités innovantes et créatives"],
    ["En conversation, j'aime...", "Parler d'événements concrets et de faits", "Discuter d'idées abstraites et de possibilités futures"],
    ["Pour les décisions importantes...", "Je privilégie la logique et l'analyse objective", "Je considère mes valeurs et les sentiments des autres"],
    ["Dans un conflit, le plus important est...", "Trouver la vérité, même si les sentiments sont blessés", "Maintenir l'harmonie en tenant compte des émotions"],
    ["Je veux qu'on se souvienne de moi comme...", "Quelqu'un de juste et compétent", "Quelqu'un de chaleureux et compatissant"],
    ["Quand un ami fait une erreur...", "Je le signale directement et l'aide à s'améliorer", "Je le réconforte d'abord et en parle doucement plus tard"],
    ["Ce qui me motive le plus...", "Atteindre des objectifs et résoudre des problèmes", "Aider les autres et construire des relations"],
    ["Mon espace de travail est généralement...", "Soigné et organisé systématiquement", "Flexible avec tout à portée de main"],
    ["En planifiant un voyage...", "Je prépare un itinéraire détaillé à l'avance", "Je préfère décider spontanément"],
    ["Concernant les délais...", "Je termine bien avant la date limite", "Je me concentre mieux juste avant l'échéance"],
    ["Je préfère un mode de vie...", "Structuré avec des routines régulières", "Flexible avec de la place pour le changement"],
    ["Quand les plans changent soudainement...", "Je me sens stressé(e) et veux m'en tenir au plan original", "Je m'adapte facilement et profite de la nouvelle situation"],
  ],
  es: [
    ["En una fiesta, yo suelo...", "Hablar con mucha gente y disfrutar la energía", "Tener conversaciones profundas con pocos amigos cercanos"],
    ["Después de una semana ocupada...", "Salgo a encontrarme con amigos", "Paso tiempo tranquilo a solas"],
    ["Al trabajar en un proyecto, prefiero...", "Generar ideas mediante discusión en grupo", "Pensar profundamente por mi cuenta primero"],
    ["Me siento con más energía cuando...", "Estoy rodeado/a de mucha gente", "Tengo tiempo para mí"],
    ["Mis amigos me describen como...", "Extrovertido/a y sociable", "Reflexivo/a y reservado/a"],
    ["Al aprender algo nuevo, prefiero...", "Instrucciones prácticas paso a paso", "Entender primero el panorama general y la teoría"],
    ["Confío más en...", "La experiencia directa y los hechos verificados", "Mi intuición e inspiración"],
    ["Al describir un evento...", "Describo en detalle lo que realmente pasó", "Me enfoco en el significado o patrón detrás"],
    ["Me interesa más...", "Soluciones prácticas y comprobadas", "Posibilidades innovadoras y creativas"],
    ["En conversaciones, disfruto...", "Hablar sobre eventos concretos y hechos", "Discutir ideas abstractas y posibilidades futuras"],
    ["Al tomar decisiones importantes...", "Priorizo la lógica y el análisis objetivo", "Considero mis valores y los sentimientos de los demás"],
    ["En un conflicto, lo más importante es...", "Encontrar la verdad, aunque se hieran sentimientos", "Mantener la armonía considerando las emociones"],
    ["Quiero ser recordado/a como...", "Alguien justo/a y competente", "Alguien cálido/a y compasivo/a"],
    ["Cuando un amigo comete un error...", "Lo señalo directamente y ayudo a mejorar", "Primero consuelo y luego lo menciono suavemente"],
    ["Lo que más me motiva...", "Alcanzar metas y resolver problemas", "Ayudar a otros y construir relaciones"],
    ["Mi espacio de trabajo suele estar...", "Ordenado y organizado sistemáticamente", "Flexible con las cosas al alcance"],
    ["Al planificar un viaje...", "Preparo un itinerario detallado con anticipación", "Prefiero decidir espontáneamente"],
    ["Con respecto a los plazos...", "Termino con bastante anticipación", "Me concentro mejor justo antes del plazo"],
    ["Prefiero un estilo de vida...", "Estructurado con rutinas regulares", "Flexible con espacio para cambios"],
    ["Cuando los planes cambian de repente...", "Me estreso y quiero mantener el plan original", "Me adapto fácilmente y disfruto la nueva situación"],
  ],
  pt: [
    ["Em uma festa, eu geralmente...", "Converso com muitas pessoas e aproveito a energia", "Tenho conversas profundas com poucos amigos próximos"],
    ["Depois de uma semana agitada...", "Saio para encontrar amigos", "Passo um tempo tranquilo sozinho/a"],
    ["Ao trabalhar em um projeto, prefiro...", "Trocar ideias em discussão em grupo", "Pensar profundamente sozinho/a primeiro"],
    ["Me sinto com mais energia quando...", "Estou cercado/a de muitas pessoas", "Tenho tempo para mim"],
    ["Meus amigos me descrevem como...", "Extrovertido/a e sociável", "Reflexivo/a e reservado/a"],
    ["Ao aprender algo novo, prefiro...", "Instruções práticas passo a passo", "Entender primeiro o panorama geral e a teoria"],
    ["Confio mais em...", "Experiência direta e fatos verificados", "Minha intuição e inspiração"],
    ["Ao descrever um evento...", "Descrevo em detalhes o que realmente aconteceu", "Foco no significado ou padrão por trás"],
    ["Me interesso mais por...", "Soluções práticas e comprovadas", "Possibilidades inovadoras e criativas"],
    ["Em conversas, gosto de...", "Falar sobre eventos concretos e fatos", "Discutir ideias abstratas e possibilidades futuras"],
    ["Ao tomar decisões importantes...", "Priorizo lógica e análise objetiva", "Considero meus valores e os sentimentos dos outros"],
    ["Em um conflito, o mais importante é...", "Encontrar a verdade, mesmo que sentimentos sejam feridos", "Manter a harmonia considerando as emoções"],
    ["Quero ser lembrado/a como...", "Alguém justo/a e competente", "Alguém caloroso/a e compassivo/a"],
    ["Quando um amigo comete um erro...", "Aponto diretamente e ajudo a melhorar", "Primeiro conforto e depois menciono gentilmente"],
    ["O que mais me motiva...", "Alcançar objetivos e resolver problemas", "Ajudar os outros e construir relacionamentos"],
    ["Meu espaço de trabalho geralmente é...", "Arrumado e organizado sistematicamente", "Flexível com coisas ao alcance das mãos"],
    ["Ao planejar uma viagem...", "Preparo um roteiro detalhado com antecedência", "Prefiro decidir espontaneamente"],
    ["Com relação a prazos...", "Termino com bastante antecedência", "Me concentro melhor perto do prazo"],
    ["Prefiro um estilo de vida...", "Estruturado com rotinas regulares", "Flexível com espaço para mudanças"],
    ["Quando os planos mudam de repente...", "Fico estressado/a e quero manter o plano original", "Me adapto facilmente e aproveito a nova situação"],
  ],
};

const typeInfo: Record<Language, Record<string, { name: string; desc: string; traits: [string, string, string] }>> = {
  ko: {
    ISTJ: { name: "청렴결백한 논리주의자", desc: "실용적이고 사실에 기반한 당신은 책임감을 가장 중요하게 여깁니다. 체계적인 접근과 신뢰성으로 어떤 팀에서든 핵심 역할을 합니다.", traits: ["책임감", "체계적", "성실"] },
    ISFJ: { name: "용감한 수호자", desc: "따뜻하고 헌신적인 당신은 항상 다른 사람의 필요를 먼저 생각합니다. 조용한 강인함과 변함없는 충성심으로 주변 모든 이에게 안정감을 줍니다.", traits: ["배려심", "충성심", "인내심"] },
    INFJ: { name: "선의의 옹호자", desc: "독특한 직관과 공감 능력으로 세상을 바라봅니다. 깊은 통찰력과 남을 돕고자 하는 마음이 당신을 진정으로 특별한 사람으로 만듭니다.", traits: ["통찰력", "이상주의", "공감력"] },
    INTJ: { name: "전략적 사색가", desc: "항상 세 수 앞을 내다보는 전략의 달인입니다. 독립적인 사고와 굳은 결의로 원대한 비전을 현실로 만들어냅니다.", traits: ["전략적", "독립적", "결단력"] },
    ISTP: { name: "만능 재주꾼", desc: "냉철하고 분석적인 당신은 놀라울 정도로 침착하게 문제에 접근합니다. 실전 경험과 논리적 사고로 최고의 문제 해결사 역할을 합니다.", traits: ["분석적", "실용적", "침착"] },
    ISFP: { name: "호기심 많은 예술가", desc: "풍부한 내면 세계를 가진 섬세한 영혼입니다. 삶을 깊이 경험하고 예술, 아름다움, 진정한 교감으로 자신을 표현합니다.", traits: ["창의적", "섬세함", "조화로움"] },
    INFP: { name: "열정적인 중재자", desc: "깊은 가치관에 이끌리는 열정적인 마음을 가진 꿈꾸는 사람입니다. 공감 능력과 창의성으로 주변 사람들에게 세상의 아름다움을 보여줍니다.", traits: ["공감력", "창의적", "이상주의"] },
    INTP: { name: "논리적인 사색가", desc: "복잡한 퍼즐을 풀어내는 것을 즐기는 끝없는 사색가입니다. 뛰어난 논리적 사고와 혁신적 아이디어로 획기적인 발견을 이끌어냅니다.", traits: ["논리적", "호기심", "혁신적"] },
    ESTP: { name: "모험을 즐기는 사업가", desc: "대담하고 에너지 넘치는 당신은 순간의 스릴을 위해 살아갑니다. 빠른 판단력과 두려움 없는 성격으로 어떤 도전도 거뜬히 해냅니다.", traits: ["대담함", "에너지", "순발력"] },
    ESFP: { name: "자유로운 영혼의 연예인", desc: "모든 모임의 분위기 메이커로, 기쁨과 즐거움을 발산합니다. 전염성 있는 열정과 따뜻한 마음으로 모든 사람을 환영하고 활기차게 만듭니다.", traits: ["열정적", "즉흥적", "유쾌함"] },
    ENFP: { name: "재기발랄한 활동가", desc: "무한한 에너지와 상상력으로 가득 찬 창의적인 불꽃입니다. 가능성에 대한 열정과 진심 어린 따뜻함으로 사람들을 끌어당깁니다.", traits: ["상상력", "열정", "사교적"] },
    ENTP: { name: "뜨거운 논쟁을 즐기는 변론가", desc: "지적 도전을 통해 성장하는 날카로운 토론가입니다. 재치 있는 말솜씨와 혁신적 사고로 남들이 보지 못하는 해결책을 찾아냅니다.", traits: ["재치", "카리스마", "전략적"] },
    ESTJ: { name: "엄격한 관리자", desc: "모든 일에 질서와 효율을 가져오는 타고난 리더입니다. 결단력 있는 성격과 강한 직업 윤리로 목표 달성에 탁월한 능력을 발휘합니다.", traits: ["결단력", "효율적", "리더십"] },
    ESFJ: { name: "사교적인 외교관", desc: "따뜻함과 배려로 사람들을 하나로 묶는 사회적 접착제입니다. 넉넉한 마음과 세심한 배려로 모든 사람이 소중하게 느끼도록 만듭니다.", traits: ["따뜻함", "사교적", "헌신적"] },
    ENFJ: { name: "정의로운 사회운동가", desc: "비전과 공감 능력으로 다른 사람들을 영감시키는 타고난 리더입니다. 카리스마와 진심 어린 관심으로 더 나은 세상을 만들어갑니다.", traits: ["카리스마", "공감력", "영감"] },
    ENTJ: { name: "대담한 통솔자", desc: "성공을 향한 멈출 수 없는 추진력을 가진 당당한 존재입니다. 전략적 사고와 대담한 리더십으로 가장 야심찬 계획도 현실로 만듭니다.", traits: ["대담함", "비전", "자신감"] },
  },
  en: {
    ISTJ: { name: "The Inspector", desc: "Practical and fact-oriented, you value responsibility above all. Your systematic approach and reliability make you the backbone of any team.", traits: ["Responsible", "Organized", "Reliable"] },
    ISFJ: { name: "The Protector", desc: "Warm and devoted, you always put others' needs first. Your quiet strength and unwavering loyalty create a safe haven for everyone around you.", traits: ["Caring", "Loyal", "Patient"] },
    INFJ: { name: "The Advocate", desc: "You see the world through a unique lens of intuition and empathy. Your deep insights and desire to help others make you a truly rare and special person.", traits: ["Insightful", "Idealistic", "Compassionate"] },
    INTJ: { name: "The Architect", desc: "A strategic mastermind who always thinks three steps ahead. Your independent thinking and determination turn ambitious visions into reality.", traits: ["Strategic", "Independent", "Determined"] },
    ISTP: { name: "The Virtuoso", desc: "Cool and analytical, you approach problems with impressive calm. Your hands-on expertise and logical mind make you an excellent troubleshooter.", traits: ["Analytical", "Practical", "Calm"] },
    ISFP: { name: "The Adventurer", desc: "A gentle soul with a rich inner world of creativity. You experience life deeply and express yourself through art, beauty, and authentic connections.", traits: ["Creative", "Gentle", "Harmonious"] },
    INFP: { name: "The Mediator", desc: "A dreamer with a passionate heart, driven by deeply held values. Your empathy and creativity inspire those around you to see the beauty in the world.", traits: ["Empathetic", "Creative", "Idealistic"] },
    INTP: { name: "The Logician", desc: "An insatiable thinker who loves unraveling complex puzzles. Your brilliant logical mind and innovative ideas lead to groundbreaking discoveries.", traits: ["Logical", "Curious", "Innovative"] },
    ESTP: { name: "The Entrepreneur", desc: "Bold and energetic, you live for the thrill of the moment. Your quick thinking and fearless nature make you a natural at navigating any challenge.", traits: ["Bold", "Energetic", "Perceptive"] },
    ESFP: { name: "The Entertainer", desc: "The life of every party, you radiate joy and spontaneity. Your infectious enthusiasm and warm heart make everyone feel welcome and alive.", traits: ["Enthusiastic", "Spontaneous", "Playful"] },
    ENFP: { name: "The Campaigner", desc: "A creative spark full of boundless energy and imagination. Your passion for possibilities and genuine warmth draw people to you like a magnet.", traits: ["Imaginative", "Passionate", "Sociable"] },
    ENTP: { name: "The Debater", desc: "A sharp mind that thrives on intellectual challenges. Your quick wit and innovative thinking allow you to see solutions others miss.", traits: ["Quick-witted", "Charismatic", "Strategic"] },
    ESTJ: { name: "The Executive", desc: "A born leader who brings order and efficiency to everything. Your decisive nature and strong work ethic make you exceptionally effective at achieving goals.", traits: ["Decisive", "Efficient", "Authoritative"] },
    ESFJ: { name: "The Consul", desc: "The social glue that holds groups together with warmth and care. Your generous spirit and attentive nature make everyone feel valued and supported.", traits: ["Warm", "Sociable", "Supportive"] },
    ENFJ: { name: "The Protagonist", desc: "A natural-born leader who inspires others with vision and empathy. Your charisma and genuine concern for people make the world a better place.", traits: ["Charismatic", "Empathetic", "Inspiring"] },
    ENTJ: { name: "The Commander", desc: "A commanding presence with an unstoppable drive to succeed. Your strategic mind and bold leadership turn the most ambitious plans into reality.", traits: ["Bold", "Visionary", "Confident"] },
  },
  ja: {
    ISTJ: { name: "清廉な論理主義者", desc: "実用的で事実に基づくあなたは、責任感を最も大切にします。体系的なアプローチと信頼性で、どんなチームでも中核的な存在になります。", traits: ["責任感", "体系的", "誠実"] },
    ISFJ: { name: "勇敢な守護者", desc: "温かく献身的なあなたは、いつも他人のニーズを優先します。静かな強さと揺るぎない忠誠心で、周囲のすべての人に安心感を与えます。", traits: ["思いやり", "忠誠心", "忍耐力"] },
    INFJ: { name: "善意の提唱者", desc: "独自の直感と共感力で世界を見つめています。深い洞察力と人を助けたいという思いが、あなたを本当に特別な存在にしています。", traits: ["洞察力", "理想主義", "共感力"] },
    INTJ: { name: "戦略的思索家", desc: "常に三手先を読む戦略の達人です。独立した思考と固い決意で、壮大なビジョンを現実に変えます。", traits: ["戦略的", "独立的", "決断力"] },
    ISTP: { name: "万能な職人", desc: "冷静で分析的なあなたは、驚くほど落ち着いて問題に取り組みます。実践的な専門知識と論理的思考で、最高の問題解決者です。", traits: ["分析的", "実用的", "冷静"] },
    ISFP: { name: "好奇心旺盛な芸術家", desc: "豊かな内面世界を持つ繊細な魂です。人生を深く体験し、芸術や美、真のつながりを通じて自分を表現します。", traits: ["創造的", "繊細", "調和"] },
    INFP: { name: "情熱的な仲介者", desc: "深い価値観に導かれる情熱的な心を持つ夢想家です。共感力と創造性で周囲の人々に世界の美しさを見せてくれます。", traits: ["共感力", "創造的", "理想主義"] },
    INTP: { name: "論理的な思索家", desc: "複雑なパズルを解くことを愛する果てしない思索家です。優れた論理的思考と革新的なアイデアで画期的な発見を導きます。", traits: ["論理的", "好奇心", "革新的"] },
    ESTP: { name: "冒険好きな起業家", desc: "大胆でエネルギッシュなあなたは、瞬間のスリルのために生きています。素早い判断力と恐れ知らずの性格で、どんな挑戦もこなします。", traits: ["大胆", "エネルギー", "機敏"] },
    ESFP: { name: "自由な魂のエンターテイナー", desc: "すべての場の盛り上げ役として、喜びと楽しさを発信します。伝染性のある情熱と温かい心で、みんなを歓迎し活気づけます。", traits: ["情熱的", "即興的", "陽気"] },
    ENFP: { name: "才気あふれる活動家", desc: "無限のエネルギーと想像力に満ちた創造的な火花です。可能性への情熱と心からの温かさで人々を引きつけます。", traits: ["想像力", "情熱", "社交的"] },
    ENTP: { name: "熱い論争を楽しむ討論者", desc: "知的挑戦を通じて成長する鋭い討論家です。機知に富んだ話術と革新的思考で、他の人が見逃す解決策を見つけます。", traits: ["機知", "カリスマ", "戦略的"] },
    ESTJ: { name: "厳格な管理者", desc: "すべてに秩序と効率をもたらす生まれながらのリーダーです。決断力のある性格と強い職業倫理で、目標達成に卓越した能力を発揮します。", traits: ["決断力", "効率的", "指導力"] },
    ESFJ: { name: "社交的な外交官", desc: "温かさと思いやりで人々をひとつにまとめる社会的な絆です。寛大な心と細やかな気配りで、すべての人が大切にされていると感じさせます。", traits: ["温かさ", "社交的", "献身的"] },
    ENFJ: { name: "正義感あふれる主人公", desc: "ビジョンと共感力で他者をインスパイアする生まれながらのリーダーです。カリスマと心からの関心で、より良い世界を作ります。", traits: ["カリスマ", "共感力", "感化力"] },
    ENTJ: { name: "大胆な指揮官", desc: "成功への止められない推進力を持つ堂々たる存在です。戦略的思考と大胆なリーダーシップで、最も野心的な計画も現実にします。", traits: ["大胆", "ビジョン", "自信"] },
  },
  zh: {
    ISTJ: { name: "尽职尽责的检查员", desc: "务实且注重事实的你，将责任感视为最重要的品质。你系统化的方法和可靠性使你成为任何团队的中流砥柱。", traits: ["责任感", "有条理", "可靠"] },
    ISFJ: { name: "勇敢的守护者", desc: "温暖而忠诚的你，总是把他人的需求放在第一位。你安静的力量和坚定不移的忠心为周围每个人创造了安全感。", traits: ["关怀", "忠诚", "耐心"] },
    INFJ: { name: "善意的倡导者", desc: "你用独特的直觉和共情力看世界。你深刻的洞察力和帮助他人的渴望使你成为真正稀有而特别的人。", traits: ["洞察力", "理想主义", "同理心"] },
    INTJ: { name: "战略思想家", desc: "总是走在前面三步的战略大师。你独立的思维和坚定的意志将宏大的愿景变为现实。", traits: ["战略性", "独立", "果断"] },
    ISTP: { name: "万能工匠", desc: "冷静而善于分析的你，以惊人的沉着面对问题。你的实践经验和逻辑思维使你成为出色的问题解决者。", traits: ["分析力", "务实", "冷静"] },
    ISFP: { name: "充满好奇的艺术家", desc: "拥有丰富内心世界的温柔灵魂。你深刻地体验生活，通过艺术、美和真诚的连接表达自己。", traits: ["创造力", "温柔", "和谐"] },
    INFP: { name: "热情的调停者", desc: "一个由深厚价值观驱动的热情梦想家。你的同理心和创造力激励周围的人看到世界的美好。", traits: ["同理心", "创造力", "理想主义"] },
    INTP: { name: "逻辑思考者", desc: "一个热爱解开复杂谜题的不知疲倦的思考者。你出色的逻辑思维和创新想法常常带来突破性发现。", traits: ["逻辑性", "好奇心", "创新"] },
    ESTP: { name: "冒险企业家", desc: "大胆而充满活力的你，为追求刺激而活。你的快速思维和无畏的性格使你天生善于应对任何挑战。", traits: ["大胆", "活力", "敏锐"] },
    ESFP: { name: "自由灵魂的表演者", desc: "每个派对的灵魂人物，散发着欢乐和即兴的魅力。你富有感染力的热情和温暖的心让每个人都感到被欢迎。", traits: ["热情", "即兴", "活泼"] },
    ENFP: { name: "才华横溢的活动家", desc: "充满无限能量和想象力的创意火花。你对可能性的热情和真诚的温暖像磁铁一样吸引着人们。", traits: ["想象力", "热情", "善于社交"] },
    ENTP: { name: "锐利的辩论家", desc: "在智力挑战中茁壮成长的敏锐思考者。你的机智和创新思维让你看到别人忽略的解决方案。", traits: ["机智", "魅力", "战略性"] },
    ESTJ: { name: "严格的管理者", desc: "为一切带来秩序和效率的天生领导者。你果断的性格和强烈的职业道德使你在实现目标方面卓有成效。", traits: ["果断", "高效", "权威"] },
    ESFJ: { name: "社交外交官", desc: "用温暖和关怀将人们联系在一起的社交纽带。你慷慨的精神和细心的关注让每个人都感到被重视。", traits: ["温暖", "社交", "支持"] },
    ENFJ: { name: "正义的主人公", desc: "用愿景和同理心激励他人的天生领导者。你的魅力和对人的真诚关怀使世界变得更加美好。", traits: ["魅力", "同理心", "激励"] },
    ENTJ: { name: "果敢的指挥官", desc: "拥有不可阻挡的成功驱动力的强大存在。你的战略思维和大胆领导力将最雄心勃勃的计划变为现实。", traits: ["果敢", "远见", "自信"] },
  },
  de: {
    ISTJ: { name: "Der pflichtbewusste Inspektor", desc: "Praktisch und faktenorientiert schätzt du Verantwortung über alles. Dein systematischer Ansatz und deine Zuverlässigkeit machen dich zum Rückgrat jedes Teams.", traits: ["Verantwortungsbewusst", "Organisiert", "Zuverlässig"] },
    ISFJ: { name: "Der tapfere Beschützer", desc: "Warm und hingebungsvoll stellst du immer die Bedürfnisse anderer an erste Stelle. Deine stille Stärke und unerschütterliche Treue schaffen einen sicheren Hafen für alle.", traits: ["Fürsorglich", "Loyal", "Geduldig"] },
    INFJ: { name: "Der einfühlsame Advokat", desc: "Du siehst die Welt durch eine einzigartige Linse aus Intuition und Empathie. Deine tiefen Einsichten und dein Wunsch zu helfen machen dich zu einem wirklich besonderen Menschen.", traits: ["Einsichtsvoll", "Idealistisch", "Mitfühlend"] },
    INTJ: { name: "Der strategische Architekt", desc: "Ein Strategie-Genie, das immer drei Schritte vorausdenkt. Dein unabhängiges Denken und deine Entschlossenheit verwandeln kühne Visionen in Realität.", traits: ["Strategisch", "Unabhängig", "Entschlossen"] },
    ISTP: { name: "Der vielseitige Virtuose", desc: "Kühl und analytisch gehst du Probleme mit beeindruckender Ruhe an. Deine praktische Expertise und logisches Denken machen dich zum hervorragenden Problemlöser.", traits: ["Analytisch", "Praktisch", "Gelassen"] },
    ISFP: { name: "Der neugierige Abenteurer", desc: "Eine sanfte Seele mit einer reichen inneren Welt der Kreativität. Du erlebst das Leben tief und drückst dich durch Kunst, Schönheit und echte Verbindungen aus.", traits: ["Kreativ", "Sanft", "Harmonisch"] },
    INFP: { name: "Der leidenschaftliche Mediator", desc: "Ein Träumer mit leidenschaftlichem Herzen, angetrieben von tiefen Werten. Deine Empathie und Kreativität inspirieren andere, die Schönheit der Welt zu sehen.", traits: ["Empathisch", "Kreativ", "Idealistisch"] },
    INTP: { name: "Der logische Denker", desc: "Ein unermüdlicher Denker, der es liebt, komplexe Rätsel zu lösen. Dein brillanter logischer Verstand und innovative Ideen führen zu bahnbrechenden Entdeckungen.", traits: ["Logisch", "Neugierig", "Innovativ"] },
    ESTP: { name: "Der abenteuerlustige Unternehmer", desc: "Kühn und energiegeladen lebst du für den Nervenkitzel des Moments. Dein schnelles Denken und furchtloses Wesen meistern jede Herausforderung.", traits: ["Kühn", "Energisch", "Scharfsinnig"] },
    ESFP: { name: "Der lebenslustige Entertainer", desc: "Die Seele jeder Party, du strahlst Freude und Spontaneität aus. Deine ansteckende Begeisterung und dein warmes Herz lassen jeden willkommen fühlen.", traits: ["Begeistert", "Spontan", "Verspielt"] },
    ENFP: { name: "Der einfallsreiche Aktivist", desc: "Ein kreativer Funke voller grenzenloser Energie und Fantasie. Deine Leidenschaft für Möglichkeiten und echte Wärme ziehen Menschen magisch an.", traits: ["Fantasievoll", "Leidenschaftlich", "Gesellig"] },
    ENTP: { name: "Der scharfsinnige Debattierer", desc: "Ein scharfer Geist, der bei intellektuellen Herausforderungen aufblüht. Dein Witz und innovatives Denken finden Lösungen, die andere übersehen.", traits: ["Schlagfertig", "Charismatisch", "Strategisch"] },
    ESTJ: { name: "Der strenge Direktor", desc: "Ein geborener Anführer, der Ordnung und Effizienz in alles bringt. Deine entschlossene Art und starke Arbeitsmoral machen dich außergewöhnlich effektiv.", traits: ["Entschlossen", "Effizient", "Autoritativ"] },
    ESFJ: { name: "Der herzliche Konsul", desc: "Der soziale Klebstoff, der Gruppen mit Wärme und Fürsorge zusammenhält. Dein großzügiger Geist und deine aufmerksame Art geben jedem das Gefühl, geschätzt zu werden.", traits: ["Warmherzig", "Gesellig", "Unterstützend"] },
    ENFJ: { name: "Der inspirierende Protagonist", desc: "Ein geborener Anführer, der andere mit Vision und Empathie inspiriert. Dein Charisma und echtes Mitgefühl machen die Welt zu einem besseren Ort.", traits: ["Charismatisch", "Empathisch", "Inspirierend"] },
    ENTJ: { name: "Der kühne Kommandant", desc: "Eine beeindruckende Präsenz mit unaufhaltsamem Erfolgswillen. Dein strategisches Denken und kühne Führung machen selbst die kühnsten Pläne wahr.", traits: ["Kühn", "Visionär", "Selbstbewusst"] },
  },
  fr: {
    ISTJ: { name: "L'Inspecteur consciencieux", desc: "Pratique et factuel, tu valorises la responsabilité par-dessus tout. Ton approche systématique et ta fiabilité font de toi le pilier de toute équipe.", traits: ["Responsable", "Organisé", "Fiable"] },
    ISFJ: { name: "Le Défenseur dévoué", desc: "Chaleureux et dévoué, tu mets toujours les besoins des autres en premier. Ta force tranquille et ta loyauté inébranlable créent un havre de paix pour tous.", traits: ["Attentionné", "Loyal", "Patient"] },
    INFJ: { name: "L'Avocat bienveillant", desc: "Tu vois le monde à travers un prisme unique d'intuition et d'empathie. Ta perspicacité et ton désir d'aider font de toi une personne vraiment spéciale.", traits: ["Perspicace", "Idéaliste", "Compatissant"] },
    INTJ: { name: "L'Architecte stratégique", desc: "Un génie stratégique qui pense toujours trois coups d'avance. Ta pensée indépendante et ta détermination transforment les visions ambitieuses en réalité.", traits: ["Stratégique", "Indépendant", "Déterminé"] },
    ISTP: { name: "Le Virtuose polyvalent", desc: "Calme et analytique, tu abordes les problèmes avec un sang-froid impressionnant. Ton expertise pratique et ta logique font de toi un excellent résolveur de problèmes.", traits: ["Analytique", "Pratique", "Calme"] },
    ISFP: { name: "L'Aventurier créatif", desc: "Une âme douce avec un riche monde intérieur de créativité. Tu vis la vie intensément et t'exprimes à travers l'art, la beauté et les connexions authentiques.", traits: ["Créatif", "Doux", "Harmonieux"] },
    INFP: { name: "Le Médiateur passionné", desc: "Un rêveur au cœur passionné, guidé par des valeurs profondes. Ton empathie et ta créativité inspirent les autres à voir la beauté du monde.", traits: ["Empathique", "Créatif", "Idéaliste"] },
    INTP: { name: "Le Logicien brillant", desc: "Un penseur insatiable qui adore résoudre des puzzles complexes. Ton esprit logique brillant et tes idées innovantes mènent à des découvertes révolutionnaires.", traits: ["Logique", "Curieux", "Innovant"] },
    ESTP: { name: "L'Entrepreneur audacieux", desc: "Audacieux et énergique, tu vis pour l'excitation du moment. Ta pensée rapide et ton intrépidité te permettent de relever tous les défis.", traits: ["Audacieux", "Énergique", "Perspicace"] },
    ESFP: { name: "L'Amuseur rayonnant", desc: "L'âme de chaque fête, tu rayonnes de joie et de spontanéité. Ton enthousiasme contagieux et ton grand cœur font que tout le monde se sent bienvenu.", traits: ["Enthousiaste", "Spontané", "Joueur"] },
    ENFP: { name: "L'Inspirateur créatif", desc: "Une étincelle créative pleine d'énergie et d'imagination sans limites. Ta passion pour les possibilités et ta chaleur authentique attirent les gens comme un aimant.", traits: ["Imaginatif", "Passionné", "Sociable"] },
    ENTP: { name: "Le Débatteur ingénieux", desc: "Un esprit vif qui s'épanouit dans les défis intellectuels. Ton intelligence et ta pensée innovante te permettent de voir des solutions que d'autres manquent.", traits: ["Vif d'esprit", "Charismatique", "Stratégique"] },
    ESTJ: { name: "Le Directeur rigoureux", desc: "Un leader né qui apporte ordre et efficacité à tout. Ta nature décisive et ton éthique de travail te rendent exceptionnellement efficace.", traits: ["Décisif", "Efficace", "Autoritaire"] },
    ESFJ: { name: "Le Consul chaleureux", desc: "Le ciment social qui unit les groupes avec chaleur et attention. Ton esprit généreux et ta nature attentive font que chacun se sent valorisé.", traits: ["Chaleureux", "Sociable", "Bienveillant"] },
    ENFJ: { name: "Le Protagoniste inspirant", desc: "Un leader né qui inspire les autres avec vision et empathie. Ton charisme et ton souci sincère des gens rendent le monde meilleur.", traits: ["Charismatique", "Empathique", "Inspirant"] },
    ENTJ: { name: "Le Commandant audacieux", desc: "Une présence imposante avec une volonté de réussir inarrêtable. Ton esprit stratégique et ton leadership audacieux concrétisent les plans les plus ambitieux.", traits: ["Audacieux", "Visionnaire", "Confiant"] },
  },
  es: {
    ISTJ: { name: "El Inspector responsable", desc: "Práctico y orientado a los hechos, valoras la responsabilidad por encima de todo. Tu enfoque sistemático y fiabilidad te convierten en el pilar de cualquier equipo.", traits: ["Responsable", "Organizado", "Confiable"] },
    ISFJ: { name: "El Defensor valiente", desc: "Cálido y dedicado, siempre pones las necesidades de los demás primero. Tu fuerza silenciosa y lealtad inquebrantable crean un refugio seguro para todos.", traits: ["Atento", "Leal", "Paciente"] },
    INFJ: { name: "El Abogado empático", desc: "Ves el mundo a través de una lente única de intuición y empatía. Tu profunda perspicacia y deseo de ayudar te hacen una persona verdaderamente especial.", traits: ["Perspicaz", "Idealista", "Compasivo"] },
    INTJ: { name: "El Arquitecto estratégico", desc: "Un genio estratégico que siempre piensa tres pasos adelante. Tu pensamiento independiente y determinación convierten visiones ambiciosas en realidad.", traits: ["Estratégico", "Independiente", "Determinado"] },
    ISTP: { name: "El Virtuoso versátil", desc: "Frío y analítico, abordas los problemas con una calma impresionante. Tu experiencia práctica y mente lógica te hacen un excelente solucionador de problemas.", traits: ["Analítico", "Práctico", "Sereno"] },
    ISFP: { name: "El Aventurero curioso", desc: "Un alma gentil con un rico mundo interior de creatividad. Experimentas la vida profundamente y te expresas a través del arte, la belleza y las conexiones auténticas.", traits: ["Creativo", "Gentil", "Armonioso"] },
    INFP: { name: "El Mediador apasionado", desc: "Un soñador con un corazón apasionado, guiado por valores profundos. Tu empatía y creatividad inspiran a quienes te rodean a ver la belleza del mundo.", traits: ["Empático", "Creativo", "Idealista"] },
    INTP: { name: "El Lógico brillante", desc: "Un pensador insaciable que ama resolver puzzles complejos. Tu brillante mente lógica e ideas innovadoras conducen a descubrimientos revolucionarios.", traits: ["Lógico", "Curioso", "Innovador"] },
    ESTP: { name: "El Emprendedor audaz", desc: "Audaz y enérgico, vives por la emoción del momento. Tu pensamiento rápido y naturaleza intrépida te hacen un experto en superar cualquier desafío.", traits: ["Audaz", "Enérgico", "Perceptivo"] },
    ESFP: { name: "El Animador radiante", desc: "El alma de cada fiesta, irradias alegría y espontaneidad. Tu entusiasmo contagioso y corazón cálido hacen que todos se sientan bienvenidos.", traits: ["Entusiasta", "Espontáneo", "Divertido"] },
    ENFP: { name: "El Activista creativo", desc: "Una chispa creativa llena de energía e imaginación sin límites. Tu pasión por las posibilidades y calidez genuina atraen a las personas como un imán.", traits: ["Imaginativo", "Apasionado", "Sociable"] },
    ENTP: { name: "El Innovador ingenioso", desc: "Una mente aguda que prospera con desafíos intelectuales. Tu ingenio y pensamiento innovador te permiten ver soluciones que otros pasan por alto.", traits: ["Ingenioso", "Carismático", "Estratégico"] },
    ESTJ: { name: "El Director firme", desc: "Un líder nato que aporta orden y eficiencia a todo. Tu naturaleza decisiva y fuerte ética de trabajo te hacen excepcionalmente efectivo.", traits: ["Decisivo", "Eficiente", "Autoritario"] },
    ESFJ: { name: "El Cónsul cálido", desc: "El pegamento social que une a los grupos con calidez y cuidado. Tu espíritu generoso y naturaleza atenta hacen que todos se sientan valorados.", traits: ["Cálido", "Sociable", "Solidario"] },
    ENFJ: { name: "El Protagonista inspirador", desc: "Un líder nato que inspira a otros con visión y empatía. Tu carisma y preocupación genuina por las personas hacen del mundo un lugar mejor.", traits: ["Carismático", "Empático", "Inspirador"] },
    ENTJ: { name: "El Comandante audaz", desc: "Una presencia imponente con un impulso imparable de triunfar. Tu mente estratégica y liderazgo audaz convierten los planes más ambiciosos en realidad.", traits: ["Audaz", "Visionario", "Seguro"] },
  },
  pt: {
    ISTJ: { name: "O Inspetor responsável", desc: "Prático e orientado por fatos, você valoriza a responsabilidade acima de tudo. Sua abordagem sistemática e confiabilidade fazem de você a base de qualquer equipe.", traits: ["Responsável", "Organizado", "Confiável"] },
    ISFJ: { name: "O Defensor corajoso", desc: "Caloroso e dedicado, você sempre coloca as necessidades dos outros em primeiro lugar. Sua força silenciosa e lealdade inabalável criam um refúgio seguro para todos.", traits: ["Atencioso", "Leal", "Paciente"] },
    INFJ: { name: "O Advogado empático", desc: "Você vê o mundo através de uma lente única de intuição e empatia. Sua profunda percepção e desejo de ajudar fazem de você uma pessoa verdadeiramente especial.", traits: ["Perspicaz", "Idealista", "Compassivo"] },
    INTJ: { name: "O Arquiteto estratégico", desc: "Um gênio estratégico que sempre pensa três passos à frente. Seu pensamento independente e determinação transformam visões ambiciosas em realidade.", traits: ["Estratégico", "Independente", "Determinado"] },
    ISTP: { name: "O Virtuoso versátil", desc: "Calmo e analítico, você aborda problemas com uma calma impressionante. Sua experiência prática e mente lógica fazem de você um excelente solucionador de problemas.", traits: ["Analítico", "Prático", "Calmo"] },
    ISFP: { name: "O Aventureiro curioso", desc: "Uma alma gentil com um rico mundo interior de criatividade. Você experimenta a vida profundamente e se expressa através da arte, beleza e conexões autênticas.", traits: ["Criativo", "Gentil", "Harmonioso"] },
    INFP: { name: "O Mediador apaixonado", desc: "Um sonhador com um coração apaixonado, guiado por valores profundos. Sua empatia e criatividade inspiram as pessoas ao seu redor a ver a beleza do mundo.", traits: ["Empático", "Criativo", "Idealista"] },
    INTP: { name: "O Lógico brilhante", desc: "Um pensador insaciável que adora desvendar quebra-cabeças complexos. Sua mente lógica brilhante e ideias inovadoras levam a descobertas revolucionárias.", traits: ["Lógico", "Curioso", "Inovador"] },
    ESTP: { name: "O Empreendedor audaz", desc: "Ousado e enérgico, você vive pela emoção do momento. Seu pensamento rápido e natureza destemida fazem de você um natural em superar qualquer desafio.", traits: ["Ousado", "Enérgico", "Perceptivo"] },
    ESFP: { name: "O Animador radiante", desc: "A alma de toda festa, você irradia alegria e espontaneidade. Seu entusiasmo contagiante e coração caloroso fazem todos se sentirem bem-vindos.", traits: ["Entusiasta", "Espontâneo", "Divertido"] },
    ENFP: { name: "O Ativista criativo", desc: "Uma faísca criativa cheia de energia e imaginação sem limites. Sua paixão por possibilidades e calor genuíno atraem as pessoas como um ímã.", traits: ["Imaginativo", "Apaixonado", "Sociável"] },
    ENTP: { name: "O Inovador engenhoso", desc: "Uma mente afiada que prospera em desafios intelectuais. Sua sagacidade e pensamento inovador permitem ver soluções que outros não percebem.", traits: ["Sagaz", "Carismático", "Estratégico"] },
    ESTJ: { name: "O Executivo firme", desc: "Um líder nato que traz ordem e eficiência a tudo. Sua natureza decisiva e forte ética de trabalho o tornam excepcionalmente eficaz.", traits: ["Decisivo", "Eficiente", "Autoritário"] },
    ESFJ: { name: "O Cônsul caloroso", desc: "A cola social que une grupos com calor e cuidado. Seu espírito generoso e natureza atenciosa fazem todos se sentirem valorizados.", traits: ["Caloroso", "Sociável", "Solidário"] },
    ENFJ: { name: "O Protagonista inspirador", desc: "Um líder nato que inspira outros com visão e empatia. Seu carisma e preocupação genuína com as pessoas tornam o mundo um lugar melhor.", traits: ["Carismático", "Empático", "Inspirador"] },
    ENTJ: { name: "O Comandante audaz", desc: "Uma presença imponente com um impulso imparável para o sucesso. Sua mente estratégica e liderança ousada transformam os planos mais ambiciosos em realidade.", traits: ["Ousado", "Visionário", "Confiante"] },
  },
};

export default function MbtiTest({ locale = "ko" }: { locale?: string }) {
  const lang = (VALID_LANGS.includes(locale as Language) ? locale : "ko") as Language;
  const t = ui[lang];
  const q = questions[lang];

  const [state, setState] = useState<GameState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<("a" | "b")[]>([]);
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const [revealedLetters, setRevealedLetters] = useState<string[]>(["?", "?", "?", "?"]);
  const [copied, setCopied] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (state !== "analyzing") return;

    const scores: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    const dims = ["EI", "EI", "EI", "EI", "EI", "SN", "SN", "SN", "SN", "SN", "TF", "TF", "TF", "TF", "TF", "JP", "JP", "JP", "JP", "JP"];
    answers.forEach((answer, idx) => {
      const dim = dims[idx];
      scores[answer === "a" ? dim[0] : dim[1]]++;
    });
    const type =
      (scores.E >= scores.I ? "E" : "I") +
      (scores.S >= scores.N ? "S" : "N") +
      (scores.T >= scores.F ? "T" : "F") +
      (scores.J >= scores.P ? "J" : "P");

    const letters = type.split("");
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    letters.forEach((letter, i) => {
      timeouts.push(
        setTimeout(() => {
          setRevealedLetters((prev) => {
            const next = [...prev];
            next[i] = letter;
            return next;
          });
        }, 600 + i * 500)
      );
    });

    timeouts.push(
      setTimeout(() => {
        setMbtiType(type);
        setState("result");
      }, 3200)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [state, answers]);

  const handleAnswer = useCallback(
    (choice: "a" | "b") => {
      const newAnswers = [...answers, choice];
      setAnswers(newAnswers);

      if (newAnswers.length >= 20) {
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
    setMbtiType(null);
    setRevealedLetters(["?", "?", "?", "?"]);
    setCopied(false);
    setFadeIn(true);
  }, []);

  const shareResult = useCallback(() => {
    if (!mbtiType) return;
    const info = typeInfo[lang][mbtiType];
    const meta = typeMeta[mbtiType];
    const text = [
      t.shareText,
      "",
      `${meta.emoji} ${mbtiType} - ${info.name}`,
      info.desc,
      "",
      `#${info.traits.join(" #")}`,
      "",
      `${t.bestMatch}: ${typeMeta[mbtiType].bestMatch} ${typeMeta[typeMeta[mbtiType].bestMatch].emoji}`,
      "",
      "slox.co.kr",
    ].join("\n");

    if (navigator.share) {
      navigator.share({ title: t.title, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [mbtiType, lang, t]);

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
              <span className="inline-block px-4 py-1.5 bg-dark-800 rounded-full text-sm text-amber-400 mb-6">
                {t.badge}
              </span>
              <h1 className="text-3xl font-bold text-white mb-3">{t.title}</h1>
              <p className="text-dark-400 mb-8">{t.subtitle}</p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  ["E", "I", "Energy"],
                  ["S", "N", "Perception"],
                  ["T", "F", "Decision"],
                  ["J", "P", "Lifestyle"],
                ].map(([a, b, label]) => (
                  <div
                    key={label}
                    className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-3 text-center"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-amber-400 font-bold text-lg">{a}</span>
                      <span className="text-dark-500 text-sm">↔</span>
                      <span className="text-purple-400 font-bold text-lg">{b}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setState("questions")}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform text-lg"
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
                    {t.questionLabel} {currentQuestion + 1} {t.ofLabel} 20
                  </span>
                  <span>{Math.round(((currentQuestion + 1) / 20) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentQuestion + 1) / 20) * 100}%` }}
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
                  <button
                    onClick={() => handleAnswer("a")}
                    className="w-full p-4 bg-dark-800/50 hover:bg-dark-800 border border-dark-700 hover:border-amber-500/50 rounded-xl text-left text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="text-amber-400 font-medium mr-2">A.</span>
                    {q[currentQuestion][1]}
                  </button>
                  <button
                    onClick={() => handleAnswer("b")}
                    className="w-full p-4 bg-dark-800/50 hover:bg-dark-800 border border-dark-700 hover:border-purple-500/50 rounded-xl text-left text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="text-purple-400 font-medium mr-2">B.</span>
                    {q[currentQuestion][2]}
                  </button>
                </div>
              </div>
            </div>
          )}

          {state === "analyzing" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-8">{t.analyzing}</h2>
              <div className="flex justify-center gap-3 mb-8">
                {revealedLetters.map((letter, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black transition-all duration-500 ${
                      letter !== "?"
                        ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white scale-110"
                        : "bg-dark-800 text-dark-500 scale-100"
                    }`}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2">
                <span
                  className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}

          {state === "result" && mbtiType && (
            <div className="text-center">
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-[1px] rounded-3xl mb-6">
                <div className="bg-dark-900 rounded-3xl p-6">
                  <p className="text-dark-400 text-sm mb-2">{t.yourType}</p>
                  <div className="text-6xl mb-3">{typeMeta[mbtiType].emoji}</div>
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-1">
                    {mbtiType}
                  </h2>
                  <p className="text-lg font-bold text-white mb-4">
                    {typeInfo[lang][mbtiType].name}
                  </p>

                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {typeInfo[lang][mbtiType].traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 bg-dark-800 rounded-full text-sm text-dark-300"
                      >
                        #{trait}
                      </span>
                    ))}
                  </div>

                  <p className="text-dark-300 text-sm leading-relaxed mb-6">
                    {typeInfo[lang][mbtiType].desc}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="bg-dark-800/50 rounded-xl p-3">
                      <p className="text-pink-400 text-xs font-medium mb-1">{t.bestMatch}</p>
                      <p className="text-white text-sm font-bold">
                        {typeMeta[mbtiType].bestMatch}{" "}
                        {typeMeta[typeMeta[mbtiType].bestMatch].emoji}
                      </p>
                      <p className="text-dark-400 text-xs mt-0.5">
                        {typeInfo[lang][typeMeta[mbtiType].bestMatch].name}
                      </p>
                    </div>
                    <div className="bg-dark-800/50 rounded-xl p-3">
                      <p className="text-orange-400 text-xs font-medium mb-1">{t.worstMatch}</p>
                      <p className="text-white text-sm font-bold">
                        {typeMeta[mbtiType].worstMatch}{" "}
                        {typeMeta[typeMeta[mbtiType].worstMatch].emoji}
                      </p>
                      <p className="text-dark-400 text-xs mt-0.5">
                        {typeInfo[lang][typeMeta[mbtiType].worstMatch].name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={shareResult}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:scale-105 transition-transform"
                >
                  {t.shareButton}
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
                    href={lang === "ko" ? "/reaction" : `/${lang}/reaction`}
                    className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                  >
                    {t.reactionTest}
                  </Link>
                  <Link
                    href={lang === "ko" ? "/color" : `/${lang}/color`}
                    className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                  >
                    {t.colorGame}
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
