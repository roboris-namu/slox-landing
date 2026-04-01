"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

type GameState = "intro" | "questions" | "analyzing" | "result";
type Lang = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

// 다국어 번역
const translations: Record<Lang, {
  title: string;
  subtitle: string;
  tagline: string;
  startButton: string;
  question: string;
  analyzing: string;
  strength: string;
  weakness: string;
  compatibility: string;
  compatibilityText: string;
  shareButton: string;
  retryButton: string;
  otherTests: string;
  reactionTest: string;
  colorGame: string;
  poweredBy: string;

  backToMain: string;
  shareText: string;
  copied: string;
  slotAlt: string;
  characters: {
    leader: { name: string; title: string; traits: string[]; description: string; strength: string; weakness: string; };
    josoon: { name: string; title: string; traits: string[]; description: string; strength: string; weakness: string; };
    mecha: { name: string; title: string; traits: string[]; description: string; strength: string; weakness: string; };
    wild: { name: string; title: string; traits: string[]; description: string; strength: string; weakness: string; };
    gentle: { name: string; title: string; traits: string[]; description: string; strength: string; weakness: string; };
    art: { name: string; title: string; traits: string[]; description: string; strength: string; weakness: string; };
    wizard: { name: string; title: string; traits: string[]; description: string; strength: string; weakness: string; };
    doctor: { name: string; title: string; traits: string[]; description: string; strength: string; weakness: string; };
  };
  questions: { question: string; answers: string[]; }[];
}> = {
  ko: {
    title: "황소",
    subtitle: "나와 닮은",
    tagline: "8가지 질문으로 알아보는 나의 황소 캐릭터!",
    startButton: "테스트 시작하기 🚀",
    question: "질문",
    analyzing: "당신의 황소를 찾는 중...",
    strength: "💪 강점",
    weakness: "⚠️ 주의",
    compatibility: "💕 찰떡궁합",
    compatibilityText: "와(과) 최고의 케미!",
    shareButton: "📤 결과 공유하기",
    retryButton: "🔄 다시 테스트",
    otherTests: "다른 테스트도 해보세요!",
    reactionTest: "⚡ 반응속도 테스트",
    colorGame: "🎨 색상 찾기 게임",
    poweredBy: "Powered by",

    backToMain: "← 메인으로",
    shareText: "🐂 나와 닮은 황소 테스트 결과!",
    copied: "결과가 클립보드에 복사되었습니다!",
    slotAlt: "슬롯",
    characters: {
      leader: { name: "리더황", title: "타고난 리더", traits: ["책임감", "결단력", "신뢰"], description: "당신은 팀을 이끄는 천부적인 리더예요! 어떤 상황에서도 흔들리지 않는 듬직함과 책임감으로 주변 사람들에게 신뢰를 줍니다.", strength: "위기 상황에서 빛나는 판단력", weakness: "가끔 혼자 모든 걸 짊어지려 해요" },
      josoon: { name: "조순", title: "따뜻한 치유자", traits: ["배려심", "공감력", "따뜻함"], description: "당신은 주변 사람들을 편안하게 만드는 힐러예요! 뛰어난 공감 능력과 따뜻한 마음으로 모두에게 사랑받습니다.", strength: "누구와도 잘 어울리는 친화력", weakness: "거절을 잘 못해요" },
      mecha: { name: "메카황", title: "냉철한 전략가", traits: ["논리적", "효율적", "카리스마"], description: "당신은 감정보다 이성을 중시하는 전략가예요! 냉철한 판단력과 강력한 카리스마로 목표를 향해 돌진합니다.", strength: "복잡한 문제도 척척 해결", weakness: "가끔 너무 차가워 보여요" },
      wild: { name: "야성황", title: "자유로운 영혼", traits: ["자유로움", "솔직함", "열정"], description: "당신은 거침없이 자신의 길을 가는 자유인이에요! 솔직하고 열정적인 성격으로 주변에 활력을 불어넣습니다.", strength: "어떤 도전도 두려워하지 않음", weakness: "규칙에 얽매이는 걸 싫어해요" },
      gentle: { name: "젠틀황", title: "세련된 지성인", traits: ["품위", "지적", "매너"], description: "당신은 우아함과 지성을 겸비한 신사예요! 세련된 매너와 깊은 교양으로 어디서든 존경받습니다.", strength: "어떤 자리에서도 빛나는 품격", weakness: "완벽주의 성향이 있어요" },
      art: { name: "아트황", title: "창의적 예술가", traits: ["창의력", "감성", "독창성"], description: "당신은 세상을 다른 시각으로 보는 예술가예요! 풍부한 상상력과 독특한 감성으로 새로운 것을 창조합니다.", strength: "누구도 생각 못한 아이디어", weakness: "현실적인 면이 부족할 때가 있어요" },
      wizard: { name: "위자드황", title: "신비로운 직감러", traits: ["직관력", "신비로움", "통찰력"], description: "당신은 남다른 직감을 가진 신비로운 존재예요! 깊은 통찰력으로 다른 사람이 보지 못하는 것을 봅니다.", strength: "미래를 내다보는 듯한 예지력", weakness: "가끔 현실과 동떨어져 보여요" },
      doctor: { name: "닥터황", title: "분석하는 천재", traits: ["분석력", "호기심", "탐구심"], description: "당신은 끊임없이 배우고 연구하는 학자예요! 뛰어난 분석력과 탐구심으로 진리를 추구합니다.", strength: "모든 것의 원리를 파악하는 능력", weakness: "너무 깊이 파고들 때가 있어요" },
    },
    questions: [
      { question: "친구들 사이에서 나는 주로...", answers: ["모임을 주도하고 이끄는 편", "분위기 메이커! 다 웃게 만듦", "조용히 듣고 공감해주는 편", "필요할 때만 핵심을 딱 말함"] },
      { question: "스트레스 받을 때 나는...", answers: ["운동이나 활동적인 걸로 풀어", "혼자 조용히 생각 정리해", "친구들 만나서 수다 떨어", "계획 세우고 해결책 찾아"] },
      { question: "첫인상이 어떻다는 말을 듣나요?", answers: ["믿음직스럽고 듬직해 보인대", "친근하고 편안해 보인대", "카리스마 있고 강해 보인대", "신비롭고 독특해 보인대"] },
      { question: "여행 스타일은?", answers: ["철저하게 계획 세워서 가", "즉흥적으로! 발길 닿는 대로", "일행에 맞춰서 유연하게", "내가 코스 짜고 가이드 해"] },
      { question: "갈등 상황에서 나는...", answers: ["중재자 역할을 해", "논리적으로 해결책 제시해", "일단 피하고 시간을 둬", "직접 나서서 해결해"] },
      { question: "나를 가장 잘 표현하는 단어는?", answers: ["책임감", "따뜻함", "자유로움", "지적임"] },
      { question: "주말에 가장 하고 싶은 것은?", answers: ["새로운 취미나 활동 도전", "집에서 책이나 영화 감상", "친구나 가족과 시간 보내기", "자기계발이나 공부"] },
      { question: "팀 프로젝트에서 나의 역할은?", answers: ["팀장! 방향을 제시해", "아이디어 뱅크! 창의적 제안", "조율자! 팀원들 케어", "분석가! 데이터와 자료 담당"] },
    ],
  },
  en: {
    title: "Bull",
    subtitle: "Which",
    tagline: "Discover your bull character with 8 questions!",
    startButton: "Start Test 🚀",
    question: "Question",
    analyzing: "Finding your bull...",
    strength: "💪 Strength",
    weakness: "⚠️ Weakness",
    compatibility: "💕 Best Match",
    compatibilityText: "is your perfect partner!",
    shareButton: "📤 Share Result",
    retryButton: "🔄 Try Again",
    otherTests: "Try other tests!",
    reactionTest: "⚡ Reaction Test",
    colorGame: "🎨 Color Finding Game",
    poweredBy: "Powered by",

    backToMain: "← Back",
    shareText: "🐂 My Bull Character Test Result!",
    copied: "Result copied to clipboard!",
    slotAlt: "Slot",
    characters: {
      leader: { name: "Leader Bull", title: "Born Leader", traits: ["Responsibility", "Decisive", "Trustworthy"], description: "You are a natural-born leader! Your reliability and sense of responsibility in any situation earns trust from everyone around you.", strength: "Brilliant judgment in crisis", weakness: "Sometimes tries to carry everything alone" },
      josoon: { name: "Josoon", title: "Warm Healer", traits: ["Caring", "Empathetic", "Warm"], description: "You make everyone around you feel comfortable! Your excellent empathy and warm heart make you beloved by all.", strength: "Gets along with anyone", weakness: "Has trouble saying no" },
      mecha: { name: "Mecha Bull", title: "Cool Strategist", traits: ["Logical", "Efficient", "Charismatic"], description: "You value reason over emotion! Your cool judgment and strong charisma drive you toward your goals.", strength: "Solves complex problems easily", weakness: "Can seem too cold sometimes" },
      wild: { name: "Wild Bull", title: "Free Spirit", traits: ["Freedom", "Honest", "Passionate"], description: "You fearlessly walk your own path! Your honest and passionate nature brings energy to everyone around.", strength: "Fears no challenge", weakness: "Dislikes being bound by rules" },
      gentle: { name: "Gentle Bull", title: "Refined Intellectual", traits: ["Dignity", "Intelligent", "Mannered"], description: "You combine elegance with intelligence! Your refined manners and deep culture earn respect everywhere.", strength: "Shines with class in any situation", weakness: "Can be perfectionist" },
      art: { name: "Art Bull", title: "Creative Artist", traits: ["Creative", "Sensitive", "Original"], description: "You see the world differently! Your rich imagination and unique sensibility create new things.", strength: "Ideas no one else thinks of", weakness: "Can lack practicality sometimes" },
      wizard: { name: "Wizard Bull", title: "Mystic Intuitive", traits: ["Intuitive", "Mysterious", "Insightful"], description: "You have extraordinary intuition! Your deep insight sees what others cannot.", strength: "Almost prophetic foresight", weakness: "Can seem disconnected from reality" },
      doctor: { name: "Doctor Bull", title: "Analytical Genius", traits: ["Analytical", "Curious", "Inquisitive"], description: "You never stop learning and researching! Your excellent analysis and curiosity pursue truth.", strength: "Understands principles of everything", weakness: "Can dig too deep sometimes" },
    },
    questions: [
      { question: "Among friends, I usually...", answers: ["Lead and organize gatherings", "Am the mood maker! Make everyone laugh", "Listen quietly and empathize", "Only speak up when necessary"] },
      { question: "When stressed, I...", answers: ["Exercise or do something active", "Quietly organize my thoughts alone", "Meet friends and chat", "Make plans and find solutions"] },
      { question: "What do people say about your first impression?", answers: ["Reliable and dependable", "Friendly and comfortable", "Charismatic and strong", "Mysterious and unique"] },
      { question: "Your travel style?", answers: ["Plan everything thoroughly", "Spontaneous! Go where my feet take me", "Flexible, adapting to companions", "I plan the route and guide"] },
      { question: "In conflict situations, I...", answers: ["Play the mediator", "Suggest logical solutions", "Avoid and give it time", "Step in and resolve it directly"] },
      { question: "Word that best describes you?", answers: ["Responsibility", "Warmth", "Freedom", "Intelligence"] },
      { question: "What do you most want to do on weekends?", answers: ["Try new hobbies or activities", "Read books or watch movies at home", "Spend time with friends or family", "Self-improvement or study"] },
      { question: "Your role in team projects?", answers: ["Team leader! Set the direction", "Idea bank! Creative suggestions", "Coordinator! Take care of teammates", "Analyst! Handle data and research"] },
    ],
  },
  ja: {
    title: "牛",
    subtitle: "あなたに似た",
    tagline: "8つの質問であなたの牛キャラを発見！",
    startButton: "テスト開始 🚀",
    question: "質問",
    analyzing: "あなたの牛を探しています...",
    strength: "💪 強み",
    weakness: "⚠️ 弱み",
    compatibility: "💕 相性抜群",
    compatibilityText: "と最高の相性！",
    shareButton: "📤 結果をシェア",
    retryButton: "🔄 もう一度",
    otherTests: "他のテストも試してみて！",
    reactionTest: "⚡ 反応速度テスト",
    colorGame: "🎨 色探しゲーム",
    poweredBy: "Powered by",

    backToMain: "← 戻る",
    shareText: "🐂 私に似た牛テストの結果！",
    copied: "結果がクリップボードにコピーされました！",
    slotAlt: "スロット",
    characters: {
      leader: { name: "リーダー牛", title: "生まれながらのリーダー", traits: ["責任感", "決断力", "信頼"], description: "あなたは天性のリーダーです！どんな状況でも揺るがない頼もしさと責任感で周りの人々から信頼されています。", strength: "危機的状況での優れた判断力", weakness: "時々一人で全てを背負おうとする" },
      josoon: { name: "ジョスン", title: "温かい癒し手", traits: ["思いやり", "共感力", "温かさ"], description: "あなたは周りの人を心地よくさせるヒーラーです！優れた共感能力と温かい心で皆から愛されています。", strength: "誰とでも仲良くなれる親和力", weakness: "断るのが苦手" },
      mecha: { name: "メカ牛", title: "冷静な戦略家", traits: ["論理的", "効率的", "カリスマ"], description: "あなたは感情より理性を重視する戦略家です！冷静な判断力と強いカリスマで目標に向かって突き進みます。", strength: "複雑な問題もスラスラ解決", weakness: "時々冷たく見える" },
      wild: { name: "野生牛", title: "自由な魂", traits: ["自由", "正直", "情熱"], description: "あなたは恐れずに自分の道を行く自由人です！正直で情熱的な性格で周りに活力を与えます。", strength: "どんな挑戦も恐れない", weakness: "ルールに縛られるのが嫌い" },
      gentle: { name: "ジェントル牛", title: "洗練された知性派", traits: ["品格", "知的", "マナー"], description: "あなたは優雅さと知性を兼ね備えた紳士です！洗練されたマナーと深い教養でどこでも尊敬されます。", strength: "どんな場でも輝く品格", weakness: "完璧主義な傾向がある" },
      art: { name: "アート牛", title: "創造的な芸術家", traits: ["創造力", "感性", "独創性"], description: "あなたは世界を違う視点で見るアーティストです！豊かな想像力とユニークな感性で新しいものを創造します。", strength: "誰も思いつかないアイデア", weakness: "現実的な面が不足することも" },
      wizard: { name: "ウィザード牛", title: "神秘的な直感派", traits: ["直感力", "神秘的", "洞察力"], description: "あなたは特別な直感を持つ神秘的な存在です！深い洞察力で他の人には見えないものが見えます。", strength: "未来を見通すような予知力", weakness: "時々現実離れして見える" },
      doctor: { name: "ドクター牛", title: "分析の天才", traits: ["分析力", "好奇心", "探究心"], description: "あなたは絶え間なく学び研究する学者です！優れた分析力と探究心で真理を追求します。", strength: "全ての原理を理解する能力", weakness: "深掘りしすぎることがある" },
    },
    questions: [
      { question: "友達の中で私は主に...", answers: ["集まりを主導してリードする", "ムードメーカー！みんなを笑わせる", "静かに聞いて共感する", "必要な時だけ核心を言う"] },
      { question: "ストレスを感じた時、私は...", answers: ["運動やアクティブなことで発散", "一人で静かに考えを整理", "友達に会っておしゃべり", "計画を立てて解決策を探す"] },
      { question: "第一印象はどう言われますか？", answers: ["頼もしくてしっかりして見える", "親しみやすくて居心地がいい", "カリスマがあって強そう", "神秘的でユニーク"] },
      { question: "旅行スタイルは？", answers: ["しっかり計画を立てて行く", "即興で！足の向くまま", "同行者に合わせて柔軟に", "私がコースを組んでガイドする"] },
      { question: "対立状況で私は...", answers: ["仲裁者の役割をする", "論理的に解決策を提示", "まず避けて時間を置く", "直接出て解決する"] },
      { question: "私を最もよく表す言葉は？", answers: ["責任感", "温かさ", "自由", "知性"] },
      { question: "週末に最もしたいことは？", answers: ["新しい趣味や活動に挑戦", "家で本や映画鑑賞", "友達や家族と過ごす", "自己啓発や勉強"] },
      { question: "チームプロジェクトでの役割は？", answers: ["チームリーダー！方向を示す", "アイデアバンク！創造的な提案", "調整役！チームメンバーのケア", "分析担当！データと資料"] },
    ],
  },
  zh: {
    title: "牛",
    subtitle: "与你相似的",
    tagline: "通过8个问题发现你的牛角色！",
    startButton: "开始测试 🚀",
    question: "问题",
    analyzing: "正在寻找你的牛...",
    strength: "💪 优点",
    weakness: "⚠️ 缺点",
    compatibility: "💕 最佳搭配",
    compatibilityText: "是你的完美搭档！",
    shareButton: "📤 分享结果",
    retryButton: "🔄 重新测试",
    otherTests: "试试其他测试！",
    reactionTest: "⚡ 反应速度测试",
    colorGame: "🎨 找颜色游戏",
    poweredBy: "Powered by",

    backToMain: "← 返回",
    shareText: "🐂 与我相似的牛测试结果！",
    copied: "结果已复制到剪贴板！",
    slotAlt: "老虎机",
    characters: {
      leader: { name: "领导牛", title: "天生领袖", traits: ["责任感", "决断力", "可信赖"], description: "你是天生的领导者！在任何情况下都不动摇的可靠和责任感让周围的人信任你。", strength: "危机时刻闪耀的判断力", weakness: "有时试图独自承担一切" },
      josoon: { name: "朝顺", title: "温暖的治愈者", traits: ["体贴", "共情", "温暖"], description: "你让周围的人感到舒适！出色的共情能力和温暖的心使你受到所有人的喜爱。", strength: "与任何人都能相处融洽", weakness: "不擅长拒绝" },
      mecha: { name: "机甲牛", title: "冷静的战略家", traits: ["逻辑", "高效", "魅力"], description: "你是重理性轻感情的战略家！冷静的判断力和强大的魅力驱使你向目标前进。", strength: "轻松解决复杂问题", weakness: "有时显得太冷漠" },
      wild: { name: "野性牛", title: "自由的灵魂", traits: ["自由", "坦率", "热情"], description: "你无畏地走自己的路！坦率热情的性格给周围带来活力。", strength: "不惧任何挑战", weakness: "讨厌被规则束缚" },
      gentle: { name: "绅士牛", title: "优雅的知识分子", traits: ["品位", "智慧", "礼貌"], description: "你兼具优雅与智慧！精致的礼仪和深厚的教养让你到处受尊敬。", strength: "在任何场合都闪耀的品格", weakness: "有完美主义倾向" },
      art: { name: "艺术牛", title: "创意艺术家", traits: ["创造力", "感性", "独创"], description: "你用不同的视角看世界！丰富的想象力和独特的感性创造新事物。", strength: "别人想不到的创意", weakness: "有时缺乏现实感" },
      wizard: { name: "巫师牛", title: "神秘直觉者", traits: ["直觉", "神秘", "洞察"], description: "你拥有非凡的直觉！深刻的洞察力让你看到别人看不到的东西。", strength: "仿佛预见未来的预知力", weakness: "有时显得脱离现实" },
      doctor: { name: "博士牛", title: "分析天才", traits: ["分析力", "好奇心", "求知欲"], description: "你是不断学习和研究的学者！出色的分析力和求知欲追求真理。", strength: "理解万物原理的能力", weakness: "有时钻得太深" },
    },
    questions: [
      { question: "在朋友中，我通常...", answers: ["主导和带领聚会", "气氛制造者！让大家开心", "安静地倾听和共情", "只在必要时说重点"] },
      { question: "压力大的时候，我...", answers: ["通过运动或活动发泄", "独自安静地整理思绪", "和朋友见面聊天", "制定计划寻找解决方案"] },
      { question: "别人说你的第一印象是？", answers: ["可靠稳重", "亲切舒适", "有魅力很强势", "神秘独特"] },
      { question: "你的旅行风格？", answers: ["周密计划后出发", "随性！脚步带我去哪就去哪", "灵活配合同行者", "我来规划路线当导游"] },
      { question: "冲突情况下，我...", answers: ["扮演调解者", "逻辑地提出解决方案", "先回避，给时间", "直接出面解决"] },
      { question: "最能描述你的词是？", answers: ["责任感", "温暖", "自由", "智慧"] },
      { question: "周末最想做的事？", answers: ["尝试新爱好或活动", "在家看书或电影", "和朋友家人共度时光", "自我提升或学习"] },
      { question: "团队项目中你的角色？", answers: ["队长！指明方向", "创意库！创造性建议", "协调者！照顾队友", "分析师！负责数据和资料"] },
    ],
  },
  es: {
    title: "Toro",
    subtitle: "¿Qué",
    tagline: "¡Descubre tu personaje toro con 8 preguntas!",
    startButton: "Comenzar Test 🚀",
    question: "Pregunta",
    analyzing: "Buscando tu toro...",
    strength: "💪 Fortaleza",
    weakness: "⚠️ Debilidad",
    compatibility: "💕 Mejor Pareja",
    compatibilityText: "¡es tu pareja perfecta!",
    shareButton: "📤 Compartir",
    retryButton: "🔄 Reintentar",
    otherTests: "¡Prueba otros tests!",
    reactionTest: "⚡ Test de Reacción",
    colorGame: "🎨 Juego de Colores",
    poweredBy: "Powered by",
    backToMain: "← Volver",
    shareText: "🐂 ¡Mi resultado del test del toro!",
    copied: "¡Resultado copiado!",
    slotAlt: "Ranura",
    characters: {
      leader: { name: "Toro Líder", title: "Líder Nato", traits: ["Responsable", "Decisivo", "Confiable"], description: "¡Eres un líder natural! Tu fiabilidad y responsabilidad en cualquier situación te gana la confianza de todos.", strength: "Juicio brillante en crisis", weakness: "A veces intenta cargar con todo solo" },
      josoon: { name: "Josoon", title: "Sanador Cálido", traits: ["Cariñoso", "Empático", "Cálido"], description: "¡Haces que todos se sientan cómodos! Tu excelente empatía y corazón cálido te hacen querido por todos.", strength: "Se lleva bien con cualquiera", weakness: "Le cuesta decir que no" },
      mecha: { name: "Toro Mecha", title: "Estratega Frío", traits: ["Lógico", "Eficiente", "Carismático"], description: "¡Valoras la razón sobre la emoción! Tu juicio frío y fuerte carisma te impulsan hacia tus metas.", strength: "Resuelve problemas complejos fácilmente", weakness: "Puede parecer muy frío a veces" },
      wild: { name: "Toro Salvaje", title: "Espíritu Libre", traits: ["Libertad", "Honesto", "Apasionado"], description: "¡Caminas tu propio camino sin miedo! Tu naturaleza honesta y apasionada da energía a todos.", strength: "No teme ningún desafío", weakness: "No le gusta estar atado a reglas" },
      gentle: { name: "Toro Gentil", title: "Intelectual Refinado", traits: ["Dignidad", "Inteligente", "Educado"], description: "¡Combinas elegancia con inteligencia! Tus modales refinados y profunda cultura te ganan respeto.", strength: "Brilla con clase en cualquier situación", weakness: "Puede ser perfeccionista" },
      art: { name: "Toro Arte", title: "Artista Creativo", traits: ["Creativo", "Sensible", "Original"], description: "¡Ves el mundo diferente! Tu rica imaginación y sensibilidad única crean cosas nuevas.", strength: "Ideas que nadie más tiene", weakness: "A veces le falta practicidad" },
      wizard: { name: "Toro Mago", title: "Intuitivo Místico", traits: ["Intuitivo", "Misterioso", "Perspicaz"], description: "¡Tienes una intuición extraordinaria! Tu profunda perspicacia ve lo que otros no pueden.", strength: "Previsión casi profética", weakness: "Puede parecer desconectado de la realidad" },
      doctor: { name: "Toro Doctor", title: "Genio Analítico", traits: ["Analítico", "Curioso", "Inquisitivo"], description: "¡Nunca dejas de aprender e investigar! Tu excelente análisis y curiosidad persiguen la verdad.", strength: "Entiende los principios de todo", weakness: "A veces profundiza demasiado" },
    },
    questions: [
      { question: "Entre amigos, yo suelo...", answers: ["Liderar y organizar reuniones", "¡Ser el animador! Hacer reír a todos", "Escuchar tranquilamente y empatizar", "Solo hablar cuando es necesario"] },
      { question: "Cuando estoy estresado...", answers: ["Hago ejercicio o algo activo", "Organizo mis pensamientos a solas", "Quedo con amigos y charlo", "Hago planes y busco soluciones"] },
      { question: "¿Qué dicen de tu primera impresión?", answers: ["Confiable y seguro", "Amigable y cómodo", "Carismático y fuerte", "Misterioso y único"] },
      { question: "¿Tu estilo de viaje?", answers: ["Planifico todo con detalle", "¡Espontáneo! Voy donde me lleven", "Flexible, me adapto al grupo", "Yo planifico la ruta y guío"] },
      { question: "En situaciones de conflicto...", answers: ["Hago de mediador", "Sugiero soluciones lógicas", "Evito y doy tiempo", "Intervengo y lo resuelvo"] },
      { question: "¿Palabra que mejor te describe?", answers: ["Responsabilidad", "Calidez", "Libertad", "Inteligencia"] },
      { question: "¿Qué quieres hacer más el fin de semana?", answers: ["Probar nuevos hobbies", "Leer o ver películas en casa", "Pasar tiempo con amigos o familia", "Mejorarme o estudiar"] },
      { question: "¿Tu rol en proyectos de equipo?", answers: ["¡Líder! Marco la dirección", "¡Banco de ideas! Sugerencias creativas", "¡Coordinador! Cuido al equipo", "¡Analista! Datos e investigación"] },
    ],
  },
  pt: {
    title: "Touro",
    subtitle: "Qual",
    tagline: "Descubra seu personagem touro com 8 perguntas!",
    startButton: "Iniciar Teste 🚀",
    question: "Pergunta",
    analyzing: "Procurando seu touro...",
    strength: "💪 Força",
    weakness: "⚠️ Fraqueza",
    compatibility: "💕 Melhor Par",
    compatibilityText: "é seu par perfeito!",
    shareButton: "📤 Compartilhar",
    retryButton: "🔄 Tentar Novamente",
    otherTests: "Tente outros testes!",
    reactionTest: "⚡ Teste de Reação",
    colorGame: "🎨 Jogo de Cores",
    poweredBy: "Powered by",
    backToMain: "← Voltar",
    shareText: "🐂 Meu resultado do teste do touro!",
    copied: "Resultado copiado!",
    slotAlt: "Slot",
    characters: {
      leader: { name: "Touro Líder", title: "Líder Nato", traits: ["Responsável", "Decisivo", "Confiável"], description: "Você é um líder natural! Sua confiabilidade e responsabilidade em qualquer situação ganha a confiança de todos.", strength: "Julgamento brilhante em crises", weakness: "Às vezes tenta carregar tudo sozinho" },
      josoon: { name: "Josoon", title: "Curador Caloroso", traits: ["Carinhoso", "Empático", "Caloroso"], description: "Você faz todos se sentirem confortáveis! Sua excelente empatia e coração caloroso te fazem amado por todos.", strength: "Se dá bem com qualquer um", weakness: "Tem dificuldade em dizer não" },
      mecha: { name: "Touro Mecha", title: "Estrategista Frio", traits: ["Lógico", "Eficiente", "Carismático"], description: "Você valoriza razão sobre emoção! Seu julgamento frio e forte carisma te impulsionam para seus objetivos.", strength: "Resolve problemas complexos facilmente", weakness: "Pode parecer muito frio às vezes" },
      wild: { name: "Touro Selvagem", title: "Espírito Livre", traits: ["Liberdade", "Honesto", "Apaixonado"], description: "Você caminha seu próprio caminho sem medo! Sua natureza honesta e apaixonada traz energia para todos.", strength: "Não teme nenhum desafio", weakness: "Não gosta de ser preso a regras" },
      gentle: { name: "Touro Gentil", title: "Intelectual Refinado", traits: ["Dignidade", "Inteligente", "Educado"], description: "Você combina elegância com inteligência! Suas maneiras refinadas e cultura profunda te ganham respeito.", strength: "Brilha com classe em qualquer situação", weakness: "Pode ser perfeccionista" },
      art: { name: "Touro Arte", title: "Artista Criativo", traits: ["Criativo", "Sensível", "Original"], description: "Você vê o mundo diferente! Sua rica imaginação e sensibilidade única criam coisas novas.", strength: "Ideias que ninguém mais tem", weakness: "Às vezes falta praticidade" },
      wizard: { name: "Touro Mago", title: "Intuitivo Místico", traits: ["Intuitivo", "Misterioso", "Perspicaz"], description: "Você tem intuição extraordinária! Sua profunda perspicácia vê o que outros não podem.", strength: "Previsão quase profética", weakness: "Pode parecer desconectado da realidade" },
      doctor: { name: "Touro Doutor", title: "Gênio Analítico", traits: ["Analítico", "Curioso", "Inquisitivo"], description: "Você nunca para de aprender e pesquisar! Sua excelente análise e curiosidade perseguem a verdade.", strength: "Entende os princípios de tudo", weakness: "Às vezes aprofunda demais" },
    },
    questions: [
      { question: "Entre amigos, eu geralmente...", answers: ["Lidero e organizo encontros", "Sou o animador! Faço todos rirem", "Ouço tranquilamente e empatizo", "Só falo quando necessário"] },
      { question: "Quando estressado, eu...", answers: ["Faço exercício ou algo ativo", "Organizo meus pensamentos sozinho", "Encontro amigos e converso", "Faço planos e busco soluções"] },
      { question: "O que dizem da sua primeira impressão?", answers: ["Confiável e seguro", "Amigável e confortável", "Carismático e forte", "Misterioso e único"] },
      { question: "Seu estilo de viagem?", answers: ["Planejo tudo detalhadamente", "Espontâneo! Vou onde me levar", "Flexível, me adapto ao grupo", "Eu planejo a rota e guio"] },
      { question: "Em situações de conflito...", answers: ["Faço de mediador", "Sugiro soluções lógicas", "Evito e dou tempo", "Intervenho e resolvo"] },
      { question: "Palavra que melhor te descreve?", answers: ["Responsabilidade", "Calor", "Liberdade", "Inteligência"] },
      { question: "O que mais quer fazer no fim de semana?", answers: ["Tentar novos hobbies", "Ler ou ver filmes em casa", "Passar tempo com amigos ou família", "Me aprimorar ou estudar"] },
      { question: "Seu papel em projetos de equipe?", answers: ["Líder! Defino a direção", "Banco de ideias! Sugestões criativas", "Coordenador! Cuido da equipe", "Analista! Dados e pesquisa"] },
    ],
  },
  de: {
    title: "Stier",
    subtitle: "Welcher",
    tagline: "Entdecke deinen Stier-Charakter mit 8 Fragen!",
    startButton: "Test Starten 🚀",
    question: "Frage",
    analyzing: "Suche deinen Stier...",
    strength: "💪 Stärke",
    weakness: "⚠️ Schwäche",
    compatibility: "💕 Bester Partner",
    compatibilityText: "ist dein perfekter Partner!",
    shareButton: "📤 Teilen",
    retryButton: "🔄 Nochmal",
    otherTests: "Probiere andere Tests!",
    reactionTest: "⚡ Reaktionstest",
    colorGame: "🎨 Farbspiel",
    poweredBy: "Powered by",

    backToMain: "← Zurück",
    shareText: "🐂 Mein Stier-Test Ergebnis!",
    copied: "Ergebnis kopiert!",
    slotAlt: "Spielautomat",
    characters: {
      leader: { name: "Anführer-Stier", title: "Geborener Anführer", traits: ["Verantwortung", "Entschlossen", "Vertrauenswürdig"], description: "Du bist ein geborener Anführer! Deine Zuverlässigkeit und Verantwortung in jeder Situation gewinnt das Vertrauen aller.", strength: "Brillantes Urteil in Krisen", weakness: "Versucht manchmal alles allein zu tragen" },
      josoon: { name: "Josoon", title: "Warmer Heiler", traits: ["Fürsorglich", "Empathisch", "Warm"], description: "Du machst alle um dich herum wohl! Deine exzellente Empathie und warmes Herz machen dich bei allen beliebt.", strength: "Kommt mit jedem aus", weakness: "Kann schwer Nein sagen" },
      mecha: { name: "Mecha-Stier", title: "Kühler Stratege", traits: ["Logisch", "Effizient", "Charismatisch"], description: "Du schätzt Vernunft über Emotion! Dein kühles Urteil und starkes Charisma treiben dich zu deinen Zielen.", strength: "Löst komplexe Probleme leicht", weakness: "Kann manchmal zu kalt wirken" },
      wild: { name: "Wilder Stier", title: "Freier Geist", traits: ["Freiheit", "Ehrlich", "Leidenschaftlich"], description: "Du gehst furchtlos deinen eigenen Weg! Deine ehrliche und leidenschaftliche Art bringt allen Energie.", strength: "Fürchtet keine Herausforderung", weakness: "Mag keine Regeln" },
      gentle: { name: "Sanfter Stier", title: "Kultivierter Intellektueller", traits: ["Würde", "Intelligent", "Manieren"], description: "Du vereinst Eleganz mit Intelligenz! Deine feinen Manieren und tiefe Kultur bringen dir überall Respekt.", strength: "Glänzt mit Klasse in jeder Situation", weakness: "Kann perfektionistisch sein" },
      art: { name: "Kunst-Stier", title: "Kreativer Künstler", traits: ["Kreativ", "Sensibel", "Original"], description: "Du siehst die Welt anders! Deine reiche Fantasie und einzigartige Sensibilität erschaffen Neues.", strength: "Ideen die niemand sonst hat", weakness: "Manchmal fehlt Praktikabilität" },
      wizard: { name: "Zauberer-Stier", title: "Mystischer Intuitiver", traits: ["Intuitiv", "Mysteriös", "Einsichtig"], description: "Du hast außergewöhnliche Intuition! Deine tiefe Einsicht sieht was andere nicht können.", strength: "Fast prophetische Voraussicht", weakness: "Kann realitätsfern wirken" },
      doctor: { name: "Doktor-Stier", title: "Analytisches Genie", traits: ["Analytisch", "Neugierig", "Wissbegierig"], description: "Du hörst nie auf zu lernen und zu forschen! Deine exzellente Analyse und Neugier streben nach Wahrheit.", strength: "Versteht die Prinzipien von allem", weakness: "Gräbt manchmal zu tief" },
    },
    questions: [
      { question: "Unter Freunden, ich normalerweise...", answers: ["Führe und organisiere Treffen", "Bin der Stimmungsmacher! Bringe alle zum Lachen", "Höre ruhig zu und fühle mit", "Rede nur wenn nötig"] },
      { question: "Bei Stress, ich...", answers: ["Mache Sport oder was Aktives", "Ordne meine Gedanken allein", "Treffe Freunde und rede", "Mache Pläne und suche Lösungen"] },
      { question: "Was sagen Leute über deinen ersten Eindruck?", answers: ["Zuverlässig und solide", "Freundlich und angenehm", "Charismatisch und stark", "Mysteriös und einzigartig"] },
      { question: "Dein Reisestil?", answers: ["Plane alles gründlich", "Spontan! Gehe wohin mich meine Füße tragen", "Flexibel, passe mich an", "Ich plane die Route und führe"] },
      { question: "In Konfliktsituationen, ich...", answers: ["Spiele den Vermittler", "Schlage logische Lösungen vor", "Vermeide und gebe Zeit", "Greife ein und löse es"] },
      { question: "Wort das dich am besten beschreibt?", answers: ["Verantwortung", "Wärme", "Freiheit", "Intelligenz"] },
      { question: "Was willst du am Wochenende am meisten?", answers: ["Neue Hobbys ausprobieren", "Zuhause lesen oder Filme schauen", "Zeit mit Freunden oder Familie", "Selbstverbesserung oder Lernen"] },
      { question: "Deine Rolle in Teamprojekten?", answers: ["Teamleiter! Gebe die Richtung vor", "Ideenbank! Kreative Vorschläge", "Koordinator! Kümmere mich ums Team", "Analyst! Daten und Recherche"] },
    ],
  },
  fr: {
    title: "Taureau",
    subtitle: "Quel",
    tagline: "Découvrez votre personnage taureau en 8 questions!",
    startButton: "Commencer le Test 🚀",
    question: "Question",
    analyzing: "Recherche de votre taureau...",
    strength: "💪 Force",
    weakness: "⚠️ Faiblesse",
    compatibility: "💕 Meilleur Partenaire",
    compatibilityText: "est votre partenaire parfait!",
    shareButton: "📤 Partager",
    retryButton: "🔄 Réessayer",
    otherTests: "Essayez d'autres tests!",
    reactionTest: "⚡ Test de Réaction",
    colorGame: "🎨 Jeu de Couleurs",
    poweredBy: "Powered by",
    backToMain: "← Retour",
    shareText: "🐂 Mon résultat du test du taureau!",
    copied: "Résultat copié!",
    slotAlt: "Machine à sous",
    characters: {
      leader: { name: "Taureau Leader", title: "Leader Né", traits: ["Responsable", "Décisif", "Fiable"], description: "Vous êtes un leader naturel! Votre fiabilité et responsabilité dans toute situation gagne la confiance de tous.", strength: "Jugement brillant en crise", weakness: "Essaie parfois de tout porter seul" },
      josoon: { name: "Josoon", title: "Guérisseur Chaleureux", traits: ["Attentionné", "Empathique", "Chaleureux"], description: "Vous mettez tout le monde à l'aise! Votre excellente empathie et cœur chaleureux vous rendent aimé de tous.", strength: "S'entend avec tout le monde", weakness: "A du mal à dire non" },
      mecha: { name: "Taureau Mecha", title: "Stratège Froid", traits: ["Logique", "Efficace", "Charismatique"], description: "Vous valorisez la raison sur l'émotion! Votre jugement froid et fort charisme vous poussent vers vos objectifs.", strength: "Résout facilement les problèmes complexes", weakness: "Peut sembler trop froid parfois" },
      wild: { name: "Taureau Sauvage", title: "Esprit Libre", traits: ["Liberté", "Honnête", "Passionné"], description: "Vous suivez votre propre chemin sans peur! Votre nature honnête et passionnée apporte de l'énergie à tous.", strength: "Ne craint aucun défi", weakness: "N'aime pas être lié par des règles" },
      gentle: { name: "Taureau Gentil", title: "Intellectuel Raffiné", traits: ["Dignité", "Intelligent", "Poli"], description: "Vous combinez élégance et intelligence! Vos manières raffinées et culture profonde vous gagnent le respect.", strength: "Brille avec classe en toute situation", weakness: "Peut être perfectionniste" },
      art: { name: "Taureau Art", title: "Artiste Créatif", traits: ["Créatif", "Sensible", "Original"], description: "Vous voyez le monde différemment! Votre riche imagination et sensibilité unique créent de nouvelles choses.", strength: "Idées que personne d'autre n'a", weakness: "Manque parfois de praticité" },
      wizard: { name: "Taureau Magicien", title: "Intuitif Mystique", traits: ["Intuitif", "Mystérieux", "Perspicace"], description: "Vous avez une intuition extraordinaire! Votre profonde perspicacité voit ce que les autres ne peuvent pas.", strength: "Prévoyance presque prophétique", weakness: "Peut sembler déconnecté de la réalité" },
      doctor: { name: "Taureau Docteur", title: "Génie Analytique", traits: ["Analytique", "Curieux", "Inquisiteur"], description: "Vous n'arrêtez jamais d'apprendre et de rechercher! Votre excellente analyse et curiosité poursuivent la vérité.", strength: "Comprend les principes de tout", weakness: "Creuse parfois trop profond" },
    },
    questions: [
      { question: "Entre amis, je...", answers: ["Dirige et organise les réunions", "Suis l'animateur! Fais rire tout le monde", "Écoute calmement et compatis", "Ne parle que quand c'est nécessaire"] },
      { question: "Quand je suis stressé, je...", answers: ["Fais du sport ou quelque chose d'actif", "Organise mes pensées seul", "Retrouve des amis et discute", "Fais des plans et cherche des solutions"] },
      { question: "Que dit-on de votre première impression?", answers: ["Fiable et solide", "Amical et confortable", "Charismatique et fort", "Mystérieux et unique"] },
      { question: "Votre style de voyage?", answers: ["Je planifie tout en détail", "Spontané! Je vais où mes pieds me portent", "Flexible, je m'adapte au groupe", "Je planifie l'itinéraire et guide"] },
      { question: "En situation de conflit, je...", answers: ["Joue le médiateur", "Suggère des solutions logiques", "Évite et donne du temps", "Interviens et résous"] },
      { question: "Mot qui vous décrit le mieux?", answers: ["Responsabilité", "Chaleur", "Liberté", "Intelligence"] },
      { question: "Que voulez-vous faire le plus le week-end?", answers: ["Essayer de nouveaux hobbies", "Lire ou regarder des films à la maison", "Passer du temps avec amis ou famille", "M'améliorer ou étudier"] },
      { question: "Votre rôle dans les projets d'équipe?", answers: ["Chef! Je donne la direction", "Banque d'idées! Suggestions créatives", "Coordinateur! Je prends soin de l'équipe", "Analyste! Données et recherche"] },
    ],
  },
};

// 캐릭터 기본 정보 (이미지, 색상 등)
const characterBase = {
  leader: { id: "leader", emoji: "👔", image: "/characters/leader.png", color: "from-orange-500 to-red-500", compatibilityId: "josoon" },
  josoon: { id: "josoon", emoji: "🐄", image: "/characters/josoon.png", color: "from-pink-400 to-rose-400", compatibilityId: "leader" },
  mecha: { id: "mecha", emoji: "🤖", image: "/characters/mecha.png", color: "from-slate-500 to-zinc-600", compatibilityId: "doctor" },
  wild: { id: "wild", emoji: "🦬", image: "/characters/wild.png", color: "from-amber-600 to-orange-700", compatibilityId: "art" },
  gentle: { id: "gentle", emoji: "🎩", image: "/characters/gentle.png", color: "from-gray-500 to-slate-600", compatibilityId: "wizard" },
  art: { id: "art", emoji: "🎨", image: "/characters/art.png", color: "from-teal-500 to-cyan-500", compatibilityId: "wild" },
  wizard: { id: "wizard", emoji: "🔮", image: "/characters/wizard.png", color: "from-purple-500 to-violet-600", compatibilityId: "gentle" },
  doctor: { id: "doctor", emoji: "🧪", image: "/characters/doctor.png", color: "from-indigo-400 to-blue-500", compatibilityId: "mecha" },
};

// 질문별 점수 매핑
const questionScores = [
  [{ leader: 3, mecha: 1 }, { art: 2, wild: 2 }, { josoon: 3, wizard: 1 }, { gentle: 2, doctor: 2 }],
  [{ wild: 3, leader: 1 }, { wizard: 2, doctor: 2 }, { josoon: 2, art: 2 }, { mecha: 3, gentle: 1 }],
  [{ leader: 3, gentle: 1 }, { josoon: 3, art: 1 }, { mecha: 2, wild: 2 }, { wizard: 2, doctor: 2 }],
  [{ doctor: 2, mecha: 2 }, { wild: 3, art: 1 }, { josoon: 2, gentle: 2 }, { leader: 3, wizard: 1 }],
  [{ josoon: 3, gentle: 1 }, { mecha: 2, doctor: 2 }, { wizard: 2, art: 2 }, { leader: 2, wild: 2 }],
  [{ leader: 3, mecha: 1 }, { josoon: 3, art: 1 }, { wild: 3, wizard: 1 }, { doctor: 2, gentle: 2 }],
  [{ wild: 2, art: 2 }, { wizard: 2, doctor: 2 }, { josoon: 2, leader: 2 }, { gentle: 2, mecha: 2 }],
  [{ leader: 3, mecha: 1 }, { art: 3, wizard: 1 }, { josoon: 3, gentle: 1 }, { doctor: 3, mecha: 1 }],
];

const characterIds = ["leader", "josoon", "mecha", "wild", "gentle", "art", "wizard", "doctor"] as const;

interface SloxTestProps {
  lang?: Lang;
}

export default function SloxTest({ lang = "ko" }: SloxTestProps) {
  const [state, setState] = useState<GameState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [resultId, setResultId] = useState<string | null>(null);
  const [slotIndex, setSlotIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const t = translations[lang];

  // 점수 계산
  const calculateResult = useCallback((finalScores: Record<string, number>) => {
    let maxScore = 0;
    let resultCharId = "leader";

    characterIds.forEach((charId) => {
      const score = finalScores[charId] || 0;
      if (score > maxScore) {
        maxScore = score;
        resultCharId = charId;
      }
    });

    return resultCharId;
  }, []);

  // 답변 선택
  const handleAnswer = (answerIndex: number) => {
    const answerScores = questionScores[currentQuestion][answerIndex];
    const newScores = { ...scores };
    Object.entries(answerScores).forEach(([charId, score]) => {
      newScores[charId] = (newScores[charId] || 0) + score;
    });
    setScores(newScores);

    if (currentQuestion < t.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setState("analyzing");
      const finalResultId = calculateResult(newScores);
      
      setIsSpinning(true);
      let spinCount = 0;
      const spinInterval = setInterval(() => {
        setSlotIndex(Math.floor(Math.random() * characterIds.length));
        spinCount++;
        
        if (spinCount > 20) {
          clearInterval(spinInterval);
          setResultId(finalResultId);
          setIsSpinning(false);
          setTimeout(() => setState("result"), 500);
        }
      }, 100);
    }
  };

  // 다시하기
  const restart = () => {
    setState("intro");
    setCurrentQuestion(0);
    setScores({});
    setResultId(null);
  };

  // 공유
  const shareResult = async () => {
    if (!resultId) return;
    
    const charT = t.characters[resultId as keyof typeof t.characters];
    const langPath = lang === "ko" ? "" : `/${lang}`;
    const shareUrl = `https://www.slox.co.kr${langPath}/slox-test`;
    const shareText = `${t.shareText}

${characterBase[resultId as keyof typeof characterBase].emoji} ${charT.name} - ${charT.title}

✨ ${charT.traits.join(" · ")}

${charT.description}

👉`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, url: shareUrl });
      } catch { /* 취소 */ }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert(t.copied);
    }
  };

  const result = resultId ? {
    ...characterBase[resultId as keyof typeof characterBase],
    ...t.characters[resultId as keyof typeof t.characters],
    compatibilityName: t.characters[characterBase[resultId as keyof typeof characterBase].compatibilityId as keyof typeof t.characters].name,
  } : null;

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-black text-xl text-white tracking-tight hover:opacity-80 transition-opacity">
              SLOX
            </Link>
            <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
              {t.backToMain}
            </Link>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* 인트로 */}
          {state === "intro" && (
            <div className="text-center">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                  <span className="text-amber-400 text-sm font-medium">🐂 {t.title} Test</span>
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  {t.subtitle}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> {t.title}</span>
                  {lang === "ko" ? "는?" : lang === "ja" ? "は?" : "?"}
                </h1>
                <p className="text-dark-400 text-lg">{t.tagline}</p>
              </div>

              {/* 캐릭터 미리보기 */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {characterIds.map((charId) => (
                  <div key={charId} className="aspect-square bg-dark-800/50 rounded-xl p-2 border border-dark-700">
                    <Image
                      src={characterBase[charId].image}
                      alt={t.characters[charId].name}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setState("questions")}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl text-lg hover:scale-105 transition-transform shadow-lg shadow-amber-500/30"
              >
                {t.startButton}
              </button>
            </div>
          )}

          {/* 질문 */}
          {state === "questions" && (
            <div>
              {/* 진행률 */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-dark-400 mb-2">
                  <span>{t.question} {currentQuestion + 1} / {t.questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / t.questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / t.questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* 질문 카드 */}
              <div className="bg-dark-900 rounded-2xl p-6 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
                  {t.questions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {t.questions[currentQuestion].answers.map((answer, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full p-4 bg-dark-800/50 hover:bg-dark-800 border border-dark-700 hover:border-amber-500/50 rounded-xl text-left text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span className="text-amber-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                      {answer}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 분석 중 (슬롯머신) */}
          {state === "analyzing" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-8">{t.analyzing}</h2>
              
              {/* 슬롯머신 */}
              <div className="relative w-48 h-48 mx-auto mb-8 bg-dark-900 rounded-2xl border-4 border-amber-500/50 overflow-hidden">
                <div className={`absolute inset-0 flex items-center justify-center ${isSpinning ? "animate-pulse" : ""}`}>
                  <Image
                    src={characterBase[characterIds[slotIndex]].image}
                    alt={t.slotAlt}
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                </div>
                {isSpinning && (
                  <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-transparent to-dark-900 pointer-events-none" />
                )}
              </div>

              <div className="flex justify-center gap-2">
                <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* 결과 */}
          {state === "result" && result && (
            <div className="text-center">
              {/* 결과 카드 */}
              <div className={`bg-gradient-to-br ${result.color} p-1 rounded-3xl mb-6`}>
                <div className="bg-dark-900 rounded-3xl p-6">
                  <div className="text-6xl mb-2">{result.emoji}</div>
                  <div className="w-40 h-40 mx-auto mb-4">
                    <Image
                      src={result.image}
                      alt={result.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{result.name}</h2>
                  <p className={`text-transparent bg-clip-text bg-gradient-to-r ${result.color} font-medium mb-4`}>
                    {result.title}
                  </p>
                  
                  {/* 특성 태그 */}
                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {result.traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 bg-dark-800 rounded-full text-sm text-dark-300"
                      >
                        #{trait}
                      </span>
                    ))}
                  </div>

                  <p className="text-dark-300 text-sm leading-relaxed mb-6">
                    {result.description}
                  </p>

                  {/* 강점/약점 */}
                  <div className="grid grid-cols-2 gap-4 text-left mb-4">
                    <div className="bg-dark-800/50 rounded-xl p-3">
                      <p className="text-green-400 text-xs font-medium mb-1">{t.strength}</p>
                      <p className="text-white text-sm">{result.strength}</p>
                    </div>
                    <div className="bg-dark-800/50 rounded-xl p-3">
                      <p className="text-orange-400 text-xs font-medium mb-1">{t.weakness}</p>
                      <p className="text-white text-sm">{result.weakness}</p>
                    </div>
                  </div>

                  {/* 궁합 */}
                  <div className="bg-dark-800/50 rounded-xl p-3">
                    <p className="text-pink-400 text-xs font-medium mb-1">{t.compatibility}</p>
                    <p className="text-white text-sm">{result.compatibilityName} {t.compatibilityText}</p>
                  </div>
                </div>
              </div>

              {/* 버튼들 */}
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

              {/* 다른 도구 */}
              <div className="mt-12 pt-8 border-t border-dark-800">
                <p className="text-dark-500 text-sm mb-4">{t.otherTests}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href={lang === "ko" ? "/reaction" : `/${lang}/reaction`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">
                    {t.reactionTest}
                  </Link>
                  <Link href={lang === "ko" ? "/color" : `/${lang}/color`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">
                    {t.colorGame}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* SLOX 홍보 */}
          <div className="mt-12 text-center">
            <p className="text-dark-500 text-sm mb-2">{t.poweredBy}</p>
            <Link href="/" className="font-black text-sm text-white tracking-tight hover:opacity-80 transition-opacity">
              SLOX
            </Link>

          </div>
        </div>
      </main>
    </div>
  );
}
