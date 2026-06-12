import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"

export async function POST(req: NextRequest) {
  try {
    const { postSlug } = await req.json()
    if (!postSlug) {
      return NextResponse.json({ error: "Missing postSlug" }, { status: 400 })
    }

    // Check post exists
    const post = await prisma.blogPost.findUnique({ where: { slug: postSlug } })
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Anonymize IP for dedup
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous"
    const ipHash = createHash("sha256").update(ip + "blog-salt").digest("hex").substring(0, 16)

    // Check if this IP already liked
    const existing = await prisma.blogLike.findUnique({
      where: { postSlug_ipHash: { postSlug, ipHash } },
    })
    if (existing) {
      return NextResponse.json({ error: "Already liked" }, { status: 409 })
    }

    await prisma.blogLike.create({
      data: { postSlug, ipHash },
    })

    const count = await prisma.blogLike.count({ where: { postSlug } })
    return NextResponse.json({ success: true, count })
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}