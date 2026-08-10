import { useState } from "react";
import {
  BallIcon,
  BoltIcon,
  BriefcaseIcon,
  CakeIcon,
  ChevronLeftIcon,
  GenderIcon,
  GlobeIcon,
  HeartOutlineIcon,
  LanguageIcon,
  MapIcon,
  PlusIcon,
  RunnerIcon,
  ShieldIcon,
  StarIcon,
  ClockIcon,
} from "../icons";
import {
  BASIC_FIELDS,
  BIO_FIELD,
  FOOTBALL_FIELDS,
  setProfileField,
  useProfile,
  type FieldDef,
} from "../profile";

const FIELD_ICONS: Record<string, React.ReactNode> = {
  gender: <GenderIcon />,
  cake: <CakeIcon />,
  globe: <GlobeIcon />,
  briefcase: <BriefcaseIcon />,
  map: <MapIcon />,
  language: <LanguageIcon />,
  heart: <HeartOutlineIcon />,
  clock: <ClockIcon />,
  ball: <BallIcon />,
  shield: <ShieldIcon />,
  star: <StarIcon />,
  bolt: <BoltIcon />,
};

function AddValue({ value }: { value?: string }) {
  if (value) {
    return <span className="field-row__value">{value}</span>;
  }
  return (
    <span className="field-row__add">
      Add
      <span className="field-row__add-circle">
        <PlusIcon size={14} />
      </span>
    </span>
  );
}

function FieldSheet({
  field,
  initial,
  onClose,
}: {
  field: FieldDef;
  initial: string;
  onClose: () => void;
}) {
  const [value, setValue] = useState(initial);

  const save = () => {
    setProfileField(field.key, value.trim());
    onClose();
  };

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <h3>{field.label}</h3>
        {field.type === "options" ? (
          <div className="sheet__options">
            {field.options!.map((opt) => (
              <button
                key={opt}
                className={
                  "sheet__option" +
                  (value === opt ? " sheet__option--selected" : "")
                }
                onClick={() => setValue(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : field.type === "textarea" ? (
          <textarea
            autoFocus
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <input
            autoFocus
            type={field.type === "date" ? "date" : "text"}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        <div className="sheet__actions">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-yellow" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EditProfileScreen({ onBack }: { onBack: () => void }) {
  const profile = useProfile();
  const [editing, setEditing] = useState<FieldDef | null>(null);

  const renderRow = (field: FieldDef) => (
    <button
      key={field.key}
      className="field-row"
      onClick={() => setEditing(field)}
    >
      <span className="field-row__icon">{FIELD_ICONS[field.icon]}</span>
      <span className="field-row__label">{field.label}</span>
      <AddValue value={profile[field.key]} />
    </button>
  );

  return (
    <div className="screen">
      <nav className="nav-bar">
        <button className="icon-btn" aria-label="Back" onClick={onBack}>
          <ChevronLeftIcon />
        </button>
        <span className="nav-bar__title">Edit profile</span>
      </nav>

      <div className="notice">
        <span className="notice__icon">!</span>
        <span>You can only update your profile photo once per month</span>
      </div>

      <div className="avatar-block">
        <div className="avatar-circle">
          <RunnerIcon size={64} />
        </div>
        <button className="link-yellow">Add profile photo</button>
      </div>

      <p className="edit-intro">
        Complete your profile and help us match you with games and players that
        you might enjoy!
      </p>

      <button className="field-row field-row--bio" onClick={() => setEditing(BIO_FIELD)}>
        <span className="field-row__label" style={{ fontSize: 24 }}>
          Bio
        </span>
        <AddValue value={profile.bio} />
      </button>

      <div className="field-group__title">Basic Info</div>
      {BASIC_FIELDS.map(renderRow)}

      <div className="field-group__title">Football</div>
      {FOOTBALL_FIELDS.map(renderRow)}

      {editing && (
        <FieldSheet
          field={editing}
          initial={profile[editing.key] ?? ""}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
