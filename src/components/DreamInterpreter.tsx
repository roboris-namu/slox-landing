"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

type Language = "ko" | "en" | "ja" | "zh" | "de" | "fr" | "es" | "pt";
type Screen = "intro" | "selecting" | "interpreting" | "result";

const VALID_LANGS: Language[] = ["ko", "en", "ja", "zh", "de", "fr", "es", "pt"];

interface Props {
  locale?: string;
}

const ui: Record<Language, {
  title: string; titleHL: string; subtitle: string; badge: string; start: string;
  selectPrompt: string; maxHint: string; selected: string; interpret: string;
  analyzing: string; luckyScore: string; meaning: string; advice: string;
  luckyItem: string; luckyColor: string; luckyNumber: string;
  share: string; retry: string; back: string; poweredBy: string; services: string;
  shareText: string; copied: string; otherTests: string; reaction: string; mbti: string;
  catAll: string; catAnimals: string; catNature: string; catPeople: string;
  catObjects: string; catActions: string; catPlaces: string; catEmotions: string; catBody: string;
}> = {
  ko: {
    title: "꿈해몽", titleHL: " 해석기", subtitle: "꿈에서 본 상징을 선택하고 신비로운 해석을 받아보세요",
    badge: "🔮 꿈해몽", start: "꿈 해석 시작하기 🌙",
    selectPrompt: "어떤 꿈을 꾸었나요?", maxHint: "최대 5개 선택 가능",
    selected: "선택됨", interpret: "꿈 해석하기 🔮",
    analyzing: "꿈의 신비를 해석하는 중...", luckyScore: "행운 점수",
    meaning: "꿈의 해석", advice: "오늘의 조언",
    luckyItem: "행운의 아이템", luckyColor: "행운의 색상", luckyNumber: "행운의 숫자",
    share: "📤 결과 공유", retry: "🔄 다시 해석",
    back: "← 메인으로", poweredBy: "Powered by", services: "홈페이지 · 앱 제작 · AI 챗봇 구축",
    shareText: "🌙 꿈해몽 결과!", copied: "결과가 클립보드에 복사되었습니다!",
    otherTests: "다른 테스트도 해보세요!", reaction: "⚡ 반응속도 테스트", mbti: "🧠 MBTI 테스트",
    catAll: "✨ 전체", catAnimals: "🐾 동물", catNature: "🌿 자연", catPeople: "👤 사람",
    catObjects: "📦 물건", catActions: "🏃 행동", catPlaces: "📍 장소",
    catEmotions: "💭 감정", catBody: "🫀 신체",
  },
  en: {
    title: "Dream", titleHL: " Interpreter", subtitle: "Select dream symbols and receive a mystical interpretation",
    badge: "🔮 Dream Reading", start: "Start Interpretation 🌙",
    selectPrompt: "What did you dream about?", maxHint: "Select up to 5",
    selected: "selected", interpret: "Interpret Dream 🔮",
    analyzing: "Interpreting the mysteries of your dream...", luckyScore: "Lucky Score",
    meaning: "Dream Interpretation", advice: "Today's Advice",
    luckyItem: "Lucky Item", luckyColor: "Lucky Color", luckyNumber: "Lucky Number",
    share: "📤 Share Result", retry: "🔄 Try Again",
    back: "← Back", poweredBy: "Powered by", services: "Web · App · AI Chatbot",
    shareText: "🌙 Dream Interpretation Result!", copied: "Result copied to clipboard!",
    otherTests: "Try other tests!", reaction: "⚡ Reaction Test", mbti: "🧠 MBTI Test",
    catAll: "✨ All", catAnimals: "🐾 Animals", catNature: "🌿 Nature", catPeople: "👤 People",
    catObjects: "📦 Objects", catActions: "🏃 Actions", catPlaces: "📍 Places",
    catEmotions: "💭 Emotions", catBody: "🫀 Body",
  },
  ja: {
    title: "夢占い", titleHL: " 解釈", subtitle: "夢のシンボルを選んで神秘的な解釈を受け取りましょう",
    badge: "🔮 夢占い", start: "夢占いを始める 🌙",
    selectPrompt: "どんな夢を見ましたか？", maxHint: "最大5つ選択可能",
    selected: "選択済み", interpret: "夢を解釈する 🔮",
    analyzing: "夢の神秘を解き明かしています...", luckyScore: "ラッキースコア",
    meaning: "夢の解釈", advice: "今日のアドバイス",
    luckyItem: "ラッキーアイテム", luckyColor: "ラッキーカラー", luckyNumber: "ラッキーナンバー",
    share: "📤 結果をシェア", retry: "🔄 もう一度",
    back: "← 戻る", poweredBy: "Powered by", services: "ウェブ · アプリ · AIチャットボット",
    shareText: "🌙 夢占いの結果!", copied: "結果がクリップボードにコピーされました!",
    otherTests: "他のテストも試してみよう!", reaction: "⚡ 反応速度テスト", mbti: "🧠 MBTIテスト",
    catAll: "✨ すべて", catAnimals: "🐾 動物", catNature: "🌿 自然", catPeople: "👤 人物",
    catObjects: "📦 物", catActions: "🏃 行動", catPlaces: "📍 場所",
    catEmotions: "💭 感情", catBody: "🫀 体",
  },
  zh: {
    title: "解梦", titleHL: " 大师", subtitle: "选择梦境符号，获取神秘解读",
    badge: "🔮 解梦", start: "开始解梦 🌙",
    selectPrompt: "你梦见了什么？", maxHint: "最多选择5个",
    selected: "已选", interpret: "解读梦境 🔮",
    analyzing: "正在解读梦境的奥秘...", luckyScore: "幸运指数",
    meaning: "梦境解读", advice: "今日建议",
    luckyItem: "幸运物品", luckyColor: "幸运颜色", luckyNumber: "幸运数字",
    share: "📤 分享结果", retry: "🔄 再试一次",
    back: "← 返回", poweredBy: "Powered by", services: "网站 · 应用 · AI聊天机器人",
    shareText: "🌙 解梦结果!", copied: "结果已复制到剪贴板!",
    otherTests: "试试其他测试!", reaction: "⚡ 反应速度测试", mbti: "🧠 MBTI测试",
    catAll: "✨ 全部", catAnimals: "🐾 动物", catNature: "🌿 自然", catPeople: "👤 人物",
    catObjects: "📦 物品", catActions: "🏃 行为", catPlaces: "📍 场所",
    catEmotions: "💭 情感", catBody: "🫀 身体",
  },
  de: {
    title: "Traum", titleHL: "deutung", subtitle: "Wählen Sie Traumsymbole und erhalten Sie eine mystische Deutung",
    badge: "🔮 Traumdeutung", start: "Deutung starten 🌙",
    selectPrompt: "Wovon haben Sie geträumt?", maxHint: "Bis zu 5 auswählen",
    selected: "ausgewählt", interpret: "Traum deuten 🔮",
    analyzing: "Die Geheimnisse Ihres Traums werden entschlüsselt...", luckyScore: "Glückspunktzahl",
    meaning: "Traumdeutung", advice: "Heutiger Rat",
    luckyItem: "Glücksgegenstand", luckyColor: "Glücksfarbe", luckyNumber: "Glückszahl",
    share: "📤 Ergebnis teilen", retry: "🔄 Nochmal",
    back: "← Zurück", poweredBy: "Powered by", services: "Web · App · KI-Chatbot",
    shareText: "🌙 Traumdeutung Ergebnis!", copied: "Ergebnis in die Zwischenablage kopiert!",
    otherTests: "Probieren Sie andere Tests!", reaction: "⚡ Reaktionstest", mbti: "🧠 MBTI-Test",
    catAll: "✨ Alle", catAnimals: "🐾 Tiere", catNature: "🌿 Natur", catPeople: "👤 Menschen",
    catObjects: "📦 Objekte", catActions: "🏃 Handlungen", catPlaces: "📍 Orte",
    catEmotions: "💭 Emotionen", catBody: "🫀 Körper",
  },
  fr: {
    title: "Interprétation", titleHL: " des Rêves", subtitle: "Sélectionnez des symboles oniriques et recevez une interprétation mystique",
    badge: "🔮 Interprétation", start: "Commencer l'interprétation 🌙",
    selectPrompt: "De quoi avez-vous rêvé ?", maxHint: "Jusqu'à 5 sélections",
    selected: "sélectionné(s)", interpret: "Interpréter le Rêve 🔮",
    analyzing: "Déchiffrement des mystères de votre rêve...", luckyScore: "Score de Chance",
    meaning: "Interprétation", advice: "Conseil du Jour",
    luckyItem: "Objet Porte-bonheur", luckyColor: "Couleur Porte-bonheur", luckyNumber: "Numéro Porte-bonheur",
    share: "📤 Partager", retry: "🔄 Recommencer",
    back: "← Retour", poweredBy: "Powered by", services: "Web · App · Chatbot IA",
    shareText: "🌙 Résultat de l'interprétation des rêves !", copied: "Résultat copié !",
    otherTests: "Essayez d'autres tests !", reaction: "⚡ Test de Réaction", mbti: "🧠 Test MBTI",
    catAll: "✨ Tous", catAnimals: "🐾 Animaux", catNature: "🌿 Nature", catPeople: "👤 Personnes",
    catObjects: "📦 Objets", catActions: "🏃 Actions", catPlaces: "📍 Lieux",
    catEmotions: "💭 Émotions", catBody: "🫀 Corps",
  },
  es: {
    title: "Interpretación", titleHL: " de Sueños", subtitle: "Selecciona símbolos oníricos y recibe una interpretación mística",
    badge: "🔮 Interpretación", start: "Comenzar Interpretación 🌙",
    selectPrompt: "¿Qué soñaste?", maxHint: "Selecciona hasta 5",
    selected: "seleccionado(s)", interpret: "Interpretar Sueño 🔮",
    analyzing: "Descifrando los misterios de tu sueño...", luckyScore: "Puntuación de Suerte",
    meaning: "Interpretación", advice: "Consejo del Día",
    luckyItem: "Objeto de Suerte", luckyColor: "Color de Suerte", luckyNumber: "Número de Suerte",
    share: "📤 Compartir", retry: "🔄 Intentar de Nuevo",
    back: "← Volver", poweredBy: "Powered by", services: "Web · App · Chatbot IA",
    shareText: "🌙 Resultado de Interpretación de Sueños!", copied: "¡Resultado copiado!",
    otherTests: "¡Prueba otros tests!", reaction: "⚡ Test de Reacción", mbti: "🧠 Test MBTI",
    catAll: "✨ Todos", catAnimals: "🐾 Animales", catNature: "🌿 Naturaleza", catPeople: "👤 Personas",
    catObjects: "📦 Objetos", catActions: "🏃 Acciones", catPlaces: "📍 Lugares",
    catEmotions: "💭 Emociones", catBody: "🫀 Cuerpo",
  },
  pt: {
    title: "Interpretação", titleHL: " dos Sonhos", subtitle: "Selecione símbolos dos sonhos e receba uma interpretação mística",
    badge: "🔮 Interpretação", start: "Iniciar Interpretação 🌙",
    selectPrompt: "O que você sonhou?", maxHint: "Selecione até 5",
    selected: "selecionado(s)", interpret: "Interpretar Sonho 🔮",
    analyzing: "Decifrando os mistérios do seu sonho...", luckyScore: "Pontuação de Sorte",
    meaning: "Interpretação", advice: "Conselho do Dia",
    luckyItem: "Item da Sorte", luckyColor: "Cor da Sorte", luckyNumber: "Número da Sorte",
    share: "📤 Compartilhar", retry: "🔄 Tentar Novamente",
    back: "← Voltar", poweredBy: "Powered by", services: "Web · App · Chatbot IA",
    shareText: "🌙 Resultado da Interpretação dos Sonhos!", copied: "Resultado copiado!",
    otherTests: "Experimente outros testes!", reaction: "⚡ Teste de Reação", mbti: "🧠 Teste MBTI",
    catAll: "✨ Todos", catAnimals: "🐾 Animais", catNature: "🌿 Natureza", catPeople: "👤 Pessoas",
    catObjects: "📦 Objetos", catActions: "🏃 Ações", catPlaces: "📍 Lugares",
    catEmotions: "💭 Emoções", catBody: "🫀 Corpo",
  },
};

const catKeys = ["all","animals","nature","people","objects","actions","places","emotions","body"] as const;
const catUIKey: Record<string, keyof typeof ui.ko> = {
  all: "catAll", animals: "catAnimals", nature: "catNature", people: "catPeople",
  objects: "catObjects", actions: "catActions", places: "catPlaces",
  emotions: "catEmotions", body: "catBody",
};

const kwMeta: Record<string, { emoji: string; cat: string; luck: number }> = {
  cat: { emoji: "🐱", cat: "animals", luck: 60 }, dog: { emoji: "🐕", cat: "animals", luck: 70 },
  snake: { emoji: "🐍", cat: "animals", luck: 85 }, bird: { emoji: "🐦", cat: "animals", luck: 75 },
  fish: { emoji: "🐟", cat: "animals", luck: 80 }, horse: { emoji: "🐴", cat: "animals", luck: 80 },
  spider: { emoji: "🕷️", cat: "animals", luck: 55 }, dragon: { emoji: "🐉", cat: "animals", luck: 95 },
  water: { emoji: "💧", cat: "nature", luck: 70 }, fire: { emoji: "🔥", cat: "nature", luck: 75 },
  mountain: { emoji: "⛰️", cat: "nature", luck: 78 }, tree: { emoji: "🌳", cat: "nature", luck: 76 },
  rain: { emoji: "🌧️", cat: "nature", luck: 68 }, flower: { emoji: "🌸", cat: "nature", luck: 82 },
  moon: { emoji: "🌙", cat: "nature", luck: 80 }, sun: { emoji: "☀️", cat: "nature", luck: 92 },
  family: { emoji: "👨‍👩‍👧", cat: "people", luck: 75 }, stranger: { emoji: "🧑", cat: "people", luck: 55 },
  friend: { emoji: "🤝", cat: "people", luck: 72 }, baby: { emoji: "👶", cat: "people", luck: 85 },
  elderly: { emoji: "👴", cat: "people", luck: 70 }, celebrity: { emoji: "⭐", cat: "people", luck: 65 },
  money: { emoji: "💰", cat: "objects", luck: 92 }, key: { emoji: "🔑", cat: "objects", luck: 82 },
  mirror: { emoji: "🪞", cat: "objects", luck: 60 }, book: { emoji: "📖", cat: "objects", luck: 74 },
  ring: { emoji: "💍", cat: "objects", luck: 85 }, car: { emoji: "🚗", cat: "objects", luck: 70 },
  phone: { emoji: "📱", cat: "objects", luck: 62 }, house: { emoji: "🏠", cat: "objects", luck: 75 },
  flying: { emoji: "🕊️", cat: "actions", luck: 88 }, falling: { emoji: "⬇️", cat: "actions", luck: 35 },
  running: { emoji: "🏃", cat: "actions", luck: 50 }, swimming: { emoji: "🏊", cat: "actions", luck: 72 },
  climbing: { emoji: "🧗", cat: "actions", luck: 78 }, fighting: { emoji: "👊", cat: "actions", luck: 45 },
  school: { emoji: "🏫", cat: "places", luck: 65 }, ocean: { emoji: "🌊", cat: "places", luck: 72 },
  forest: { emoji: "🌲", cat: "places", luck: 60 }, home: { emoji: "🏡", cat: "places", luck: 78 },
  hospital: { emoji: "🏥", cat: "places", luck: 50 }, bridge: { emoji: "🌉", cat: "places", luck: 72 },
  fear: { emoji: "😨", cat: "emotions", luck: 40 }, happiness: { emoji: "😊", cat: "emotions", luck: 90 },
  sadness: { emoji: "😢", cat: "emotions", luck: 48 }, anger: { emoji: "😡", cat: "emotions", luck: 42 },
  confusion: { emoji: "😵", cat: "emotions", luck: 45 }, peace: { emoji: "😌", cat: "emotions", luck: 88 },
  teeth: { emoji: "🦷", cat: "body", luck: 52 }, hair: { emoji: "💇", cat: "body", luck: 62 },
  eyes: { emoji: "👁️", cat: "body", luck: 70 }, hands: { emoji: "🤲", cat: "body", luck: 72 },
  blood: { emoji: "🩸", cat: "body", luck: 55 }, death: { emoji: "💀", cat: "body", luck: 60 },
};

const kwIds = Object.keys(kwMeta);

const kwName: Record<string, Record<Language, string>> = {
  cat: { ko: "고양이", en: "Cat", ja: "猫", zh: "猫", de: "Katze", fr: "Chat", es: "Gato", pt: "Gato" },
  dog: { ko: "개", en: "Dog", ja: "犬", zh: "狗", de: "Hund", fr: "Chien", es: "Perro", pt: "Cachorro" },
  snake: { ko: "뱀", en: "Snake", ja: "蛇", zh: "蛇", de: "Schlange", fr: "Serpent", es: "Serpiente", pt: "Cobra" },
  bird: { ko: "새", en: "Bird", ja: "鳥", zh: "鸟", de: "Vogel", fr: "Oiseau", es: "Pájaro", pt: "Pássaro" },
  fish: { ko: "물고기", en: "Fish", ja: "魚", zh: "鱼", de: "Fisch", fr: "Poisson", es: "Pez", pt: "Peixe" },
  horse: { ko: "말", en: "Horse", ja: "馬", zh: "马", de: "Pferd", fr: "Cheval", es: "Caballo", pt: "Cavalo" },
  spider: { ko: "거미", en: "Spider", ja: "蜘蛛", zh: "蜘蛛", de: "Spinne", fr: "Araignée", es: "Araña", pt: "Aranha" },
  dragon: { ko: "용", en: "Dragon", ja: "龍", zh: "龙", de: "Drache", fr: "Dragon", es: "Dragón", pt: "Dragão" },
  water: { ko: "물", en: "Water", ja: "水", zh: "水", de: "Wasser", fr: "Eau", es: "Agua", pt: "Água" },
  fire: { ko: "불", en: "Fire", ja: "火", zh: "火", de: "Feuer", fr: "Feu", es: "Fuego", pt: "Fogo" },
  mountain: { ko: "산", en: "Mountain", ja: "山", zh: "山", de: "Berg", fr: "Montagne", es: "Montaña", pt: "Montanha" },
  tree: { ko: "나무", en: "Tree", ja: "木", zh: "树", de: "Baum", fr: "Arbre", es: "Árbol", pt: "Árvore" },
  rain: { ko: "비", en: "Rain", ja: "雨", zh: "雨", de: "Regen", fr: "Pluie", es: "Lluvia", pt: "Chuva" },
  flower: { ko: "꽃", en: "Flower", ja: "花", zh: "花", de: "Blume", fr: "Fleur", es: "Flor", pt: "Flor" },
  moon: { ko: "달", en: "Moon", ja: "月", zh: "月亮", de: "Mond", fr: "Lune", es: "Luna", pt: "Lua" },
  sun: { ko: "태양", en: "Sun", ja: "太陽", zh: "太阳", de: "Sonne", fr: "Soleil", es: "Sol", pt: "Sol" },
  family: { ko: "가족", en: "Family", ja: "家族", zh: "家人", de: "Familie", fr: "Famille", es: "Familia", pt: "Família" },
  stranger: { ko: "낯선 사람", en: "Stranger", ja: "見知らぬ人", zh: "陌生人", de: "Fremder", fr: "Étranger", es: "Extraño", pt: "Estranho" },
  friend: { ko: "친구", en: "Friend", ja: "友人", zh: "朋友", de: "Freund", fr: "Ami", es: "Amigo", pt: "Amigo" },
  baby: { ko: "아기", en: "Baby", ja: "赤ちゃん", zh: "婴儿", de: "Baby", fr: "Bébé", es: "Bebé", pt: "Bebê" },
  elderly: { ko: "노인", en: "Elderly", ja: "老人", zh: "老人", de: "Älterer", fr: "Aîné", es: "Anciano", pt: "Idoso" },
  celebrity: { ko: "유명인", en: "Celebrity", ja: "有名人", zh: "名人", de: "Prominenter", fr: "Célébrité", es: "Celebridad", pt: "Celebridade" },
  money: { ko: "돈", en: "Money", ja: "お金", zh: "钱", de: "Geld", fr: "Argent", es: "Dinero", pt: "Dinheiro" },
  key: { ko: "열쇠", en: "Key", ja: "鍵", zh: "钥匙", de: "Schlüssel", fr: "Clé", es: "Llave", pt: "Chave" },
  mirror: { ko: "거울", en: "Mirror", ja: "鏡", zh: "镜子", de: "Spiegel", fr: "Miroir", es: "Espejo", pt: "Espelho" },
  book: { ko: "책", en: "Book", ja: "本", zh: "书", de: "Buch", fr: "Livre", es: "Libro", pt: "Livro" },
  ring: { ko: "반지", en: "Ring", ja: "指輪", zh: "戒指", de: "Ring", fr: "Bague", es: "Anillo", pt: "Anel" },
  car: { ko: "자동차", en: "Car", ja: "車", zh: "车", de: "Auto", fr: "Voiture", es: "Coche", pt: "Carro" },
  phone: { ko: "핸드폰", en: "Phone", ja: "携帯", zh: "手机", de: "Handy", fr: "Téléphone", es: "Teléfono", pt: "Celular" },
  house: { ko: "집", en: "House", ja: "家", zh: "房子", de: "Haus", fr: "Maison", es: "Casa", pt: "Casa" },
  flying: { ko: "날기", en: "Flying", ja: "飛ぶ", zh: "飞翔", de: "Fliegen", fr: "Voler", es: "Volar", pt: "Voar" },
  falling: { ko: "떨어지기", en: "Falling", ja: "落ちる", zh: "坠落", de: "Fallen", fr: "Tomber", es: "Caer", pt: "Cair" },
  running: { ko: "달리기", en: "Running", ja: "走る", zh: "奔跑", de: "Rennen", fr: "Courir", es: "Correr", pt: "Correr" },
  swimming: { ko: "수영", en: "Swimming", ja: "泳ぐ", zh: "游泳", de: "Schwimmen", fr: "Nager", es: "Nadar", pt: "Nadar" },
  climbing: { ko: "오르기", en: "Climbing", ja: "登る", zh: "攀登", de: "Klettern", fr: "Grimper", es: "Escalar", pt: "Escalar" },
  fighting: { ko: "싸움", en: "Fighting", ja: "戦う", zh: "打斗", de: "Kämpfen", fr: "Se battre", es: "Pelear", pt: "Lutar" },
  school: { ko: "학교", en: "School", ja: "学校", zh: "学校", de: "Schule", fr: "École", es: "Escuela", pt: "Escola" },
  ocean: { ko: "바다", en: "Ocean", ja: "海", zh: "海洋", de: "Ozean", fr: "Océan", es: "Océano", pt: "Oceano" },
  forest: { ko: "숲", en: "Forest", ja: "森", zh: "森林", de: "Wald", fr: "Forêt", es: "Bosque", pt: "Floresta" },
  home: { ko: "고향", en: "Home", ja: "故郷", zh: "故乡", de: "Zuhause", fr: "Foyer", es: "Hogar", pt: "Lar" },
  hospital: { ko: "병원", en: "Hospital", ja: "病院", zh: "医院", de: "Krankenhaus", fr: "Hôpital", es: "Hospital", pt: "Hospital" },
  bridge: { ko: "다리", en: "Bridge", ja: "橋", zh: "桥", de: "Brücke", fr: "Pont", es: "Puente", pt: "Ponte" },
  fear: { ko: "두려움", en: "Fear", ja: "恐怖", zh: "恐惧", de: "Angst", fr: "Peur", es: "Miedo", pt: "Medo" },
  happiness: { ko: "행복", en: "Happiness", ja: "幸福", zh: "幸福", de: "Glück", fr: "Bonheur", es: "Felicidad", pt: "Felicidade" },
  sadness: { ko: "슬픔", en: "Sadness", ja: "悲しみ", zh: "悲伤", de: "Trauer", fr: "Tristesse", es: "Tristeza", pt: "Tristeza" },
  anger: { ko: "분노", en: "Anger", ja: "怒り", zh: "愤怒", de: "Wut", fr: "Colère", es: "Ira", pt: "Raiva" },
  confusion: { ko: "혼란", en: "Confusion", ja: "混乱", zh: "困惑", de: "Verwirrung", fr: "Confusion", es: "Confusión", pt: "Confusão" },
  peace: { ko: "평화", en: "Peace", ja: "平和", zh: "和平", de: "Frieden", fr: "Paix", es: "Paz", pt: "Paz" },
  teeth: { ko: "이빨", en: "Teeth", ja: "歯", zh: "牙齿", de: "Zähne", fr: "Dents", es: "Dientes", pt: "Dentes" },
  hair: { ko: "머리카락", en: "Hair", ja: "髪", zh: "头发", de: "Haare", fr: "Cheveux", es: "Cabello", pt: "Cabelo" },
  eyes: { ko: "눈(목)", en: "Eyes", ja: "目", zh: "眼睛", de: "Augen", fr: "Yeux", es: "Ojos", pt: "Olhos" },
  hands: { ko: "손", en: "Hands", ja: "手", zh: "手", de: "Hände", fr: "Mains", es: "Manos", pt: "Mãos" },
  blood: { ko: "피", en: "Blood", ja: "血", zh: "血", de: "Blut", fr: "Sang", es: "Sangre", pt: "Sangue" },
  death: { ko: "죽음", en: "Death", ja: "死", zh: "死亡", de: "Tod", fr: "Mort", es: "Muerte", pt: "Morte" },
};

const kwInterp: Record<string, Record<Language, string>> = {
  cat: {
    ko: "고양이는 독립심, 직감, 숨겨진 비밀을 상징합니다. 직감을 믿으세요—곧 신비로운 무언가가 드러날 수 있습니다.",
    en: "Cats symbolize independence, intuition, and hidden secrets. Trust your instincts—something mysterious may reveal itself soon.",
    ja: "猫は独立心、直感、隠された秘密を象徴しています。直感を信じてください—神秘的な何かがまもなく明らかになるかもしれません。",
    zh: "猫象征着独立、直觉和隐藏的秘密。相信你的直觉——某些神秘的事物可能很快就会显现。",
    de: "Katzen symbolisieren Unabhängigkeit, Intuition und verborgene Geheimnisse. Vertrauen Sie Ihrem Instinkt—etwas Geheimnisvolles könnte sich bald offenbaren.",
    fr: "Les chats symbolisent l'indépendance, l'intuition et les secrets cachés. Fiez-vous à votre instinct—quelque chose de mystérieux pourrait bientôt se révéler.",
    es: "Los gatos simbolizan independencia, intuición y secretos ocultos. Confía en tu instinto—algo misterioso podría revelarse pronto.",
    pt: "Gatos simbolizam independência, intuição e segredos ocultos. Confie em seus instintos—algo misterioso pode se revelar em breve.",
  },
  dog: {
    ko: "개는 충성심, 우정, 보호를 상징합니다. 믿을 수 있는 동반자가 중요한 소식을 전해줄 수 있습니다.",
    en: "Dogs symbolize loyalty, friendship, and protection. A trusted companion may bring you important news or support.",
    ja: "犬は忠誠心、友情、保護を象徴しています。信頼できる仲間が重要な知らせや支えをもたらすでしょう。",
    zh: "狗象征着忠诚、友谊和保护。一位值得信赖的伙伴可能会带来重要的消息或支持。",
    de: "Hunde symbolisieren Loyalität, Freundschaft und Schutz. Ein vertrauenswürdiger Begleiter könnte wichtige Neuigkeiten bringen.",
    fr: "Les chiens symbolisent la loyauté, l'amitié et la protection. Un compagnon de confiance pourrait vous apporter des nouvelles importantes.",
    es: "Los perros simbolizan lealtad, amistad y protección. Un compañero de confianza podría traerte noticias importantes o apoyo.",
    pt: "Cachorros simbolizam lealdade, amizade e proteção. Um companheiro de confiança pode trazer notícias importantes ou apoio.",
  },
  snake: {
    ko: "뱀은 변화, 숨겨진 두려움, 재물운을 상징합니다. 큰 뱀은 예상치 못한 재물이나 삶의 큰 변화가 다가옴을 의미합니다.",
    en: "Snakes symbolize transformation, hidden fears, or financial fortune. A large snake often indicates unexpected wealth or a major life change approaching.",
    ja: "蛇は変化、隠れた恐れ、金運を象徴しています。大きな蛇は予期せぬ富や人生の大きな変化が近づいていることを意味します。",
    zh: "蛇象征着蜕变、隐藏的恐惧或财运。大蛇往往预示着意想不到的财富或重大的人生转变即将到来。",
    de: "Schlangen symbolisieren Transformation, verborgene Ängste oder finanzielles Glück. Eine große Schlange deutet auf unerwarteten Reichtum oder eine große Veränderung hin.",
    fr: "Les serpents symbolisent la transformation, les peurs cachées ou la fortune financière. Un grand serpent indique souvent une richesse inattendue ou un changement majeur.",
    es: "Las serpientes simbolizan transformación, miedos ocultos o fortuna financiera. Una serpiente grande indica riqueza inesperada o un gran cambio vital.",
    pt: "Cobras simbolizam transformação, medos ocultos ou fortuna financeira. Uma cobra grande frequentemente indica riqueza inesperada ou uma grande mudança se aproximando.",
  },
  bird: {
    ko: "새는 자유, 열망, 영적 메시지를 상징합니다. 새로운 시각과 기회가 다가오고 있으니 안전지대를 벗어나 탐험해보세요.",
    en: "Birds symbolize freedom, aspirations, and spiritual messages. New perspectives and opportunities are on the horizon—spread your wings.",
    ja: "鳥は自由、志、スピリチュアルなメッセージを象徴しています。新しい視点とチャンスが近づいています—羽ばたきましょう。",
    zh: "鸟象征着自由、抱负和灵性信息。新的视角和机遇正在向你靠近——展翅高飞吧。",
    de: "Vögel symbolisieren Freiheit, Bestrebungen und spirituelle Botschaften. Neue Perspektiven und Chancen zeichnen sich ab—breiten Sie Ihre Flügel aus.",
    fr: "Les oiseaux symbolisent la liberté, les aspirations et les messages spirituels. De nouvelles perspectives et opportunités se profilent—déployez vos ailes.",
    es: "Los pájaros simbolizan libertad, aspiraciones y mensajes espirituales. Nuevas perspectivas y oportunidades están en el horizonte—extiende tus alas.",
    pt: "Pássaros simbolizam liberdade, aspirações e mensagens espirituais. Novas perspectivas e oportunidades estão no horizonte—abra suas asas.",
  },
  fish: {
    ko: "물고기는 풍요, 번영, 다산을 상징합니다. 재물운이 다가오고 있으니 행운의 흐름을 믿고 준비하세요.",
    en: "Fish symbolize abundance, prosperity, and fertility. Financial opportunities are swimming your way—trust the flow of fortune.",
    ja: "魚は豊かさ、繁栄、多産を象徴しています。金運があなたに向かって泳いできています—幸運の流れを信じましょう。",
    zh: "鱼象征着丰盛、繁荣和富足。财运正向你游来——相信命运的流转吧。",
    de: "Fische symbolisieren Überfluss, Wohlstand und Fruchtbarkeit. Finanzielle Möglichkeiten schwimmen auf Sie zu—vertrauen Sie dem Strom.",
    fr: "Les poissons symbolisent l'abondance, la prospérité et la fertilité. Des opportunités financières nagent vers vous—faites confiance au courant.",
    es: "Los peces simbolizan abundancia, prosperidad y fertilidad. Oportunidades financieras nadan hacia ti—confía en la corriente de la fortuna.",
    pt: "Peixes simbolizam abundância, prosperidade e fertilidade. Oportunidades financeiras nadam em sua direção—confie no fluxo da fortuna.",
  },
  horse: {
    ko: "말은 힘, 자유, 열정적인 추진력을 상징합니다. 강력한 에너지가 목표를 향해 당신을 이끌 것입니다.",
    en: "Horses symbolize strength, freedom, and passionate drive. A powerful energy will carry you forward toward your goals.",
    ja: "馬は力、自由、情熱的な推進力を象徴しています。強力なエネルギーが目標に向かってあなたを前進させるでしょう。",
    zh: "马象征着力量、自由和充满激情的驱动力。强大的能量将推动你向目标前进。",
    de: "Pferde symbolisieren Stärke, Freiheit und leidenschaftlichen Antrieb. Eine kraftvolle Energie wird Sie Ihren Zielen entgegentragen.",
    fr: "Les chevaux symbolisent la force, la liberté et l'élan passionné. Une énergie puissante vous portera vers vos objectifs.",
    es: "Los caballos simbolizan fuerza, libertad e impulso apasionado. Una energía poderosa te llevará hacia tus metas.",
    pt: "Cavalos simbolizam força, liberdade e impulso apaixonado. Uma energia poderosa o levará em direção aos seus objetivos.",
  },
  spider: {
    ko: "거미는 창의성, 인내, 운명의 짜임을 상징합니다. 세심한 계획이 정교한 성공의 그물을 만들 것입니다.",
    en: "Spiders symbolize creativity, patience, and the weaving of destiny. Your careful plans will create an intricate web of success.",
    ja: "蜘蛛は創造性、忍耐、運命の織物を象徴しています。あなたの綿密な計画が精巧な成功の網を紡ぐでしょう。",
    zh: "蜘蛛象征着创造力、耐心和命运的编织。你精心的计划将织就一张成功之网。",
    de: "Spinnen symbolisieren Kreativität, Geduld und das Weben des Schicksals. Ihre sorgfältigen Pläne werden ein Netz des Erfolgs weben.",
    fr: "Les araignées symbolisent la créativité, la patience et le tissage du destin. Vos plans minutieux tisseront un réseau de succès.",
    es: "Las arañas simbolizan creatividad, paciencia y el tejido del destino. Tus planes cuidadosos tejerán una red de éxito.",
    pt: "Aranhas simbolizam criatividade, paciência e a tecelagem do destino. Seus planos cuidadosos tecem uma rede de sucesso.",
  },
  dragon: {
    ko: "용은 막대한 힘, 큰 행운, 비범한 성공을 나타냅니다. 꿈에서 가장 길한 상징 중 하나로, 대담한 성취가 기다립니다.",
    en: "Dragons represent immense power, great fortune, and extraordinary success. One of the most auspicious dream symbols—bold achievements await you.",
    ja: "龍は絶大な力、大きな幸運、並外れた成功を表しています。最も吉兆な夢のシンボルの一つ—大胆な成果があなたを待っています。",
    zh: "龙代表着巨大的力量、极好的运气和非凡的成功。这是最吉祥的梦境象征之一——大胆的成就正等待着你。",
    de: "Drachen symbolisieren immense Kraft, großes Glück und außergewöhnlichen Erfolg. Eines der verheißungsvollsten Traumsymbole—kühne Erfolge erwarten Sie.",
    fr: "Les dragons symbolisent une puissance immense, une grande fortune et un succès extraordinaire. L'un des symboles les plus favorables—de grandes réalisations vous attendent.",
    es: "Los dragones simbolizan inmenso poder, gran fortuna y éxito extraordinario. Uno de los símbolos más auspiciosos—grandes logros te esperan.",
    pt: "Dragões simbolizam poder imenso, grande fortuna e sucesso extraordinário. Um dos símbolos mais auspiciosos—conquistas ousadas o aguardam.",
  },
  water: {
    ko: "물은 감정, 정화, 삶의 흐름을 상징합니다. 감정이 자연스럽게 흐르게 하고 걱정을 씻어내세요.",
    en: "Water symbolizes emotions, purification, and the flow of life. Let your feelings flow naturally and cleanse your worries away.",
    ja: "水は感情、浄化、人生の流れを象徴しています。感情が自然に流れるままにし、悩みを洗い流しましょう。",
    zh: "水象征着情感、净化和生命的流动。让情绪自然流淌，洗净你的忧虑。",
    de: "Wasser symbolisiert Emotionen, Reinigung und den Fluss des Lebens. Lassen Sie Ihre Gefühle fließen und spülen Sie Sorgen fort.",
    fr: "L'eau symbolise les émotions, la purification et le flux de la vie. Laissez vos sentiments couler et lavez vos soucis.",
    es: "El agua simboliza emociones, purificación y el fluir de la vida. Deja que tus sentimientos fluyan y lava tus preocupaciones.",
    pt: "A água simboliza emoções, purificação e o fluxo da vida. Deixe seus sentimentos fluírem e lave suas preocupações.",
  },
  fire: {
    ko: "불은 열정, 변화, 강력한 에너지를 상징합니다. 내면의 불꽃을 긍정적 변화의 원동력으로 활용하세요.",
    en: "Fire symbolizes passion, transformation, and powerful energy. Channel your inner flame for dramatic positive changes in your life.",
    ja: "火は情熱、変化、強力なエネルギーを象徴しています。内なる炎を人生のポジティブな変化に活かしましょう。",
    zh: "火象征着激情、变革和强大的能量。将你内心的火焰用于带来积极的巨大改变。",
    de: "Feuer symbolisiert Leidenschaft, Transformation und kraftvolle Energie. Kanalisieren Sie Ihr inneres Feuer für positive Veränderungen.",
    fr: "Le feu symbolise la passion, la transformation et une énergie puissante. Canalisez votre flamme intérieure pour des changements positifs.",
    es: "El fuego simboliza pasión, transformación y energía poderosa. Canaliza tu llama interior para cambios positivos dramáticos.",
    pt: "O fogo simboliza paixão, transformação e energia poderosa. Canalize sua chama interior para mudanças positivas dramáticas.",
  },
  mountain: {
    ko: "산은 도전, 성취, 영적 성장을 상징합니다. 큰 장애물을 극복할 힘이 있으며 야망의 정상이 가까이 있습니다.",
    en: "Mountains symbolize challenges, achievements, and spiritual growth. You have the strength to overcome obstacles—the summit is within reach.",
    ja: "山は挑戦、達成、精神的成長を象徴しています。障害を乗り越える力があります—頂上は手の届く距離です。",
    zh: "山象征着挑战、成就和精神成长。你有力量克服障碍——抱负的顶峰就在触手可及之处。",
    de: "Berge symbolisieren Herausforderungen, Errungenschaften und Wachstum. Sie haben die Kraft, Hindernisse zu überwinden—der Gipfel ist nah.",
    fr: "Les montagnes symbolisent les défis, les réalisations et la croissance spirituelle. Vous avez la force de surmonter les obstacles—le sommet est proche.",
    es: "Las montañas simbolizan desafíos, logros y crecimiento espiritual. Tienes la fuerza para superar obstáculos—la cima está al alcance.",
    pt: "Montanhas simbolizam desafios, conquistas e crescimento espiritual. Você tem força para superar obstáculos—o topo está ao alcance.",
  },
  tree: {
    ko: "나무는 성장, 안정성, 깊은 뿌리를 상징합니다. 기반이 강하고 꾸준히 자라고 있으니 인연을 소중히 키우세요.",
    en: "Trees symbolize growth, stability, and deep roots. Your foundation is strong and growing—nurture your connections and watch life flourish.",
    ja: "木は成長、安定、深い根を象徴しています。基盤は強く育っています—つながりを育み、人生が花開くのを見守りましょう。",
    zh: "树象征着成长、稳定和深深的根基。你的基础稳固且在成长——培养你的联系，看着生活绽放。",
    de: "Bäume symbolisieren Wachstum, Stabilität und tiefe Wurzeln. Ihr Fundament ist stark—pflegen Sie Ihre Verbindungen und sehen Sie zu, wie das Leben erblüht.",
    fr: "Les arbres symbolisent la croissance, la stabilité et les racines profondes. Votre fondation est solide—cultivez vos liens et regardez la vie s'épanouir.",
    es: "Los árboles simbolizan crecimiento, estabilidad y raíces profundas. Tu base es sólida y crece—nutre tus conexiones y observa la vida florecer.",
    pt: "Árvores simbolizam crescimento, estabilidade e raízes profundas. Sua base é forte e cresce—cultive suas conexões e veja a vida florescer.",
  },
  rain: {
    ko: "비는 정화, 재생, 하늘로부터의 축복을 상징합니다. 오래된 걱정을 씻어내고 새로운 시작의 무지개가 기다립니다.",
    en: "Rain symbolizes cleansing, renewal, and blessings from above. Old worries wash away—a rainbow of opportunity awaits after the storm.",
    ja: "雨は浄化、再生、天からの祝福を象徴しています。古い悩みが洗い流され—嵐の後にチャンスの虹が待っています。",
    zh: "雨象征着净化、重生和来自天上的祝福。旧日忧虑被洗去——雨后，机遇的彩虹正在等待。",
    de: "Regen symbolisiert Reinigung, Erneuerung und Segen. Alte Sorgen werden weggespült—ein Regenbogen der Möglichkeiten wartet.",
    fr: "La pluie symbolise la purification, le renouveau et les bénédictions. Les vieux soucis sont lavés—un arc-en-ciel d'opportunités vous attend.",
    es: "La lluvia simboliza purificación, renovación y bendiciones del cielo. Las viejas preocupaciones se lavan—un arcoíris de oportunidades te espera.",
    pt: "A chuva simboliza purificação, renovação e bênçãos do alto. Velhas preocupações são lavadas—um arco-íris de oportunidades o aguarda.",
  },
  flower: {
    ko: "꽃은 아름다움, 성장, 피어나는 사랑을 상징합니다. 지금 당신의 삶에서 아름다운 것이 펼쳐지고 있습니다.",
    en: "Flowers symbolize beauty, growth, and blossoming love. Something beautiful is unfolding in your life—open yourself to joy and tenderness.",
    ja: "花は美しさ、成長、花開く愛を象徴しています。あなたの人生で美しいものが展開しています—喜びに心を開いてください。",
    zh: "花象征着美丽、成长和绽放的爱。此刻你的生活中正有美好的事物展开——向喜悦敞开心扉。",
    de: "Blumen symbolisieren Schönheit, Wachstum und aufblühende Liebe. Etwas Schönes entfaltet sich—öffnen Sie sich für Freude und Zärtlichkeit.",
    fr: "Les fleurs symbolisent la beauté, la croissance et l'amour en éclosion. Quelque chose de magnifique se déploie—ouvrez-vous à la joie.",
    es: "Las flores simbolizan belleza, crecimiento y amor floreciente. Algo hermoso se despliega en tu vida—ábrete a la alegría.",
    pt: "Flores simbolizam beleza, crescimento e amor florescente. Algo bonito está se desdobrando em sua vida—abra-se para a alegria.",
  },
  moon: {
    ko: "달은 직감, 신비, 숨겨진 진실을 상징합니다. 아직 보이지 않는 것을 느끼는 대로 믿으세요—내면의 지혜가 인도합니다.",
    en: "The moon symbolizes intuition, mystery, and hidden truths. Trust what you feel but cannot yet see—your inner wisdom guides you through darkness.",
    ja: "月は直感、神秘、隠された真実を象徴しています。見えないものを感じるままに信じてください—内なる知恵が導いています。",
    zh: "月亮象征着直觉、神秘和隐藏的真相。相信你能感受到但尚未看清的东西——内心的智慧正在引导你。",
    de: "Der Mond symbolisiert Intuition, Mysterium und verborgene Wahrheiten. Vertrauen Sie dem, was Sie fühlen—Ihre innere Weisheit führt Sie.",
    fr: "La lune symbolise l'intuition, le mystère et les vérités cachées. Fiez-vous à ce que vous ressentez—votre sagesse intérieure vous guide.",
    es: "La luna simboliza intuición, misterio y verdades ocultas. Confía en lo que sientes pero no ves—tu sabiduría interior te guía.",
    pt: "A lua simboliza intuição, mistério e verdades ocultas. Confie no que sente mas não vê—sua sabedoria interior o guia.",
  },
  sun: {
    ko: "태양은 활력, 성공, 찬란한 명료함을 상징합니다. 밝고 번영하는 날들이 앞에 있으며 자신감이 모든 것을 밝힐 것입니다.",
    en: "The sun symbolizes vitality, success, and brilliant clarity. Bright and prosperous days lie ahead—your confidence will illuminate everything.",
    ja: "太陽は活力、成功、輝かしい明晰さを象徴しています。明るく繁栄する日々が待っています—あなたの自信がすべてを照らします。",
    zh: "太阳象征着活力、成功和璀璨的清明。光明而繁荣的日子就在前方——你的自信将照亮一切。",
    de: "Die Sonne symbolisiert Vitalität, Erfolg und strahlende Klarheit. Helle und wohlhabende Tage liegen vor Ihnen—Ihr Selbstvertrauen wird alles erhellen.",
    fr: "Le soleil symbolise la vitalité, le succès et une clarté brillante. Des jours lumineux et prospères vous attendent—votre confiance illuminera tout.",
    es: "El sol simboliza vitalidad, éxito y claridad brillante. Días luminosos y prósperos te esperan—tu confianza iluminará todo.",
    pt: "O sol simboliza vitalidade, sucesso e clareza brilhante. Dias luminosos e prósperos estão à frente—sua confiança iluminará tudo.",
  },
  family: {
    ko: "가족 꿈은 깊은 유대, 안전, 무조건적인 사랑을 나타냅니다. 가장 소중한 사람들과 다시 연결하고 관계를 돈독히 하세요.",
    en: "Family dreams represent deep bonds, security, and unconditional love. Reconnect with those who matter most and strengthen your relationships.",
    ja: "家族の夢は深い絆、安全、無条件の愛を表しています。最も大切な人々と再びつながり、関係を深めましょう。",
    zh: "梦见家人代表着深厚的纽带、安全感和无条件的爱。重新与最重要的人联系，加强你的关系。",
    de: "Familienträume symbolisieren tiefe Bindungen, Sicherheit und bedingungslose Liebe. Verbinden Sie sich wieder mit den wichtigsten Menschen.",
    fr: "Les rêves de famille représentent des liens profonds, la sécurité et l'amour inconditionnel. Reconnectez-vous avec ceux qui comptent le plus.",
    es: "Soñar con la familia representa lazos profundos, seguridad y amor incondicional. Reconéctate con quienes más te importan.",
    pt: "Sonhar com família representa laços profundos, segurança e amor incondicional. Reconecte-se com quem mais importa.",
  },
  stranger: {
    ko: "낯선 사람은 자신의 알려지지 않은 면을 나타냅니다. 숨겨진 재능과 미발견의 가능성이 당신 안에 있습니다.",
    en: "Strangers represent unknown aspects of yourself. Hidden talents and undiscovered possibilities lie within you—be open to self-discovery.",
    ja: "見知らぬ人はあなた自身の未知の側面を表しています。隠れた才能と未発見の可能性があなたの中にあります。",
    zh: "陌生人代表着你自身未知的面向。隐藏的才能和未被发现的可能性就在你内心。",
    de: "Fremde repräsentieren unbekannte Aspekte Ihres Selbst. Verborgene Talente und unentdeckte Möglichkeiten liegen in Ihnen.",
    fr: "Les étrangers représentent des aspects inconnus de vous-même. Des talents cachés et des possibilités insoupçonnées résident en vous.",
    es: "Los extraños representan aspectos desconocidos de ti mismo. Talentos ocultos y posibilidades por descubrir residen en ti.",
    pt: "Estranhos representam aspectos desconhecidos de si mesmo. Talentos ocultos e possibilidades inexploradas residem em você.",
  },
  friend: {
    ko: "친구는 지지, 신뢰, 사회적 연결을 상징합니다. 인간관계가 당신에 대한 중요한 메시지를 담고 있습니다.",
    en: "Friends symbolize support, trust, and social connection. Your relationships carry important messages about your own personality and growth.",
    ja: "友人は支え、信頼、社会的つながりを象徴しています。人間関係があなたの性格と成長について重要なメッセージを運んでいます。",
    zh: "朋友象征着支持、信任和社交联系。你的人际关系承载着关于你性格和成长的重要信息。",
    de: "Freunde symbolisieren Unterstützung, Vertrauen und Verbundenheit. Ihre Beziehungen tragen wichtige Botschaften über Ihre Persönlichkeit.",
    fr: "Les amis symbolisent le soutien, la confiance et le lien social. Vos relations portent des messages importants sur votre personnalité.",
    es: "Los amigos simbolizan apoyo, confianza y conexión social. Tus relaciones llevan mensajes importantes sobre tu personalidad.",
    pt: "Amigos simbolizam apoio, confiança e conexão social. Seus relacionamentos carregam mensagens importantes sobre sua personalidade.",
  },
  baby: {
    ko: "아기는 새로운 시작, 순수함, 미개척된 잠재력을 나타냅니다. 새로운 프로젝트나 단계가 시작되려 합니다.",
    en: "Babies represent new beginnings, innocence, and untapped potential. A fresh chapter or exciting new project is about to start.",
    ja: "赤ちゃんは新しい始まり、無垢さ、未開拓の可能性を表しています。新しい章やワクワクするプロジェクトが始まろうとしています。",
    zh: "婴儿代表着新的开始、纯真和未开发的潜力。一个崭新的篇章或令人兴奋的新项目即将开始。",
    de: "Babys symbolisieren Neuanfänge, Unschuld und ungenutztes Potenzial. Ein neues Kapitel oder Projekt steht bevor.",
    fr: "Les bébés représentent de nouveaux départs, l'innocence et le potentiel inexploité. Un nouveau chapitre passionnant est sur le point de commencer.",
    es: "Los bebés representan nuevos comienzos, inocencia y potencial sin explorar. Un nuevo capítulo emocionante está a punto de comenzar.",
    pt: "Bebês representam novos começos, inocência e potencial inexplorado. Um novo capítulo emocionante está prestes a começar.",
  },
  elderly: {
    ko: "노인은 지혜, 경험, 삶의 안내를 나타냅니다. 중요한 교훈이나 조언이 당신에게 다가오고 있습니다.",
    en: "Elderly figures represent wisdom, experience, and life guidance. An important lesson or piece of advice is coming your way.",
    ja: "老人は知恵、経験、人生の導きを表しています。重要な教訓やアドバイスがあなたに届こうとしています。",
    zh: "老人代表着智慧、经验和人生指引。一个重要的教训或建议正在向你走来。",
    de: "Ältere Menschen symbolisieren Weisheit, Erfahrung und Lebensführung. Eine wichtige Lektion oder ein Rat kommt auf Sie zu.",
    fr: "Les personnes âgées représentent la sagesse, l'expérience et les conseils de vie. Une leçon importante arrive vers vous.",
    es: "Los ancianos representan sabiduría, experiencia y guía vital. Una lección importante o consejo está llegando a ti.",
    pt: "Idosos representam sabedoria, experiência e orientação de vida. Uma lição importante ou conselho está chegando até você.",
  },
  celebrity: {
    ko: "유명인은 열망, 야망, 숨겨진 욕구를 나타냅니다. 자신의 스타 자질을 인식하고 당당히 나아가세요.",
    en: "Celebrities represent aspirations, ambition, and hidden desires. Recognize your own star quality—believe in yourself and aim high.",
    ja: "有名人は志、野心、隠れた欲望を表しています。自分のスター性を認識し—自分を信じて高みを目指しましょう。",
    zh: "名人代表着抱负、野心和隐藏的渴望。认识自己的明星品质——相信自己，瞄准高处。",
    de: "Prominente symbolisieren Bestrebungen, Ehrgeiz und verborgene Wünsche. Erkennen Sie Ihre Starqualität—glauben Sie an sich.",
    fr: "Les célébrités représentent les aspirations, l'ambition et les désirs cachés. Reconnaissez votre qualité de star—croyez en vous.",
    es: "Las celebridades representan aspiraciones, ambición y deseos ocultos. Reconoce tu cualidad estelar—cree en ti mismo.",
    pt: "Celebridades representam aspirações, ambição e desejos ocultos. Reconheça sua qualidade estelar—acredite em si mesmo.",
  },
  money: {
    ko: "돈 꿈은 자존감, 성공, 풍요를 의미합니다. 번영과 새로운 재정적 기회가 빠르게 다가오고 있습니다.",
    en: "Money dreams signify self-worth, success, and abundance. Prosperity and new financial opportunities are approaching rapidly.",
    ja: "お金の夢は自己価値、成功、豊かさを意味しています。繁栄と新しい財政的チャンスが急速に近づいています。",
    zh: "梦见钱意味着自我价值、成功和丰盛。繁荣和新的财务机会正在迅速到来。",
    de: "Geldträume bedeuten Selbstwert, Erfolg und Überfluss. Wohlstand und neue finanzielle Möglichkeiten nähern sich schnell.",
    fr: "Rêver d'argent signifie l'estime de soi, le succès et l'abondance. La prospérité et de nouvelles opportunités financières approchent.",
    es: "Soñar con dinero significa autoestima, éxito y abundancia. La prosperidad y nuevas oportunidades financieras se acercan rápidamente.",
    pt: "Sonhar com dinheiro significa autoestima, sucesso e abundância. Prosperidade e novas oportunidades financeiras se aproximam rapidamente.",
  },
  key: {
    ko: "열쇠는 해결책, 기회, 숨겨진 잠재력의 해방을 상징합니다. 고민하던 문제의 답이 가까이 있습니다.",
    en: "Keys symbolize solutions, opportunities, and unlocking hidden potential. The answer to a problem you've been facing is near.",
    ja: "鍵は解決策、チャンス、隠れた可能性の解放を象徴しています。悩んでいた問題の答えが近くにあります。",
    zh: "钥匙象征着解决方案、机会和释放隐藏的潜力。你一直烦恼的问题的答案就在眼前。",
    de: "Schlüssel symbolisieren Lösungen, Chancen und das Freisetzen von Potenzial. Die Antwort auf Ihr Problem ist nahe.",
    fr: "Les clés symbolisent les solutions, les opportunités et la libération du potentiel caché. La réponse à votre problème est proche.",
    es: "Las llaves simbolizan soluciones, oportunidades y liberar potencial oculto. La respuesta a tu problema está cerca.",
    pt: "Chaves simbolizam soluções, oportunidades e liberar potencial oculto. A resposta para seu problema está próxima.",
  },
  mirror: {
    ko: "거울은 자기 성찰, 진실, 깊은 자기 인식을 나타냅니다. 바깥에서 찾는 답을 내면에서 찾아보세요.",
    en: "Mirrors represent self-reflection, truth, and deep self-awareness. Look within for the answers you seek from the outside world.",
    ja: "鏡は自己省察、真実、深い自己認識を表しています。外の世界に求める答えを内面で探してください。",
    zh: "镜子代表着自我反思、真相和深层的自我认知。从内心寻找你在外部世界寻求的答案。",
    de: "Spiegel symbolisieren Selbstreflexion, Wahrheit und Selbsterkenntnis. Suchen Sie die Antworten in Ihrem Inneren.",
    fr: "Les miroirs représentent l'introspection, la vérité et la conscience de soi. Cherchez en vous les réponses que vous cherchez dehors.",
    es: "Los espejos representan autorreflexión, verdad y autoconciencia profunda. Busca dentro de ti las respuestas que buscas fuera.",
    pt: "Espelhos representam autorreflexão, verdade e autoconsciência profunda. Procure dentro de si as respostas que busca fora.",
  },
  book: {
    ko: "책은 지식, 지혜, 지적 각성을 상징합니다. 중요한 교훈이나 발견이 다가오고 있으니 마음을 열어보세요.",
    en: "Books symbolize knowledge, wisdom, and intellectual awakening. An important lesson or discovery is on its way—open your mind.",
    ja: "本は知識、知恵、知的覚醒を象徴しています。重要な教訓や発見が向かっています—心を開いてください。",
    zh: "书象征着知识、智慧和智力觉醒。一个重要的教训或发现正在路上——敞开心灵。",
    de: "Bücher symbolisieren Wissen, Weisheit und intellektuelles Erwachen. Eine wichtige Lektion ist auf dem Weg—öffnen Sie Ihren Geist.",
    fr: "Les livres symbolisent la connaissance, la sagesse et l'éveil intellectuel. Une leçon importante arrive—ouvrez votre esprit.",
    es: "Los libros simbolizan conocimiento, sabiduría y despertar intelectual. Una lección importante viene en camino—abre tu mente.",
    pt: "Livros simbolizam conhecimento, sabedoria e despertar intelectual. Uma lição importante está a caminho—abra sua mente.",
  },
  ring: {
    ko: "반지는 헌신, 영원함, 신성한 약속을 상징합니다. 중요한 유대가 강화되거나 새로운 인연이 맺어질 것입니다.",
    en: "Rings symbolize commitment, eternity, and sacred promises. Important bonds will be strengthened or meaningful new connections formed.",
    ja: "指輪は献身、永遠、神聖な約束を象徴しています。重要な絆が強化されるか、新たな意味あるつながりが生まれるでしょう。",
    zh: "戒指象征着承诺、永恒和神圣的约定。重要的纽带将被加强或形成有意义的新联系。",
    de: "Ringe symbolisieren Hingabe, Ewigkeit und heilige Versprechen. Wichtige Bindungen werden gestärkt oder neu geknüpft.",
    fr: "Les bagues symbolisent l'engagement, l'éternité et les promesses sacrées. Des liens importants seront renforcés ou de nouveaux formés.",
    es: "Los anillos simbolizan compromiso, eternidad y promesas sagradas. Lazos importantes serán fortalecidos o se formarán nuevos.",
    pt: "Anéis simbolizam compromisso, eternidade e promessas sagradas. Laços importantes serão fortalecidos ou novos serão formados.",
  },
  car: {
    ko: "자동차는 인생의 방향, 개인적 추진력, 야망을 나타냅니다. 여정의 주인은 바로 당신이니 자신 있게 나아가세요.",
    en: "Cars represent your life direction, personal drive, and ambition. You are in control of your journey—steer confidently toward your goals.",
    ja: "車は人生の方向、個人的な推進力、野心を表しています。旅の主導権はあなたにあります—自信を持って目標に向かいましょう。",
    zh: "车代表着人生方向、个人驱动力和抱负。旅程通往何方由你决定——自信地向目标前进。",
    de: "Autos symbolisieren Ihre Lebensrichtung, Ihren Antrieb und Ehrgeiz. Sie bestimmen, wohin die Reise geht—steuern Sie selbstbewusst.",
    fr: "Les voitures représentent la direction de votre vie et votre ambition. Vous êtes aux commandes—dirigez-vous avec confiance.",
    es: "Los coches representan la dirección de tu vida y tu ambición. Tú controlas el viaje—conduce con confianza hacia tus metas.",
    pt: "Carros representam a direção de sua vida, impulso pessoal e ambição. Você controla a jornada—dirija com confiança.",
  },
  phone: {
    ko: "핸드폰은 소통, 연결, 중요한 메시지를 나타냅니다. 중요한 소식이 곧 올 테니 주변의 신호에 주의하세요.",
    en: "Phones represent communication, connections, and important messages. An important message is coming—pay attention to signals around you.",
    ja: "携帯は通信、つながり、重要なメッセージを表しています。重要なメッセージが届きます—周りの信号に注意を払いましょう。",
    zh: "手机代表着沟通、联系和重要的信息。一个重要的消息即将到来——注意周围的信号。",
    de: "Handys symbolisieren Kommunikation, Verbindungen und wichtige Nachrichten. Eine wichtige Nachricht kommt—achten Sie auf Signale.",
    fr: "Les téléphones représentent la communication et les messages importants. Un message important arrive—soyez attentif aux signaux.",
    es: "Los teléfonos representan comunicación, conexiones y mensajes importantes. Un mensaje importante llega—presta atención a las señales.",
    pt: "Celulares representam comunicação, conexões e mensagens importantes. Uma mensagem importante está chegando—preste atenção aos sinais.",
  },
  house: {
    ko: "집은 내면의 자아, 안전, 개인적 기반을 나타냅니다. 강한 감정적·영적 기반을 쌓는 데 집중하세요.",
    en: "Houses represent your inner self, security, and personal foundation. Focus on building a strong emotional and spiritual base within yourself.",
    ja: "家は内なる自己、安全、個人的な基盤を表しています。強い感情的・精神的基盤を築くことに集中しましょう。",
    zh: "房子代表着内在的自我、安全感和个人根基。专注于建立强大的情感和精神基础。",
    de: "Häuser symbolisieren Ihr inneres Selbst, Sicherheit und Fundament. Konzentrieren Sie sich auf eine starke emotionale Basis.",
    fr: "Les maisons représentent votre moi intérieur, la sécurité et votre fondation. Concentrez-vous sur une base émotionnelle solide.",
    es: "Las casas representan tu yo interior, seguridad y base personal. Concéntrate en construir una base emocional y espiritual sólida.",
    pt: "Casas representam seu eu interior, segurança e base pessoal. Concentre-se em construir uma base emocional e espiritual sólida.",
  },
  flying: {
    ko: "날기는 자유, 야망, 한계를 넘어서는 것을 나타냅니다. 당신을 묶어두던 것에서 벗어나 무한한 가능성을 품으세요.",
    en: "Flying represents freedom, ambition, and rising above limitations. You are breaking free from what held you back—embrace boundless possibilities.",
    ja: "飛ぶことは自由、野心、限界を超えることを表しています。束縛から解放されつつあります—無限の可能性を抱きましょう。",
    zh: "飞翔代表着自由、抱负和超越限制。你正在挣脱束缚——拥抱无限的可能。",
    de: "Fliegen symbolisiert Freiheit, Ehrgeiz und das Überwinden von Grenzen. Sie befreien sich—umarmen Sie grenzenlose Möglichkeiten.",
    fr: "Voler représente la liberté, l'ambition et le dépassement des limites. Vous vous libérez—embrassez les possibilités infinies.",
    es: "Volar representa libertad, ambición y superar limitaciones. Te estás liberando—abraza las posibilidades infinitas.",
    pt: "Voar representa liberdade, ambição e superar limitações. Você está se libertando—abrace as possibilidades ilimitadas.",
  },
  falling: {
    ko: "떨어지기는 통제력 상실, 실패 두려움, 놓아줌을 상징합니다. 더 이상 필요 없는 것을 놓아주면 다시 견고한 땅을 찾게 됩니다.",
    en: "Falling symbolizes loss of control, fear of failure, and letting go. Release what no longer serves you—solid ground awaits on the other side.",
    ja: "落ちることはコントロールの喪失、失敗への恐れ、手放すことを象徴しています。もう必要のないものを手放しましょう—確かな地面が待っています。",
    zh: "坠落象征着失控、对失败的恐惧和放手。放下那些不再需要的——坚实的地面就在另一边。",
    de: "Fallen symbolisiert Kontrollverlust, Versagensangst und Loslassen. Lassen Sie los, was Ihnen nicht mehr dient—fester Boden wartet.",
    fr: "Tomber symbolise la perte de contrôle et le lâcher-prise. Libérez ce qui ne vous sert plus—un sol ferme vous attend.",
    es: "Caer simboliza pérdida de control, miedo al fracaso y soltar. Libera lo que ya no te sirve—terreno firme te espera.",
    pt: "Cair simboliza perda de controle, medo do fracasso e deixar ir. Libere o que não serve mais—chão firme o aguarda.",
  },
  running: {
    ko: "달리기는 추구, 도망, 또는 긴박한 동기부여를 나타냅니다. 피하고 있는 상황에 정면으로 맞서면 에너지가 목표로 인도합니다.",
    en: "Running represents pursuit, escape, or urgent motivation. Face the situation head-on—your energy and determination can carry you to your goals.",
    ja: "走ることは追求、逃避、緊急の動機を表しています。状況に正面から向き合いましょう—エネルギーと決意が目標へ導きます。",
    zh: "奔跑代表着追求、逃避或紧迫的动力。正面面对——你的能量和决心能带你达成目标。",
    de: "Rennen symbolisiert Verfolgung, Flucht oder dringende Motivation. Stellen Sie sich der Situation—Ihre Energie trägt Sie zum Ziel.",
    fr: "Courir représente la poursuite, la fuite ou une motivation urgente. Affrontez la situation—votre énergie vous mènera au but.",
    es: "Correr representa persecución, escape o motivación urgente. Enfrenta la situación—tu energía y determinación te llevarán a tus metas.",
    pt: "Correr representa perseguição, fuga ou motivação urgente. Enfrente a situação—sua energia e determinação podem levá-lo aos objetivos.",
  },
  swimming: {
    ko: "수영은 깊은 감정을 헤쳐나가는 것과 적응력을 상징합니다. 삶의 흐름을 우아하게 다루는 법을 배우고 있습니다.",
    en: "Swimming symbolizes navigating deep emotions and adaptability. You are learning to handle life's currents with grace and resilience.",
    ja: "泳ぐことは深い感情をナビゲートすることと適応力を象徴しています。人生の流れを優雅に扱うことを学んでいます。",
    zh: "游泳象征着在深层情感中航行和适应能力。你正在学习优雅地应对生活的潮流。",
    de: "Schwimmen symbolisiert das Navigieren tiefer Emotionen und Anpassungsfähigkeit. Sie lernen, mit den Strömungen des Lebens umzugehen.",
    fr: "Nager symbolise la navigation des émotions profondes et l'adaptabilité. Vous apprenez à gérer les courants de la vie avec grâce.",
    es: "Nadar simboliza navegar emociones profundas y adaptabilidad. Estás aprendiendo a manejar las corrientes de la vida con gracia.",
    pt: "Nadar simboliza navegar emoções profundas e adaptabilidade. Você está aprendendo a lidar com as correntes da vida com graça.",
  },
  climbing: {
    ko: "오르기는 야망, 진전, 단계적 장애물 극복을 나타냅니다. 꾸준히 상승 중이며 정상에서의 풍경이 그만한 가치가 있을 것입니다.",
    en: "Climbing represents ambition, progress, and overcoming obstacles step by step. The view from the top will be worth every effort.",
    ja: "登ることは野心、進歩、段階的な障害克服を表しています。頂上からの眺めはすべての努力に値するでしょう。",
    zh: "攀登代表着抱负、进步和逐步克服障碍。山顶的风景将值得每一分努力。",
    de: "Klettern symbolisiert Ehrgeiz, Fortschritt und schrittweises Überwinden von Hindernissen. Die Aussicht vom Gipfel wird es wert sein.",
    fr: "Grimper représente l'ambition, le progrès et la surmonter des obstacles. La vue du sommet vaudra chaque effort.",
    es: "Escalar representa ambición, progreso y superar obstáculos paso a paso. La vista desde la cima valdrá cada esfuerzo.",
    pt: "Escalar representa ambição, progresso e superar obstáculos passo a passo. A vista do topo valerá cada esforço.",
  },
  fighting: {
    ko: "싸움은 내적 갈등, 경계, 미해결된 긴장을 나타냅니다. 안에 쌓인 것을 평화롭게 해결하고 내면의 평화를 되찾으세요.",
    en: "Fighting represents inner conflict, boundaries, and unresolved tension. Resolve conflicts peacefully and reclaim your inner peace.",
    ja: "戦いは内面の葛藤、境界線、未解決の緊張を表しています。葛藤を平和的に解決し、内なる平和を取り戻しましょう。",
    zh: "打斗代表着内心冲突、界限和未解决的紧张。和平地解决冲突，重获内心的平静。",
    de: "Kämpfen symbolisiert innere Konflikte, Grenzen und ungelöste Spannungen. Lösen Sie Konflikte friedlich und finden Sie inneren Frieden.",
    fr: "Se battre représente les conflits intérieurs et les tensions non résolues. Résolvez les conflits pacifiquement et retrouvez votre paix intérieure.",
    es: "Pelear representa conflictos internos, límites y tensiones sin resolver. Resuelve los conflictos pacíficamente y recupera tu paz interior.",
    pt: "Lutar representa conflitos internos, limites e tensões não resolvidas. Resolva conflitos pacificamente e recupere sua paz interior.",
  },
  school: {
    ko: "학교는 배움, 성장, 삶의 교훈을 나타냅니다. 현재 삶에서 중요한 교훈이 펼쳐지고 있으니 성장의 기회를 잡으세요.",
    en: "Schools represent learning, growth, and life lessons. An important lesson is unfolding now—embrace the opportunity to grow and evolve.",
    ja: "学校は学び、成長、人生の教訓を表しています。重要な教訓が今展開されています—成長の機会を受け入れましょう。",
    zh: "学校代表着学习、成长和人生课程。一个重要的教训正在展开——拥抱成长和进化的机会。",
    de: "Schulen symbolisieren Lernen, Wachstum und Lebenslektionen. Eine wichtige Lektion entfaltet sich—nutzen Sie die Gelegenheit zu wachsen.",
    fr: "Les écoles représentent l'apprentissage et les leçons de vie. Une leçon importante se déroule—saisissez l'opportunité de grandir.",
    es: "Las escuelas representan aprendizaje, crecimiento y lecciones de vida. Una lección importante se desarrolla—aprovecha la oportunidad de crecer.",
    pt: "Escolas representam aprendizado, crescimento e lições de vida. Uma lição importante se desdobra—abrace a oportunidade de crescer.",
  },
  ocean: {
    ko: "바다는 광대한 무의식, 깊은 감정, 무한한 가능성을 나타냅니다. 두려움 없이 마음의 깊이를 탐험하세요.",
    en: "The ocean represents the vast unconscious, deep emotions, and infinite possibility. Explore the depths of your mind fearlessly.",
    ja: "海は広大な無意識、深い感情、無限の可能性を表しています。恐れることなく心の深みを探検しましょう。",
    zh: "海洋代表着广阔的潜意识、深层的情感和无限的可能。无畏地探索你心灵的深处。",
    de: "Der Ozean symbolisiert das weite Unbewusste, tiefe Emotionen und unendliche Möglichkeiten. Erkunden Sie furchtlos die Tiefen Ihres Geistes.",
    fr: "L'océan représente le vaste inconscient, les émotions profondes et les possibilités infinies. Explorez les profondeurs de votre esprit sans crainte.",
    es: "El océano representa el vasto inconsciente, emociones profundas y posibilidades infinitas. Explora sin miedo las profundidades de tu mente.",
    pt: "O oceano representa o vasto inconsciente, emoções profundas e possibilidades infinitas. Explore sem medo as profundezas de sua mente.",
  },
  forest: {
    ko: "숲은 신비, 자기 발견, 미지의 길을 나타냅니다. 영혼의 탐험되지 않은 영역에서 놀라운 빛을 발견할 것입니다.",
    en: "Forests represent mystery, self-discovery, and unknown paths. In the unexplored territories of your soul, you will find surprising light.",
    ja: "森は神秘、自己発見、未知の道を表しています。魂の未探検の領域で、驚きの光を見つけるでしょう。",
    zh: "森林代表着神秘、自我发现和未知的道路。在你灵魂中未曾探索的领域，你将发现令人惊喜的光明。",
    de: "Wälder symbolisieren Mysterium, Selbstfindung und unbekannte Pfade. In unerforschten Gebieten Ihrer Seele finden Sie überraschendes Licht.",
    fr: "Les forêts représentent le mystère, la découverte de soi et les chemins inconnus. Dans les territoires inexplorés de votre âme, vous trouverez la lumière.",
    es: "Los bosques representan misterio, autodescubrimiento y caminos desconocidos. En los territorios inexplorados de tu alma encontrarás luz sorprendente.",
    pt: "Florestas representam mistério, autodescoberta e caminhos desconhecidos. Nos territórios inexplorados de sua alma, encontrará luz surpreendente.",
  },
  home: {
    ko: "고향/집 꿈은 편안함, 소속감, 감정적 안식처를 나타냅니다. 마음이 따뜻함과 평화를 갈망하고 있습니다.",
    en: "Home dreams represent comfort, belonging, and emotional refuge. Your heart yearns for warmth and peace—create your inner sanctuary.",
    ja: "故郷の夢は快適さ、帰属感、感情的な避難所を表しています。心は温かさと平和を求めています—内なる聖域を作りましょう。",
    zh: "梦见家代表着舒适、归属感和情感的避风港。你的心渴望温暖和平静——创造你内心的圣所。",
    de: "Heimatträume symbolisieren Geborgenheit, Zugehörigkeit und emotionalen Zufluchtsort. Ihr Herz sehnt sich nach Wärme und Frieden.",
    fr: "Rêver de chez soi représente le confort, l'appartenance et le refuge émotionnel. Votre cœur aspire à la chaleur et la paix.",
    es: "Soñar con el hogar representa comodidad, pertenencia y refugio emocional. Tu corazón anhela calidez y paz—crea tu santuario interior.",
    pt: "Sonhar com o lar representa conforto, pertencimento e refúgio emocional. Seu coração anseia por calor e paz—crie seu santuário interior.",
  },
  hospital: {
    ko: "병원은 치유, 회복, 자기 돌봄을 나타냅니다. 몸과 마음이 건강에 집중하라고 말하고 있으니 휴식을 우선하세요.",
    en: "Hospitals represent healing, recovery, and self-care. Your mind and body ask you to prioritize well-being—better days are ahead.",
    ja: "病院は癒し、回復、セルフケアを表しています。心と体が健康を優先するよう求めています—より良い日が待っています。",
    zh: "医院代表着治愈、康复和自我关爱。你的身心在要求你关注健康——更好的日子就在眼前。",
    de: "Krankenhäuser symbolisieren Heilung, Genesung und Selbstfürsorge. Ihr Geist und Körper bitten um Wohlbefinden—bessere Tage kommen.",
    fr: "Les hôpitaux représentent la guérison, la récupération et le soin de soi. Priorisez votre bien-être—des jours meilleurs arrivent.",
    es: "Los hospitales representan sanación, recuperación y autocuidado. Tu mente y cuerpo piden bienestar—días mejores están en camino.",
    pt: "Hospitais representam cura, recuperação e autocuidado. Sua mente e corpo pedem bem-estar—dias melhores estão chegando.",
  },
  bridge: {
    ko: "다리는 전환, 연결, 새로운 단계로의 진입을 상징합니다. 원활한 전환이 기다리니 다리를 신뢰하고 앞으로 나아가세요.",
    en: "Bridges symbolize transitions, connections, and crossing into new phases. A smooth transition awaits—trust the bridge and step forward.",
    ja: "橋は転換、つながり、新しい段階への進入を象徴しています。スムーズな移行が待っています—橋を信じて前に踏み出しましょう。",
    zh: "桥象征着过渡、连接和跨入新阶段。平稳的过渡正在等待——信任这座桥，迈出前进的步伐。",
    de: "Brücken symbolisieren Übergänge, Verbindungen und neue Phasen. Ein reibungsloser Übergang erwartet Sie—vertrauen Sie der Brücke.",
    fr: "Les ponts symbolisent les transitions et le passage à de nouvelles phases. Une transition en douceur vous attend—faites confiance au pont.",
    es: "Los puentes simbolizan transiciones, conexiones y el paso a nuevas fases. Una transición suave te espera—confía y avanza.",
    pt: "Pontes simbolizam transições, conexões e passagem para novas fases. Uma transição suave o aguarda—confie na ponte e avance.",
  },
  fear: {
    ko: "꿈속의 두려움은 용기와 관심이 필요한 영역을 알려줍니다. 두려움에 맞서면 안에 숨겨진 가장 큰 힘을 발견합니다.",
    en: "Fear in dreams signals areas needing courage and attention. What frightens you holds the key to your greatest growth—face it bravely.",
    ja: "夢の中の恐怖は勇気と注意が必要な領域を示しています。怖いものが最大の成長の鍵を握っています—勇敢に向き合いましょう。",
    zh: "梦中的恐惧标志着需要勇气和关注的领域。让你害怕的东西掌握着最大成长的钥匙——勇敢面对。",
    de: "Angst im Traum signalisiert Bereiche, die Mut brauchen. Was Sie erschreckt, hält den Schlüssel zu Ihrem Wachstum—stellen Sie sich dem.",
    fr: "La peur dans les rêves signale des domaines nécessitant du courage. Ce qui vous effraie détient la clé de votre croissance—affrontez-le.",
    es: "El miedo en los sueños señala áreas que necesitan valor. Lo que te asusta guarda la clave de tu mayor crecimiento—enfréntalo.",
    pt: "O medo nos sonhos sinaliza áreas que precisam de coragem. O que o assusta guarda a chave do seu maior crescimento—enfrente-o.",
  },
  happiness: {
    ko: "꿈속의 행복은 충족, 조화, 긍정적 에너지를 나타냅니다. 올바른 길 위에 있으며 더 많은 기쁨이 기다립니다.",
    en: "Happiness in dreams represents fulfillment, alignment, and positive energy. You are on the right path—more joy and celebration await.",
    ja: "夢の中の幸福は充実、調和、ポジティブなエネルギーを表しています。正しい道にいます—もっと多くの喜びが待っています。",
    zh: "梦中的幸福代表着充实、和谐和正能量。你走在正确的道路上——更多的欢乐在前方等待。",
    de: "Glück im Traum symbolisiert Erfüllung, Harmonie und positive Energie. Sie sind auf dem richtigen Weg—mehr Freude erwartet Sie.",
    fr: "Le bonheur dans les rêves représente l'accomplissement et l'énergie positive. Vous êtes sur la bonne voie—plus de joie vous attend.",
    es: "La felicidad en los sueños representa plenitud, armonía y energía positiva. Estás en el camino correcto—más alegría te espera.",
    pt: "A felicidade nos sonhos representa plenitude, harmonia e energia positiva. Você está no caminho certo—mais alegria o aguarda.",
  },
  sadness: {
    ko: "슬픔은 감정 처리, 상실, 필요한 애도를 나타냅니다. 충분히 느끼고 치유하세요—눈물 뒤에 평화가 따릅니다.",
    en: "Sadness represents emotional processing, loss, and necessary grief. Allow yourself to feel and heal—after tears comes peace and renewal.",
    ja: "悲しみは感情の処理、喪失、必要な悲嘆を表しています。十分に感じ癒してください—涙の後に平和が続きます。",
    zh: "悲伤代表着情感的处理、失去和必要的悲悯。允许自己感受和疗愈——泪水之后是平静和更新。",
    de: "Trauer symbolisiert emotionale Verarbeitung, Verlust und notwendiges Trauern. Erlauben Sie sich zu fühlen—nach Tränen kommt Frieden.",
    fr: "La tristesse représente le traitement émotionnel et le deuil nécessaire. Permettez-vous de ressentir—après les larmes vient la paix.",
    es: "La tristeza representa procesamiento emocional, pérdida y duelo necesario. Permítete sentir y sanar—después de las lágrimas viene la paz.",
    pt: "A tristeza representa processamento emocional, perda e luto necessário. Permita-se sentir e curar—após as lágrimas vem a paz.",
  },
  anger: {
    ko: "분노는 억압된 감정, 경계, 충족되지 않은 욕구를 나타냅니다. 건설적으로 표현하면 긍정적 변화의 연료가 됩니다.",
    en: "Anger represents suppressed emotions, boundaries, and unmet needs. Channeled properly, this fire becomes fuel for positive transformation.",
    ja: "怒りは抑圧された感情、境界線、満たされていない欲求を表しています。正しく向けれぱ、この炎がポジティブな変化の燃料となります。",
    zh: "愤怒代表着压抑的情绪、界限和未被满足的需求。正确引导，这把火将成为积极变化的燃料。",
    de: "Wut symbolisiert unterdrückte Emotionen, Grenzen und unerfüllte Bedürfnisse. Richtig kanalisiert wird dieses Feuer zum Treibstoff für positive Veränderungen.",
    fr: "La colère représente les émotions refoulées et les besoins insatisfaits. Bien canalisée, cette flamme devient le carburant de changements positifs.",
    es: "La ira representa emociones reprimidas, límites y necesidades insatisfechas. Canalizada correctamente, este fuego impulsa cambios positivos.",
    pt: "A raiva representa emoções reprimidas, limites e necessidades não atendidas. Canalizada corretamente, este fogo impulsiona mudanças positivas.",
  },
  confusion: {
    ko: "혼란은 불확실성, 갈림길, 명확함을 찾는 과정을 나타냅니다. 답은 때가 되면 스스로 드러나니 인내하세요.",
    en: "Confusion represents uncertainty, crossroads, and seeking clarity. The answer will reveal itself in time—be patient and trust the process.",
    ja: "混乱は不確実性、岐路、明晰さの追求を表しています。答えは時が来れば自ずと明らかになります—プロセスを信じてください。",
    zh: "困惑代表着不确定、十字路口和寻求清明。答案到时候会自然显现——耐心等待，相信过程。",
    de: "Verwirrung symbolisiert Unsicherheit, Kreuzwege und die Suche nach Klarheit. Die Antwort wird sich offenbaren—vertrauen Sie dem Prozess.",
    fr: "La confusion représente l'incertitude et la quête de clarté. La réponse se révélera en temps voulu—faites confiance au processus.",
    es: "La confusión representa incertidumbre, encrucijadas y búsqueda de claridad. La respuesta se revelará a su tiempo—confía en el proceso.",
    pt: "A confusão representa incerteza, encruzilhadas e busca por clareza. A resposta se revelará no momento certo—confie no processo.",
  },
  peace: {
    ko: "꿈속의 평화는 조화, 영적 균형, 만족을 나타냅니다. 영혼이 중심을 찾고 우주와 정렬되고 있습니다.",
    en: "Peace in dreams represents harmony, spiritual balance, and contentment. Your soul is finding its center and aligning with the universe.",
    ja: "夢の中の平和は調和、精神的バランス、満足を表しています。魂が中心を見つけ、宇宙と調和しつつあります。",
    zh: "梦中的和平代表着和谐、精神平衡和满足。你的灵魂正在找到中心，与宇宙对齐。",
    de: "Frieden im Traum symbolisiert Harmonie, spirituelles Gleichgewicht und Zufriedenheit. Ihre Seele findet ihre Mitte und richtet sich aus.",
    fr: "La paix dans les rêves représente l'harmonie, l'équilibre spirituel et le contentement. Votre âme trouve son centre.",
    es: "La paz en los sueños representa armonía, equilibrio espiritual y satisfacción. Tu alma encuentra su centro y se alinea con el universo.",
    pt: "A paz nos sonhos representa harmonia, equilíbrio espiritual e contentamento. Sua alma está encontrando seu centro.",
  },
  teeth: {
    ko: "이빨은 자신감, 자기 이미지, 소통을 나타냅니다. 자기 표현 방식에 주의하세요—자기 인식의 변화가 새 기회를 가져옵니다.",
    en: "Teeth represent confidence, self-image, and communication. Pay attention to self-expression—a shift in self-perception may bring new opportunities.",
    ja: "歯は自信、自己イメージ、コミュニケーションを表しています。自己表現に注意を—自己認識の変化が新しい機会をもたらすかもしれません。",
    zh: "牙齿代表着自信、自我形象和沟通。注意你的自我表达——自我认知的转变可能带来新机遇。",
    de: "Zähne symbolisieren Selbstvertrauen, Selbstbild und Kommunikation. Achten Sie auf Ihren Ausdruck—eine Veränderung kann neue Chancen bringen.",
    fr: "Les dents représentent la confiance et la communication. Portez attention à votre expression—un changement peut apporter de nouvelles opportunités.",
    es: "Los dientes representan confianza, autoimagen y comunicación. Presta atención a tu expresión—un cambio puede traer nuevas oportunidades.",
    pt: "Dentes representam confiança, autoimagem e comunicação. Preste atenção à sua expressão—uma mudança pode trazer novas oportunidades.",
  },
  hair: {
    ko: "머리카락은 힘, 정체성, 개인적 파워를 상징합니다. 자아 의식이 변화 중이니 고유한 자질을 빛나게 하세요.",
    en: "Hair symbolizes strength, identity, and personal power. Your sense of self is transforming—embrace your unique qualities and shine.",
    ja: "髪は強さ、アイデンティティ、個人的な力を象徴しています。自意識が変化中です—独自の資質を輝かせましょう。",
    zh: "头发象征着力量、身份和个人力量。你的自我意识正在转变——拥抱你独特的品质，让它闪耀。",
    de: "Haare symbolisieren Stärke, Identität und persönliche Kraft. Ihr Selbstgefühl wandelt sich—lassen Sie Ihre Einzigartigkeit erstrahlen.",
    fr: "Les cheveux symbolisent la force, l'identité et le pouvoir personnel. Votre sens de soi se transforme—laissez briller vos qualités uniques.",
    es: "El cabello simboliza fuerza, identidad y poder personal. Tu sentido del yo se transforma—abraza tus cualidades únicas y brilla.",
    pt: "Cabelo simboliza força, identidade e poder pessoal. Seu senso de identidade está se transformando—abrace suas qualidades únicas.",
  },
  eyes: {
    ko: "눈은 지각, 인식, 깊은 통찰을 나타냅니다. 상황을 새로운 관점에서 바라보세요—놓치던 진실이 바로 눈앞에 있습니다.",
    en: "Eyes represent perception, awareness, and deep insight. Look at your situation from a new perspective—the truth is right in front of you.",
    ja: "目は知覚、認識、深い洞察を表しています。新しい視点から状況を見てください—真実はまさに目の前にあります。",
    zh: "眼睛代表着感知、意识和深刻的洞察力。从全新的角度审视你的处境——真相就在眼前。",
    de: "Augen symbolisieren Wahrnehmung, Bewusstsein und tiefe Einsicht. Betrachten Sie alles aus neuer Perspektive—die Wahrheit liegt vor Ihnen.",
    fr: "Les yeux représentent la perception et la perspicacité profonde. Regardez d'un nouvel angle—la vérité est juste devant vous.",
    es: "Los ojos representan percepción, conciencia y perspicacia profunda. Mira desde una nueva perspectiva—la verdad está frente a ti.",
    pt: "Olhos representam percepção, consciência e perspicácia profunda. Olhe de uma nova perspectiva—a verdade está bem diante de você.",
  },
  hands: {
    ko: "손은 능력, 창조, 타인과의 연결을 나타냅니다. 행동을 통해 현실을 형성할 힘이 있으니 손을 내밀고 창조하세요.",
    en: "Hands represent capability, creation, and connection with others. You have the power to shape reality through action—reach out and create.",
    ja: "手は能力、創造、他者とのつながりを表しています。行動を通じて現実を形作る力があります—手を伸ばし創造しましょう。",
    zh: "手代表着能力、创造和与他人的联系。你有通过行动塑造现实的力量——伸出手去，创造吧。",
    de: "Hände symbolisieren Fähigkeit, Schöpfung und Verbindung. Sie haben die Kraft, durch Handeln Realität zu gestalten—greifen Sie zu.",
    fr: "Les mains représentent la capacité, la création et la connexion. Vous avez le pouvoir de façonner la réalité—tendez la main et créez.",
    es: "Las manos representan capacidad, creación y conexión. Tienes el poder de moldear la realidad con acción—extiende la mano y crea.",
    pt: "Mãos representam capacidade, criação e conexão. Você tem o poder de moldar a realidade pela ação—estenda a mão e crie.",
  },
  blood: {
    ko: "피는 생명력, 열정, 깊은 중요성을 나타냅니다. 깊은 수준에서 매우 중요한 일이 일어나고 있는 강력한 징조입니다.",
    en: "Blood represents life force, passion, and deep significance. Something profoundly important is happening—a powerful sign of vital energy.",
    ja: "血は生命力、情熱、深い重要性を表しています。深いレベルで非常に重要なことが起こっています—生命エネルギーの力強い兆しです。",
    zh: "血代表着生命力、激情和深刻的意义。在深层次上，某些非常重要的事情正在发生——这是生命能量的有力征兆。",
    de: "Blut symbolisiert Lebenskraft, Leidenschaft und tiefe Bedeutung. Etwas Wichtiges geschieht—ein kraftvolles Zeichen vitaler Energie.",
    fr: "Le sang représente la force vitale, la passion et la signification profonde. Quelque chose d'important se produit—un signe puissant d'énergie vitale.",
    es: "La sangre representa fuerza vital, pasión y significado profundo. Algo importante está sucediendo—una señal poderosa de energía vital.",
    pt: "O sangue representa força vital, paixão e significado profundo. Algo importante está acontecendo—um sinal poderoso de energia vital.",
  },
  death: {
    ko: "꿈속의 죽음은 끝남, 변화, 재탄생을 나타냅니다. 오래된 것이 끝나야 새로운 것이 시작되는 새로움의 약속입니다.",
    en: "Death in dreams represents endings, transformation, and rebirth. Something old must end for something new to begin—a promise of renewal.",
    ja: "夢の中の死は終わり、変容、再生を表しています。新しいものが始まるには古いものが終わらなければなりません—新生の約束です。",
    zh: "梦中的死亡代表着终结、转变和重生。旧的必须结束，新的才能开始——这是新生的承诺。",
    de: "Tod im Traum symbolisiert Enden, Transformation und Wiedergeburt. Etwas Altes muss enden, damit Neues beginnen kann—ein Versprechen der Erneuerung.",
    fr: "La mort dans les rêves représente les fins, la transformation et la renaissance. Quelque chose doit finir pour que le nouveau commence—une promesse de renouveau.",
    es: "La muerte en los sueños representa finales, transformación y renacimiento. Algo viejo debe terminar para que algo nuevo comience—una promesa de renovación.",
    pt: "A morte nos sonhos representa fins, transformação e renascimento. Algo antigo deve terminar para que algo novo comece—uma promessa de renovação.",
  },
};

const adviceText: Record<Language, { high: string; good: string; mid: string; low: string }> = {
  ko: {
    high: "매우 길한 꿈입니다! 긍정적 에너지를 받아들이고 오늘 대담한 행동을 취하세요. 우주가 당신의 편입니다.",
    good: "성장과 기회의 꿈입니다. 새로운 경험에 열린 마음을 가지고 과정을 믿으세요.",
    mid: "변화가 다가옵니다! 유연하게 적응할 준비를 하세요. 새로운 기회가 문을 두드립니다.",
    low: "꿈의 메시지에 주의하세요. 큰 결정 전에 신중하게 생각하고 내면의 목소리에 귀 기울이세요.",
  },
  en: {
    high: "A very auspicious dream! Embrace the positive energy and take bold action today. The universe is on your side.",
    good: "A dream of growth and opportunity. Stay open to new experiences and trust the process ahead.",
    mid: "Change is coming! Be flexible and ready to adapt. New opportunities are knocking at your door.",
    low: "Pay attention to the dream's messages. Reflect carefully before big decisions and listen to your inner voice.",
  },
  ja: {
    high: "とても吉兆な夢です！ポジティブなエネルギーを受け入れ、今日大胆に行動しましょう。宇宙があなたの味方です。",
    good: "成長と機会の夢です。新しい経験にオープンでいて、プロセスを信じてください。",
    mid: "変化が訪れます！柔軟に適応する準備をしましょう。新しいチャンスがドアをノックしています。",
    low: "夢のメッセージに注意してください。大きな決断の前に慎重に考え、内なる声に耳を傾けましょう。",
  },
  zh: {
    high: "非常吉祥的梦！拥抱正能量，今天就大胆行动。宇宙站在你这边。",
    good: "这是关于成长和机遇的梦。对新体验保持开放，信任前方的过程。",
    mid: "变化即将到来！保持灵活，准备好适应。新的机会正在敲门。",
    low: "注意梦境的信息。在做重大决定前仔细反思，倾听你内心的声音。",
  },
  de: {
    high: "Ein sehr verheißungsvoller Traum! Nehmen Sie die positive Energie an und handeln Sie heute mutig. Das Universum ist auf Ihrer Seite.",
    good: "Ein Traum von Wachstum und Chancen. Bleiben Sie offen für neue Erfahrungen und vertrauen Sie dem Prozess.",
    mid: "Veränderung kommt! Seien Sie flexibel und bereit sich anzupassen. Neue Möglichkeiten klopfen an Ihre Tür.",
    low: "Achten Sie auf die Botschaften des Traums. Reflektieren Sie sorgfältig vor großen Entscheidungen und hören Sie auf Ihre innere Stimme.",
  },
  fr: {
    high: "Un rêve très favorable ! Embrassez l'énergie positive et agissez avec audace aujourd'hui. L'univers est de votre côté.",
    good: "Un rêve de croissance et d'opportunités. Restez ouvert aux nouvelles expériences et faites confiance au processus.",
    mid: "Le changement arrive ! Soyez flexible et prêt à vous adapter. De nouvelles opportunités frappent à votre porte.",
    low: "Prêtez attention aux messages du rêve. Réfléchissez bien avant les grandes décisions et écoutez votre voix intérieure.",
  },
  es: {
    high: "¡Un sueño muy auspicioso! Abraza la energía positiva y actúa con audacia hoy. El universo está de tu lado.",
    good: "Un sueño de crecimiento y oportunidad. Mantente abierto a nuevas experiencias y confía en el proceso.",
    mid: "¡El cambio se acerca! Sé flexible y prepárate para adaptarte. Nuevas oportunidades llaman a tu puerta.",
    low: "Presta atención a los mensajes del sueño. Reflexiona con cuidado antes de grandes decisiones y escucha tu voz interior.",
  },
  pt: {
    high: "Um sonho muito auspicioso! Abrace a energia positiva e aja com ousadia hoje. O universo está do seu lado.",
    good: "Um sonho de crescimento e oportunidade. Mantenha-se aberto a novas experiências e confie no processo.",
    mid: "Mudança está chegando! Seja flexível e esteja pronto para se adaptar. Novas oportunidades estão batendo à sua porta.",
    low: "Preste atenção às mensagens do sonho. Reflita com cuidado antes de grandes decisões e ouça sua voz interior.",
  },
};

const luckyItems: Record<Language, string[]> = {
  ko: ["🔮 수정 구슬", "🕯️ 양초", "🍀 네잎클로버", "🪶 깃털", "💎 옥", "🪙 은화", "🌿 세이지", "💜 라벤더", "🌙 문스톤", "⭐ 별 부적"],
  en: ["🔮 Crystal Ball", "🕯️ Candle", "🍀 Four-leaf Clover", "🪶 Feather", "💎 Jade", "🪙 Silver Coin", "🌿 Sage", "💜 Lavender", "🌙 Moonstone", "⭐ Star Amulet"],
  ja: ["🔮 水晶玉", "🕯️ キャンドル", "🍀 四つ葉のクローバー", "🪶 羽", "💎 翡翠", "🪙 銀貨", "🌿 セージ", "💜 ラベンダー", "🌙 ムーンストーン", "⭐ 星のお守り"],
  zh: ["🔮 水晶球", "🕯️ 蜡烛", "🍀 四叶草", "🪶 羽毛", "💎 玉石", "🪙 银币", "🌿 鼠尾草", "💜 薰衣草", "🌙 月光石", "⭐ 星星护身符"],
  de: ["🔮 Kristallkugel", "🕯️ Kerze", "🍀 Vierblättriges Kleeblatt", "🪶 Feder", "💎 Jade", "🪙 Silbermünze", "🌿 Salbei", "💜 Lavendel", "🌙 Mondstein", "⭐ Sternamulett"],
  fr: ["🔮 Boule de cristal", "🕯️ Bougie", "🍀 Trèfle à quatre feuilles", "🪶 Plume", "💎 Jade", "🪙 Pièce d'argent", "🌿 Sauge", "💜 Lavande", "🌙 Pierre de lune", "⭐ Amulette étoile"],
  es: ["🔮 Bola de cristal", "🕯️ Vela", "🍀 Trébol de cuatro hojas", "🪶 Pluma", "💎 Jade", "🪙 Moneda de plata", "🌿 Salvia", "💜 Lavanda", "🌙 Piedra lunar", "⭐ Amuleto estelar"],
  pt: ["🔮 Bola de cristal", "🕯️ Vela", "🍀 Trevo de quatro folhas", "🪶 Pena", "💎 Jade", "🪙 Moeda de prata", "🌿 Sálvia", "💜 Lavanda", "🌙 Pedra da lua", "⭐ Amuleto estelar"],
};

const luckyColors: Record<Language, string[]> = {
  ko: ["💜 보라색", "✨ 금색", "💚 에메랄드", "💙 하늘색", "🤍 은색", "❤️ 루비색", "🧡 호박색", "🩵 청록색"],
  en: ["💜 Purple", "✨ Gold", "💚 Emerald", "💙 Sky Blue", "🤍 Silver", "❤️ Ruby Red", "🧡 Amber", "🩵 Turquoise"],
  ja: ["💜 紫", "✨ 金色", "💚 エメラルド", "💙 空色", "🤍 銀色", "❤️ ルビーレッド", "🧡 琥珀色", "🩵 ターコイズ"],
  zh: ["💜 紫色", "✨ 金色", "💚 翡翠绿", "💙 天蓝色", "🤍 银色", "❤️ 宝石红", "🧡 琥珀色", "🩵 绿松石色"],
  de: ["💜 Lila", "✨ Gold", "💚 Smaragd", "💙 Himmelblau", "🤍 Silber", "❤️ Rubinrot", "🧡 Bernstein", "🩵 Türkis"],
  fr: ["💜 Violet", "✨ Or", "💚 Émeraude", "💙 Bleu ciel", "🤍 Argent", "❤️ Rouge rubis", "🧡 Ambre", "🩵 Turquoise"],
  es: ["💜 Púrpura", "✨ Dorado", "💚 Esmeralda", "💙 Azul cielo", "🤍 Plata", "❤️ Rojo rubí", "🧡 Ámbar", "🩵 Turquesa"],
  pt: ["💜 Roxo", "✨ Dourado", "💚 Esmeralda", "💙 Azul celeste", "🤍 Prata", "❤️ Vermelho rubi", "🧡 Âmbar", "🩵 Turquesa"],
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function dateSeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type AdviceLevel = "high" | "good" | "mid" | "low";

function computeResult(selected: string[]): { score: number; advice: AdviceLevel } {
  if (!selected.length) return { score: 0, advice: "low" };
  let total = 0;
  for (const k of selected) total += kwMeta[k]?.luck ?? 50;
  let avg = Math.round(total / selected.length);
  const seed = dateSeed() + hashStr(selected.join(","));
  const rng = seededRandom(seed);
  avg = Math.max(10, Math.min(100, avg + Math.round(rng() * 20 - 10)));
  const advice: AdviceLevel = avg >= 80 ? "high" : avg >= 65 ? "good" : avg >= 50 ? "mid" : "low";
  return { score: avg, advice };
}

function getLucky(lang: Language, selected: string[]) {
  const seed = dateSeed() + hashStr(selected.join(","));
  const rng = seededRandom(seed);
  const items = luckyItems[lang];
  const colors = luckyColors[lang];
  return {
    item: items[Math.floor(rng() * items.length)],
    color: colors[Math.floor(rng() * colors.length)],
    number: Math.floor(rng() * 45) + 1,
  };
}

const CIRC = 2 * Math.PI * 80;

export default function DreamInterpreter({ locale = "ko" }: Props) {
  const lang: Language = VALID_LANGS.includes(locale as Language) ? (locale as Language) : "ko";
  const t = ui[lang];

  const [screen, setScreen] = useState<Screen>("intro");
  const [selectedCat, setSelectedCat] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<{ score: number; advice: AdviceLevel } | null>(null);
  const [lucky, setLucky] = useState<{ item: string; color: string; number: number } | null>(null);
  const [animScore, setAnimScore] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const filteredKw = selectedCat === "all" ? kwIds : kwIds.filter((k) => kwMeta[k].cat === selectedCat);

  const toggleKeyword = useCallback((id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((k) => k !== id);
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  }, []);

  const startInterpret = useCallback(() => {
    setScreen("interpreting");
    setTimeout(() => {
      const r = computeResult(selected);
      const l = getLucky(lang, selected);
      setResult(r);
      setLucky(l);
      setScreen("result");
    }, 2200);
  }, [selected, lang]);

  const restart = useCallback(() => {
    setSelected([]);
    setResult(null);
    setLucky(null);
    setAnimScore(0);
    setFadeIn(false);
    setScreen("selecting");
  }, []);

  useEffect(() => {
    if (screen === "result" && result) {
      setFadeIn(false);
      const ft = setTimeout(() => setFadeIn(true), 100);
      let frame: number;
      let start: number;
      const duration = 1800;
      const animate = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setAnimScore(Math.round(result.score * eased));
        if (p < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      return () => {
        clearTimeout(ft);
        cancelAnimationFrame(frame);
      };
    }
  }, [screen, result]);

  const scoreColor = animScore >= 70 ? "#22c55e" : animScore >= 40 ? "#eab308" : "#ef4444";

  const shareResult = useCallback(async () => {
    if (!result) return;
    const kws = selected.map((k) => `${kwMeta[k].emoji} ${kwName[k][lang]}`).join(", ");
    const mainInterp = kwInterp[selected[0]]?.[lang] ?? "";
    const text = `${t.shareText}\n\n🔮 ${kws}\n\n✨ ${mainInterp}\n\n🍀 ${t.luckyScore}: ${result.score}/100\n💡 ${adviceText[lang][result.advice]}\n\nhttps://slox.co.kr`;
    try {
      if (navigator.share) {
        await navigator.share({ title: t.shareText, text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [result, selected, lang, t]);

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-2xl mx-auto px-4 flex justify-between items-center h-14">
          <Link href="/" className="font-black text-lg text-white tracking-tight hover:opacity-80 transition-opacity">SLOX</Link>
          <Link href={lang === "ko" ? "/" : `/${lang}`} className="text-dark-400 hover:text-white text-sm transition-colors">{t.back}</Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 pt-20 pb-12">
        {screen === "intro" && (
          <div className="text-center animate-fade-in">
            <div className="relative mx-auto w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-amber-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative flex items-center justify-center w-full h-full text-7xl">🌙</div>
            </div>
            <span className="inline-block px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-medium mb-4">{t.badge}</span>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">
              <span className="text-white">{t.title}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">{t.titleHL}</span>
            </h1>
            <p className="text-dark-400 text-lg mb-8 max-w-md mx-auto">{t.subtitle}</p>
            <div className="flex justify-center gap-3 mb-8 text-3xl opacity-60">
              {["✨", "🔮", "🌙", "⭐", "💫"].map((e, i) => (
                <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 200}ms` }}>{e}</span>
              ))}
            </div>
            <button
              onClick={() => setScreen("selecting")}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-bold rounded-2xl text-lg hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-purple-500/25"
            >
              {t.start}
            </button>
          </div>
        )}

        {screen === "selecting" && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-2">{t.selectPrompt}</h2>
            <p className="text-dark-400 text-center text-sm mb-4">
              {selected.length > 0 && <span className="text-purple-400 font-medium">{selected.length}/5 {t.selected} · </span>}
              {t.maxHint}
            </p>

            {selected.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {selected.map((k) => (
                  <button key={k} onClick={() => toggleKeyword(k)}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-sm text-purple-200 hover:bg-purple-500/30 transition-colors"
                  >
                    {kwMeta[k].emoji} {kwName[k][lang]} ✕
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {catKeys.map((c) => (
                <button key={c} onClick={() => setSelectedCat(c)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedCat === c
                      ? "bg-purple-500 text-white shadow-md shadow-purple-500/30"
                      : "bg-dark-800 text-dark-300 hover:bg-dark-700"
                  }`}
                >
                  {t[catUIKey[c]]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {filteredKw.map((k) => {
                const isSel = selected.includes(k);
                return (
                  <button key={k} onClick={() => toggleKeyword(k)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl text-sm transition-all ${
                      isSel
                        ? "bg-purple-500/25 border-2 border-purple-400 text-white font-bold scale-[1.02]"
                        : "bg-dark-800/60 border border-dark-700/50 text-dark-300 hover:bg-dark-800 hover:text-white"
                    }`}
                  >
                    <span className="text-xl mb-1">{kwMeta[k].emoji}</span>
                    <span className="leading-tight">{kwName[k][lang]}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={startInterpret}
              disabled={selected.length === 0}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                selected.length > 0
                  ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/25"
                  : "bg-dark-800 text-dark-500 cursor-not-allowed"
              }`}
            >
              {selected.length > 0 ? `${t.interpret} (${selected.length})` : t.interpret}
            </button>
          </div>
        )}

        {screen === "interpreting" && (
          <div className="text-center py-20 animate-fade-in">
            <div className="relative mx-auto w-24 h-24 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-amber-500/30 rounded-full blur-xl animate-pulse" />
              <div className="relative flex items-center justify-center w-full h-full text-5xl animate-spin" style={{ animationDuration: "3s" }}>🔮</div>
            </div>
            <h2 className="text-xl font-bold text-white mb-6">{t.analyzing}</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {selected.map((k, i) => (
                <span key={k} className="px-3 py-1 bg-dark-800 rounded-full text-sm text-dark-300 animate-pulse" style={{ animationDelay: `${i * 200}ms` }}>
                  {kwMeta[k].emoji} {kwName[k][lang]}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-2">
              {[0, 150, 300].map((d) => (
                <span key={d} className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
          </div>
        )}

        {screen === "result" && result && lucky && (
          <div ref={resultRef} className={`transition-all duration-700 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="bg-gradient-to-br from-purple-500/20 to-amber-500/15 p-[1px] rounded-2xl mb-6">
              <div className="bg-dark-900 rounded-2xl p-6 text-center">
                <p className="text-purple-300 text-sm font-medium mb-4">{t.luckyScore}</p>
                <div className="relative mx-auto w-48 h-48 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke={scoreColor} strokeWidth="10"
                      strokeDasharray={CIRC} strokeDashoffset={CIRC - (CIRC * animScore) / 100}
                      strokeLinecap="round" className="transition-all duration-100" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black" style={{ color: scoreColor }}>{animScore}</span>
                    <span className="text-dark-500 text-sm">/100</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selected.map((k) => (
                    <span key={k} className="px-3 py-1 bg-dark-800 rounded-full text-xs text-dark-300">
                      {kwMeta[k].emoji} {kwName[k][lang]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/15 to-transparent p-[1px] rounded-2xl mb-6">
              <div className="bg-dark-900 rounded-2xl p-6">
                <h3 className="text-purple-300 font-bold mb-4">✨ {t.meaning}</h3>
                <div className="space-y-4">
                  {selected.map((k) => (
                    <div key={k} className="flex gap-3">
                      <span className="text-2xl flex-shrink-0">{kwMeta[k].emoji}</span>
                      <div>
                        <p className="text-white font-medium text-sm mb-1">{kwName[k][lang]}</p>
                        <p className="text-dark-300 text-sm leading-relaxed">{kwInterp[k]?.[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/15 to-transparent p-[1px] rounded-2xl mb-6">
              <div className="bg-dark-900 rounded-2xl p-6">
                <h3 className="text-amber-300 font-bold mb-3">💡 {t.advice}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{adviceText[lang][result.advice]}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-3 text-center">
                <p className="text-dark-500 text-xs mb-1">{t.luckyItem}</p>
                <p className="text-white text-sm font-medium">{lucky.item}</p>
              </div>
              <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-3 text-center">
                <p className="text-dark-500 text-xs mb-1">{t.luckyColor}</p>
                <p className="text-white text-sm font-medium">{lucky.color}</p>
              </div>
              <div className="bg-dark-800/50 border border-dark-700/50 rounded-xl p-3 text-center">
                <p className="text-dark-500 text-xs mb-1">{t.luckyNumber}</p>
                <p className="text-white text-sm font-medium">🔢 {lucky.number}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button onClick={shareResult}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-medium rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >{t.share}</button>
              <button onClick={restart}
                className="flex-1 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-colors"
              >{t.retry}</button>
            </div>

            <div className="pt-8 border-t border-dark-800">
              <p className="text-dark-500 text-sm mb-4 text-center">{t.otherTests}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href={lang === "ko" ? "/reaction" : `/${lang}/reaction`}
                  className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                >{t.reaction}</Link>
                <Link href={lang === "ko" ? "/mbti" : `/${lang}/mbti`}
                  className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                >{t.mbti}</Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-dark-500 text-sm mb-2">{t.poweredBy}</p>
          <Link href="/" className="font-black text-sm text-white tracking-tight hover:opacity-80 transition-opacity">SLOX</Link>
          <p className="text-dark-500 text-xs mt-2">{t.services}</p>
        </div>
      </main>

      {copied && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-dark-800 border border-dark-700 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
          ✅ {t.copied}
        </div>
      )}

    </div>
  );
}
