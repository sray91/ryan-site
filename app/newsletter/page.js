import PageShell from "../components/PageShell";

export const metadata = {
  title: "Newsletter",
  description: "A weekly note from Ryan Cahalane on operations, software and what he's building.",
};

export default function Newsletter() {
  return (
    <PageShell>
      <section className="rc-wrap pt-14 sm:pt-20 max-w-2xl">
        <div className="rc-eyebrow mb-4">The newsletter</div>
        <h1 className="rc-serif text-5xl sm:text-6xl font-semibold tracking-tight">One note a week</h1>
        <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--rc-muted)" }}>A note every week on operations, software and whatever I&apos;m building at the time. You can leave whenever you like, and I won&apos;t take it personally.</p>
        <iframe src="https://embeds.beehiiv.com/6578c794-7b30-4330-aa9c-f2d57e32a0a0" data-test-id="beehiiv-embed" title="Subscribe to the newsletter"
          width="100%" height="320" className="mt-8" style={{ margin: 0, border: 0, borderRadius: 8, backgroundColor: "transparent" }} />
      </section>
    </PageShell>
  );
}
