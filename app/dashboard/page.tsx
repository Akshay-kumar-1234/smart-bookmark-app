"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import BookmarkForm from "@/components/BookmarkForm"
import BookmarkList from "@/components/BookmarkList"

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  if (!user) return <div className="p-10">Loading...</div>

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 p-6">

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white">

        <h1 className="text-3xl font-bold mb-2">
          Your Bookmarks
        </h1>

        <p className="opacity-80 mb-6">
          Save and manage your favorite links
        </p>

        <BookmarkForm
          user={user}
          onAdded={() => setRefreshKey(k => k + 1)}
        />

        <div className="mt-6">
          <BookmarkList key={refreshKey} user={user} />
        </div>

      </div>

      {/* logout bottom right */}
      <div className="flex justify-end max-w-3xl mx-auto mt-6">
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow-lg transition"
        >
          Logout
        </button>
      </div>

    </main>
  )
}
