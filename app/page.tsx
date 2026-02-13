import LoginButton from "@/components/LoginButton"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center">

      <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md text-center text-white">

        <h1 className="text-4xl font-extrabold mb-4">
          Smart Bookmark App
        </h1>

        <p className="mb-8 text-lg opacity-90">
          Save, manage and access your bookmarks securely anywhere.
        </p>

        <LoginButton />

      </div>

    </main>
  )
}
