"use client";

import { useEffect, useRef, useState } from "react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "001c0c61-152c-4b75-8651-240034a2893f",
          subject: `[SLOX 문의] ${formData.name}님의 문의`,
          from_name: formData.name,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("전송 실패:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-14">
          <div className="animate-on-scroll inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-lg">📬</span>
            <span className="text-sm text-white/70">프로젝트 문의</span>
          </div>
          
          <h2 className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ animationDelay: "0.1s" }}>
            함께 만들어요
          </h2>
          <p className="animate-on-scroll text-lg text-white/60 max-w-xl mx-auto" style={{ animationDelay: "0.2s" }}>
            아이디어가 있으시다면 편하게 말씀해 주세요<br />
            <span className="text-cyan-400">24시간 내</span>에 답변드립니다
          </p>
        </div>

        {/* 폼 카드 */}
        <div
          className="animate-on-scroll"
          style={{ animationDelay: "0.25s" }}
        >
          <div className="relative rounded-3xl p-1 bg-gradient-to-br from-violet-500/50 via-transparent to-cyan-500/50">
            <div className="bg-slate-900 rounded-[22px] p-8 md:p-12">
              {isSubmitted && (
                <div className="mb-8 p-5 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <p className="font-bold text-green-400 text-lg">문의가 접수되었습니다!</p>
                    <p className="text-green-400/70">빠른 시일 내에 연락드리겠습니다</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">이름</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="홍길동"
                      className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">연락처</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="010-1234-5678"
                      className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all text-base"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-white/80 mb-3">이메일</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all text-base"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-white/80 mb-3">문의 내용</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="예시) P01 주문합니다. 김길동"
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none text-base"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      전송 중...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      🚀 무료 상담 신청하기
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 빠른 연락처 */}
        <div className="animate-on-scroll mt-12 flex flex-col sm:flex-row justify-center items-center gap-6" style={{ animationDelay: "0.35s" }}>
          <a 
            href="https://pf.kakao.com/_tixaYn/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#FEE500] text-[#1A1A1A] font-semibold hover:shadow-lg hover:shadow-yellow-500/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.48 2 10.5c0 2.52 1.64 4.74 4.12 6.04-.18.64-.65 2.33-.75 2.69-.12.44.16.43.34.31.14-.09 2.19-1.48 3.08-2.08.39.04.79.06 1.21.06 5.52 0 10-3.48 10-7.02S17.52 3 12 3z" />
            </svg>
            카카오톡으로 문의
          </a>
          
          <a 
            href="mailto:hyoincho9123@gmail.com" 
            className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            hyoincho9123@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
