import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function AvatarUploader({ user, onUploaded }) {
  const [uploading, setUploading] = useState(false);

  async function uploadAvatar(e) {
    try {
      setUploading(true);
      const file = e.target.files[0];
      const filename = `${user.id}-${Date.now()}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filename, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filename);

      await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", user.id);

      onUploaded(data.publicUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="file" onChange={uploadAvatar} disabled={uploading} />
    </div>
  );
}
