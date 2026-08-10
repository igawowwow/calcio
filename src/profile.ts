import { useEffect, useState } from "react";

export type FieldType = "text" | "textarea" | "date" | "options";

export type FieldDef = {
  key: string;
  label: string;
  icon: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
};

export const BIO_FIELD: FieldDef = {
  key: "bio",
  label: "Bio",
  icon: "",
  type: "textarea",
  placeholder: "Tell other players about yourself",
};

export const BASIC_FIELDS: FieldDef[] = [
  {
    key: "gender",
    label: "Gender",
    icon: "gender",
    type: "options",
    options: ["Man", "Woman", "Non-binary", "Prefer not to say"],
  },
  { key: "dob", label: "Date of birth", icon: "cake", type: "date" },
  {
    key: "nationality",
    label: "Nationality",
    icon: "globe",
    type: "text",
    placeholder: "e.g. Japan",
  },
  {
    key: "occupation",
    label: "Occupation",
    icon: "briefcase",
    type: "text",
    placeholder: "e.g. Designer",
  },
  {
    key: "city",
    label: "City or town",
    icon: "map",
    type: "text",
    placeholder: "e.g. Milano",
  },
  {
    key: "languages",
    label: "Languages spoken",
    icon: "language",
    type: "text",
    placeholder: "e.g. Japanese, English",
  },
  {
    key: "interests",
    label: "Interests",
    icon: "heart",
    type: "text",
    placeholder: "e.g. Futsal, Running",
  },
];

export const FOOTBALL_FIELDS: FieldDef[] = [
  {
    key: "skill",
    label: "Skill level",
    icon: "clock",
    type: "options",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
  },
  {
    key: "position",
    label: "Position",
    icon: "ball",
    type: "options",
    options: ["Goalkeeper", "Defender", "Midfielder", "Forward", "Anywhere"],
  },
  {
    key: "teams",
    label: "Teams",
    icon: "shield",
    type: "text",
    placeholder: "e.g. AC Milan",
  },
  {
    key: "admires",
    label: "Players you admire",
    icon: "star",
    type: "text",
    placeholder: "e.g. Del Piero",
  },
  {
    key: "motivation",
    label: "Motivation",
    icon: "bolt",
    type: "text",
    placeholder: "e.g. Fun and fitness",
  },
];

export const ALL_FIELDS = [BIO_FIELD, ...BASIC_FIELDS, ...FOOTBALL_FIELDS];

export type Profile = Record<string, string>;

const STORAGE_KEY = "calcio.profile";

function load(): Profile {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

let current: Profile = load();
const listeners = new Set<() => void>();

export function getProfile(): Profile {
  return current;
}

export function setProfileField(key: string, value: string) {
  current = { ...current, [key]: value };
  if (!value) delete current[key];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  listeners.forEach((fn) => fn());
}

export function useProfile(): Profile {
  const [profile, setProfile] = useState(current);
  useEffect(() => {
    const fn = () => setProfile(current);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);
  return profile;
}

export function isProfileComplete(profile: Profile): boolean {
  return ALL_FIELDS.every((f) => !!profile[f.key]);
}
