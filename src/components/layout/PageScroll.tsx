import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const positions = new Map<string, number>();

function hashElement(hash: string) {
  if (hash.length < 2) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

function scrollToY(top: number) {
  window.scrollTo({ top, left: 0, behavior: "instant" });
}

export function PageScroll() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(location.pathname);
  const ignoreScroll = useRef(false);
  const first = useRef(true);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    if (first.current) {
      first.current = false;
      const target = hashElement(location.hash);
      if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
      return;
    }

    const pathChanged = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;

    ignoreScroll.current = true;
    const target = hashElement(location.hash);
    const saved = positions.get(location.key);
    if (navigationType === "POP" && pathChanged && typeof saved === "number") {
      scrollToY(saved);
    } else if (target) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    } else if (navigationType === "POP" && typeof saved === "number") {
      scrollToY(saved);
    } else {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      scrollToY(0);
    }
    ignoreScroll.current = false;
  }, [location, navigationType]);

  useEffect(() => {
    const key = location.key;
    if (navigationType !== "POP" && !location.hash && window.scrollY !== 0) {
      ignoreScroll.current = true;
      scrollToY(0);
      ignoreScroll.current = false;
    }
    positions.set(key, window.scrollY);

    const save = () => {
      if (!ignoreScroll.current) positions.set(key, window.scrollY);
    };
    const onClick = () => positions.set(key, window.scrollY);
    window.addEventListener("scroll", save, { passive: true });
    document.addEventListener("click", onClick, true);
    const frame = requestAnimationFrame(() => {
      if (navigationType === "POP" || location.hash || window.scrollY === 0) return;
      ignoreScroll.current = true;
      scrollToY(0);
      ignoreScroll.current = false;
      positions.set(key, 0);
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", save);
      document.removeEventListener("click", onClick, true);
    };
  }, [location.hash, location.key, navigationType]);

  return null;
}
