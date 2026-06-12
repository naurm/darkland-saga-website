import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { postSlug, author, body } = await req.json()
    if (!postSlug || !author || !body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (author.length > 60 || body.length > 2000) {
      return NextResponse.json({ error: "Content too long" }, { status: 400 })
    }

    // Check post exists
    const post = await prisma.blogPost.findUnique({ where: { slug: postSlug } })
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    await prisma.blogComment.create({
      data: {
        postSlug,
        author: author.trim(),
        body: body.trim(),
        approved: false, // requires moderation
      },
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}