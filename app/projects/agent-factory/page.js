import Header from "../../components/Header";

export const metadata = {
  title: "Agent Factory — Ryan Cahalane",
  description: "An open-source multi-agent Discord bot that routes questions to free local models first, runs structured debates with a Red Team, maintains conversation memory, and blocks prompt injection. Built to minimize API spend.",
};

const proAdvisors = [
  { id: "cfo",  icon: "💰", name: "CFO",              color: "#16a34a", desc: "Unit economics, burn rate, ROI timelines. Skeptical of optimistic projections." },
  { id: "cmo",  icon: "📣", name: "CMO",              color: "#2563eb", desc: "Who's the customer and why do they buy? GTM sequencing, competitive position." },
  { id: "cto",  icon: "⚙️", name: "CTO",              color: "#7c3aed", desc: "Build vs buy, feasibility, what breaks at 10x scale." },
  { id: "coo",  icon: "🗂️", name: "COO",              color: "#d97706", desc: "Who owns this? By when? What's blocking us?" },
  { id: "cpo",  icon: "🎯", name: "CPO",              color: "#db2777", desc: "Are we solving a real pain? For whom? How do we know?" },
  { id: "gc",   icon: "⚖️", name: "General Counsel",  color: "#64748b", desc: "What's the legal exposure? What's missing from the contracts?" },
  { id: "ux",   icon: "🖱️", name: "UX Expert",        color: "#0891b2", desc: "Has anyone watched a real user try this? Where do they hesitate?" },
];

const funAdvisors = [
  { id: "grandma",  icon: "👵", name: "Grandma",              color: "#f59e0b", desc: "Warm, practical, completely unimpressed by buzzwords. Will real people actually use this?" },
  { id: "teenager", icon: "🙄", name: "Teenage Daughter",     color: "#ec4899", desc: "Brutally honest Gen Z radar for cringe. Is this actually cool or are you trying too hard?" },
  { id: "neighbor", icon: "😤", name: "Cranky Neighbor",      color: "#6b7280", desc: "Seen every scheme fail for 30 years. What's the obvious way this goes wrong?" },
  { id: "intern",   icon: "🚀", name: "The Intern",           color: "#06b6d4", desc: "Maximum enthusiasm, zero cynicism. What if we just automated the whole thing?" },
  { id: "shark",    icon: "🦈", name: "Shark Tank Investor",  color: "#ef4444", desc: "What are your numbers? No patience for vanity metrics or TAM hallucinations." },
];

const agents = [
  { icon: "🖥️", name: "Local inference (llama.cpp / Ollama)", badge: "Free",    color: "#16a34a", desc: "Any machine running llama.cpp or Ollama — same machine, another on your LAN, or a remote box via Tailscale. Handles most questions at $0/query. Never leaves your network." },
  { icon: "🧠", name: "Claude (API)",      badge: "API key", color: "#d97706", desc: "Anthropic's Claude via API. Used for complex reasoning, long context, injection-suspicious prompts, non-English input, and deep analysis." },
  { icon: "✨", name: "Gemini CLI",        badge: "Free",    color: "#2563eb", desc: "Google Gemini via CLI. Auth with your Google account. No separate API key needed." },
  { icon: "⌨️", name: "Codex CLI",        badge: "OAI sub", color: "#7c3aed", desc: "OpenAI Codex via desktop app. Code-focused tasks. Requires an OpenAI subscription." },
  { icon: "🛶", name: "Second local node (Ollama)", badge: "Free",   color: "#16a34a", desc: "A dedicated box on your LAN/Tailscale running a distinct local model. Gives multi-agent debates genuine model diversity at $0/query." },
  { icon: "🌙", name: "Kimi (OpenRouter)",  badge: "Paid",    color: "#8b5cf6", desc: "Optional frontier-class debater via OpenRouter. Adds a strong independent voice when you want it; everything else stays free." },
];

const newFeatures = [
  {
    icon: "🛡️",
    title: "Prompt injection detection",
    color: "#ef4444",
    items: [
      "8 regex patterns covering DAN mode, instruction override, credential extraction",
      "Detected prompts force-routed to Claude regardless of per-channel routing config",
      "Beast system prompt establishes \"AgentFactory\" persona — resists identity confusion and mode-switching requests",
      "Nested in coordinator so it applies to all transports, not just Discord",
    ],
  },
  {
    icon: "🧠",
    title: "Conversation memory",
    color: "#a855f7",
    items: [
      "History injected into every task — last 8 turns, user rules, and learned lessons",
      "Fast follow-up fix: supplements file history with recent DB completions so multi-turn convos work even within seconds",
      "!teach saves behavior rules (\"always be concise\") that persist across sessions",
      "Outcome tracking: !outcome records what actually happened after board decisions",
    ],
  },
  {
    icon: "🧭",
    title: "Smart routing — free first",
    color: "#10b981",
    items: [
      "Local model (llama.cpp/Ollama) handles brainstorms, ideation, simple Q&A — no config needed",
      "Claude only for: URLs, long context (>2,500 chars), deep analysis verbs, non-English input",
      "No local model configured? Everything routes to Claude automatically — no code changes needed",
      "Per-channel model_override: enforce Claude-only on sensitive channels via env var",
    ],
  },
  {
    icon: "☠️",
    title: "History poisoning prevention",
    color: "#f59e0b",
    items: [
      "Only entries stamped source:\"coordinator\" are injected into prompts",
      "Externally written or test-seeded entries silently excluded",
      "Confirmed by adversarial test suite — blocks crafted injection via conversation file",
      "Prompt cache deduplicates identical prompts within 60s to save API cost",
    ],
  },
  {
    icon: "🎭",
    title: "Multi-model debate panel",
    color: "#6366f1",
    items: [
      "!debate all spans up to six distinct models — Claude, two+ local nodes, Gemini, Codex, and (optionally) Kimi — so positions come from genuinely different reasoning, not one model arguing with itself",
      "Resilient: if any agent is unavailable (auth, offline, timeout) it's skipped with a one-line note and the debate continues — one bad agent never kills the session",
      "!board all convenes the full advisor panel (CFO, CMO, CTO, COO, GC, CPO, UX + the fun ones); a token budget caps cost on large panels",
      "Readable rounds: full positions rendered cleanly (no truncated clips, no runaway markdown headers)",
    ],
  },
];

const steps = [
  { n: "01", title: "Clone + configure",  body: "Clone the repo, copy .env.example, add DISCORD_BOT_TOKEN and DATABASE_URL. Add BEAST_URL if you have a local inference server." },
  { n: "02", title: "Set up Postgres",    body: "Run npm run migrate. Creates agent_tasks, board_sessions, board_outcomes, board_inbox tables plus pg-boss schema." },
  { n: "03", title: "npm run dev",        body: "Starts coordinator + Discord bot. Startup validation prints which agents are reachable. Beast + Claude is all you need for full capability." },
  { n: "04", title: "Ask anything",       body: "Type in Discord. Simple questions go to Beast (free). Complex ones escalate to Claude. Board sessions produce a verdict with Approve / Reject / Ask Claude buttons." },
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
          Agent Factory
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-4" style={{ color: "#a1a1a6" }}>
          A multi-agent Discord bot that routes your messages to free local models first, runs structured debates with a Red Team, and maintains memory across sessions.
        </p>
        <p className="text-base max-w-2xl mx-auto mb-10" style={{ color: "#6b7280" }}>
          Most questions never leave your machine. Brainstorms, ideation, quick answers — handled by a local model (llama.cpp or Ollama) at $0/query. Claude steps in only when the task actually needs it: complex reasoning, long context, non-English input, or a prompt that looks like an injection attempt. No local model? It falls back to Claude automatically.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <a href="/board"
            className="px-7 py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl text-lg"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 4px 20px rgba(16,185,129,0.35)" }}>
            Try the Web UI — no setup required ⚡
          </a>
          <a href="https://github.com/rdcahalane/ai-skills/tree/main/agent-factory"
            target="_blank" rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 text-lg"
            style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.35)", color: "#a5b4fc" }}>
            View on GitHub →
          </a>
        </div>
        <p className="text-sm" style={{ color: "#4b5563" }}>93 adversarial tests · 72 integration tests · all passing</p>
      </section>

      {/* ── What's in it ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-2">What's in it</h2>
        <p className="mb-8 text-sm" style={{ color: "#6b7280" }}>Built across six months of daily use. These are the features that turned it from a demo into something I actually rely on.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {newFeatures.map(f => (
            <div key={f.title} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{f.icon}</span>
                <h3 className="font-semibold text-white">{f.title}</h3>
              </div>
              <ul className="space-y-2">
                {f.items.map((item, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: "#9ca3af" }}>
                    <span style={{ color: f.color, flexShrink: 0 }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Routing ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-2xl p-8 md:p-10" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <h2 className="text-2xl font-bold mb-2">Free by default</h2>
          <p className="text-sm mb-6" style={{ color: "#6b7280" }}>The routing engine sends every task to the cheapest capable agent. A local model wins unless the task specifically needs Claude.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#10b981" }}>→ Local model (free)</div>
              <ul className="space-y-1.5 text-sm" style={{ color: "#9ca3af" }}>
                {["Brainstorms, ideation, give me ideas", "Simple questions, math, quick lookups", "Code fixes where you paste the code", "Summarize, explain, suggest, recommend", "Write N ideas, plan X, improve Y"].map((item, i) => (
                  <li key={i} className="flex gap-2"><span style={{ color: "#10b981" }}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#f59e0b" }}>→ Claude (escalated)</div>
              <ul className="space-y-1.5 text-sm" style={{ color: "#9ca3af" }}>
                {["Prompts containing a URL", "Long context (>2,500 chars)", "analyze / compare / evaluate / diagnose", "Non-English / non-Latin script", "Injection-pattern detected prompts"].map((item, i) => (
                  <li key={i} className="flex gap-2"><span style={{ color: "#f59e0b" }}>→</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-xs mt-6 pt-4" style={{ borderTop: "1px solid rgba(16,185,129,0.15)", color: "#4b5563" }}>
            No local model? Set only <code style={{ color: "#6ee7b7" }}>ANTHROPIC_API_KEY</code> and everything routes to Claude. Local model is optional — the system degrades gracefully. Set <code style={{ color: "#6ee7b7" }}>CHANNEL_CONFIG_JSON</code> to enforce Claude-only on specific channels.
          </p>
        </div>
      </section>

      {/* ── Local inference setup ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-2">Setting up a local model</h2>
        <p className="mb-6 text-sm" style={{ color: "#6b7280" }}>
          The local inference option routes cheap tasks to a model running on your own hardware — no API cost, no data leaving your network. Three setups work. Pick the one that matches your situation.
        </p>
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {[
            {
              icon: "💻",
              title: "Same machine (Ollama)",
              badge: "Easiest",
              badgeColor: "#16a34a",
              steps: [
                "Install Ollama from ollama.com",
                "Run: ollama pull llama3.2",
                "Set BEAST_URL=http://localhost:11434 in .env",
                "Set BEAST_MODEL=llama3.2",
              ],
              note: "Ollama exposes an OpenAI-compatible API on port 11434. Works with any model in the Ollama library.",
            },
            {
              icon: "🖥️",
              title: "Second machine (llama.cpp)",
              badge: "Best quality",
              badgeColor: "#2563eb",
              steps: [
                "Download llama.cpp from github.com/ggerganov/llama.cpp",
                "Download a GGUF model (e.g. Llama-3-8B-Instruct.Q4_K_M.gguf)",
                "Start: llama-server -m model.gguf --port 8081",
                "Set BEAST_URL=http://machine-ip:8081 in .env",
              ],
              note: "llama.cpp's server exposes an OpenAI-compatible /v1/chat/completions endpoint. Runs on Windows, Mac, Linux. GPU optional — CPU works fine for 7-8B models.",
            },
            {
              icon: "☁️",
              title: "No local model",
              badge: "Claude only",
              badgeColor: "#6b7280",
              steps: [
                "Set ANTHROPIC_API_KEY in .env",
                "Leave BEAST_URL unset",
                "Everything routes to Claude automatically",
                "Works perfectly — just not free",
              ],
              note: "If BEAST_URL is not set or the server is unreachable at startup, the bot falls back to Claude for all tasks. No config change needed.",
            },
          ].map(opt => (
            <div key={opt.title} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{opt.icon}</span>
                <div>
                  <div className="font-semibold text-sm text-white">{opt.title}</div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${opt.badgeColor}22`, color: opt.badgeColor, border: `1px solid ${opt.badgeColor}44` }}>{opt.badge}</span>
                </div>
              </div>
              <ol className="space-y-1.5 mb-3">
                {opt.steps.map((s, i) => (
                  <li key={i} className="text-xs flex gap-2" style={{ color: "#9ca3af" }}>
                    <span style={{ color: "#4b5563", flexShrink: 0 }}>{i + 1}.</span>{s}
                  </li>
                ))}
              </ol>
              <p className="text-xs leading-relaxed" style={{ color: "#4b5563", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.5rem" }}>{opt.note}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl px-5 py-3 text-xs" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#4b5563" }}>
          Both Ollama and llama.cpp expose an OpenAI-compatible API. The bot sends identical requests to both — only the URL and port differ. Any model that fits in your RAM works. 7B–13B parameter models at Q4 quantization are a good starting point (4–8 GB RAM required).
        </div>
      </section>

      {/* ── Debate ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-2">How a debate works</h2>
        <p className="mb-8 text-sm" style={{ color: "#6b7280" }}>Every debate automatically assigns one agent as Red Team — explicitly adversarial, tasked with attacking the dominant view before you commit to it.</p>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {[
            { label: "You ask",             color: "#374151", text: "#e5e7eb" },
            { label: "→", plain: true },
            { label: "Agent A opens",       color: "#1e3a5f", text: "#93c5fd" },
            { label: "→", plain: true },
            { label: "Agent B 🔴 Red Team", color: "#3b0000", text: "#fca5a5" },
            { label: "→", plain: true },
            { label: "Agent A responds",    color: "#1e3a5f", text: "#93c5fd" },
            { label: "→", plain: true },
            { label: "Agent B pushes back", color: "#3b0000", text: "#fca5a5" },
            { label: "→", plain: true },
            { label: "🔮 Synthesis",        color: "#1a1a2e", text: "#c4b5fd", border: "rgba(139,92,246,0.4)" },
            { label: "→", plain: true },
            { label: "✅ / ❌ You decide",  color: "#052e16", text: "#86efac" },
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
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-sm font-semibold mb-1" style={{ color: "#fca5a5" }}>🔴 Red Team role</div>
            <p className="text-sm" style={{ color: "#9ca3af" }}>One agent is told: attack the dominant view, find the worst-case scenario, refuse easy consensus. Stress-tests the position before you commit.</p>
          </div>
          <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-sm font-semibold mb-1" style={{ color: "#c4b5fd" }}>🔮 Synthesis</div>
            <p className="text-sm" style={{ color: "#9ca3af" }}>Claude synthesizes the full transcript, flagging which Red Team objections were valid vs. weak. Agreement reached under adversarial pressure = stronger signal.</p>
          </div>
        </div>
      </section>

      {/* ── Board of Advisors ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-2">Board of advisors</h2>
        <p className="mb-3 text-sm" style={{ color: "#6b7280" }}>
          <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "#a5b4fc" }}>!board: topic</code> auto-selects relevant advisors by topic. Or pick specific ones: <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "#a5b4fc" }}>!board cfo cmo: topic</code>. Preview the lineup without running: <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "#a5b4fc" }}>!board plan: topic</code>
        </p>
        <p className="mb-8 text-sm" style={{ color: "#6b7280" }}>Sessions are stored. Record what actually happened with <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "#a5b4fc" }}>!outcome [id] [notes]</code>. See your track record with <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "#a5b4fc" }}>!backtest</code>.</p>
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
            <p className="text-sm mb-4" style={{ color: "#9ca3af" }}>No install. No API key. Open your browser and start a debate. Full advisor board, shareable.</p>
            <ul className="text-sm space-y-1.5 mb-5" style={{ color: "#6ee7b7" }}>
              <li>✓ No setup required</li>
              <li>✓ Works on any device</li>
              <li>✓ Full advisor board</li>
            </ul>
            <a href="/board" className="inline-block text-xs font-semibold px-4 py-2 rounded-lg transition-all"
              style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)", color: "#6ee7b7" }}>
              Open Web UI →
            </a>
          </div>
          <div className="rounded-2xl p-7" style={{ background: "rgba(88,101,242,0.1)", border: "1px solid rgba(88,101,242,0.25)" }}>
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-lg font-bold mb-2">Discord bot</h3>
            <p className="text-sm mb-4" style={{ color: "#9ca3af" }}>Best for teams. Bot joins your server, routes most messages to Beast (free), escalates complex ones to Claude. Rich embeds with Approve / Reject buttons.</p>
            <ul className="text-sm space-y-1.5" style={{ color: "#a5b4fc" }}>
              <li>✓ Shared with teammates</li>
              <li>✓ Persistent conversation memory</li>
              <li>✓ Works from phone</li>
              <li>✓ Beast-first routing saves money</li>
            </ul>
          </div>
          <div className="rounded-2xl p-7" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-lg font-bold mb-2">Local markdown file</h3>
            <p className="text-sm mb-4" style={{ color: "#9ca3af" }}>No Discord account needed. Two files: <code className="text-xs px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)" }}>inbox.md</code> (you type here) and <code className="text-xs px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)" }}>conversation.md</code> (growing log).</p>
            <ul className="text-sm space-y-1.5" style={{ color: "#86efac" }}>
              <li>✓ Zero account setup</li>
              <li>✓ Works offline</li>
              <li>✓ Searchable history</li>
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
        <h2 className="text-2xl font-bold mb-2">Agents</h2>
        <p className="mb-8 text-sm" style={{ color: "#6b7280" }}>Configure only what you have. Unconfigured agents are skipped automatically. Beast + Claude is all you need for full capability.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
      </section>

      {/* ── Commands ── */}
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
                ["What is X?",                                       "Auto-routed — Beast for brainstorms, Claude for complex"],
                ["!beast: prompt",                                   "Force local model (your llama.cpp or Ollama server)"],
                ["!claude: prompt",                                  "Force Claude API"],
                ["!gemini: prompt",                                  "Force Gemini CLI"],
                ["!search: query",                                   "Web fetch + answer"],
                ["!board: topic",                                    "Board of advisors — auto-selects relevant ones"],
                ["!board cfo cmo: topic",                           "Force specific advisors"],
                ["!board plan: topic",                              "Preview advisor lineup without running"],
                ["!debate: topic",                                   "2-agent debate, auto Red Team"],
                ["!debate claude vs beast: topic",                  "Explicit agents"],
                ["!debate claude vs beast --red beast: topic",      "Explicit Red Team"],
                ["!debate claude vs beast --socratic cfo: topic",   "CFO plays Socratic Examiner"],
                ["!teach: always keep responses under 3 sentences", "Save a behavior rule (persists across sessions)"],
                ["!forget: rule text",                              "Remove a saved rule"],
                ["!rules",                                          "List all saved behavior rules"],
                ["!queue: topic",                                   "Add to board inbox for later"],
                ["!inbox",                                          "See queued topics"],
                ["!board-inbox 1",                                  "Send inbox item 1 to the board"],
                ["!checkin",                                        "Board sessions due for outcome review (30/60/90 days)"],
                ["!outcome [id] [notes]",                          "Record what actually happened after a board decision"],
                ["!backtest",                                       "See all board sessions and their outcomes"],
                ["!roster",                                         "Show active advisors this session"],
                ["!kick advisor / !invite advisor",                 "Add or remove an advisor for this session"],
                ["!help",                                           "Full command reference"],
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

      {/* ── Security ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-2xl p-8" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <h2 className="text-xl font-bold mb-4">Security notes</h2>
          <div className="grid md:grid-cols-2 gap-5 text-sm">
            {[
              { label: "Local models have no safety layer", text: "The injection detector catches known patterns (DAN mode, instruction override, credential extraction) and reroutes to Claude. Novel prompts can still get through. For public-facing or sensitive channels, set model_override: \"claude\" in CHANNEL_CONFIG_JSON." },
              { label: "Conversation history is local", text: "Lessons and conversation summaries write to ~/.agent-factory/ by default. Nothing leaves your machine unless you configure an external agent API." },
              { label: "History poisoning is blocked", text: "Only entries the bot itself writes (source:\"coordinator\") are injected into prompts. Externally written entries are silently excluded — confirmed by adversarial test suite." },
              { label: "No credential defaults", text: "All API keys are env vars. Phone numbers for alerts are optional with no fallback. Filesystem paths default to your home dir, not a hardcoded user path." },
            ].map((item, i) => (
              <div key={i}>
                <div className="font-semibold mb-1 text-white">{item.label}</div>
                <p style={{ color: "#9ca3af" }}>{item.text}</p>
              </div>
            ))}
          </div>
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
          <h3 className="font-bold text-lg mb-2">Clone and run</h3>
          <pre className="rounded-xl p-4 text-sm mb-6 overflow-x-auto" style={{ background: "rgba(0,0,0,0.4)", color: "#e2e8f0", fontFamily: "monospace" }}>
{`git clone https://github.com/rdcahalane/ai-skills.git
cd ai-skills/agent-factory
cp .env.example .env   # add DISCORD_BOT_TOKEN, DATABASE_URL
npm install
npm run migrate
npm run dev`}
          </pre>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/rdcahalane/ai-skills/tree/main/agent-factory"
              target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}>
              View on GitHub
            </a>
            <a href="/board"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#6ee7b7" }}>
              Try the web UI first ⚡
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
