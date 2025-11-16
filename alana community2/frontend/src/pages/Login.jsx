import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");

  async function login() {
    await supabase.auth.signInWithOtp({ email });
    alert("Check your email for login link");
  }

  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin
      }
    });
  }

  return (
    <div className="p-6 flex flex-col gap-4 max-w-md mx-auto mt-20">
      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={login} className="bg-blue-500 text-white p-2">
        Login with Email
      </button>
      <button onClick={loginGoogle} className="bg-red-500 text-white p-2">
        Login with Google
      </button>
    </div>
  );
}
