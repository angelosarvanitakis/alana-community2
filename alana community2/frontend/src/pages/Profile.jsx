import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AvatarUploader from "../components/AvatarUploader";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setAvatar(data?.avatar_url));
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Profile</h1>
      <img
        src={avatar}
        alt="avatar"
        className="w-32 h-32 rounded-full border mb-4"
      />
      <AvatarUploader user={user} onUploaded={setAvatar} />
    </div>
  );
}
