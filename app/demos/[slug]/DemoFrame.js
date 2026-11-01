'use client';

import { useEffect, useRef, useState } from "react";

// Frames one view of the stability build in embed mode; the page inside reports its height.
export default function DemoFrame({ src, title }) {
  const ref = useRef(null);
  const [h, setH] = useState(1100);
  useEffect(() => {
    const onMsg = (e) => {
      if (e.source === ref.current?.contentWindow && e.data && typeof e.data.sbdHeight === "number") setH(Math.max(600, e.data.sbdHeight + 8));
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);
  return <iframe ref={ref} src={src} title={title} className="w-full block rounded-xl border" style={{ height: h, borderColor: "var(--rc-rule)", background: "#eef1ef" }} />;
}
