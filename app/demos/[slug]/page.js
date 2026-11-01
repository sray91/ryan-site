import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import DemoFrame from "./DemoFrame";
import { demos, demoBySlug, STABILITY_SRC } from "../../../lib/demos";

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const d = demoBySlug((await params).slug);
  return d ? { title: d.title, description: d.description } : {};
}

export default async function Demo({ params }) {
  const d = demoBySlug((await params).slug);
  if (!d) notFound();
  const full = `${STABILITY_SRC}#${d.view}`;
  return (
    <PageShell>
      <section className="rc-wrap pt-10 sm:pt-14">
        <Link href="/demos" className="text-sm font-semibold" style={{ color: "var(--rc-muted)" }}>← All demos</Link>
        <div className="rc-eyebrow mt-8" style={{ color: "var(--rc-copper)" }}>{d.eyebrow}</div>
        <h1 className="rc-serif text-4xl sm:text-5xl font-semibold tracking-tight mt-3 max-w-3xl leading-tight">{d.title}</h1>
        <p className="mt-4 text-lg max-w-2xl leading-relaxed" style={{ color: "var(--rc-muted)" }}>{d.description}</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <a href={full} target="_blank" rel="noopener noreferrer" className="rc-link">Open full screen</a>
        </div>
      </section>
      <section className="rc-wrap mt-8">
        <DemoFrame src={`${STABILITY_SRC}?embed&view=${d.view}`} title={d.title} />
      </section>
    </PageShell>
  );
}
