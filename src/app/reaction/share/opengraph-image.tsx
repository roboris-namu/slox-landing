import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "반응속도 테스트 결과";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 등급별 색상
const gradeColors: Record<string, string> = {
  Challenger: "#22d3ee",
  Master: "#a855f7",
  Diamond: "#3b82f6",
  Platinum: "#14b8a6",
  Gold: "#eab308",
  Silver: "#9ca3af",
  Bronze: "#f97316",
};

const gradeEmojis: Record<string, string> = {
  Challenger: "⚡",
  Master: "🏆",
  Diamond: "💎",
  Platinum: "🥇",
  Gold: "🥈",
  Silver: "🥉",
  Bronze: "🌱",
};

export default async function Image({ searchParams }: { searchParams: { t?: string; g?: string; n?: string } }) {
  const time = searchParams.t || "0";
  const grade = searchParams.g || "Bronze";
  const nickname = searchParams.n || "";
  
  const color = gradeColors[grade] || gradeColors.Bronze;
  const emoji = gradeEmojis[grade] || gradeEmojis.Bronze;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0d1a 0%, #1a1625 50%, #0f0d1a 100%)",
          position: "relative",
        }}
      >
        {/* 배경 글로우 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />

        {/* 메인 컨텐츠 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* 로고 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <span style={{ fontSize: "32px" }}>⚡</span>
            <span style={{ fontSize: "28px", color: "#a78bfa", fontWeight: "bold" }}>
              반응속도 테스트
            </span>
          </div>

          {/* 닉네임 */}
          {nickname && (
            <div style={{ fontSize: "24px", color: "#9ca3af", marginBottom: "20px" }}>
              {nickname}님의 기록
            </div>
          )}

          {/* 이모지 */}
          <div style={{ fontSize: "120px", marginBottom: "20px" }}>{emoji}</div>

          {/* 등급 */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: color,
              marginBottom: "10px",
            }}
          >
            {grade}
          </div>

          {/* 시간 */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "96px", fontWeight: "bold", color: "white" }}>
              {time}
            </span>
            <span style={{ fontSize: "40px", color: "#a78bfa" }}>ms</span>
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: "40px",
              padding: "16px 40px",
              background: "linear-gradient(90deg, #9333ea, #06b6d4)",
              borderRadius: "16px",
              fontSize: "28px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            🎮 나도 테스트하기!
          </div>
        </div>

        {/* 푸터 */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "20px", color: "#6b7280" }}>Powered by</span>
          <span style={{ fontSize: "24px", color: "#a78bfa", fontWeight: "bold" }}>SLOX</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

