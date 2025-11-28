import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ✨ 프리미엄 다크 배경 계열
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          850: "#172033",
          900: "#0f172a",
          950: "#080c16",
        },
        // 🎨 프리미엄 그라데이션 악센트 - 바이올렛/인디고
        accent: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        // 💎 시안/청록 포인트
        cyan: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        // 🔮 인디고 계열
        indigo: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        // ink는 dark의 alias (레거시 호환)
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        // 기존 caramel 유지 (캐릭터용)
        caramel: {
          50: "#FDF6EE",
          100: "#FAEAD5",
          200: "#F5D4AA",
          300: "#EFBA7A",
          400: "#E8A05A",
          500: "#D4894A",
          600: "#C4763D",
          700: "#A35D35",
          800: "#854A30",
          900: "#6D3D2A",
        },
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        // 프리미엄 그라데이션들
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "premium-gradient": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
        "premium-gradient-hover": "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #22d3ee 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "dark-gradient": "linear-gradient(180deg, #0f172a 0%, #080c16 100%)",
        "mesh-gradient": "radial-gradient(at 40% 20%, hsla(228, 80%, 60%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 80%, 50%, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(262, 80%, 60%, 0.1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(240, 80%, 60%, 0.1) 0px, transparent 50%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "fade-in-down": "fadeInDown 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "wave": "wave 2.5s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "gradient-shift": "gradientShift 8s ease infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(15deg)" },
          "75%": { transform: "rotate(-15deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        "soft": "0 4px 20px rgba(0, 0, 0, 0.1)",
        "soft-lg": "0 8px 40px rgba(0, 0, 0, 0.15)",
        "glow-sm": "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-md": "0 0 40px rgba(139, 92, 246, 0.4)",
        "glow-lg": "0 0 60px rgba(139, 92, 246, 0.5)",
        "glow-cyan": "0 0 40px rgba(6, 182, 212, 0.4)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.3)",
        "glass-lg": "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
