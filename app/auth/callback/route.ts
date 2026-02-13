import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(req: Request) {
  const requestUrl = new URL(req.url)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  await supabase.auth.exchangeCodeForSession(requestUrl.searchParams.get("code")!)

  return NextResponse.redirect(new URL("/dashboard", req.url))
}
