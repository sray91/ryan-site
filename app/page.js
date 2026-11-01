import Image from "next/image";
import Link from "next/link";
import PageShell from "./components/PageShell";
import { client } from "../sanity/lib/client";
import { postsQuery } from "../sanity/lib/queries";
import { projects } from "../lib/projects";
import { demos } from "../lib/demos";

export const revalidate = 300;

async function getPosts() {
  try { return (await client.fetch(postsQuery)) || []; } catch (e) { console.error("posts", e); return []; }
}

const Arrow = () => <span className="rc-arrow inline-block" aria-hidden="true">→</span>;

export default async function Home() {
  const posts = await getPosts();
  const latest = posts[0];
  const featured = demos[0];
  const explore = [
    { href: "/blog", title: "Writing", count: posts.length ? `${posts.length} posts` : "Posts", body: "Operations, industrial software and the people stuck between them." },
    { href: "/projects-home", title: "Projects", count: `${projects.length} projects`, body: "Tools, games and experiments, from an AI advisory board to a children's book." },
    { href: "/demos", title: "Demos", count: `${demos.length} demos`, body: "Small interactive pages, each built to make one idea easier to see." },
    { href: "https://www.lnsresearch.com/-the-coo-council", title: "The COO Council", count: "LNS Research", body: "A peer community of operations leaders working through industrial transformation.", ext: true },
  ];

  return (
    <PageShell>
      <section className="rc-wrap pt-14 sm:pt-20 pb-16 grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <div className="rc-eyebrow mb-5">Manufacturing operations and the software sold to them</div>
          <h1 className="rc-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]">Ryan Cahalane</h1>
          <p className="rc-serif text-xl sm:text-2xl mt-4" style={{ color: "var(--rc-copper)" }}>Managing Director, LNS Research</p>
          <div className="mt-7 text-[17px] leading-relaxed max-w-xl space-y-4" style={{ color: "#2b3640" }}>
            <p>I&apos;ve spent twenty-five years between the plant floor and the software sold to it, at GE, Rockwell Automation, OSIsoft and Colfax, and running an integration firm through a pandemic. These days I&apos;m a managing director at LNS Research, where I work with operations leaders through The COO Council.</p>
            <p>This site is where the writing, the side projects and the occasional late-night experiment end up. Some of them even work.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/blog" className="rc-btn rc-btn-solid">Read the writing</Link>
            <Link href="/demos" className="rc-btn rc-btn-ghost">Try the demos</Link>
            <a href="https://linkedin.com/in/ryancahalane" target="_blank" rel="noopener noreferrer" className="rc-btn rc-btn-ghost">LinkedIn <Arrow /></a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] aspect-square">
          {/* The monogram's loop, drawn large around the portrait */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
            <path d="M80.4 80.4A40.2 40.2 0 1 1 78 20.6" fill="none" stroke="var(--rc-copper)" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M82.3 23.6 81.5 15.9 74.9 20.3Z" fill="var(--rc-copper)" />
            <circle cx="88" cy="50" r="2.2" fill="var(--rc-ink)" />
          </svg>
          <div className="absolute inset-[13%] rounded-full overflow-hidden shadow-xl" style={{ background: "var(--rc-copper-soft)" }}>
            <Image src="/ryan-pfp.png" alt="Ryan Cahalane" fill sizes="(max-width: 1024px) 80vw, 400px" className="object-cover" priority />
          </div>
        </div>
      </section>

      <section className="rc-wrap">
        <div className="rc-rule pt-12 grid md:grid-cols-2 gap-6">
          <Link href={`/demos/${featured.slug}`} className="rc-card p-7 group flex flex-col">
            <div className="rc-eyebrow" style={{ color: "var(--rc-copper)" }}>New demo · {featured.eyebrow}</div>
            <h2 className="rc-serif text-2xl sm:text-3xl font-semibold mt-3 leading-tight">{featured.title}</h2>
            <p className="mt-3 leading-relaxed" style={{ color: "var(--rc-muted)" }}>{featured.description}</p>
            <span className="mt-auto pt-5 font-semibold">Open the demo <Arrow /></span>
          </Link>
          {latest ? (
            <Link href={`/blog/${latest.slug.current}`} className="rc-card p-7 group flex flex-col">
              <div className="rc-eyebrow">Latest writing{latest.publishedAt ? ` · ${new Date(latest.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}` : ""}</div>
              <h2 className="rc-serif text-2xl sm:text-3xl font-semibold mt-3 leading-tight">{latest.title}</h2>
              {latest.excerpt && <p className="mt-3 leading-relaxed line-clamp-3" style={{ color: "var(--rc-muted)" }}>{latest.excerpt}</p>}
              <span className="mt-auto pt-5 font-semibold">Read it <Arrow /></span>
            </Link>
          ) : (
            <Link href="/blog" className="rc-card p-7 group flex flex-col">
              <div className="rc-eyebrow">Writing</div>
              <h2 className="rc-serif text-2xl sm:text-3xl font-semibold mt-3">All the writing</h2>
              <span className="mt-auto pt-5 font-semibold">Browse <Arrow /></span>
            </Link>
          )}
        </div>
      </section>

      <section className="rc-wrap mt-20">
        <div className="rc-eyebrow mb-6">Explore</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden border" style={{ background: "var(--rc-rule)", borderColor: "var(--rc-rule)" }}>
          {explore.map((x) => (
            <Link key={x.title} href={x.href} target={x.ext ? "_blank" : undefined} rel={x.ext ? "noopener noreferrer" : undefined}
              className="group p-6 flex flex-col transition-colors hover:bg-white" style={{ background: "var(--rc-sheet)" }}>
              <h3 className="rc-serif text-2xl font-semibold">{x.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--rc-muted)" }}>{x.body}</p>
              <div className="mt-auto pt-6 flex items-center justify-between text-sm font-semibold">
                <span className="rc-eyebrow !tracking-[.12em]" style={{ color: "var(--rc-copper)" }}>{x.count}</span><Arrow />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rc-wrap mt-20">
        <div className="rounded-2xl px-6 sm:px-10 py-10 grid md:grid-cols-[1fr_1.1fr] gap-8 items-center" style={{ background: "var(--rc-ink)", color: "var(--rc-paper)" }}>
          <div>
            <div className="rc-eyebrow" style={{ color: "#c9b9a2" }}>The newsletter</div>
            <h2 className="rc-serif text-3xl sm:text-4xl font-semibold mt-3">One note a week</h2>
            <p className="mt-3 leading-relaxed" style={{ color: "#c8cfd4" }}>A note every week on operations, software and whatever I&apos;m building at the time. You can leave whenever you like, and I won&apos;t take it personally.</p>
          </div>
          <iframe src="https://embeds.beehiiv.com/6578c794-7b30-4330-aa9c-f2d57e32a0a0?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" title="Subscribe to the newsletter" className="w-full" style={{ margin: 0, backgroundColor: "transparent" }} />
        </div>
      </section>
    </PageShell>
  );
}
