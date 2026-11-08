import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0E0D0C";
const BONE = "#EDE8E0";
const MUTED = "#9A938A";
const EMBER = "#E8663C";
const RULE = "rgba(237,232,224,0.14)";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          background: INK, color: BONE, padding: 72, position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* column rules — the site's structural signature */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: 72 + i * 211, width: 1, background: RULE }} />
        ))}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: EMBER }} />

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3, color: MUTED, textTransform: "uppercase" }}>
          <span>Portfolio</span>
          <span>jaiaakash.xyz</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ display: "flex", fontSize: 150, lineHeight: 1, letterSpacing: -4, fontWeight: 400 }}>
            Jai Aakash
            <span style={{ color: EMBER }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 34, fontSize: 32, color: BONE }}>
            {site.role}
          </div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 27, color: MUTED, maxWidth: 820, lineHeight: 1.35 }}>
            Offline-first storage, real-time state, and APIs that explain themselves.
          </div>
        </div>

        <div style={{ display: "flex", gap: 36, marginTop: 56, paddingTop: 26, borderTop: `1px solid ${RULE}`, fontSize: 20, letterSpacing: 2, color: MUTED, textTransform: "uppercase" }}>
          <span>Chennai, India</span>
          <span>·</span>
          <span>FastAPI</span>
          <span>·</span>
          <span>Next.js</span>
          <span>·</span>
          <span>PyTorch</span>
        </div>
      </div>
    ),
    size,
  );
}
