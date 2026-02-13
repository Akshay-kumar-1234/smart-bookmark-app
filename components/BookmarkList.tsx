"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function BookmarkList({ user }) {
  const [data, setData] = useState([])

  const load = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setData(data || [])
  }

  useEffect(() => {
    load()

    const channel = supabase
      .channel("bookmarks-user")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`
        },
        load
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user.id])

  const remove = async (id) => {
    await supabase.from("bookmarks").delete().eq("id", id)
    load()
  }

  if (!data.length) {
    return (
      <p className="text-white/70 text-center mt-6">
        No bookmarks yet — add your first one 🚀
      </p>
    )
  }

  return (
    <div className="space-y-3">

      {data.map((b) => (
        <div
          key={b.id}
          className="bg-white/15 backdrop-blur rounded-xl p-4 flex justify-between items-center hover:bg-white/25 transition"
        >
          <a
            href={b.url}
            target="_blank"
            className="font-semibold hover:underline"
          >
            {b.title}
          </a>

          <button
            onClick={() => remove(b.id)}
            className="bg-red-500/80 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  )
}
