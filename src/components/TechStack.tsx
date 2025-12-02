"use client";

import { useEffect, useRef } from "react";

const technologies = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Flutter", category: "Mobile" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "AI/ML" },
  { name: "OpenAI", category: "AI/ML" },
  { name: "Vercel", category: "Deploy" },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden border-y border-white/[0.03]">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-950/20 via-transparent to-cyan-950/20" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="animate-on-scroll text-center mb-10">
          <p className="text-sm text-white/40 uppercase tracking-widest">Technology Stack</p>
        </div>
        
        {/* 기술 스택 롤링 */}
        <div className="animate-on-scroll overflow-hidden" style={{ animationDelay: "0.1s" }}>
          <div className="flex gap-8 animate-scroll">
            {[...technologies, ...technologies].map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl whitespace-nowrap hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
                <span className="text-white/70 font-medium">{tech.name}</span>
                <span className="text-white/30 text-xs">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}




