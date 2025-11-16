export default function PostCard({ post }) {
  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={post.profiles?.avatar_url || "/default-avatar.png"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">
            {post.profiles?.username || "Unknown User"}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <p className="mb-2">{post.content}</p>

      {post.image_url && (
        <img
          src={post.image_url}
          className="w-full rounded-lg border"
          alt="post"
        />
      )}
    </div>
  );
}
