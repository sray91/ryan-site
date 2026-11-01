import Image from "next/image";
import PageShell from "../components/PageShell";
import { projects } from "../../lib/projects";

export const metadata = {
  title: "Projects",
  description: "Side projects, tools and experiments Ryan Cahalane has built.",
};

export default function Projects() {
  return (
    <PageShell>
      <section className="rc-wrap pt-14 sm:pt-20">
        <div className="rc-eyebrow mb-4">Projects</div>
        <h1 className="rc-serif text-5xl sm:text-6xl font-semibold tracking-tight">Things I&apos;ve built</h1>
        <p className="mt-5 text-lg max-w-2xl" style={{ color: "var(--rc-muted)" }}>Mostly after hours, a few of them with friends. Some are serious, and one is about bees.</p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => {
            const ext = p.href.startsWith("http");
            return (
              <a key={p.href} href={p.href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined} className="rc-card group overflow-hidden flex flex-col">
                <div className="relative h-44 border-b" style={{ borderColor: "var(--rc-rule)" }}>
                  {p.screenshot ? (
                    <Image src={p.screenshot} alt="" fill sizes="(max-width: 640px) 100vw, 360px" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.placeholder.from}, ${p.placeholder.to})` }}>
                      <span className="rc-serif text-4xl font-semibold" style={{ color: p.placeholder.accent }}>{p.label || p.title}</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="rc-serif text-2xl font-semibold leading-tight">{p.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--rc-muted)" }}>{p.description}</p>
                  <span className="mt-auto pt-5 text-sm font-semibold">{ext ? "Visit" : "Open"} <span className="rc-arrow inline-block">→</span></span>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
