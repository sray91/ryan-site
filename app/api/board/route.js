import { pickAdvisors, buildSynthesisPrompt } from "../../../lib/board-advisors.js";

const GROQ_URL   = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

async function callGroq(prompt, maxTokens = 600) {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

export async function POST(request) {
  const { topic, advisorIds } = await request.json();
  if (!topic?.trim()) {
    return new Response(JSON.stringify({ error: "topic required" }), { status: 400 });
  }
  if (!process.env.GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: "GROQ_API_KEY not configured" }), { status: 500 });
  }

  const advisors = pickAdvisors(topic.trim(), advisorIds);
  const encoder  = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      const responses = [];

      for (const advisor of advisors) {
        send({ type: "advisor_start", id: advisor.id, name: advisor.name, icon: advisor.icon, color: advisor.color });
        try {
          const content = await callGroq(
            `${advisor.persona}\n\nTopic for your input: "${topic.trim()}"`,
            600,
          );
          responses.push({ name: advisor.name, content });
          send({ type: "advisor_done", id: advisor.id, content });
        } catch (err) {
          send({ type: "advisor_error", id: advisor.id, error: err.message });
        }
      }

      // Synthesis
      if (responses.length > 0) {
        send({ type: "synthesis_start" });
        try {
          const synthesis = await callGroq(buildSynthesisPrompt(topic.trim(), responses), 900);
          send({ type: "synthesis_done", content: synthesis });
        } catch (err) {
          send({ type: "synthesis_error", error: err.message });
        }
      }

      send({ type: "done" });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
