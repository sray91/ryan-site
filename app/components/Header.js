'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Monogram from "./Monogram";

const NAV = [
  { href: "/blog", label: "Writing" },
  { href: "/projects-home", label: "Projects" },
  { href: "/demos", label: "Demos" },
  { href: "/about", label: "About" },
];

// `variant` is accepted for older pages that still pass it; the header is the same everywhere now.
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname() || "/";
  const active = (href) => path === href || path.startsWith(href + "/");

  return (
    <header className="relative z-30 border-b" style={{ borderColor: "var(--rc-rule)", background: "var(--rc-paper)", color: "var(--rc-ink)" }}>
      <div className="rc-wrap flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Monogram size={36} />
          <span className="rc-serif text-xl sm:text-[22px] font-semibold tracking-tight">Ryan Cahalane</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[15px]" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-[var(--rc-copper)]"
              style={{ color: active(n.href) ? "var(--rc-copper)" : "var(--rc-ink)" }} aria-current={active(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <Link href="/newsletter" className="rc-btn rc-btn-solid !py-2 !px-4 !text-sm">Newsletter</Link>
        </nav>

        <button className="md:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden absolute top-full left-0 right-0 border-b shadow-lg" style={{ background: "var(--rc-paper)", borderColor: "var(--rc-rule)" }} aria-label="Main">
          <div className="rc-wrap flex flex-col py-3">
            {NAV.concat([{ href: "/newsletter", label: "Newsletter" }]).map((n) => (
              <Link key={n.href} href={n.href} className="py-3 border-b last:border-0 text-lg" style={{ borderColor: "var(--rc-rule)" }} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
