"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { wantsLightweightVisuals } from "@/lib/motion";

/**
 * The hero's background field.
 *
 * Hand-written WebGL — one full-screen triangle and a ~40-line fragment
 * shader — rather than Three.js. Three.js would add roughly 150 kB gzipped
 * to ship a quad; this is a few hundred bytes of source and has no runtime
 * dependency. The brief asked not to trade performance for 3D, so the whole
 * layer is opt-out by default:
 *
 *   - never mounts under prefers-reduced-motion, coarse pointers, or <4 cores
 *   - renders at 0.55x device resolution, capped at DPR 1.6
 *   - pauses when the tab is hidden or the hero scrolls out of view
 *   - drops to a static CSS gradient if WebGL is unavailable
 *
 * It is decoration: the hero reads identically with it absent.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
#extension GL_OES_standard_derivatives : enable
precision mediump float;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;
uniform vec3  uBg;
uniform vec3  uInk;
uniform vec3  uAccent;
uniform float uGain;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 q  = uv;
  q.x *= uRes.x / uRes.y;

  float t = uTime * 0.016;

  // Gentle domain warp so the contours breathe rather than slide.
  vec2 warp = vec2(fbm(q * 1.5 + t), fbm(q * 1.5 - t + 4.7));
  float field = fbm(q * 3.1 + warp * 0.85 + vec2(0.0, t));

  // Pointer well — displaces the contours slightly, like pressure on a map.
  vec2 pm = uPointer;
  pm.x *= uRes.x / uRes.y;
  float well = 1.0 - smoothstep(0.0, 0.5, distance(q, pm));
  field += well * 0.045;

  // Iso-contours: thin lines at regular field intervals. Width is derived
  // from the screen-space gradient so the lines stay hairline at any DPR.
  float f = field * 17.0;
  float g = fwidth(f);
  float contour = 1.0 - smoothstep(0.0, g * 1.6, abs(fract(f) - 0.5));

  // A second, sparser set reads as major gridlines.
  float f2 = field * 4.25;
  float g2 = fwidth(f2);
  float major = 1.0 - smoothstep(0.0, g2 * 1.5, abs(fract(f2) - 0.5));

  vec3 col = uBg;
  col = mix(col, uInk,    contour * 0.085 * uGain);
  col = mix(col, uInk,    major   * 0.11  * uGain);
  col = mix(col, uAccent, major * well * 0.5 * uGain);

  // Vignette, then fade out toward the lower third so the text band is quiet
  // and the section boundary is clean.
  col *= 1.0 - 0.16 * pow(distance(uv, vec2(0.5)) * 1.25, 2.0);
  float fade = smoothstep(-0.05, 0.5, uv.y) * (1.0 - smoothstep(0.55, 1.0, uv.y) * 0.9);
  col = mix(uBg, col, clamp(fade, 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function readTheme() {
  const cs = getComputedStyle(document.documentElement);
  const toRgb = (v: string): [number, number, number] => {
    const h = v.trim().replace("#", "");
    if (h.length !== 6) return [0.05, 0.05, 0.05];
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255,
    ];
  };
  return {
    bg: toRgb(cs.getPropertyValue("--bg")),
    fg: toRgb(cs.getPropertyValue("--fg")),
    accent: toRgb(cs.getPropertyValue("--accent")),
  };
}

const subscribeNoop = () => () => {};
const getEnabled = () => !wantsLightweightVisuals();
const getEnabledServer = () => false;

export default function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);
  // The capability check reads media queries and hardware hints that do not
  // exist during prerender, so it is client-only external state. The server
  // snapshot is `false`, which is also the correct default: no canvas unless
  // the device has been shown to want one.
  const enabled = useSyncExternalStore(subscribeNoop, getEnabled, getEnabledServer);

  useEffect(() => {
    if (!enabled) return;
    const canvas = ref.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    }) ?? null) as WebGLRenderingContext | null;
    if (!gl) return;

    // fwidth() is an OES_standard_derivatives function on WebGL1.
    const hasDerivatives = Boolean(gl.getExtension("OES_standard_derivatives"));
    if (!hasDerivatives) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(prog, "uRes"),
      time: gl.getUniformLocation(prog, "uTime"),
      pointer: gl.getUniformLocation(prog, "uPointer"),
      bg: gl.getUniformLocation(prog, "uBg"),
      ink: gl.getUniformLocation(prog, "uInk"),
      accent: gl.getUniformLocation(prog, "uAccent"),
      gain: gl.getUniformLocation(prog, "uGain"),
    };

    let theme = readTheme();
    const applyTheme = () => {
      theme = readTheme();
      gl.uniform3fv(u.bg, theme.bg);
      gl.uniform3fv(u.ink, theme.fg);
      gl.uniform3fv(u.accent, theme.accent);
      // The field must stay near-invisible on the light ground, where any
      // tint reads as a stain rather than structure.
      const light = document.documentElement.getAttribute("data-theme") === "light";
      gl.uniform1f(u.gain, light ? 0.5 : 1.0);
    };
    applyTheme();

    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6) * 0.55;
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(u.res, w, h);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer target is eased toward, so the well trails rather than snaps.
    const target = { x: 0.5, y: 0.55 };
    const cur = { x: 0.5, y: 0.55 };
    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let running = true;
    const start = performance.now();

    const frame = (now: number) => {
      if (!running) return;
      cur.x += (target.x - cur.x) * 0.045;
      cur.y += (target.y - cur.y) * 0.045;
      gl.uniform1f(u.time, (now - start) / 1000);
      gl.uniform2f(u.pointer, cur.x, cur.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };

    const setRunning = (next: boolean) => {
      if (next === running) return;
      running = next;
      if (next) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };

    // Stop rendering the moment the hero leaves the viewport or the tab hides.
    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting && !document.hidden),
      { threshold: 0 },
    );
    io.observe(canvas);
    const onVis = () => setRunning(!document.hidden && canvas.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", onVis);

    canvas.style.opacity = "1";
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 size-full opacity-0 transition-opacity duration-1000"
    />
  );
}
