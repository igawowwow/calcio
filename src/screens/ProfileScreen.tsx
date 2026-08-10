import {
  AchievementBadge,
  BellIcon,
  DraftedArt,
  GearIcon,
  HeartIcon,
  JerseyArt,
  MilestoneBadge,
  PlusIcon,
  RunnerIcon,
  TicketArt,
  TrophyArt,
} from "../icons";
import { isProfileComplete, useProfile } from "../profile";

const DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function currentWeek(): { name: string; date: number; today: boolean }[] {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return DAY_NAMES.map((name, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      name,
      date: d.getDate(),
      today: d.toDateString() === now.toDateString(),
    };
  });
}

const GREEN_ARROW = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#4cd964"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function ProfileScreen({
  userName,
  onEditProfile,
}: {
  userName: string;
  onEditProfile: () => void;
}) {
  const profile = useProfile();
  const matchReady = isProfileComplete(profile);
  const unlockedCount = matchReady ? 2 : 1;
  const week = currentWeek();

  return (
    <div className="screen">
      <header className="top-bar">
        <button className="wallet" aria-label="Wallet">
          <span className="wallet__euro">€</span>
          <span className="wallet__amount">
            0<sup>.00</sup>
          </span>
          <span className="wallet__add">
            <PlusIcon size={16} />
          </span>
        </button>
        <h1 className="top-bar__title">{userName}</h1>
        <div className="top-bar__actions">
          <button className="icon-btn" aria-label="Notifications">
            <BellIcon />
          </button>
          <button className="icon-btn" aria-label="Settings">
            <GearIcon />
          </button>
        </div>
      </header>

      {/* Weekly streak */}
      <section className="section">
        <div className="section-head">
          <h2>Weekly streak</h2>
        </div>
        <div className="streak-stats">
          <div className="streak-stat">
            <span className="streak-flame">🔥</span>
            <span className="streak-stat__num">0</span>
            <span className="streak-stat__label">Current</span>
          </div>
          <div className="streak-stat">
            <span className="streak-stat__num">0</span>
            <span className="streak-stat__label">Highest</span>
          </div>
        </div>
        <div className="week-row">
          {week.map((d) => (
            <div className="week-day" key={d.name}>
              <span className="week-day__name">{d.name}</span>
              <span
                className={
                  "week-day__num" + (d.today ? " week-day__num--today" : "")
                }
              >
                {d.date}
              </span>
            </div>
          ))}
        </div>
        <div className="cta-banner">
          <div>
            <div className="cta-banner__title">Build your streak!</div>
            <div className="cta-banner__sub">Join an event to start</div>
          </div>
          <button className="btn-yellow">Find events</button>
        </div>
        <button className="pill-btn">See all</button>
      </section>

      <hr className="section-rule" />

      {/* Achievements */}
      <section className="section">
        <div className="section-head">
          <h2>Achievements</h2>
          <span className="count">{unlockedCount} out of 4</span>
        </div>
        <div className="badge-row">
          <div className="badge-card">
            <AchievementBadge unlocked>
              <DraftedArt />
            </AchievementBadge>
            <div className="badge-card__name">Drafted</div>
            <div className="badge-card__desc">Create an account in the app</div>
          </div>
          <div className="badge-card">
            <AchievementBadge unlocked={matchReady}>
              <JerseyArt />
            </AchievementBadge>
            <div className="badge-card__name">Match Ready</div>
            <div className="badge-card__desc">Complete your profile</div>
          </div>
          <div className="badge-card">
            <AchievementBadge unlocked={false}>
              <TicketArt />
            </AchievementBadge>
            <div className="badge-card__name">Official Player</div>
            <div className="badge-card__desc">Play your first game</div>
          </div>
          <div className="badge-card">
            <AchievementBadge unlocked={false}>
              <TrophyArt />
            </AchievementBadge>
            <div className="badge-card__name">Title Winner</div>
            <div className="badge-card__desc">Play your first competition</div>
          </div>
        </div>
        <button className="pill-btn">See all</button>
      </section>

      <hr className="section-rule" />

      {/* Frequent players */}
      <section className="section">
        <div className="section-head">
          <h2>Frequent players</h2>
        </div>
        <div className="empty-state">
          <RunnerIcon size={48} />
          <p>The players you play with will be shown here</p>
        </div>
      </section>

      <hr className="section-rule" />

      {/* Profile completion prompt */}
      {!matchReady && (
        <>
          <section className="profile-prompt">
            <h3>Fill out your profile to get better game recommendations</h3>
            <button className="link-yellow" onClick={onEditProfile}>
              Add profile details
            </button>
          </section>
          <hr className="section-rule" />
        </>
      )}

      {/* Received compliments */}
      <section className="section">
        <div className="section-head">
          <h2>Received compliments</h2>
        </div>
        <div className="empty-state">
          <HeartIcon size={52} />
          <p>Received compliments will be shown here</p>
        </div>
      </section>

      <hr className="section-rule" />

      {/* Milestones */}
      <section className="section">
        <div className="section-head">
          <h2>Milestones</h2>
        </div>
        <div className="milestone-stats">
          <div className="milestone-stat">
            <div className="milestone-stat__num">0</div>
            <div className="milestone-stat__label">Games played</div>
          </div>
          <div className="milestone-stat">
            <div className="milestone-stat__togo">
              10 <small>to go</small> {GREEN_ARROW}
            </div>
            <div className="milestone-stat__next">
              Next badge: <b>10 games</b>
            </div>
          </div>
        </div>
        <div className="milestone-track">
          <div className="milestone-badges">
            {(
              [
                { games: 10, icon: "heart" },
                { games: 25, icon: "comet" },
                { games: 50, icon: "medal" },
                { games: 100, icon: "wings" },
                { games: 200, icon: "cup" },
              ] as const
            ).map((m) => (
              <div className="milestone-badge" key={m.games}>
                <MilestoneBadge games={m.games} icon={m.icon} />
                <div className="milestone-badge__dotline">
                  <span className="milestone-badge__dot" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cta-banner">
          <div>
            <div className="cta-banner__title">Earn your next badge</div>
            <div className="cta-banner__sub">Only 10 games away!</div>
          </div>
          <button className="btn-yellow">Find games</button>
        </div>
      </section>
    </div>
  );
}
