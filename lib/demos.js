// Interactive demos. The stability ones are views of one generic build, synced from
// ~/projects/stability-by-design by scripts/sync-stability.sh into public/demos/stability/.
export const STABILITY_SRC = "/demos/stability/index.html";

export const demos = [
  {
    slug: "causal-101",
    eyebrow: "Causal 101",
    title: "Watching a number is not the same as changing it",
    description: "A dashboard on one sample line says faster shifts scrap less. Reveal the factor it never recorded, set the line speed yourself, then replay last month with a different maintenance plan.",
    view: "causal",
    tags: ["Causal inference", "The do-operator", "Counterfactuals"],
  },
  {
    slug: "look-ahead",
    eyebrow: "Leading and lagging",
    title: "Why OEE can't see what's coming",
    description: "Thirty days of a fryer heat exchanger fouling. Drag through the month and watch the condition move weeks before OEE does.",
    view: "ahead",
    tags: ["Leading indicators", "OEE"],
  },
  {
    slug: "value",
    eyebrow: "Value sizing",
    title: "What a more stable operation is worth",
    description: "Size it in the three kinds of money that three budgets own: annual margin, one-time working capital, and capital deferred. Every input starts as an example you can replace.",
    view: "value",
    tags: ["Working capital", "Margin", "Capex"],
  },
  {
    slug: "stability-by-design",
    eyebrow: "Field guide",
    title: "Stability by design",
    description: "Nine industries and six use cases that recur in all of them, each traced from the people and systems that hold the controls to the conditions a plant has to keep in range.",
    view: "home",
    tags: ["9 industries", "6 use cases"],
  },
];

export const demoBySlug = (slug) => demos.find((d) => d.slug === slug);
