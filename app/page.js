import Image from "next/image";
import Link from "next/link";
import PageShell from "./components/PageShell";
import CausalGraph from "./components/CausalGraph";
import Reveal from "./components/Reveal";
import { client } from "../sanity/lib/client";
import { postsQuery } from "../sanity/lib/queries";
import { projects } from "../lib/projects";
import { demos, STABILITY_SRC } from "../lib/demos";
import { verticals, useCases } from "../lib/causal";

export const revalidate = 300;

async function getPosts() {
  try { return (await client.fetch(postsQuery)) || []; } catch (e) { console.error("posts", e); return []; }
}

const Arrow = () => <span className="rc-arrow inline-block" aria-hidden="true">→</span>;
const FACTS = [
  ["Now", "Managing Director, LNS Research, working with The COO Council"],
  ["Before", "President of Feyen Zylstra Industrial Tech, VP Digital Growth at Colfax, innovation at OSIsoft, a $200 million software business at Rockwell Automation, data management at GE"],
  ["Advising", "Bennit A.I., IIoT World, the Industry 4.0 Accelerator"],
  ["Schooling", "Electrical engineering at Purdue, systems engineering at Case Western"],
];
const HOW = [
  ["Draw the map", "Boxes for what matters, arrows for what drives what, sketched by the people who run the process."],
  ["Add the history", "Months of how the line actually ran. Arrows the history doesn't support come out."],
  ["Ask what if", "How much each cause matters, with a range, and what should happen if you change one."],
];

export default async function Home() {
  const posts = await getPosts();
  const latest = posts[0];
  const portfolio = [
    { href: "/blog", title: "Writing", count: posts.length ? `${posts.length} posts` : "Posts", body: "Operations, industrial software and the people stuck between them." },
    { href: "/demos", title: "Demos", count: `${demos.length} demos`, body: "Small interactive pages, each built to make one idea easier to see." },
    { href: `${STABILITY_SRC}#industries`, title: "Industry maps", count: `${verticals.length} industries · ${useCases.length} use cases`, body: "Causal maps for steel, pharma, beverage and six more, and six problems every plant has.", ext: true },
    { href: "/projects-home", title: "Projects", count: `${projects.length} projects`, body: "Tools, games and experiments, from an AI advisory board to a children's book." },
    { href: "https://www.lnsresearch.com/-the-coo-council", title: "The COO Council", count: "LNS Research", body: "A peer community of operations leaders working through industrial transformation.", ext: true },
    { href: "/about", title: "About", count: "Experience", body: "The longer version, from Goodyear and Deloitte through GE, Rockwell and OSIsoft to now." },
  ];

  return (
    <PageShell dark>
      <Reveal />

      {/* Who */}
      <section className="x-hero">
        <div className="x-grid" aria-hidden="true" />
        <div className="rc-wrap x-me">
          <div className="grid gap-6 content-center">
            <span className="x-chip">Manufacturing operations, industrial software and causal AI</span>
            <h1 className="x-display x-h1">Ryan Cahalane</h1>
            <p className="x-role">Managing Director, LNS Research</p>
            <p className="x-lede">I&apos;ve spent twenty-five years between the plant floor and the software sold to it, at GE, Rockwell Automation, OSIsoft and Colfax, and running an integration firm through a pandemic. These days a good share of my evenings go to causal AI, which is the part of machine learning that tries to say why a plant lost what it lost and what happens if you change something.</p>
            <p className="x-lede">This site is where that work, the writing and the occasional late-night experiment end up. Some of them even work. The views are my own, not those of LNS Research.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/blog" className="x-btn x-btn-1">Read the writing <Arrow /></Link>
              <Link href="#work" className="x-btn x-btn-2">See the causal work</Link>
              <a href="https://linkedin.com/in/ryancahalane" target="_blank" rel="noopener noreferrer" className="x-btn x-btn-2">LinkedIn ↗</a>
            </div>
          </div>
          <div className="x-portrait" data-rv>
            <Image src="/ryan-pfp.png" alt="Ryan Cahalane" fill sizes="(max-width: 940px) 80vw, 440px" className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="x-sec" id="about">
        <div className="rc-wrap x-about">
          <div className="grid gap-5 content-start" data-rv>
            <span className="x-eyebrow">About</span>
            <p className="x-bio">I started out as an electrical engineer, spent most of a decade running industrial software businesses, and then moved back toward operations, closer to the people who have to live with that software every shift. I hold a few patents in industrial data analytics, augmented reality and cloud systems, and I still believe that when someone says &ldquo;it can&apos;t be done,&rdquo; they&apos;re usually wrong.</p>
            <Link href="/about" className="x-link mt-2">The longer version ↗</Link>
          </div>
          <dl className="x-facts2" data-rv>
            {FACTS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </div>
      </section>

      {/* The work right now */}
      <section className="x-sec" id="work" style={{ scrollMarginTop: 70 }}>
        <div className="rc-wrap">
          <div className="x-feature x-panel" data-rv>
            <div className="grid gap-5 content-start">
              <span className="x-eyebrow">What I&apos;m working on</span>
              <h2 className="x-display" style={{ fontSize: "clamp(30px,3.4vw,46px)" }}>Causal maps for plants, so a loss shows up <em>before it lands.</em></h2>
              <p className="x-lede" style={{ fontSize: 17 }}>OEE, yield and on-time delivery all report a loss after the fact, and none of them say why. The conditions behind them move first, and the idea for catching them fits on a napkin:</p>
              <ol className="x-steps">
                {HOW.map(([t, b], i) => <li key={t}><span>0{i + 1}</span><div><b>{t}</b><p>{b}</p></div></li>)}
              </ol>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/demos/causal-101" className="x-btn x-btn-1">Try it on a sample line <Arrow /></Link>
                <Link href="/demos" className="x-btn x-btn-2">All the demos</Link>
              </div>
            </div>
            <div className="x-graph">
              <div className="flex items-center justify-between mb-2"><span className="x-eyebrow">One sample line, mapped</span><span className="x-tag">Sample</span></div>
              <CausalGraph />
            </div>
          </div>
          <div className="x-inds" data-rv>
            <span className="x-eyebrow">Mapped so far</span>
            <div className="row">
              {verticals.map((v) => (
                <a key={v.code} href={`${STABILITY_SRC}#${v.code}`} target="_blank" rel="noopener noreferrer" className="x-ind">
                  <Image src={`/verticals/${v.code}.jpg`} alt="" fill sizes="200px" className="object-cover" />
                  <span>{v.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Writing */}
      <section className="x-sec">
        <div className="rc-wrap">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-4">
            {latest ? (
              <Link href={`/blog/${latest.slug.current}`} className="x-panel p-8 flex flex-col group" data-rv>
                <span className="x-eyebrow">Latest writing{latest.publishedAt ? ` · ${new Date(latest.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}` : ""}</span>
                <h2 className="x-display mt-4" style={{ fontSize: "clamp(26px,2.8vw,36px)", letterSpacing: "-.035em" }}>{latest.title}</h2>
                {latest.excerpt && <p className="mt-4 leading-relaxed line-clamp-3" style={{ color: "var(--rc-muted)" }}>{latest.excerpt}</p>}
                <span className="mt-auto pt-6 font-semibold">Read it <Arrow /></span>
              </Link>
            ) : (
              <Link href="/blog" className="x-panel p-8 flex flex-col" data-rv>
                <span className="x-eyebrow">Writing</span>
                <h2 className="x-display mt-4" style={{ fontSize: 34 }}>All the writing</h2>
                <span className="mt-auto pt-6 font-semibold">Browse <Arrow /></span>
              </Link>
            )}
            <div className="x-panel p-8 grid gap-4 content-start" data-rv>
              <span className="x-eyebrow" style={{ color: "var(--rc-copper)" }}>The newsletter</span>
              <h2 className="x-display" style={{ fontSize: "clamp(26px,2.8vw,36px)", letterSpacing: "-.035em" }}>One note a week</h2>
              <p style={{ color: "var(--rc-muted)" }}>Operations, software and whatever I&apos;m building at the time. You can leave whenever you like, and I won&apos;t take it personally.</p>
              <iframe src="https://embeds.beehiiv.com/6578c794-7b30-4330-aa9c-f2d57e32a0a0?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" title="Subscribe to the newsletter" className="w-full" style={{ margin: 0, backgroundColor: "transparent" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="x-sec">
        <div className="rc-wrap">
          <div className="x-head" data-rv><span className="x-eyebrow">Explore</span></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.map((x, i) => (
              <Link key={x.title} href={x.href} target={x.ext ? "_blank" : undefined} rel={x.ext ? "noopener noreferrer" : undefined}
                className="x-panel group p-7 flex flex-col transition-colors hover:border-[var(--x-rule2)]" style={{ "--d": `${(i % 3) * 0.06}s`, minHeight: 200 }} data-rv>
                <div className="flex items-start justify-between gap-4"><h3 className="x-display x-h3">{x.title}</h3><Arrow /></div>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--rc-muted)" }}>{x.body}</p>
                <span className="x-link mt-auto pt-6" style={{ color: "var(--rc-copper)" }}>{x.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
