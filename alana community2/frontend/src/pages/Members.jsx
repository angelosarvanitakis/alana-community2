import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Members() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, created_at")
      .order("created_at", { ascending: false });

    if (!error) setUsers(data || []);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Members</h1>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-3 border rounded flex items-center gap-3 bg-white dark:bg-gray-800"
          >
            <img
              src={user.avatar_url || "/default-avatar.png"}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{user.username}</p>
              <p className="text-xs text-gray-500">
                Joined: {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <p className="text-gray-500">No members yet.</p>
        )}
      </div>
    </div>
  );
}
