import { ImageResponse } from "next/og";

// iOS home-screen icon. Rendered at 180×180, the size Safari asks for, with
// the ember rule kept proportional to the 64px favicon.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex",
          alignItems: "center", justifyContent: "center",
          background: "#0E0D0C", color: "#EDE8E0",
          fontSize: 96, fontWeight: 600, letterSpacing: -3,
          borderBottom: "14px solid #E8663C",
          fontFamily: "sans-serif",
        }}
      >
        JA
      </div>
    ),
    size,
  );
}
