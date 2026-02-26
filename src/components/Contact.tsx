"use client";

import { useState } from "react";

const t: Record<string, { title: string; desc: string; name: string; email: string; message: string; sent: string; sending: string; send: string }> = {
  ko: { title: "문의하기", desc: "질문, 피드백, 제휴 문의를 남겨주세요", name: "이름", email: "이메일", message: "메시지", sent: "메시지가 전송되었습니다!", sending: "전송 중...", send: "메시지 보내기" },
  en: { title: "Get in Touch", desc: "Questions, feedback, or partnership inquiries", name: "Name", email: "Email", message: "Message", sent: "Message sent successfully!", sending: "Sending...", send: "Send Message" },
  ja: { title: "お問い合わせ", desc: "ご質問、フィードバック、提携のお問い合わせ", name: "お名前", email: "メール", message: "メッセージ", sent: "メッセージを送信しました！", sending: "送信中...", send: "メッセージを送信" },
  zh: { title: "联系我们", desc: "问题、反馈或合作咨询", name: "姓名", email: "邮箱", message: "留言", sent: "消息发送成功！", sending: "发送中...", send: "发送消息" },
  de: { title: "Kontakt", desc: "Fragen, Feedback oder Partnerschaftsanfragen", name: "Name", email: "E-Mail", message: "Nachricht", sent: "Nachricht erfolgreich gesendet!", sending: "Senden...", send: "Nachricht senden" },
  fr: { title: "Contact", desc: "Questions, retours ou demandes de partenariat", name: "Nom", email: "E-mail", message: "Message", sent: "Message envoyé avec succès !", sending: "Envoi...", send: "Envoyer" },
  es: { title: "Contacto", desc: "Preguntas, comentarios o consultas de colaboración", name: "Nombre", email: "Correo", message: "Mensaje", sent: "¡Mensaje enviado con éxito!", sending: "Enviando...", send: "Enviar mensaje" },
  pt: { title: "Contato", desc: "Dúvidas, feedback ou consultas de parceria", name: "Nome", email: "E-mail", message: "Mensagem", sent: "Mensagem enviada com sucesso!", sending: "Enviando...", send: "Enviar mensagem" },
};

export default function Contact({ locale = "ko" }: { locale?: string }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const l = t[locale] || t.en;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "001c0c61-152c-4b75-8651-240034a2893f",
          subject: `[SLOX] ${formData.name}`,
          ...formData,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Failed:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-lg mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{l.title}</h2>
          <p className="text-sm text-white/30">{l.desc}</p>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8">
          {isSubmitted && (
            <div className="mb-5 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center">
              {l.sent}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={l.name}
              className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-white/20 focus:outline-none focus:border-white/15 transition-colors text-sm"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={l.email}
              className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-white/20 focus:outline-none focus:border-white/15 transition-colors text-sm"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder={l.message}
              className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-white/20 focus:outline-none focus:border-white/15 transition-colors resize-none text-sm"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-white text-dark-950 font-semibold rounded-xl hover:bg-white/90 transition-all disabled:opacity-50 text-sm"
            >
              {isSubmitting ? l.sending : l.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
