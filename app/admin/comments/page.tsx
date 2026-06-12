import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const dynamic = "force-dynamic"

async function moderate(formData: FormData) {
  "use server"
  const session = await auth()
  if (!session?.user) return

  const commentId = formData.get("commentId") as string
  const action = formData.get("action") as string

  if (action === "approve") {
    await prisma.blogComment.update({ where: { id: commentId }, data: { approved: true } })
  } else if (action === "delete") {
    await prisma.blogComment.delete({ where: { id: commentId } })
  }

  revalidatePath("/admin/comments")
}

export default async function AdminCommentsPage() {
  const session = await auth()
  if (!session?.user) redirect("/companion/signin")

  const comments = await prisma.blogComment.findMany({
    orderBy: { createdAt: "desc" },
    include: { post: { select: { title: true, slug: true } } },
  })

  const pending = comments.filter((c) => !c.approved)
  const approved = comments.filter((c) => c.approved)

  return (
    <section className="mx-auto max-w-4xl px-6 pt-16 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-3">Admin</p>
      <h1 className="font-display text-2xl text-ember-200 mb-2">Comment Moderation</h1>
      <p className="text-sm text-parchment-500 mb-8">{pending.length} pending · {approved.length} approved</p>

      {pending.length === 0 && approved.length === 0 && (
        <p className="text-parchment-600">No comments yet.</p>
      )}

      {pending.length > 0 && (
        <>
          <h2 className="font-display text-lg text-ember-300 mb-4">Pending Approval</h2>
          <div className="space-y-4 mb-12">
            {pending.map((c) => (
              <div key={c.id} className="rounded border border-ember-700/50 bg-ember-700/5 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-mono text-xs text-ember-400">{c.author}</span>
                    <span className="font-mono text-[10px] text-parchment-600 ml-3">
                      on <span className="text-ember-500">{c.post.title}</span>
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-parchment-600 shrink-0">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-parchment-400 mb-3">{c.body}</p>
                <form action={moderate} className="flex gap-2">
                  <input type="hidden" name="commentId" value={c.id} />
                  <button name="action" value="approve" className="font-mono text-xs text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
                    Approve
                  </button>
                  <button name="action" value="delete" className="font-mono text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer">
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        </>
      )}

      {approved.length > 0 && (
        <>
          <h2 className="font-display text-lg text-ember-300 mb-4">Approved ({approved.length})</h2>
          <div className="space-y-3">
            {approved.slice(0, 30).map((c) => (
              <div key={c.id} className="rounded border border-ember-dim/30 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-mono text-xs text-ember-400">{c.author}</span>
                    <span className="font-mono text-[10px] text-parchment-600 ml-3">
                      on <span className="text-ember-500">{c.post.title}</span>
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-parchment-600 shrink-0">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-parchment-400">{c.body}</p>
                <form action={moderate} className="mt-2">
                  <input type="hidden" name="commentId" value={c.id} />
                  <button name="action" value="delete" className="font-mono text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer">
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}