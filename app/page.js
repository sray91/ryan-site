import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import PageShell from "./components/PageShell";
import CausalGraph from "./components/CausalGraph";
import Reveal from "./components/Reveal";
import DemoFrame from "./demos/[slug]/DemoFrame";
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
const ST = { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", fill: "none" };
const HOW = [
  { t: "Draw the map", b: "Boxes for the things that matter, arrows for what drives what. The people who run the process sketch it, because data alone can't. Anything that matters but isn't measured goes on the map too, as a hidden factor, since that's the usual reason a confident answer turns out to be wrong.",
    pic: <svg viewBox="0 0 160 90"><path d="M40 24 72 44M40 66 72 48M92 46h30" {...ST} opacity=".45" /><path d="M116 40l7 6-7 6" {...ST} opacity=".45" /><path d="M80 10v22" {...ST} strokeDasharray="1 5" style={{ color: "var(--x-cap)" }} /><circle cx="30" cy="20" r="8" fill="currentColor" /><circle cx="30" cy="70" r="8" fill="currentColor" /><circle cx="82" cy="46" r="9" fill="currentColor" /><circle cx="80" cy="8" r="6" {...ST} style={{ color: "var(--x-cap)" }} /><circle cx="134" cy="46" r="9" fill="var(--x-loss)" /></svg> },
  { t: "Add the history", b: "Months of how the line actually ran: speeds, temperatures, crews, maintenance and lots, under every condition it has seen. Each arrow gets tested against that history, and the ones it doesn't support come out of the map.",
    pic: <svg viewBox="0 0 160 90">{[30, 44, 38, 52, 47, 60, 41, 55, 66, 50, 58, 70, 62, 48, 57].map((h, i) => <rect key={i} x={8 + i * 10} y={84 - h} width="6" height={h} rx="2" fill="currentColor" opacity={0.25 + (i % 5) * 0.12} />)}<path d="M8 40c20-10 34 6 52-4s30-14 48-2 28 4 44-6" {...ST} style={{ color: "var(--x-ctl)" }} /></svg> },
  { t: "Ask what if", b: "Put the two together and you get how much each cause really matters, with a range instead of one confident number, and what should happen if you change it. The next few weeks then check whether it did.",
    pic: <svg viewBox="0 0 160 90">{[["Line speed", 92, 18], ["Wear", 56, 14], ["Moisture", 28, 10]].map(([l, w, e], i) => <g key={l}><rect x="58" y={12 + i * 26} width={w} height="12" rx="3" fill={i ? "currentColor" : "var(--x-ctl)"} opacity={i ? 0.45 : 1} /><path d={`M${58 + w - e} ${18 + i * 26}h${e * 2}M${58 + w - e} ${13 + i * 26}v10M${58 + w + e} ${13 + i * 26}v10`} {...ST} strokeWidth="1.5" /><text x="52" y={22 + i * 26} textAnchor="end" fontSize="10" fill="currentColor" opacity=".7">{l}</text></g>)}</svg> },
];
const CAREER = ["GE", "Rockwell Automation", "OSIsoft", "Colfax", "LNS Research"];
const LADDER = [
  { rung: "Rung 1", name: "See", q: "What moved together?", body: "A dashboard, a trend line, and most of the machine learning sold to plants today. Useful, right up until someone acts on it.", c: "var(--x-loss)", n: 1 },
  { rung: "Rung 2", name: "Do", q: "What happens if we change it?", body: "Set a lever and follow it through the map, instead of hoping the correlation still holds once you touch it.", c: "var(--x-ctl)", n: 2 },
  { rung: "Rung 3", name: "Imagine", q: "What would have happened if we had?", body: "Replay last month with a different maintenance plan, same crews and same material, and count what it would have saved.", c: "var(--x-cap)", n: 3 },
];

export default async function Home() {
  const posts = await getPosts();
  const latest = posts[0];
  const explore = [
    { href: "/blog", title: "Writing", count: posts.length ? `${posts.length} posts` : "Posts", body: "Operations, industrial software and the people stuck between them." },
    { href: "/projects-home", title: "Projects", count: `${projects.length} projects`, body: "Tools, games and experiments, from an AI advisory board to a children's book." },
    { href: "/demos", title: "Demos", count: `${demos.length} demos`, body: "Small interactive pages, each built to make one idea easier to see." },
    { href: "https://www.lnsresearch.com/-the-coo-council", title: "The COO Council", count: "LNS Research", body: "A peer community of operations leaders working through industrial transformation.", ext: true },
  ];

  return (
    <PageShell dark>
      <Reveal />

      {/* Hero */}
      <section className="x-hero">
        <div className="x-grid" aria-hidden="true" />
        <div className="rc-wrap x-hero-in">
          <div className="grid gap-7">
            <div className="x-chip">Causal AI for manufacturing operations</div>
            <h1 className="x-display x-h1">See the loss coming, and know <em>what&apos;s causing it.</em></h1>
            <p className="x-lede">OEE, yield and on-time delivery all report a loss after it has landed, and none of them can tell you why. The conditions behind them move first, sometimes by weeks. I map the causes between the two, so a plant can see the drift, pick the lever that actually moves it, and check a month later whether the fix held.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/demos/causal-101" className="x-btn x-btn-1">Try it on a sample line <Arrow /></Link>
              <Link href="#industries" className="x-btn x-btn-2">Find your industry</Link>
            </div>
            <div className="x-byline">
              <div className="pic"><Image src="/ryan-pfp.png" alt="Ryan Cahalane" fill sizes="52px" className="object-cover" priority /></div>
              <div><b>Ryan Cahalane</b><span>Managing Director, LNS Research · twenty-five years between the plant floor and the software sold to it</span></div>
            </div>
          </div>

          <div className="x-graph" data-rv>
            <div className="flex items-center justify-between mb-2"><span className="x-eyebrow">One sample line, mapped</span><span className="x-tag">Sample</span></div>
            <CausalGraph />
            <div className="x-why">
              <div className="q">Why is scrap <i>up 1.6 points</i> this week?</div>
              <div className="chain"><span className="hot">Line speed set to 118</span>→<span className="hot">Temperature swing +0.9°C</span>→<span>Scrap</span></div>
              <div className="chain" style={{ fontSize: 12 }}>Line speed accounts for about 1.1 of those points, give or take 0.3. The crews didn&apos;t change, and the dashboard would still tell you faster shifts scrap less.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Career */}
      <div className="x-strip">
        <div className="rc-wrap in">
          <span className="x-eyebrow">Twenty-five years at</span>
          {CAREER.map((c) => <span key={c} className="co">{c}</span>)}
        </div>
      </div>

      {/* How it works, in three steps */}
      <section className="x-sec">
        <div className="rc-wrap">
          <div className="x-head" data-rv>
            <span className="x-eyebrow">How it works</span>
            <h2 className="x-display x-h2">A map, the plant&apos;s history, and <em>one question.</em></h2>
            <p className="x-lede">There&apos;s real math underneath, but the idea fits on a napkin, and it&apos;s a lot closer to how a good process engineer already thinks than to a chatbot.</p>
          </div>
          <ol className="x-how">
            {HOW.map((h, i) => (
              <li key={h.t} className="x-panel" style={{ "--d": `${i * 0.1}s` }} data-rv>
                <div className="pic" aria-hidden="true">{h.pic}</div>
                <span className="n">0{i + 1}</span>
                <h3 className="x-display x-h3">{h.t}</h3>
                <p>{h.b}</p>
              </li>
            ))}
          </ol>
          <p className="x-how-foot" data-rv>A dashboard, a machine-learning model or an LLM finds patterns in what already happened. A causal model is built to say what happens when you change something, and how sure it is about that.</p>
        </div>
      </section>

      {/* The ladder */}
      <section className="x-sec">
        <div className="rc-wrap">
          <div className="x-head" data-rv>
            <span className="x-eyebrow">Causal 101</span>
            <h2 className="x-display x-h2">Ice cream sales and drownings rise together <em>every summer.</em></h2>
            <p className="x-lede">Nobody bans ice cream, because hot weather drives both. Plants make the same mistake with numbers that are a lot harder to see through. A dashboard answers the first question below. The other two are the ones a plant manager actually asks.</p>
          </div>
          <div className="x-lad">
            {LADDER.map((l, i) => (
              <article key={l.name} className="x-panel" style={{ "--c": l.c, "--d": `${i * 0.1}s`, minHeight: 300 + i * 40 }} data-rv>
                <span className="rung">{l.rung}</span>
                <h3 className="x-display">{l.name}</h3>
                <div className="q">{l.q}</div>
                <p>{l.body}</p>
                <div className="bars" aria-hidden="true">{[1, 2, 3].map((n) => <i key={n} className={n <= l.n ? "on" : ""} style={{ height: `${n * 33}%` }} />)}</div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 p-6 rounded-2xl border border-dashed" style={{ borderColor: "var(--x-rule2)" }} data-rv>
            <p style={{ color: "var(--rc-muted)", maxWidth: "70ch" }}>Sixty shifts on one sample line, a factor the dashboard never recorded, and a maintenance plan you can replay. It takes about five minutes, and you can&apos;t break anything, which is more than I can say for most MES upgrades.</p>
            <Link href="/demos/causal-101" className="x-btn x-btn-1">Walk all three rungs <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* Live demo */}
      <section className="x-sec">
        <div className="rc-wrap">
          <div className="x-head" data-rv>
            <span className="x-eyebrow">Leading and lagging, live</span>
            <h2 className="x-display x-h2">Thirty days of a fryer heat exchanger <em>fouling.</em></h2>
            <p className="x-lede">Drag through the month. Approach temperature starts creeping on day four, the causal view flags it on day seven, and OEE barely moves until the fryer stops on day twenty-three.</p>
          </div>
          <div className="x-window" data-rv>
            <div className="bar"><i /><i /><i /><span>look-ahead · sample plant</span><a href={`${STABILITY_SRC}#ahead`} target="_blank" rel="noopener noreferrer" className="x-link">Full screen ↗</a></div>
            <DemoFrame src={`${STABILITY_SRC}?embed&theme=dark&view=ahead`} title="Why OEE can't see what's coming" dark />
          </div>
          <div className="x-facts">
            {[["Day 7", "A drift in approach temperature gets flagged, sixteen days before anything breaks."], ["Day 12", "Maintenance books the clean into the planned sanitation window."], ["Day 23", "This is when the fryer would have stopped. With the loop closed, it keeps frying."]].map(([b, s], i) => (
              <div key={b} className="x-panel" style={{ "--d": `${i * 0.1}s` }} data-rv><b>{b}</b><span>{s}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section className="x-sec" id="industries" style={{ scrollMarginTop: 70 }}>
        <div className="rc-wrap">
          <div className="x-head" data-rv>
            <span className="x-eyebrow">Nine industries</span>
            <h2 className="x-display x-h2">Making the plan looks different <em>in every industry.</em></h2>
            <p className="x-lede">A steel mill worries about molten metal and the heat-to-coil record behind every certificate. A pharma plant worries about its registered design space. The causal map has the same layers in both, but the conditions, the systems and the standards are different, so each industry gets its own map.</p>
          </div>
          <div className="x-vert">
            {verticals.map((v, i) => (
              <a key={v.code} href={`${STABILITY_SRC}#${v.code}`} target="_blank" rel="noopener noreferrer" className="x-vcard" style={{ "--c": v.color, "--d": `${(i % 3) * 0.08}s` }} data-rv>
                <div className="pic">
                  <Image src={`/verticals/${v.code}.jpg`} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1040px) 50vw, 600px" className="object-cover" />
                  <div className="nm"><small>{String(i + 1).padStart(2, "0")} / 09</small><span className="x-display" style={{ fontSize: "clamp(24px,2.2vw,30px)" }}>{v.name}</span></div>
                </div>
                <div className="bd">
                  <span className="out">{v.core}</span>
                  <p>{v.sub}</p>
                  <span className="x-link mt-2">Open the {v.name.toLowerCase()} map ↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="x-sec" id="use-cases">
        <div className="rc-wrap">
          <div className="x-head" data-rv>
            <span className="x-eyebrow">Six problems every plant has</span>
            <h2 className="x-display x-h2">Or start from the problem <em>instead.</em></h2>
            <p className="x-lede">Each one is told as a causal chain, from whatever pushes the line off course to the number that finally shows it, usually a week or two after you could have done something.</p>
          </div>
          <div className="x-uses">
            {useCases.map((u, i) => (
              <a key={u.slug} href={`${STABILITY_SRC}#${u.slug}`} target="_blank" rel="noopener noreferrer" className="x-panel x-ucard" style={{ "--c": u.color, "--d": `${(i % 3) * 0.08}s` }} data-rv>
                <div className="grid gap-2" style={{ position: "relative" }}>
                  <h3 className="x-display x-h3">{u.name}</h3>
                  <span className="tg">{u.tag}</span>
                </div>
                <div className="chain" style={{ position: "relative" }}>
                  <div className="who">What pushes it off course</div>
                  {u.bad.map((s, j) => <Fragment key={j}>{j > 0 && <i>→</i>}<span>{s}</span></Fragment>)}
                </div>
                <div className="fix" style={{ position: "relative" }}>{u.good[u.good.length - 1]}, once the loop is closed.</div>
                <span className="x-link" style={{ position: "relative" }}>Read the chain ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Value */}
      <section className="x-sec">
        <div className="rc-wrap x-value">
          <div className="grid gap-5" data-rv>
            <span className="x-eyebrow">Value</span>
            <h2 className="x-display x-h2">What it&apos;s worth, in money <em>three budgets own.</em></h2>
            <p className="x-lede">A plant that holds its conditions makes more margin, carries less inventory as a buffer, and finds capacity in lines it already owns. The calculator sizes all three. Every input starts as an example, so nobody has to admit their real scrap rate to a web page.</p>
            <div><Link href="/demos/value" className="x-btn x-btn-1">Size it with your own numbers <Arrow /></Link></div>
          </div>
          <div className="x-money">
            {[["01", "Annual margin", "Throughput, yield, maintenance, energy and the cost of quality, every year.", "var(--x-cap)"],
              ["02", "One-time working capital", "Inventory held only because the process can't be trusted, released once it can.", "var(--x-ctl)"],
              ["03", "Capital deferred or avoided", "The extra line nobody has to buy when the existing ones run at their own best day.", "var(--x-cond)"]].map(([n, b, s, c], i) => (
              <div key={n} className="x-panel" style={{ "--c": c, "--d": `${i * 0.1}s` }} data-rv><i>{n}</i><div><b>{b}</b><span>{s}</span></div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing and the rest */}
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
            <div className="x-panel p-8 grid gap-4 content-start" style={{ background: "linear-gradient(160deg, rgba(224,138,69,.12), var(--rc-sheet) 60%)" }} data-rv>
              <span className="x-eyebrow" style={{ color: "var(--rc-copper)" }}>The newsletter</span>
              <h2 className="x-display" style={{ fontSize: "clamp(26px,2.8vw,36px)", letterSpacing: "-.035em" }}>One note a week</h2>
              <p style={{ color: "var(--rc-muted)" }}>Operations, software and whatever I&apos;m building at the time. You can leave whenever you like, and I won&apos;t take it personally.</p>
              <iframe src="https://embeds.beehiiv.com/6578c794-7b30-4330-aa9c-f2d57e32a0a0?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" title="Subscribe to the newsletter" className="w-full" style={{ margin: 0, backgroundColor: "transparent" }} />
            </div>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {explore.map((x, i) => (
              <Link key={x.title} href={x.href} target={x.ext ? "_blank" : undefined} rel={x.ext ? "noopener noreferrer" : undefined}
                className="x-panel group p-6 flex flex-col transition-colors hover:border-[var(--x-rule2)]" style={{ "--d": `${i * 0.06}s` }} data-rv>
                <h3 className="x-display x-h3">{x.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--rc-muted)" }}>{x.body}</p>
                <div className="mt-auto pt-6 flex items-center justify-between text-sm font-semibold">
                  <span className="x-link" style={{ color: "var(--rc-copper)" }}>{x.count}</span><Arrow />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
