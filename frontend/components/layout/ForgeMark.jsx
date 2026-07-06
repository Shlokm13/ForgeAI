// Compact geometric mark: an angular "F" built from connected repository-like
// nodes, rendered exclusively in the two approved purple tones.
export default function ForgeMark({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="30" height="30" rx="7" fill="#171233" />
      <rect x="1" y="1" width="30" height="30" rx="7" stroke="#8B5CF6" strokeOpacity="0.35" />
      <path
        d="M10 8H23"
        stroke="#A78BFA"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M10 8V24"
        stroke="#8B5CF6"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M10 15.5H19.5"
        stroke="#A78BFA"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="23" cy="8" r="1.8" fill="#A78BFA" />
      <circle cx="19.5" cy="15.5" r="1.8" fill="#8B5CF6" />
      <circle cx="10" cy="24" r="1.8" fill="#8B5CF6" />
    </svg>
  );
}
