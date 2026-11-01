import PageShell from "../components/PageShell";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Ryan Cahalane.",
};

export default function Contact() {
  return (
    <PageShell>
      <section className="rc-wrap pt-14 sm:pt-20 max-w-2xl">
        <div className="rc-eyebrow mb-4">Contact</div>
        <h1 className="rc-serif text-5xl sm:text-6xl font-semibold tracking-tight">Get in touch</h1>
        <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--rc-muted)" }}>The easiest way to reach me is a short call. Pick a time that suits you, or send a note on LinkedIn.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="https://calendly.com/rdcahalane/1-on-1" target="_blank" rel="noopener noreferrer" className="rc-btn rc-btn-solid">Book a call</a>
          <a href="https://linkedin.com/in/ryancahalane" target="_blank" rel="noopener noreferrer" className="rc-btn rc-btn-ghost">LinkedIn →</a>
        </div>
      </section>
    </PageShell>
  );
}
