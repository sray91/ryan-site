import Link from "next/link";
import Monogram from "./Monogram";

export default function Footer() {
  return (
    <footer className="mt-24 border-t" style={{ borderColor: "var(--rc-rule)" }}>
      <div className="rc-wrap py-10 flex flex-col sm:flex-row gap-6 sm:items-center justify-between text-sm" style={{ color: "var(--rc-muted)" }}>
        <div className="flex items-center gap-3">
          <Monogram size={28} />
          <span>The views here are my own, not those of LNS Research.</span>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/blog" className="hover:text-[var(--rc-ink)]">Writing</Link>
          <Link href="/projects-home" className="hover:text-[var(--rc-ink)]">Projects</Link>
          <Link href="/demos" className="hover:text-[var(--rc-ink)]">Demos</Link>
          <Link href="/about" className="hover:text-[var(--rc-ink)]">About</Link>
          <a href="https://linkedin.com/in/ryancahalane" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--rc-ink)]">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
