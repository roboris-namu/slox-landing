"use client";

import { useState } from "react";

/**
 * Contact 섹션 - 심플 폼
 */
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Get in Touch</h2>
          <p className="text-sm text-white/30">
            Questions, feedback, or partnership inquiries
          </p>
        </div>

        {/* 폼 */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8">
          {isSubmitted && (
            <div className="mb-5 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center">
              Message sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name"
              className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-white/20 focus:outline-none focus:border-white/15 transition-colors text-sm"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-white/20 focus:outline-none focus:border-white/15 transition-colors text-sm"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Message"
              className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-white/20 focus:outline-none focus:border-white/15 transition-colors resize-none text-sm"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-white text-dark-950 font-semibold rounded-xl hover:bg-white/90 transition-all disabled:opacity-50 text-sm"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
