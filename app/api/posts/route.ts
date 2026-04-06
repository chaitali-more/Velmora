import { posts } from "@/lib/posts"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get("page") || 1)

  const limit = 4
  const start = (page - 1) * limit
  const end = start + limit

  const paginatedPosts = posts.slice(start, end)

  return NextResponse.json(paginatedPosts)
}