import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();

    // realtime subscription
    const channel = supabase
      .channel("posts_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        loadPosts
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        image_url,
        created_at,
        profiles (
          username,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false });

    if (!error) setPosts(data);
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Feed</h1>
        <Link
          to="/create"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Create Post
        </Link>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && posts.length === 0 && (
        <p className="text-gray-500">No posts yet.</p>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
