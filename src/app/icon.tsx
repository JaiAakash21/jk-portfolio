import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex",
          alignItems: "center", justifyContent: "center",
          background: "#0E0D0C", color: "#EDE8E0",
          fontSize: 34, fontWeight: 600, letterSpacing: -1,
          borderBottom: "5px solid #E8663C",
          fontFamily: "sans-serif",
        }}
      >
        JA
      </div>
    ),
    size,
  );
}
