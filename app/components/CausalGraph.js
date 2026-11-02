// The hero drawing: the sample line from the Causal 101 demo as a live-looking causal map. Signals travel
// along the edges; the dashed teal links are the hidden factor (crew experience) a dashboard never records.
const N = {
  crew: [80, 92, "Crew experience", "72%", "var(--x-cap)"],
  speed: [262, 64, "Line speed", "118/min", "var(--x-ctl)"],
  moist: [80, 262, "Moisture", "4.5%", "var(--x-dim)"],
  int: [262, 400, "Maintenance interval", "6 wk", "var(--x-ctl)"],
  swing: [420, 222, "Temperature swing", "3.9°C", "var(--x-cond)"],
  wear: [420, 392, "Equipment wear", "45%", "var(--x-cond)"],
  scrap: [560, 104, "Scrap", "4.2%", "var(--x-loss)"],
  stops: [568, 318, "Stops", "4.1%", "var(--x-loss)"],
};
const R = 31;
// [from, to, bend, kind]: kind "h" is the hidden factor, "hot" the path that explains the scrap.
const E = [["crew", "speed", 0, "h"], ["crew", "scrap", -70, "h"], ["speed", "swing", 0, "hot"], ["moist", "swing", 0], ["int", "wear", 0],
  ["wear", "swing", 0], ["wear", "stops", 0], ["swing", "scrap", 0, "hot"]];

function edge([a, b, bend]) {
  const [x1, y1] = N[a], [x2, y2] = N[b];
  const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy), px = -dy / d, py = dx / d;
  const cx = (x1 + x2) / 2 + px * bend, cy = (y1 + y2) / 2 + py * bend;
  const t1 = Math.hypot(cx - x1, cy - y1), t2 = Math.hypot(x2 - cx, y2 - cy);
  const sx = x1 + ((cx - x1) / t1) * (R + 3), sy = y1 + ((cy - y1) / t1) * (R + 3);
  const ex = x2 - ((x2 - cx) / t2) * (R + 7), ey = y2 - ((y2 - cy) / t2) * (R + 7);
  return `M${sx.toFixed(1)} ${sy.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

export default function CausalGraph() {
  return (
    <svg viewBox="0 0 640 470" role="img" aria-label="A causal map of a sample production line: crew experience, line speed, moisture and maintenance drive temperature swing and equipment wear, which drive scrap and stops">
      <defs>
        <marker id="xa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="context-stroke" /></marker>
        <radialGradient id="xn" cx="35%" cy="30%"><stop offset="0" stopColor="#18212a" /><stop offset="1" stopColor="#0b1015" /></radialGradient>
      </defs>
      <circle cx="320" cy="235" r="228" fill="none" stroke="rgba(255,255,255,.06)" strokeDasharray="2 9" />
      {E.map((e, i) => {
        const d = edge(e), h = e[3] === "h", hot = e[3] === "hot";
        const col = h ? "var(--x-cap)" : hot ? "var(--x-ctl)" : "rgba(255,255,255,.28)";
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={col} strokeWidth={hot ? 2.6 : h ? 2 : 1.6} className={h ? "flow" : undefined} markerEnd="url(#xa)" opacity={h ? 0.8 : 1} />
            <circle r={hot ? 3.6 : 2.6} fill={hot ? "var(--x-ctl)" : h ? "var(--x-cap)" : "#c9d2da"}>
              <animateMotion dur={`${2.6 + (i % 3) * 0.7}s`} begin={`${(i * 0.45).toFixed(2)}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.85;1" dur={`${2.6 + (i % 3) * 0.7}s`} begin={`${(i * 0.45).toFixed(2)}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}
      {Object.entries(N).map(([k, [x, y, lab, val, c]]) => {
        const up = y < 120;
        return (
          <g key={k}>
            {k === "scrap" && <circle className="halo" cx={x} cy={y} r={R} fill="none" stroke="var(--x-loss)" strokeWidth="2" />}
            <circle cx={x} cy={y} r={R} fill="url(#xn)" stroke={c} strokeWidth={k === "speed" ? 3.5 : 2.2} />
            <text className="val" x={x} y={y + 4} textAnchor="middle">{val}</text>
            <text className="lbl" x={x} y={up ? y - R - 12 : y + R + 20} textAnchor="middle">{lab}</text>
          </g>
        );
      })}
    </svg>
  );
}
