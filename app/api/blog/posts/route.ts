import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    select: {
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      pinned: true,
      createdAt: true,
      _count: { select: { comments: true, likes: true } },
    },
  })

  return NextResponse.json({ posts })
}