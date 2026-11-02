// The mark: a hidden factor (hollow, teal) driving two things that look like cause and effect,
// the ice-cream-and-drownings picture from Causal 101. Same drawing as app/icon.svg.
export default function Monogram({ size = 36, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#0d1217" />
      <path d="M28.6 22.6 21 36.8M35.4 22.6 43 36.8" stroke="#3fd0c4" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="0.1 5.2" />
      <path d="M24.5 44h12.5" stroke="#edf1f4" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
      <path d="M34.6 40 38.6 44 34.6 48" fill="none" stroke="#edf1f4" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="18" r="5.6" fill="none" stroke="#3fd0c4" strokeWidth="3" />
      <circle cx="18" cy="44" r="5.6" fill="#edf1f4" />
      <circle cx="47" cy="44" r="5.6" fill="#edf1f4" />
    </svg>
  );
}
