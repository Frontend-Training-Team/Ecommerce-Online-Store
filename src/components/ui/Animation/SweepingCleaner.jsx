export default function SweepingCleaner({ className = "w-10 h-10" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="-4 -4 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-red-500 dark:text-state-danger overflow-visible"
      >
        <path
          d="M10 54 C 20 52, 28 54, 38 53"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-pulse opacity-40"
        />
        <circle cx="8" cy="52" r="2" fill="currentColor" className="animate-ping opacity-60" />
        <circle cx="15" cy="55" r="1.5" fill="currentColor" className="animate-bounce opacity-50" />

        <circle cx="36" cy="18" r="6.5" fill="currentColor" />

        <path
          d="M29 17 C 29 11, 43 11, 43 17 Z"
          fill="currentColor"
          className="opacity-90"
        />

        <path
          d="M36 24 C 32 28, 28 34, 26 42"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        <g className="origin-[36px_24px] animate-[sweep_0.5s_infinite_alternate_ease-in-out]">
          <path
            d="M36 24 L 24 32 L 18 40"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M32 18 L 10 50"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M4 50 L 16 50 L 19 56 L 1 56 Z"
            fill="currentColor"
          />
        </g>

        <path
          d="M26 42 L 21 56 M 26 42 L 32 56"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <style>{`
        @keyframes sweep {
          0% {
            transform: rotate(-16deg) translateX(-3px);
          }
          100% {
            transform: rotate(18deg) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}