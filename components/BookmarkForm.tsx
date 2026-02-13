"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function BookmarkForm({ user, onAdded }) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const addBookmark = async () => {
    if (!title || !url) return

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id
    })

    setTitle("")
    setUrl("")
    onAdded()
  }

  return (
    <div className="space-y-4">

      <input
        placeholder="Bookmark Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full p-3 rounded-xl bg-white/20 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
      />

      <input
        placeholder="https://example.com"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="w-full p-3 rounded-xl bg-white/20 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
      />

      <button
        onClick={addBookmark}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg transition hover:scale-105"
      >
        Add Bookmark
      </button>

    </div>
  )
}
