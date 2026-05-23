import Header from "../../components/Header";

export const metadata = {
  title: "Agent Advisory Board — Ryan Cahalane",
  description: "A multi-agent AI system that debates your ideas through a configurable board of advisors — CFO, CMO, CTO, and more. Open source.",
};

const proAdvisors = [
  { id: "cfo",  icon: "💰", name: "CFO",              color: "#16a34a", desc: "Unit economics, burn rate, ROI timelines. Skeptical of optimistic projections." },
  { id: "cmo",  icon: "📣", name: "CMO",              color: "#2563eb", desc: "Who's the customer and why do they buy? GTM sequencing, competitive position." },
  { id: "cto",  icon: "⚙️", name: "CTO",              color: "#7c3aed", desc: "Build vs buy, feasibility, what breaks at 10x scale." },
  { id: "coo",  icon: "🗂️", name: "COO",              color: "#d97706", desc: "Who owns this? By when? What's blocking us?" },
  { id: "cpo",  icon: "🎯", name: "CPO",              color: "#db2777", desc: "Are we solving a real pain? For whom? How do we know?" },
  { id: "gc",   icon: "⚖️", name: "General Counsel",  color: "#64748b", desc: "What's the legal exposure? What's missing from the contracts?" },
  { id: "ux",   icon: "🖱️", name: "UX Expert",        color: "#0891b2", desc: "Has anyone watched a real user try this? Where do they hesitate? What do they read first?" },
];

const funAdvisors = [
  { id: "grandma",  icon: "👵", name: "Grandma",              color: "#f59e0b", desc: "Warm, practical, completely unimpressed by buzzwords. Will real people actually use this?" },
  { id: "teenager", icon: "🙄", name: "Teenage Daughter",     color: "#ec4899", desc: "Brutally honest Gen Z radar for cringe. Is this actually cool or are you trying too hard?" },
  { id: "neighbor", icon: "😤", name: "Cranky Neighbor",      color: "#6b7280", desc: "Seen every scheme fail for 30 years. What's the obvious way this goes wrong?" },
  { id: "intern",   icon: "🚀", name: "The Intern",           color: "#06b6d4", desc: "Maximum enthusiasm, zero cynicism. What if we just automated the whole thing?" },
  { id: "shark",    icon: "🦈", name: "Shark Tank Investor",  color: "#ef4444", desc: "What are your numbers? No patience for vanity metrics or TAM hallucinations." },
];

const agents = [
  { icon: "🧠", name: "Claude CLI",   badge: "Max sub",  color: "#d97706", desc: "Anthropic's Claude via CLI. Uses your existing Max subscription — no per-query cost." },
  { icon: "✨", name: "Gemini CLI",   badge: "Free",     color: "#16a34a", desc: "Google Gemini via CLI. Authenticates with your Google account. No API key needed." },
  { icon: "💻", name: "Ollama",       badge: "Local",    color: "#7c3aed", desc: "Any local model (llama3.2, mistral, etc.) running on your machine. Free and private." },
  { icon: "🤖", name: "Codex CLI",   badge: "OAI sub",  color: "#2563eb", desc: "OpenAI Codex via desktop app. Requires an OpenAI subscription — no token charges." },
];

const steps = [
  { n: "01", title: "Clone + configure",  body: "Clone the repo, copy .env.example, set which agents you have. Takes 2 min." },
  { n: "02", title: "Choose your interface", body: "Discord bot for shared team use. Local markdown file if you just want a fast personal setup." },
  { n: "03", title: "npm start",          body: "One command. The coordinator starts polling. Bot comes online or inbox.md appears, ready." },
  { n: "04", title: "Ask anything",       body: "Type in Discord or inbox.md. Agents respond, debate, synthesize. Click Approve or type !approve." },
];

export default function AgentFactoryPage() {
  return (
    <div className="min-h-screen text-white" style={{ background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0d0d1f 100%)" }}>
      <Header />

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
          style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}>
          ⚙️ Open Source · github.com/rdcahalane/ai-skills
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6" style={{ letterSpacing: "-1.5px" }}>
          Agent Advisory Board
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-4" style={{ color: "#a1a1a6" }}>
          A multi-agent system that debates your ideas, stress-tests assumptions with a built-in adversary, and surfaces a verdict you can act on.
        </p>
        <p className="text-base max-w-xl mx-auto mb-10" style={{ color: "#6b7280" }}>
          Runs locally. Uses subscription CLI tools — Claude, Gemini, Codex — so there are no per-query API costs. Works in Discord or as a simple local markdown file.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/board"
            className="px-7 py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl text-lg"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 4px 20px rgba(16,185,129,0.35)" }}>
            Try the Web UI — no setup required ⚡
          </a>
        </div>
        <p className="text-sm mt-4 mb-6" style={{ color: "#4b5563" }}>No API key. No install. Runs on Groq free tier.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="https://github.com/rdcahalane/ai-skills/tree/main/agent-factory"
            target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.35)", color: "#a5b4fc" }}>
            View on GitHub →
          </a>
          <a href="https://github.com/rdcahalane/ai-skills/raw/main/agent-factory/agent-factory-setup.pdf"
            target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#9ca3af" }}>
            Setup Guide (PDF)
          </a>
        </div>
      </section>

      {/* ── Why ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-2xl p-8 md:p-10" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <h2 className="text-2xl font-bold mb-6">The problem with asking one AI</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🪞", title: "Echo chamber", body: "A single model reflects your framing back at you. It agrees with the premise, fills in your blind spots with optimism, and rarely surfaces the strongest objection." },
              { icon: "💸", title: "API costs add up", body: "Running multiple models via API for every question gets expensive fast. Most people end up asking one model anyway — or paying for subscriptions they barely use." },
              { icon: "🔀", title: "Context switching", body: "Switching between Claude, Gemini, and ChatGPT for different questions is friction. Most people just stick with one — even when another would be better." },
            ].map(c => (
              <div key={c.title}>
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-semibold mb-2 text-white">{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(99,102,241,0.2)" }}>
            <p className="text-base" style={{ color: "#c7d2fe" }}>
              <strong className="text-white">Agent Advisory Board routes your question to the right advisors automatically,</strong> forces one to argue against the consensus, then synthesizes — so the output already reflects the best case and the worst case. You get a verdict, not a draft.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-2">How a debate works</h2>
        <p className="mb-8 text-sm" style={{ color: "#6b7280" }}>Every debate automatically assigns one agent as Red Team — an adversarial role that attacks the dominant view, not to be contrarian for its own sake, but to surface real weaknesses before you act.</p>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {[
            { label: "You ask",          color: "#374151", text: "#e5e7eb" },
            { label: "→", plain: true },
            { label: "Agent A opens",    color: "#1e3a5f", text: "#93c5fd" },
            { label: "→", plain: true },
            { label: "Agent B 🔴 Red Team", color: "#3b0000", text: "#fca5a5" },
            { label: "→", plain: true },
            { label: "Agent A responds", color: "#1e3a5f", text: "#93c5fd" },
            { label: "→", plain: true },
            { label: "Agent B pushes back", color: "#3b0000", text: "#fca5a5" },
            { label: "→", plain: true },
            { label: "🔮 Synthesis",     color: "#1a1a2e", text: "#c4b5fd", border: "rgba(139,92,246,0.4)" },
            { label: "→", plain: true },
            { label: "✅ / ❌ You decide", color: "#052e16", text: "#86efac" },
          ].map((item, i) =>
            item.plain ? (
              <span key={i} style={{ color: "#4b5563", fontSize: 18, fontWeight: 700 }}>→</span>
            ) : (
              <span key={i} className="px-3 py-1.5 rounded-lg text-sm font-medium"
                style={{ background: item.color, color: item.text, border: item.border ? `1px solid ${item.border}` : "1px solid rgba(255,255,255,0.08)" }}>
                {item.label}
              </span>
            )
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-sm font-semibold mb-1" style={{ color: "#fca5a5" }}>🔴 Red Team role</div>
            <p className="text-sm" style={{ color: "#9ca3af" }}>One agent is told: attack the dominant view, find the worst-case scenario, refuse easy consensus. It's explicitly adversarial — stress-testing the position before you commit to it.</p>
          </div>
          <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-sm font-semibold mb-1" style={{ color: "#c4b5fd" }}>🔮 Synthesis</div>
            <p className="text-sm" style={{ color: "#9ca3af" }}>Claude synthesizes the full transcript — noting which Red Team objections were valid vs. weak. Points of agreement reached <em>under adversarial pressure</em> are flagged as stronger signal.</p>
          </div>
        </div>
      </section>

      {/* ── Board of Advisors ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-2">Your board of advisors</h2>
        <p className="mb-3 text-sm" style={{ color: "#6b7280" }}>
          Type <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "#a5b4fc" }}>!board: topic</code> and the system picks which advisors are relevant based on the topic. Or force specific ones: <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "#a5b4fc" }}>!board cfo cmo: topic</code>
        </p>
        <p className="mb-8 text-sm" style={{ color: "#6b7280" }}>Advisors also work in debates: <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "#a5b4fc" }}>!debate cfo vs cmo: Should we raise prices?</code></p>

        <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#4b5563" }}>Professional</div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {proAdvisors.map(a => (
            <div key={a.id} className="rounded-xl p-4 flex gap-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-2xl flex-shrink-0">{a.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-white">{a.name}</span>
                  <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${a.color}20`, color: a.color }}>!{a.id}</code>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#4b5563" }}>Just for fun</div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {funAdvisors.map(a => (
            <div key={a.id} className="rounded-xl p-4 flex gap-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-2xl flex-shrink-0">{a.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-white">{a.name}</span>
                  <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${a.color}20`, color: a.color }}>!{a.id}</code>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl px-5 py-3 text-xs" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#4b5563" }}>
          Add your own via <code style={{ color: "#a1a1a6" }}>ADVISORS_JSON</code> in .env — any persona, any lens, any voice.
        </div>
      </section>

      {/* ── Three interfaces ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-2">Three ways to use it</h2>
        <p className="mb-8 text-sm" style={{ color: "#6b7280" }}>Same engine, same agents, same debates. Pick whichever interface fits how you work.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-7" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}>
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-bold mb-2">Web UI</h3>
            <p className="text-sm mb-4" style={{ color: "#9ca3af" }}>No install. No API key. Open your browser and start a debate. Runs on Groq free tier — fast, free, and shareable.</p>
            <ul className="text-sm space-y-1.5 mb-5" style={{ color: "#6ee7b7" }}>
              <li>✓ No setup required</li>
              <li>✓ Works on any device</li>
              <li>✓ Full advisor board</li>
              <li>✓ Free forever</li>
            </ul>
            <a href="/board" className="inline-block text-xs font-semibold px-4 py-2 rounded-lg transition-all"
              style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)", color: "#6ee7b7" }}>
              Open Web UI →
            </a>
          </div>
          <div className="rounded-2xl p-7" style={{ background: "rgba(88,101,242,0.1)", border: "1px solid rgba(88,101,242,0.25)" }}>
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-lg font-bold mb-2">Discord bot</h3>
            <p className="text-sm mb-4" style={{ color: "#9ca3af" }}>Best for teams or if you want a persistent shared log. Bot joins your server, listens to a channel. Results appear as rich embeds with Approve / Reject / Ask Claude buttons.</p>
            <ul className="text-sm space-y-1.5" style={{ color: "#a5b4fc" }}>
              <li>✓ Shared with teammates</li>
              <li>✓ Rich embeds + interactive buttons</li>
              <li>✓ Works from phone</li>
              <li>✓ Webhook notifications per round</li>
            </ul>
          </div>
          <div className="rounded-2xl p-7" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-lg font-bold mb-2">Local markdown file</h3>
            <p className="text-sm mb-4" style={{ color: "#9ca3af" }}>No Discord account needed. Two files: <code className="text-xs px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)" }}>inbox.md</code> (you type here) and <code className="text-xs px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)" }}>conversation.md</code> (growing log). Open side-by-side in VS Code or Obsidian.</p>
            <ul className="text-sm space-y-1.5" style={{ color: "#86efac" }}>
              <li>✓ Zero account setup</li>
              <li>✓ Works offline</li>
              <li>✓ Searchable conversation history</li>
              <li>✓ !approve / !reject in the file</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 rounded-xl px-5 py-3 text-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#6b7280" }}>
          Set <code className="text-xs" style={{ color: "#a1a1a6" }}>TRANSPORT=both</code> in your .env to run Discord bot + local markdown simultaneously.
        </div>
      </section>

      {/* ── Agents ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-2">Agents — no API key costs</h2>
        <p className="mb-8 text-sm" style={{ color: "#6b7280" }}>Agent Advisory Board uses CLI tools that authenticate with your existing subscriptions. Configure only what you have — unconfigured agents are skipped automatically.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {agents.map(a => (
            <div key={a.name} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-3xl mb-3">{a.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-sm text-white">{a.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${a.color}22`, color: a.color, border: `1px solid ${a.color}44` }}>{a.badge}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{a.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs" style={{ color: "#4b5563" }}>Also supports: Ollama remote nodes (another machine on Tailscale), any llama.cpp server via BEAST_URL.</p>
      </section>

      {/* ── Command reference ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">Commands</h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(99,102,241,0.15)" }}>
                <th className="text-left px-5 py-3 font-semibold text-white">Command</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "#a1a1a6" }}>What it does</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["What is X?",                                        "Auto-routed to best available agent"],
                ["!claude: prompt",                                   "Force Claude CLI"],
                ["!gemini: prompt",                                   "Force Gemini CLI"],
                ["!board: topic",                                     "Auto-select relevant advisors by topic"],
                ["!board cfo cmo: topic",                            "Force specific advisors"],
                ["!board grandma shark: topic",                      "Mix professional + fun advisors"],
                ["!debate: topic",                                    "2-agent debate, default agents"],
                ["!debate cfo vs cmo: topic",                        "Advisor debate — CFO vs CMO personas"],
                ["!debate claude vs gemini --red gemini: topic",     "Gemini plays Red Team"],
                ["!debate claude vs gemini --socratic cfo: topic",   "CFO plays Socratic Examiner"],
                ["!approve (file) / ✅ button (Discord)",            "Execute the proposed action"],
                ["!reject (file) / ❌ button (Discord)",             "Dismiss — no action"],
                ["!ask (file) / 🔍 button (Discord)",                "Ask Claude to elaborate"],
              ].map(([cmd, desc], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <td className="px-5 py-2.5"><code className="text-xs" style={{ color: "#a5b4fc" }}>{cmd}</code></td>
                  <td className="px-5 py-2.5 text-xs" style={{ color: "#6b7280" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Get started ── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8">Get started</h2>
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {steps.map(s => (
            <div key={s.n} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-3xl font-bold mb-3" style={{ color: "#374151" }}>{s.n}</div>
              <h3 className="font-semibold text-sm text-white mb-1">{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-7" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <h3 className="font-bold text-lg mb-2">Interactive setup via Claude Code</h3>
          <p className="text-sm mb-5" style={{ color: "#9ca3af" }}>
            After cloning the repo, open Claude Code in the <code className="text-xs px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "#a5b4fc" }}>agent-factory/</code> directory and run the setup skill. Claude will ask which agents you have, which interface you want, walk through Discord bot creation step-by-step, set up your database, write your .env, and run the first test.
          </p>
          <pre className="rounded-xl p-4 text-sm mb-5 overflow-x-auto" style={{ background: "rgba(0,0,0,0.4)", color: "#e2e8f0", fontFamily: "monospace" }}>
{`git clone https://github.com/rdcahalane/ai-skills.git
cd ai-skills/agent-factory
claude          # opens Claude Code
# then type:  /setup-agent-factory`}
          </pre>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/rdcahalane/ai-skills/tree/main/agent-factory"
              target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}>
              View on GitHub
            </a>
            <a href="https://github.com/rdcahalane/ai-skills/raw/main/agent-factory/agent-factory-setup.pdf"
              target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#e5e7eb" }}>
              Download PDF Guide
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
