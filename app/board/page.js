'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import { ADVISORS } from "../../lib/board-advisors.js";

const PRO_ADVISORS = ADVISORS.filter(a => ["cfo","cmo","cto","coo","gc","cpo","ux"].includes(a.id));
const FUN_ADVISORS = ADVISORS.filter(a => ["grandma","teenager","neighbor","intern","shark"].includes(a.id));

function AdvisorCard({ id, name, icon, color, status, content }) {
  return (
    <div
      className="rounded-2xl p-5 border transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.04)",
        borderColor: status === "loading" ? color : "rgba(255,255,255,0.12)",
        boxShadow: status === "loading" ? `0 0 20px ${color}30` : "none",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <span className="font-semibold text-white text-sm tracking-wide uppercase">{name}</span>
        {status === "loading" && (
          <span className="ml-auto flex gap-1">
            {[0,1,2].map(i => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </span>
        )}
      </div>
      {content && (
        <p className="text-white/75 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      )}
    </div>
  );
}

function SynthesisCard({ status, content }) {
  if (status === "idle") return null;

  const proposedMatch = content?.match(/PROPOSED ACTION:\s*(.+?)(?:\n|$)/i);
  const provocMatch   = content?.match(/PROVOCATION:\s*(.+?)(?:\n|$)/i);
  const body = content
    ?.replace(/PROPOSED ACTION:.+?(\n|$)/i, "")
    .replace(/PROVOCATION:.+?(\n|$)/i, "")
    .trim();

  return (
    <div
      className="rounded-2xl p-5 border mt-2"
      style={{
        background: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(59,130,246,0.08) 100%)",
        borderColor: "rgba(16,185,129,0.3)",
        boxShadow: status === "loading" ? "0 0 24px rgba(16,185,129,0.15)" : "none",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🧠</span>
        <span className="font-semibold text-emerald-400 text-sm tracking-wide uppercase">Board Synthesis</span>
        {status === "loading" && (
          <span className="ml-auto flex gap-1">
            {[0,1,2].map(i => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </span>
        )}
      </div>
      {body && <p className="text-white/75 text-sm leading-relaxed whitespace-pre-wrap mb-4">{body}</p>}
      {proposedMatch?.[1] && (
        <div className="rounded-xl p-3 mb-2" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
          <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">Proposed Action</p>
          <p className="text-white text-sm">{proposedMatch[1].trim()}</p>
        </div>
      )}
      {provocMatch?.[1] && (
        <div className="rounded-xl p-3" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">Open Question</p>
          <p className="text-white/80 text-sm italic">{provocMatch[1].trim()}</p>
        </div>
      )}
    </div>
  );
}

export default function BoardPage() {
  const [topic, setTopic]               = useState("");
  const [selected, setSelected]         = useState([]);
  const [running, setRunning]           = useState(false);
  const [cards, setCards]               = useState([]);
  const [synthesis, setSynthesis]       = useState({ status: "idle", content: "" });
  const [error, setError]               = useState(null);
  const resultsRef                      = useRef(null);

  function toggleAdvisor(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  async function runBoard() {
    if (!topic.trim() || running) return;
    setRunning(true);
    setCards([]);
    setSynthesis({ status: "idle", content: "" });
    setError(null);

    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);

    try {
      const res = await fetch("/api/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), advisorIds: selected }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Request failed");
      }

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let   buffer  = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          const event = JSON.parse(part.slice(6));

          if (event.type === "advisor_start") {
            setCards(prev => [...prev, { id: event.id, name: event.name, icon: event.icon, color: event.color, status: "loading", content: "" }]);
          } else if (event.type === "advisor_done") {
            setCards(prev => prev.map(c => c.id === event.id ? { ...c, status: "done", content: event.content } : c));
          } else if (event.type === "advisor_error") {
            setCards(prev => prev.map(c => c.id === event.id ? { ...c, status: "error", content: `Error: ${event.error}` } : c));
          } else if (event.type === "synthesis_start") {
            setSynthesis({ status: "loading", content: "" });
          } else if (event.type === "synthesis_done") {
            setSynthesis({ status: "done", content: event.content });
          } else if (event.type === "synthesis_error") {
            setSynthesis({ status: "done", content: `Synthesis failed: ${event.error}` });
          }
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setRunning(false);
    }
  }

  const hasResults = cards.length > 0 || synthesis.status !== "idle";

  return (
    <div className="min-h-screen text-white" style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #111827 50%, #0a0a0f 100%)" }}>

      {/* Nav */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
        <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm">← ryancahalane.com</Link>
        <Link href="/projects/agent-factory" className="text-white/40 hover:text-white/70 transition-colors text-xs">about this project</Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3" style={{ fontFamily: "BDO Grotesk, sans-serif" }}>
            Board of Advisor Agents
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Bring a question to the board. Get CFO, CMO, CTO, and more to weigh in — then a synthesis with a proposed action.
          </p>
        </div>

        {/* Input */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>

          <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
            What do you want the board to weigh in on?
          </label>
          <textarea
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) runBoard(); }}
            placeholder="e.g. Should we raise our prices by 20%? / We're thinking of launching a mobile app..."
            rows={3}
            className="w-full bg-transparent text-white placeholder-white/25 text-base resize-none outline-none border-b border-white/10 pb-3 mb-6"
          />

          {/* Advisor picker */}
          <div className="mb-6">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
              Choose advisors{" "}
              <span className="text-white/25 normal-case font-normal">(leave blank to auto-select by topic)</span>
            </p>
            <div className="mb-3">
              <p className="text-white/30 text-xs mb-2">Professional</p>
              <div className="flex flex-wrap gap-2">
                {PRO_ADVISORS.map(a => (
                  <button
                    key={a.id}
                    onClick={() => toggleAdvisor(a.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: selected.includes(a.id) ? `${a.color}25` : "rgba(255,255,255,0.05)",
                      border: `1px solid ${selected.includes(a.id) ? a.color : "rgba(255,255,255,0.1)"}`,
                      color: selected.includes(a.id) ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <span>{a.icon}</span>{a.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white/30 text-xs mb-2">Just for fun</p>
              <div className="flex flex-wrap gap-2">
                {FUN_ADVISORS.map(a => (
                  <button
                    key={a.id}
                    onClick={() => toggleAdvisor(a.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: selected.includes(a.id) ? `${a.color}25` : "rgba(255,255,255,0.05)",
                      border: `1px solid ${selected.includes(a.id) ? a.color : "rgba(255,255,255,0.1)"}`,
                      color: selected.includes(a.id) ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <span>{a.icon}</span>{a.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={runBoard}
              disabled={!topic.trim() || running}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: running ? "rgba(16,185,129,0.2)" : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                boxShadow: running ? "none" : "0 4px 15px rgba(16,185,129,0.3)",
              }}
            >
              {running ? "Assembling the board…" : "Assemble the Board"}
            </button>
            {selected.length > 0 && (
              <button onClick={() => setSelected([])} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                clear selection
              </button>
            )}
            <span className="text-white/25 text-xs ml-auto hidden sm:block">⌘↵ to run</span>
          </div>
        </div>

        {/* Results */}
        {hasResults && (
          <div ref={resultsRef}>
            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              {cards.map(card => (
                <AdvisorCard key={card.id} {...card} />
              ))}
            </div>
            <SynthesisCard {...synthesis} />
          </div>
        )}

        {error && (
          <div className="rounded-xl p-4 mt-4" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-white/20 text-xs">
          Powered by{" "}
          <a href="https://groq.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">Groq</a>
          {" · "}
          <a href="https://github.com/rdcahalane/ai-skills" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">open source</a>
        </div>
      </div>
    </div>
  );
}
