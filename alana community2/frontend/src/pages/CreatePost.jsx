import { useState } from "react";
import { supabase } from "../lib/supabase";
import { uploadImage } from "../lib/uploadImage";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = null;

    try {
      if (image) {
        imageUrl = await uploadImage("post-images", image);
      }

      const { data, error } = await supabase.from("posts").insert([
        {
          content,
          image_url: imageUrl,
        },
      ]);

      if (error) {
        console.error(error);
        alert("Error creating post");
        setLoading(false);
        return;
      }

      navigate("/feed");
    } catch (err) {
      console.error(err);
      alert("Upload error");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-3"
          rows={4}
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div>
          <label className="block mb-1 font-medium">Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}
