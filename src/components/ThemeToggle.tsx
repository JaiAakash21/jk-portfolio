"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/**
 * The current theme lives on `document.documentElement`, written by the
 * blocking script in ThemeScript before first paint. That makes it external
 * state, so it is read through useSyncExternalStore rather than mirrored into
 * component state in an effect: the server snapshot is used for hydration and
 * the client snapshot takes over immediately, with no mismatch and no flash.
 */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

// Dark is the documented default, and matches what ThemeScript falls back to.
const getServerSnapshot = (): Theme => "dark";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLight = theme === "light";

  const toggle = () => {
    const next: Theme = isLight ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the theme still applies for this visit.
    }
  };

  const label = `Switch to ${isLight ? "dark" : "light"} theme`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid size-9 place-items-center rounded-full border border-rule text-fg-muted transition-colors hover:border-rule-strong hover:text-fg ${className}`}
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="3.4" fill="currentColor" opacity={isLight ? 1 : 0} />
        <path
          d="M8 1.6v1.8M8 12.6v1.8M1.6 8h1.8M12.6 8h1.8M3.5 3.5l1.3 1.3M11.2 11.2l1.3 1.3M12.5 3.5l-1.3 1.3M4.8 11.2l-1.3 1.3"
          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
          opacity={isLight ? 1 : 0}
        />
        <path
          d="M13 9.6A5.6 5.6 0 0 1 6.4 3a5.6 5.6 0 1 0 6.6 6.6Z"
          fill="currentColor"
          opacity={isLight ? 0 : 1}
        />
      </svg>
    </button>
  );
}
