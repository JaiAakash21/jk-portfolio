"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Register GSAP plugins exactly once, on the client.
 * Not a hook — deliberately named `get*` so it can be called inside effects.
 */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** True when the visitor has asked for less motion. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * True on devices where a continuously rendering WebGL layer is a bad trade:
 * coarse pointers, few cores, or an explicit reduced-motion preference.
 */
export function wantsLightweightVisuals() {
  if (typeof window === "undefined") return true;
  if (prefersReducedMotion()) return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  const cores = navigator.hardwareConcurrency;
  if (typeof cores === "number" && cores > 0 && cores < 4) return true;
  return false;
}

export const EASE = "expo.out";
