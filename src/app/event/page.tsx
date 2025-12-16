"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Winner {
  id: string;
  game_type: string;
  nickname: string;
  email: string;
  score: number;
  grade: string;
  month_year: string;
  created_at: string;
}

interface EventConfig {
  game_type: string;
  is_active: boolean;
  prize_name: string;
  prize_amount: number;
}

interface CurrentLeader {
  nickname: string;
  score: number;
  email: string | null;
}

type Locale = 'ko' | 'en' | 'ja' | 'zh' | 'de' | 'fr' | 'es' | 'pt';

// 다국어 번역
const translations: Record<Locale, {
  subtitle: string;
  giftCard: string;
  eventTitle: string;
  eventDesc: string;
  currentFirst: string;
  howToParticipate: string;
  step1: string;
  step2: string;
  step2Note: string;
  step3: string;
  previewTitle: string;
  congrats: string;
  currentRecord: string;
  allTimeRecord: string;
  registerEmail: string;
  register: string;
  previewNote: string;
  nextDraw: string;
  challengeNow: string;
  pastWinners: string;
  loading: string;
  won: string;
  noWinners: string;
  beFirst: string;
  multiWin: string;
  multiWinDesc: string;
  multiWinNote: string;
  multiWinTip: string;
  notes: string;
  note1: string;
  note2: string;
  note3: string;
  note4: string;
  note5: string;
  note6: string;
  note7: string;
  backHome: string;
  prize: string;
  prizeAmount: string;
}> = {
  ko: {
    subtitle: "매달 1등에게",
    giftCard: "문화상품권",
    eventTitle: "🎉 반응속도 테스트 이벤트 진행 중!",
    eventDesc: "매달 1일 오전 10시 기준 반응속도 테스트 1등에게 문화상품권 5,000원을 드립니다!",
    currentFirst: "현재 1등",
    howToParticipate: "📋 참여 방법",
    step1: "반응속도 테스트에서 최고 기록을 달성하세요!",
    step2: "1등 달성 시 축하 팝업이 뜨며 이메일을 등록할 수 있어요!",
    step2Note: "💡 이메일 미등록 시 상품 수령이 불가합니다.",
    step3: "매달 1일 오전 10시 기준 최종 1등에게 오후 2시 상품 발송!",
    previewTitle: "✨ 1등 달성 시 이런 화면이!",
    congrats: "축하합니다! 1등입니다!",
    currentRecord: "님의 기록!",
    allTimeRecord: "반응속도 테스트 역대 1등!",
    registerEmail: "상품 수령을 위해 이메일을 등록하세요!",
    register: "등록",
    previewNote: "실제로 1등 달성 시 폭죽 효과와 함께 나타나요",
    nextDraw: "⏰ 다음 추첨까지",
    challengeNow: "🎮 지금 도전하기",
    pastWinners: "역대 당첨자",
    loading: "로딩 중...",
    won: "당첨",
    noWinners: "아직 당첨자가 없습니다.",
    beFirst: "첫 번째 당첨자가 되어보세요!",
    multiWin: "⚠️ 중복 당첨 가능!",
    multiWinDesc: "연속으로 1등을 지키면 계속 상품을 받을 수 있어요.",
    multiWinNote: "누군가 당신의 기록을 깨기 전까지는... 👑",
    multiWinTip: "💡 현재 챔피언을 끌어내리고 새로운 1등이 되어보세요!",
    notes: "📌 유의사항",
    note1: "• 매달 1일 오전 10시 기준으로 1등을 선정합니다.",
    note2: "• 1등 달성 시 반드시 이메일을 등록해야 상품 수령이 가능합니다.",
    note3: "• 상품은 매달 1일 오후 2시에 등록된 이메일로 발송됩니다.",
    note4: "📬 메일이 안 보이면 스팸함을 확인해주세요!",
    note5: "중복 당첨이 가능합니다. 기록이 깨지지 않으면 연속 당첨!",
    note6: "• 부정한 방법으로 기록 달성 시 당첨이 취소될 수 있습니다.",
    note7: "• 이벤트 내용은 사전 공지 없이 변경될 수 있습니다.",
    backHome: "홈으로 돌아가기",
    prize: "🎁 문화상품권",
    prizeAmount: "5,000원",
  },
  en: {
    subtitle: "Monthly 1st place wins",
    giftCard: "Gift Card",
    eventTitle: "🎉 Reaction Speed Test Event!",
    eventDesc: "Win a $5 gift card every month! 1st place on the 1st of each month (10 AM KST) wins!",
    currentFirst: "Current 1st",
    howToParticipate: "📋 How to Participate",
    step1: "Get the best score in the Reaction Speed Test!",
    step2: "When you reach 1st place, a popup will appear to register your email!",
    step2Note: "💡 You must register your email to receive the prize.",
    step3: "Prize sent at 2 PM KST on the 1st of each month!",
    previewTitle: "✨ This is what 1st place looks like!",
    congrats: "Congratulations! You're #1!",
    currentRecord: "'s record!",
    allTimeRecord: "All-time Reaction Test #1!",
    registerEmail: "Register your email to receive the prize!",
    register: "Register",
    previewNote: "Confetti effects appear when you actually reach 1st place",
    nextDraw: "⏰ Next draw in",
    challengeNow: "🎮 Challenge Now",
    pastWinners: "Past Winners",
    loading: "Loading...",
    won: "Won",
    noWinners: "No winners yet.",
    beFirst: "Be the first winner!",
    multiWin: "⚠️ Multiple Wins Possible!",
    multiWinDesc: "Keep the 1st place to keep winning prizes!",
    multiWinNote: "Until someone beats your record... 👑",
    multiWinTip: "💡 Dethrone the current champion and become #1!",
    notes: "📌 Notice",
    note1: "• Winner selected based on 1st place at 10 AM KST on the 1st.",
    note2: "• You must register your email to receive the prize.",
    note3: "• Prizes sent at 2 PM KST on the 1st of each month.",
    note4: "📬 Check spam folder if you don't see the email!",
    note5: "Multiple wins allowed if your record isn't broken!",
    note6: "• Cheating may result in disqualification.",
    note7: "• Event details may change without notice.",
    backHome: "Back to Home",
    prize: "🎁 Gift Card",
    prizeAmount: "$5",
  },
  ja: {
    subtitle: "毎月1位に",
    giftCard: "ギフトカード",
    eventTitle: "🎉 反応速度テストイベント開催中！",
    eventDesc: "毎月1日午前10時基準で反応速度テスト1位に500円ギフトカードをプレゼント！",
    currentFirst: "現在1位",
    howToParticipate: "📋 参加方法",
    step1: "反応速度テストで最高記録を出しましょう！",
    step2: "1位達成時にポップアップが表示され、メールを登録できます！",
    step2Note: "💡 メール未登録の場合、賞品を受け取れません。",
    step3: "毎月1日午後2時に賞品発送！",
    previewTitle: "✨ 1位達成時の画面！",
    congrats: "おめでとうございます！1位です！",
    currentRecord: "さんの記録！",
    allTimeRecord: "反応速度テスト歴代1位！",
    registerEmail: "賞品受取のためメールを登録してください！",
    register: "登録",
    previewNote: "実際に1位達成時は紙吹雪効果が表示されます",
    nextDraw: "⏰ 次回抽選まで",
    challengeNow: "🎮 今すぐ挑戦",
    pastWinners: "歴代当選者",
    loading: "読み込み中...",
    won: "当選",
    noWinners: "まだ当選者がいません。",
    beFirst: "最初の当選者になりましょう！",
    multiWin: "⚠️ 連続当選可能！",
    multiWinDesc: "1位をキープすれば賞品を受け取り続けられます！",
    multiWinNote: "誰かに記録を破られるまで... 👑",
    multiWinTip: "💡 現チャンピオンを倒して新しい1位になろう！",
    notes: "📌 注意事項",
    note1: "• 毎月1日午前10時基準で1位を選定します。",
    note2: "• 1位達成時は必ずメールを登録してください。",
    note3: "• 賞品は毎月1日午後2時に発送されます。",
    note4: "📬 メールが届かない場合は迷惑メールフォルダを確認！",
    note5: "記録が破られなければ連続当選！",
    note6: "• 不正な方法での記録は当選取消となります。",
    note7: "• イベント内容は予告なく変更される場合があります。",
    backHome: "ホームに戻る",
    prize: "🎁 ギフトカード",
    prizeAmount: "500円",
  },
  zh: {
    subtitle: "每月第一名获得",
    giftCard: "礼品卡",
    eventTitle: "🎉 反应速度测试活动进行中！",
    eventDesc: "每月1日上午10点基准，反应速度测试第一名获得5美元礼品卡！",
    currentFirst: "当前第一",
    howToParticipate: "📋 参与方式",
    step1: "在反应速度测试中取得最好成绩！",
    step2: "获得第一名时会弹出窗口，可以注册邮箱！",
    step2Note: "💡 未注册邮箱无法领取奖品。",
    step3: "每月1日下午2点发放奖品！",
    previewTitle: "✨ 第一名的界面！",
    congrats: "恭喜！你是第一名！",
    currentRecord: "的记录！",
    allTimeRecord: "反应速度测试历史第一！",
    registerEmail: "请注册邮箱以领取奖品！",
    register: "注册",
    previewNote: "实际获得第一名时会有烟花效果",
    nextDraw: "⏰ 下次抽奖倒计时",
    challengeNow: "🎮 立即挑战",
    pastWinners: "历届获奖者",
    loading: "加载中...",
    won: "获奖",
    noWinners: "暂无获奖者。",
    beFirst: "成为第一个获奖者！",
    multiWin: "⚠️ 可连续获奖！",
    multiWinDesc: "保持第一名就能持续获得奖品！",
    multiWinNote: "直到有人打破你的记录... 👑",
    multiWinTip: "💡 打败现任冠军，成为新的第一名！",
    notes: "📌 注意事项",
    note1: "• 每月1日上午10点基准选出第一名。",
    note2: "• 获得第一名后必须注册邮箱。",
    note3: "• 奖品于每月1日下午2点发送。",
    note4: "📬 如果没收到邮件请检查垃圾邮件！",
    note5: "记录不被打破可连续获奖！",
    note6: "• 作弊可能导致取消资格。",
    note7: "• 活动内容可能随时更改。",
    backHome: "返回首页",
    prize: "🎁 礼品卡",
    prizeAmount: "$5",
  },
  de: {
    subtitle: "Monatlich für Platz 1",
    giftCard: "Gutschein",
    eventTitle: "🎉 Reaktionstest Event!",
    eventDesc: "Gewinne jeden Monat einen 5€ Gutschein! Platz 1 am 1. jeden Monats (10 Uhr KST) gewinnt!",
    currentFirst: "Aktueller 1. Platz",
    howToParticipate: "📋 Wie teilnehmen",
    step1: "Erreiche den besten Score im Reaktionstest!",
    step2: "Bei Platz 1 erscheint ein Popup zur E-Mail-Registrierung!",
    step2Note: "💡 E-Mail-Registrierung erforderlich für Preis.",
    step3: "Preis wird am 1. jeden Monats um 14 Uhr KST versendet!",
    previewTitle: "✨ So sieht Platz 1 aus!",
    congrats: "Herzlichen Glückwunsch! Du bist #1!",
    currentRecord: "s Rekord!",
    allTimeRecord: "Reaktionstest Allzeit #1!",
    registerEmail: "Registriere deine E-Mail für den Preis!",
    register: "Registrieren",
    previewNote: "Konfetti-Effekte erscheinen bei echtem Platz 1",
    nextDraw: "⏰ Nächste Ziehung in",
    challengeNow: "🎮 Jetzt herausfordern",
    pastWinners: "Bisherige Gewinner",
    loading: "Laden...",
    won: "Gewonnen",
    noWinners: "Noch keine Gewinner.",
    beFirst: "Sei der erste Gewinner!",
    multiWin: "⚠️ Mehrfachgewinne möglich!",
    multiWinDesc: "Halte Platz 1 für kontinuierliche Preise!",
    multiWinNote: "Bis jemand deinen Rekord bricht... 👑",
    multiWinTip: "💡 Stürze den Champion und werde #1!",
    notes: "📌 Hinweise",
    note1: "• Gewinner basierend auf Platz 1 um 10 Uhr KST am 1.",
    note2: "• E-Mail-Registrierung erforderlich für Preiserhalt.",
    note3: "• Preise werden am 1. um 14 Uhr KST versendet.",
    note4: "📬 Spam-Ordner prüfen wenn keine E-Mail kommt!",
    note5: "Mehrfachgewinne wenn Rekord nicht gebrochen wird!",
    note6: "• Betrug führt zur Disqualifikation.",
    note7: "• Event-Details können sich ändern.",
    backHome: "Zurück zur Startseite",
    prize: "🎁 Gutschein",
    prizeAmount: "5€",
  },
  fr: {
    subtitle: "Chaque mois, le 1er gagne",
    giftCard: "Carte cadeau",
    eventTitle: "🎉 Événement Test de Réaction!",
    eventDesc: "Gagnez une carte cadeau de 5€ chaque mois! Le 1er au 1er de chaque mois (10h KST) gagne!",
    currentFirst: "1er actuel",
    howToParticipate: "📋 Comment participer",
    step1: "Obtenez le meilleur score au Test de Réaction!",
    step2: "En 1ère place, un popup apparaît pour enregistrer votre email!",
    step2Note: "💡 L'email est requis pour recevoir le prix.",
    step3: "Prix envoyé le 1er de chaque mois à 14h KST!",
    previewTitle: "✨ Voici à quoi ressemble la 1ère place!",
    congrats: "Félicitations! Vous êtes #1!",
    currentRecord: " - record!",
    allTimeRecord: "Record absolu du Test de Réaction!",
    registerEmail: "Enregistrez votre email pour le prix!",
    register: "Enregistrer",
    previewNote: "Des confettis apparaissent en cas de vraie 1ère place",
    nextDraw: "⏰ Prochain tirage dans",
    challengeNow: "🎮 Relever le défi",
    pastWinners: "Anciens gagnants",
    loading: "Chargement...",
    won: "Gagné",
    noWinners: "Pas encore de gagnants.",
    beFirst: "Soyez le premier gagnant!",
    multiWin: "⚠️ Gains multiples possibles!",
    multiWinDesc: "Gardez la 1ère place pour continuer à gagner!",
    multiWinNote: "Jusqu'à ce que quelqu'un batte votre record... 👑",
    multiWinTip: "💡 Détrônez le champion et devenez #1!",
    notes: "📌 Avis",
    note1: "• Gagnant basé sur la 1ère place à 10h KST le 1er.",
    note2: "• L'enregistrement de l'email est requis.",
    note3: "• Prix envoyés le 1er à 14h KST.",
    note4: "📬 Vérifiez vos spams si pas d'email!",
    note5: "Gains multiples si record non battu!",
    note6: "• La triche entraîne la disqualification.",
    note7: "• Les détails peuvent changer sans préavis.",
    backHome: "Retour à l'accueil",
    prize: "🎁 Carte cadeau",
    prizeAmount: "5€",
  },
  es: {
    subtitle: "Mensualmente el 1º gana",
    giftCard: "Tarjeta regalo",
    eventTitle: "🎉 ¡Evento de Test de Reacción!",
    eventDesc: "¡Gana una tarjeta de $5 cada mes! ¡El 1º el día 1 de cada mes (10 AM KST) gana!",
    currentFirst: "1º actual",
    howToParticipate: "📋 Cómo participar",
    step1: "¡Obtén el mejor puntaje en el Test de Reacción!",
    step2: "¡Al llegar al 1º lugar, aparece un popup para registrar tu email!",
    step2Note: "💡 El email es requerido para recibir el premio.",
    step3: "¡Premio enviado el 1º de cada mes a las 2 PM KST!",
    previewTitle: "✨ ¡Así se ve el 1º lugar!",
    congrats: "¡Felicitaciones! ¡Eres #1!",
    currentRecord: " - ¡récord!",
    allTimeRecord: "¡Récord histórico del Test de Reacción!",
    registerEmail: "¡Registra tu email para el premio!",
    register: "Registrar",
    previewNote: "Aparecen confetis cuando realmente llegas al 1º",
    nextDraw: "⏰ Próximo sorteo en",
    challengeNow: "🎮 Desafiar ahora",
    pastWinners: "Ganadores anteriores",
    loading: "Cargando...",
    won: "Ganó",
    noWinners: "Aún no hay ganadores.",
    beFirst: "¡Sé el primer ganador!",
    multiWin: "⚠️ ¡Múltiples victorias posibles!",
    multiWinDesc: "¡Mantén el 1º lugar para seguir ganando!",
    multiWinNote: "Hasta que alguien rompa tu récord... 👑",
    multiWinTip: "💡 ¡Destrona al campeón y sé #1!",
    notes: "📌 Aviso",
    note1: "• Ganador basado en 1º lugar a las 10 AM KST el 1º.",
    note2: "• Se requiere registro de email para recibir premio.",
    note3: "• Premios enviados el 1º a las 2 PM KST.",
    note4: "📬 ¡Revisa spam si no recibes email!",
    note5: "¡Múltiples victorias si no rompen tu récord!",
    note6: "• Hacer trampa resulta en descalificación.",
    note7: "• Los detalles pueden cambiar sin aviso.",
    backHome: "Volver al inicio",
    prize: "🎁 Tarjeta regalo",
    prizeAmount: "$5",
  },
  pt: {
    subtitle: "Mensalmente o 1º ganha",
    giftCard: "Cartão presente",
    eventTitle: "🎉 Evento de Teste de Reação!",
    eventDesc: "Ganhe um cartão de R$25 todo mês! O 1º no dia 1 de cada mês (10h KST) ganha!",
    currentFirst: "1º atual",
    howToParticipate: "📋 Como participar",
    step1: "Obtenha a melhor pontuação no Teste de Reação!",
    step2: "Ao chegar ao 1º lugar, aparece um popup para registrar seu email!",
    step2Note: "💡 O email é necessário para receber o prêmio.",
    step3: "Prêmio enviado no 1º de cada mês às 14h KST!",
    previewTitle: "✨ Assim é o 1º lugar!",
    congrats: "Parabéns! Você é #1!",
    currentRecord: " - recorde!",
    allTimeRecord: "Recorde histórico do Teste de Reação!",
    registerEmail: "Registre seu email para o prêmio!",
    register: "Registrar",
    previewNote: "Confetes aparecem quando você realmente chega ao 1º",
    nextDraw: "⏰ Próximo sorteio em",
    challengeNow: "🎮 Desafiar agora",
    pastWinners: "Ganhadores anteriores",
    loading: "Carregando...",
    won: "Ganhou",
    noWinners: "Ainda não há ganhadores.",
    beFirst: "Seja o primeiro ganhador!",
    multiWin: "⚠️ Múltiplas vitórias possíveis!",
    multiWinDesc: "Mantenha o 1º lugar para continuar ganhando!",
    multiWinNote: "Até alguém quebrar seu recorde... 👑",
    multiWinTip: "💡 Destrone o campeão e seja #1!",
    notes: "📌 Aviso",
    note1: "• Ganhador baseado em 1º lugar às 10h KST no 1º.",
    note2: "• Registro de email necessário para receber prêmio.",
    note3: "• Prêmios enviados no 1º às 14h KST.",
    note4: "📬 Verifique spam se não receber email!",
    note5: "Múltiplas vitórias se recorde não for quebrado!",
    note6: "• Trapaça resulta em desqualificação.",
    note7: "• Detalhes podem mudar sem aviso.",
    backHome: "Voltar ao início",
    prize: "🎁 Cartão presente",
    prizeAmount: "R$25",
  },
};

export default function EventPage() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [, setEventConfig] = useState<EventConfig | null>(null);
  const [currentLeader, setCurrentLeader] = useState<CurrentLeader | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [locale, setLocale] = useState<Locale>('ko');

  // 쿠키에서 언어 감지
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };
    
    const savedLocale = getCookie('SLOX_LOCALE') as Locale;
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  const t = translations[locale];

  // 다음 추첨일까지 실시간 카운트다운
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      let nextDraw = new Date(now.getFullYear(), now.getMonth() + 1, 1, 10, 0, 0);
      
      if (now.getDate() === 1 && now.getHours() < 10) {
        nextDraw = new Date(now.getFullYear(), now.getMonth(), 1, 10, 0, 0);
      }
      
      const diff = nextDraw.getTime() - now.getTime();
      
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: configData } = await supabase
          .from("event_config")
          .select("*")
          .eq("is_active", true)
          .single();

        if (configData) {
          setEventConfig(configData);
        }

        const { data: leaderData } = await supabase
          .from("reaction_leaderboard")
          .select("nickname, score, email")
          .order("score", { ascending: true })
          .limit(1)
          .single();

        if (leaderData) {
          setCurrentLeader({
            nickname: leaderData.nickname,
            score: leaderData.score,
            email: leaderData.email,
          });
        }

        const { data: winnersData } = await supabase
          .from("winners")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(12);

        if (winnersData) {
          setWinners(winnersData);
        }
      } catch (err) {
        console.error("Data load failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const maskEmail = (email: string) => {
    if (!email || !email.includes("@")) return "***@***.***";
    const [local, domain] = email.split("@");
    const maskedLocal = local.slice(0, 3) + "***";
    return `${maskedLocal}@${domain}`;
  };

  const getGameName = (gameType: string) => {
    const names: Record<string, Record<Locale, string>> = {
      reaction: { ko: "반응속도 테스트", en: "Reaction Test", ja: "反応速度テスト", zh: "反应速度测试", de: "Reaktionstest", fr: "Test de Réaction", es: "Test de Reacción", pt: "Teste de Reação" },
      cps: { ko: "CPS 테스트", en: "CPS Test", ja: "CPSテスト", zh: "CPS测试", de: "CPS-Test", fr: "Test CPS", es: "Test CPS", pt: "Teste CPS" },
      typing: { ko: "타자 테스트", en: "Typing Test", ja: "タイピングテスト", zh: "打字测试", de: "Tipptest", fr: "Test de frappe", es: "Test de escritura", pt: "Teste de digitação" },
      memory: { ko: "숫자 기억 게임", en: "Memory Test", ja: "記憶力テスト", zh: "记忆力测试", de: "Gedächtnistest", fr: "Test Mémoire", es: "Test Memoria", pt: "Teste Memória" },
      color: { ko: "색상 찾기 게임", en: "Color Finder", ja: "色探しゲーム", zh: "找颜色游戏", de: "Farbtest", fr: "Trouver Couleur", es: "Buscar Color", pt: "Encontrar Cor" },
      aim: { ko: "에임 트레이너", en: "Aim Trainer", ja: "エイムトレーナー", zh: "瞄准训练", de: "Zieltrainer", fr: "Entraîneur Visée", es: "Entrenador Puntería", pt: "Treinador de Mira" },
      card: { ko: "카드 짝 맞추기", en: "Card Match", ja: "カードマッチ", zh: "卡片配对", de: "Karten-Match", fr: "Match de Cartes", es: "Match de Cartas", pt: "Match de Cartas" },
    };
    return names[gameType]?.[locale] || gameType;
  };

  const formatMonthYear = (monthYear: string) => {
    const [year, month] = monthYear.split("-");
    const monthNum = parseInt(month);
    
    const formats: Record<Locale, string> = {
      ko: `${year}년 ${monthNum}월`,
      en: `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][monthNum-1]} ${year}`,
      ja: `${year}年${monthNum}月`,
      zh: `${year}年${monthNum}月`,
      de: `${['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'][monthNum-1]} ${year}`,
      fr: `${['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'][monthNum-1]} ${year}`,
      es: `${['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][monthNum-1]} ${year}`,
      pt: `${['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][monthNum-1]} ${year}`,
    };
    return formats[locale];
  };

  const homeHref = locale === 'ko' ? '/' : `/${locale}`;
  const reactionHref = locale === 'ko' ? '/reaction' : `/${locale}/reaction`;

  return (
    <main className="min-h-screen bg-dark-950 pt-28 pb-20">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.1),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-yellow-500/20 to-red-500/20 border-2 border-yellow-500/30">
            <span className="text-6xl animate-bounce">🎁</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
              SLOX EVENT
            </span>
          </h1>
          <p className="text-lg text-dark-300">
            {t.subtitle} <span className="text-yellow-400 font-bold">{t.giftCard}</span>!
          </p>
        </div>

        {/* 이벤트 안내 카드 */}
        <div className="bg-gradient-to-br from-yellow-500/10 to-red-500/10 border border-yellow-500/30 rounded-3xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{t.eventTitle}</h2>
              <p className="text-dark-300">{t.eventDesc}</p>
              {currentLeader && (
                <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <p className="text-sm text-yellow-300">
                    👑 {t.currentFirst}: <span className="font-bold text-yellow-400">{currentLeader.nickname}</span> ({currentLeader.score}ms)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 참여 방법 */}
          <div className="bg-black/20 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">{t.howToParticipate}</h3>
            <ol className="space-y-4 text-dark-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
                <span>{t.step1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <span>{t.step2}</span>
                  <p className="text-xs text-dark-500 mt-1">{t.step2Note}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
                <span>{t.step3}</span>
              </li>
            </ol>
          </div>

          {/* 1등 달성 시 미리보기 */}
          <div className="bg-black/30 rounded-2xl p-6 mb-6 relative overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">{t.previewTitle}</h3>
            
            <div className="relative bg-gradient-to-b from-yellow-900/40 via-orange-900/30 to-dark-900/80 border border-yellow-500/30 rounded-2xl p-8 text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-yellow-500/20 to-transparent blur-2xl" />
              
              <div className="relative z-10">
                <div className="relative inline-block mb-4">
                  <div className="text-6xl">👑</div>
                  <div className="absolute inset-0 text-6xl blur-md opacity-50">👑</div>
                </div>
                
                <h4 className="text-2xl font-black mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400">
                    {t.congrats}
                  </span>
                </h4>
                
                <div className="mb-1">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-500">
                    {currentLeader ? currentLeader.score : "---"}
                  </span>
                  <span className="text-dark-400 text-xl ml-1">ms</span>
                </div>
                <p className="text-sm text-dark-500 mb-6">
                  {currentLeader 
                    ? `${t.currentFirst}: ${currentLeader.nickname}${t.currentRecord}` 
                    : t.allTimeRecord}
                </p>
                
                <div className="bg-dark-900/60 backdrop-blur-sm rounded-xl p-4 max-w-sm mx-auto border border-white/5">
                  <p className="text-sm text-dark-300 mb-3 flex items-center justify-center gap-2">
                    <span className="text-lg">🎁</span>
                    <span>{t.registerEmail}</span>
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-dark-800/80 rounded-lg px-4 py-2.5 text-left text-dark-500 text-sm border border-white/5">
                      your@email.com
                    </div>
                    <div className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg text-sm shadow-lg shadow-yellow-500/20">
                      {t.register}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-dark-500 text-sm mt-4">{t.previewNote}</p>
          </div>

          {/* 다음 추첨일 카운트다운 */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-dark-400 mb-2">{t.nextDraw}</p>
                <div className="flex items-center gap-2">
                  <div className="bg-black/30 rounded-lg px-3 py-2 min-w-[60px]">
                    <p className="text-2xl font-black text-yellow-400 tabular-nums">{countdown.days}</p>
                    <p className="text-[10px] text-dark-500 uppercase">days</p>
                  </div>
                  <span className="text-yellow-500 font-bold text-xl">:</span>
                  <div className="bg-black/30 rounded-lg px-3 py-2 min-w-[60px]">
                    <p className="text-2xl font-black text-yellow-400 tabular-nums">{String(countdown.hours).padStart(2, '0')}</p>
                    <p className="text-[10px] text-dark-500 uppercase">hours</p>
                  </div>
                  <span className="text-yellow-500 font-bold text-xl">:</span>
                  <div className="bg-black/30 rounded-lg px-3 py-2 min-w-[60px]">
                    <p className="text-2xl font-black text-yellow-400 tabular-nums">{String(countdown.minutes).padStart(2, '0')}</p>
                    <p className="text-[10px] text-dark-500 uppercase">min</p>
                  </div>
                  <span className="text-yellow-500 font-bold text-xl animate-pulse">:</span>
                  <div className="bg-black/30 rounded-lg px-3 py-2 min-w-[60px]">
                    <p className="text-2xl font-black text-cyan-400 tabular-nums animate-pulse">{String(countdown.seconds).padStart(2, '0')}</p>
                    <p className="text-[10px] text-dark-500 uppercase">sec</p>
                  </div>
                </div>
              </div>
              <Link
                href={reactionHref}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-yellow-500/30 whitespace-nowrap"
              >
                {t.challengeNow}
              </Link>
            </div>
          </div>
        </div>

        {/* 당첨자 목록 */}
        <div className="bg-dark-900/50 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            {t.pastWinners}
          </h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-dark-400">{t.loading}</p>
            </div>
          ) : winners.length > 0 ? (
            <div className="space-y-4">
              {winners.map((winner, index) => (
                <div
                  key={winner.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                      : "bg-dark-800/50 border border-white/5"
                  }`}
                >
                  <div className="text-center min-w-[80px]">
                    <p className={`text-lg font-bold ${index === 0 ? "text-yellow-400" : "text-white"}`}>
                      {formatMonthYear(winner.month_year)}
                    </p>
                    <p className="text-xs text-dark-500">{t.won}</p>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">👑</span>
                      <span className="text-white font-bold">{winner.nickname}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        winner.grade === "챌린저" ? "bg-cyan-500/20 text-cyan-400" :
                        winner.grade === "마스터" ? "bg-purple-500/20 text-purple-400" :
                        "bg-blue-500/20 text-blue-400"
                      }`}>
                        {winner.grade}
                      </span>
                    </div>
                    <p className="text-sm text-dark-400">
                      {getGameName(winner.game_type)} · {winner.score}ms · {maskEmail(winner.email)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold">{t.prize}</p>
                    <p className="text-sm text-dark-500">{t.prizeAmount}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🎯</span>
              <p className="text-dark-400 mb-2">{t.noWinners}</p>
              <p className="text-dark-500 text-sm">{t.beFirst}</p>
            </div>
          )}
        </div>

        {/* 중복 당첨 안내 */}
        <div className="mt-8 p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/20">
          <div className="flex items-start gap-4">
            <div className="text-4xl">😈</div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">{t.multiWin}</h3>
              <p className="text-dark-300 text-sm mb-3">
                {t.multiWinDesc.split('계속 상품을 받을 수 있어요')[0]}
                <span className="text-yellow-400 font-bold">{t.multiWinDesc.includes('계속') ? '계속 상품을 받을 수 있어요.' : t.multiWinDesc}</span>
              </p>
              <p className="text-dark-400 text-sm">{t.multiWinNote}</p>
              <div className="mt-3 p-3 bg-black/30 rounded-xl">
                <p className="text-xs text-dark-500">{t.multiWinTip}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 유의사항 */}
        <div className="mt-6 p-6 bg-dark-900/30 rounded-2xl border border-white/5">
          <h3 className="text-sm font-bold text-dark-400 mb-3">{t.notes}</h3>
          <ul className="space-y-1 text-xs text-dark-500">
            <li>{t.note1}</li>
            <li>{t.note2}</li>
            <li>{t.note3}</li>
            <li><span className="text-red-400">{t.note4}</span></li>
            <li><span className="text-yellow-500">{t.note5}</span></li>
            <li>{t.note6}</li>
            <li>{t.note7}</li>
          </ul>
        </div>

        {/* 홈으로 */}
        <div className="mt-8 text-center">
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
