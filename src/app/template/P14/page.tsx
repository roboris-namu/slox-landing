"use client";

import { useState } from "react";

export default function TemplateP14() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, title: "URBAN PHOTOGRAPHY", subtitle: "도시의 순간을 담다", color: "from-slate-800 to-slate-900" },
    { id: 2, title: "NATURE SERIES", subtitle: "자연의 고요함", color: "from-emerald-800 to-emerald-900" },
    { id: 3, title: "PORTRAIT COLLECTION", subtitle: "인물의 감정", color: "from-amber-800 to-amber-900" },
    { id: 4, title: "ARCHITECTURE", subtitle: "공간의 이야기", color: "from-violet-800 to-violet-900" },
    { id: 5, title: "ABSTRACT ART", subtitle: "추상의 세계", color: "from-rose-800 to-rose-900" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 고정 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex items-center justify-between mix-blend-difference">
        <h1 className="text-xl font-bold tracking-widest">FULLSCREEN</h1>
        <nav className="hidden md:flex gap-8 text-sm">
          <a href="#works">WORKS</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      {/* 풀스크린 슬라이더 */}
      <section className="relative h-screen">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`w-full h-full bg-gradient-to-br ${slide.color} flex items-center justify-center`}>
              <div className="text-center">
                <span className="text-sm tracking-[0.3em] text-white/50 block mb-4">
                  0{slide.id} / 0{slides.length}
                </span>
                <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl text-white/70">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}

        {/* 네비게이션 */}
        <div className="absolute bottom-1/2 left-0 right-0 flex justify-between px-6 z-10">
          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 슬라이드 인디케이터 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-12 h-1 rounded-full transition-all ${
                idx === currentSlide ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="min-h-screen flex items-center py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg" />
          <div>
            <h3 className="text-4xl font-black mb-6">정풀스크린</h3>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              전체화면을 활용한 임팩트 있는 포트폴리오입니다.
              각 작품을 온전히 감상할 수 있도록 설계되었으며,
              시각적 몰입감을 최대화합니다.
            </p>
            <div className="flex gap-8 text-sm text-zinc-500">
              <div>
                <div className="text-3xl font-black text-white mb-1">10+</div>
                <div>Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">200+</div>
                <div>Projects</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">50+</div>
                <div>Awards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-5xl font-black mb-6">Get in Touch</h3>
          <p className="text-zinc-400 mb-8 text-lg">
            새로운 프로젝트를 시작해보세요
          </p>
          <a 
            href="mailto:fullscreen@design.com" 
            className="inline-block px-10 py-5 bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-colors"
          >
            fullscreen@design.com
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 bg-black border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 flex justify-between text-sm text-zinc-600">
          <span>© 2024 FULLSCREEN</span>
          <div className="flex gap-6">
            <a href="#">Instagram</a>
            <a href="#">Behance</a>
            <a href="#">Dribbble</a>
          </div>
        </div>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white text-black py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm">
            <strong>P14</strong> 풀스크린 슬라이드 템플릿
          </span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-black text-white text-sm font-bold rounded-full hover:bg-zinc-800">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

