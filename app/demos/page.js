import Link from "next/link";
import PageShell from "../components/PageShell";
import { demos } from "../../lib/demos";

export const metadata = {
  title: "Demos",
  description: "Small interactive pages, each built to make one idea about operations easier to see.",
};

export default function Demos() {
  return (
    <PageShell>
      <section className="rc-wrap pt-14 sm:pt-20">
        <div className="rc-eyebrow mb-4">Demos</div>
        <h1 className="rc-serif text-5xl sm:text-6xl font-semibold tracking-tight">Interactive demos</h1>
        <p className="mt-5 text-lg max-w-2xl" style={{ color: "var(--rc-muted)" }}>Small, single-purpose pages that each try to make one idea easier to see. They run in your browser, and you can&apos;t break anything by playing with them.</p>

        <div className="mt-12 border-t" style={{ borderColor: "var(--rc-rule)" }}>
          {demos.map((d, i) => (
            <Link key={d.slug} href={`/demos/${d.slug}`} className="group grid md:grid-cols-[80px_1fr_auto] gap-x-8 gap-y-3 py-9 border-b items-start" style={{ borderColor: "var(--rc-rule)" }}>
              <span className="rc-serif text-4xl font-semibold" style={{ color: "var(--rc-copper)" }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="rc-eyebrow">{d.eyebrow}</div>
                <h2 className="rc-serif text-2xl sm:text-3xl font-semibold mt-2 leading-tight group-hover:text-[var(--rc-copper)] transition-colors">{d.title}</h2>
                <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: "var(--rc-muted)" }}>{d.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {d.tags.map((t) => <span key={t} className="text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: "var(--rc-rule)", color: "var(--rc-muted)" }}>{t}</span>)}
                </div>
              </div>
              <span className="font-semibold self-center whitespace-nowrap">Open demo <span className="rc-arrow inline-block">→</span></span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
