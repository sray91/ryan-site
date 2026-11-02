'use client';

import { useEffect } from "react";

// Fades [data-rv] elements in as they scroll into view. The hidden starting state only applies once this
// has run (it adds .rx-js), so the page reads normally without JavaScript.
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-rv]");
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("rx-js");
    const io = new IntersectionObserver((list) => list.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => { io.disconnect(); document.documentElement.classList.remove("rx-js"); };
  }, []);
  return null;
}
