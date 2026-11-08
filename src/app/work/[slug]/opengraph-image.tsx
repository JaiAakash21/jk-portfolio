import { ImageResponse } from "next/og";
import { getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project case study";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const INK = "#0E0D0C";
const BONE = "#EDE8E0";
const MUTED = "#9A938A";
const EMBER = "#E8663C";
const RULE = "rgba(237,232,224,0.14)";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          background: INK, color: BONE, padding: 72, position: "relative", fontFamily: "sans-serif",
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: 72 + i * 211, width: 1, background: RULE }} />
        ))}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: EMBER }} />

        <div style={{ display: "flex", gap: 24, fontSize: 20, letterSpacing: 3, color: MUTED, textTransform: "uppercase" }}>
          <span style={{ color: EMBER }}>{p?.index ?? "—"}</span>
          <span>{p?.kind ?? "Project"}</span>
          <span style={{ marginLeft: "auto" }}>{p?.year ?? ""}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ display: "flex", fontSize: 112, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>
            {p?.title ?? "Case study"}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: MUTED, maxWidth: 900, lineHeight: 1.38 }}>
            {p?.summary ?? ""}
          </div>
        </div>

        <div style={{ display: "flex", gap: 30, marginTop: 50, paddingTop: 26, borderTop: `1px solid ${RULE}`, fontSize: 20, letterSpacing: 2, color: MUTED, textTransform: "uppercase" }}>
          <span>{site.name}</span>
          <span>·</span>
          <span>{(p?.stack ?? []).slice(0, 4).join("  ·  ")}</span>
        </div>
      </div>
    ),
    size,
  );
}
