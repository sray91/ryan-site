// RC monogram: the C is a feedback loop closing on the dot, the R sits inside it. Same drawing as app/icon.svg.
export default function Monogram({ size = 36, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#18222a" />
      <path d="M46.8 46.8A21 21 0 1 1 45.4 15.8" fill="none" stroke="#d9823f" strokeWidth="4.2" strokeLinecap="round" />
      <path d="M50.2 20.6 48.6 12 41.6 17.8Z" fill="#d9823f" stroke="#d9823f" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M26 44V20h8.2a6.1 6.1 0 0 1 0 12.2H26M32.6 32.2 39.4 44" fill="none" stroke="#f6f1e7" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50.5" cy="32" r="2.3" fill="#f6f1e7" />
    </svg>
  );
}
