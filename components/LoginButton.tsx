"use client"
import { supabase } from "@/lib/supabase"

export default function LoginButton() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
        queryParams: { prompt: "select_account" }
      }
    })
  }

  return (
    <button
      onClick={login}
      className="w-full bg-white text-gray-800 font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center gap-3"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        className="w-6 h-6"
      />
      Login with Google
    </button>
  )
}
