import { useState } from "react";
import {
  ChatIcon,
  FieldIcon,
  PersonIcon,
  SearchIcon,
} from "./icons";
import EditProfileScreen from "./screens/EditProfileScreen";
import ProfileScreen from "./screens/ProfileScreen";

const USER_NAME = "輝 伊賀";

type Tab = "explore" | "fields" | "messages" | "profile";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "explore", label: "Explore", icon: <SearchIcon /> },
  { key: "fields", label: "Fields", icon: <FieldIcon /> },
  { key: "messages", label: "Messages", icon: <ChatIcon /> },
  { key: "profile", label: "Profile", icon: <PersonIcon /> },
];

function Placeholder({ title, text }: { title: string; text: string }) {
  return (
    <div className="placeholder-screen">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>("profile");
  const [editingProfile, setEditingProfile] = useState(false);

  let content: React.ReactNode;
  if (tab === "profile") {
    content = editingProfile ? (
      <EditProfileScreen onBack={() => setEditingProfile(false)} />
    ) : (
      <ProfileScreen
        userName={USER_NAME}
        onEditProfile={() => setEditingProfile(true)}
      />
    );
  } else if (tab === "explore") {
    content = (
      <Placeholder
        title="Explore"
        text="Find games and events near you. Coming soon!"
      />
    );
  } else if (tab === "fields") {
    content = (
      <Placeholder
        title="Fields"
        text="Browse football fields around you. Coming soon!"
      />
    );
  } else {
    content = (
      <Placeholder
        title="Messages"
        text="Chat with players and organisers. Coming soon!"
      />
    );
  }

  return (
    <div className="phone">
      {content}
      <nav className="tab-bar">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={
              "tab-bar__item" + (tab === t.key ? " tab-bar__item--active" : "")
            }
            onClick={() => {
              setTab(t.key);
              if (t.key !== "profile") setEditingProfile(false);
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
