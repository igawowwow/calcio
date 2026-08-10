type IconProps = {
  size?: number;
  className?: string;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function BellIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

export function GearIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.08a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55h.08a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.08a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" />
    </svg>
  );
}

export function PlusIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={3} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 26, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={2.5} className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className} stroke="var(--green)">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SearchIcon({ size = 26, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function FieldIcon({ size = 26, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M12 5v14" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M2 9h3v6H2M22 9h-3v6h3" />
    </svg>
  );
}

export function ChatIcon({ size = 26, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function PersonIcon({ size = 26, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </svg>
  );
}

export function HeartIcon({ size = 56, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21s-7.5-4.7-10-9.3C.4 8.6 2.4 5 5.8 5c2 0 3.4 1.1 4.2 2.4h4c.8-1.3 2.2-2.4 4.2-2.4 3.4 0 5.4 3.6 3.8 6.7C19.5 16.3 12 21 12 21z" />
    </svg>
  );
}

export function RunnerIcon({ size = 44, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="14.5" cy="4" r="2" />
      <path d="M13.5 7.2 9.8 9.4a1.2 1.2 0 0 0-.4 1.7l1.6 2.5-3.6 4.5a1.2 1.2 0 1 0 1.9 1.5l4.1-5.1a1.2 1.2 0 0 0 .1-1.4l-1-1.6 2.2-1.3 1.2 2a1.2 1.2 0 0 0 .8.6l3 .6a1.2 1.2 0 1 0 .5-2.4l-2.5-.5-1.9-3a2.4 2.4 0 0 0-2.3-1.3z" />
      <circle cx="18.8" cy="18.8" r="1.6" />
      <path d="m6.5 12.5-2.3.6a1.1 1.1 0 1 0 .6 2.2l2.6-.7z" />
    </svg>
  );
}

export function CakeIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 21h16M5 21v-6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" />
      <path d="M5 16c1 .8 2 .8 3 0s2-.8 3 0 2 .8 3 0 2-.8 3 0M12 13V9" />
      <path d="M12 6.5c.8 0 1.3-.7 1.3-1.4C13.3 4 12 3 12 3s-1.3 1-1.3 2.1c0 .7.5 1.4 1.3 1.4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GlobeIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export function BriefcaseIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function MapIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14" />
    </svg>
  );
}

export function LanguageIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 5h9M8.5 3v2M6 5c.5 3.5 3 6.5 6 8M11 5c-.8 3-3.5 6.5-7 8" />
      <path d="m13 21 4-9 4 9M14.2 18h5.6" />
    </svg>
  );
}

export function HeartOutlineIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 20s-7-4.4-9.3-8.6C1.2 8.4 3 5 6.2 5c1.9 0 3.1 1 3.8 2.2h4C14.7 6 15.9 5 17.8 5c3.2 0 5 3.4 3.5 6.4C19 15.6 12 20 12 20z" />
    </svg>
  );
}

export function GenderIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 18.5c1-2.2 3-3.5 5.5-3.5s4.5 1.3 5.5 3.5" />
    </svg>
  );
}

export function ClockIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function BallIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m12 7 3.5 2.6-1.3 4.1h-4.4L8.5 9.6 12 7zM12 3v4M8.5 9.6 4.6 8.4M15.5 9.6l3.9-1.2M10.2 13.7l-2.4 3.4M13.8 13.7l2.4 3.4" />
    </svg>
  );
}

export function ShieldIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3z" />
    </svg>
  );
}

export function StarIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8L12 3z" />
    </svg>
  );
}

export function BoltIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

/* ---------- achievement badge shells ---------- */

const SHIELD_PATH =
  "M60 4 106 22 v42 c0 26 -20 44 -46 52 C34 108 14 90 14 64 V22 Z";

export function AchievementBadge({
  unlocked,
  children,
}: {
  unlocked: boolean;
  children?: React.ReactNode;
}) {
  return (
    <svg width={120} height={124} viewBox="0 0 120 124">
      <path
        d={SHIELD_PATH}
        fill={unlocked ? "#121212" : "#141414"}
        stroke={unlocked ? "var(--yellow)" : "#333"}
        strokeWidth={unlocked ? 4 : 3}
      />
      {children}
    </svg>
  );
}

/** Colourful boot + ball artwork for the unlocked "Drafted" badge. */
export function DraftedArt() {
  return (
    <g>
      <circle cx="47" cy="47" r="17" fill="#c9cdd4" />
      <path
        d="M47 33 55 39l-3 9h-10l-3-9 8-6z"
        fill="#2f6fe0"
        transform="rotate(8 47 47)"
      />
      <circle cx="36" cy="52" r="4" fill="#2f6fe0" />
      <circle cx="58" cy="52" r="4" fill="#2f6fe0" />
      <path
        d="M46 66c8-8 18-12 24-12 5 0 8 3 10 7 2 5 6 7 10 8v6c0 3-2 5-5 5H51c-4 0-7-3-7-7 0-3 1-5 2-7z"
        fill="#ff5fa2"
      />
      <path
        d="M44 80h51v3c0 3-2 5-5 5H51c-4 0-7-3-7-7v-1z"
        fill="#59e0c5"
      />
      <circle cx="52" cy="88" r="3" fill="#ffc93c" />
      <circle cx="61" cy="88" r="3" fill="#ffc93c" />
      <circle cx="70" cy="88" r="3" fill="#ffc93c" />
      <circle cx="79" cy="88" r="3" fill="#ffc93c" />
      <g stroke="#a9e34b" strokeWidth="2" strokeLinecap="round">
        <path d="M30 66h6M28 72h5M31 78h6" strokeDasharray="1.5 4" />
      </g>
    </g>
  );
}

/** Grey jersey artwork for the locked "Match Ready" badge. */
export function JerseyArt() {
  return (
    <g fill="#3a3a3a">
      <circle cx="60" cy="34" r="10" />
      <path d="M42 50c-6 2-9 6-9 12v18c0 4 3 7 7 7h40c4 0 7-3 7-7V62c0-6-3-10-9-12l-8-3c-3 4-6 6-10 6s-7-2-10-6l-8 3z" />
      <g fill="#555">
        <circle cx="54" cy="62" r="1.7" />
        <circle cx="60" cy="62" r="1.7" />
        <circle cx="66" cy="62" r="1.7" />
        <circle cx="57" cy="68" r="1.7" />
        <circle cx="63" cy="68" r="1.7" />
      </g>
    </g>
  );
}

/** Grey ticket artwork for the locked "Official Player" badge. */
export function TicketArt() {
  return (
    <g>
      <g transform="rotate(-18 60 62)">
        <path
          d="M36 44h48a4 4 0 0 1 4 4v8a6 6 0 0 0 0 12v8a4 4 0 0 1-4 4H36a4 4 0 0 1-4-4v-8a6 6 0 0 0 0-12v-8a4 4 0 0 1 4-4z"
          fill="#3a3a3a"
        />
        <circle cx="60" cy="62" r="10" fill="#2a2a2a" />
        <path
          d="m60 55 6 4.4-2.3 7H56.3L54 59.4 60 55z"
          fill="#3a3a3a"
        />
      </g>
      <g stroke="#555" strokeWidth="3" strokeLinecap="round">
        <path d="M70 30 78 22M78 34l6-6" />
      </g>
    </g>
  );
}

/** Grey trophy artwork for the locked "Title Winner" badge. */
export function TrophyArt() {
  return (
    <g fill="#3a3a3a">
      <path d="M46 36h28v6c0 10-5 18-14 18s-14-8-14-18v-6z" />
      <path d="M42 40h-6c0 8 4 13 10 14l-1-4c-2-1-3-5-3-10zM78 40h6c0 8-4 13-10 14l1-4c2-1 3-5 3-10z" />
      <rect x="56" y="60" width="8" height="8" />
      <rect x="48" y="68" width="24" height="6" rx="2" />
      <rect x="44" y="76" width="32" height="8" rx="2" />
      <g fill="#555">
        <path d="m60 42 2 4 4 .5-3 3 .8 4.2L60 51.5l-3.8 2.2.8-4.2-3-3 4-.5 2-4z" />
      </g>
    </g>
  );
}

/* ---------- milestone hexagon ---------- */

const HEX_PATH = "M50 3 90 26v46L50 95 10 72V26Z";

export function MilestoneBadge({
  games,
  icon,
}: {
  games: number;
  icon: "heart" | "comet" | "medal" | "wings" | "cup";
}) {
  return (
    <svg width={96} height={94} viewBox="0 0 100 98">
      <path d={HEX_PATH} fill="#151515" stroke="#2e2e2e" strokeWidth="3" />
      <g fill="#333">
        {icon === "heart" && (
          <path d="M50 30c-4-5-11-5-14 0-3 4-1 10 3 14l11 10 11-10c4-4 6-10 3-14-3-5-10-5-14 0z" />
        )}
        {icon === "comet" && (
          <g>
            <circle cx="54" cy="44" r="12" />
            <path d="M40 52 26 62l16-4 2-6zM38 42l-12 2 12 4v-6z" />
          </g>
        )}
        {icon === "medal" && (
          <g>
            <path d="M40 26h20l-6 14h-8l-6-14z" />
            <circle cx="50" cy="50" r="11" />
          </g>
        )}
        {icon === "wings" && (
          <g>
            <circle cx="50" cy="46" r="10" />
            <path d="M38 44c-6-6-14-8-20-6 4 4 8 10 16 12l4-6zM62 44c6-6 14-8 20-6-4 4-8 10-16 12l-4-6z" />
            <path d="m44 26 2 4 4-3 0 5 5-2-2 5" fill="#3a3a3a" />
          </g>
        )}
        {icon === "cup" && (
          <g>
            <path d="M40 28h20v5c0 8-4 13-10 13s-10-5-10-13v-5z" />
            <rect x="47" y="46" width="6" height="6" />
            <rect x="41" y="52" width="18" height="5" rx="2" />
          </g>
        )}
      </g>
      <text
        x="50"
        y="78"
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fill="#4a4a4a"
        fontFamily="inherit"
      >
        {games}
      </text>
    </svg>
  );
}
