import Image from "next/image";
import PageShell from "../components/PageShell";

export const metadata = {
  title: "About",
  description: "Ryan Cahalane: twenty-five years between the plant floor and the software sold to it.",
};

const EXPERIENCE = [
  { role: "Managing Director", org: "LNS Research", when: "Present", notes: ["Works with operations leaders through The COO Council."] },
  { role: "President", org: "Feyen Zylstra Industrial Tech", when: "2019–2022", notes: ["Grew a digital manufacturing consulting and integration firm by better than 30% a year through the pandemic.", "Expanded its national footprint and led it to a strategic sale."] },
  { role: "Vice President, Digital Growth", org: "Colfax Fluid Handling", when: "2017–2019", notes: ["Led digital transformation across the portfolio companies.", "Launched new digital offerings and cut IT and engineering cost."] },
  { role: "Director of Innovation", org: "OSIsoft", when: "2016–2017", notes: ["Found and incubated prototypes for what were then new cloud applications."] },
  { role: "Global Business Director, Software", org: "Rockwell Automation", when: "2014–2016", notes: ["Ran a $200 million software business with global P&L responsibility.", "Led the shift to SaaS and grew operating margins by 18%."] },
  { role: "Product General Manager, Data Management", org: "GE Intelligent Platforms", when: "2008–2013", notes: ["Turned a struggling industrial data management and analytics line into the portfolio's growth leader."] },
  { role: "Senior Consultant", org: "Deloitte Consulting", when: "", notes: ["Strategy, requirements and system design engagements for senior management."] },
  { role: "Earlier", org: "Goodyear, Brock Solutions, Activplant", when: "", notes: [] },
];

const ADVISORY = [
  ["Executive-in-Residence", "Industry 4.0 Accelerator"],
  ["Strategic Advisor", "Bennit A.I."],
  ["Board Advisor", "IIoT World"],
];

export default function About() {
  return (
    <PageShell>
      <section className="rc-wrap pt-14 sm:pt-20 grid lg:grid-cols-[1fr_300px] gap-12">
        <div>
          <div className="rc-eyebrow mb-4">About</div>
          <h1 className="rc-serif text-5xl sm:text-6xl font-semibold tracking-tight">Ryan Cahalane</h1>
          <div className="rc-prose mt-8 text-[18px] max-w-2xl" style={{ color: "#2b3640" }}>
            <p>I started out as an electrical engineer from Purdue, with early jobs at Goodyear, Brock Solutions and Activplant, and then a stretch at Deloitte Consulting. After that I spent most of a decade running software businesses: industrial data management at GE, a $200 million software portfolio at Rockwell Automation, and new products at OSIsoft.</p>
            <p>Then I moved back toward operations. I led digital growth at Colfax, and I ran Feyen Zylstra Industrial Tech through better than 30% growth a year during the pandemic and on to a sale. I hold several patents in industrial data analytics, augmented reality and cloud systems, and I still believe that when someone says &ldquo;it can&apos;t be done,&rdquo; they&apos;re usually wrong.</p>
            <p>Today I&apos;m a managing director at LNS Research, working with The COO Council, a peer group of operations leaders.</p>
          </div>
          <a href="https://linkedin.com/in/ryancahalane" target="_blank" rel="noopener noreferrer" className="rc-btn rc-btn-ghost mt-4">Connect on LinkedIn →</a>
        </div>
        <div className="relative w-56 h-56 lg:w-full lg:h-auto lg:aspect-square rounded-2xl overflow-hidden" style={{ background: "var(--rc-copper-soft)" }}>
          <Image src="/ryan-pfp.png" alt="Ryan Cahalane" fill sizes="300px" className="object-cover" priority />
        </div>
      </section>

      <section className="rc-wrap mt-20 grid lg:grid-cols-[1fr_300px] gap-12">
        <div>
          <div className="rc-eyebrow mb-6">Experience</div>
          <ol className="border-l pl-6 space-y-8" style={{ borderColor: "var(--rc-rule)" }}>
            {EXPERIENCE.map((e) => (
              <li key={e.org} className="relative">
                <span className="absolute -left-[31px] top-2 w-2.5 h-2.5 rounded-full" style={{ background: e.when === "Present" ? "var(--rc-copper)" : "var(--rc-ink)" }} />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="rc-serif text-xl font-semibold">{e.role}</h3>
                  {e.when && <span className="text-sm" style={{ color: "var(--rc-muted)" }}>{e.when}</span>}
                </div>
                <div className="font-medium" style={{ color: "var(--rc-copper)" }}>{e.org}</div>
                {e.notes.length > 0 && (
                  <ul className="mt-2 space-y-1 text-[15px] leading-relaxed" style={{ color: "var(--rc-muted)" }}>
                    {e.notes.map((n) => <li key={n}>{n}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
        <aside className="space-y-10">
          <div>
            <div className="rc-eyebrow mb-4">Advisory and boards</div>
            <ul className="space-y-3">
              {ADVISORY.map(([r, o]) => <li key={o}><div className="font-semibold">{o}</div><div className="text-sm" style={{ color: "var(--rc-muted)" }}>{r}</div></li>)}
            </ul>
          </div>
          <div>
            <div className="rc-eyebrow mb-4">Education</div>
            <ul className="space-y-3">
              <li><div className="font-semibold">Case Western Reserve University</div><div className="text-sm" style={{ color: "var(--rc-muted)" }}>M.S., Systems Engineering and Engineering Management</div></li>
              <li><div className="font-semibold">Purdue University</div><div className="text-sm" style={{ color: "var(--rc-muted)" }}>B.S., Electrical Engineering</div></li>
            </ul>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
