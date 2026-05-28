import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/db"

const contentTypeLabels: Record<string, string> = {
  lore: "Lore",
  story: "Short Story",
  log: "Banehunter's Log",
  art: "Art",
  commentary: "Chapter Commentary",
  deleted_scene: "Deleted Scene",
  map: "Map",
  glossary: "Glossary",
}

const contentTypeIcons: Record<string, string> = {
  lore: "📜",
  story: "✍",
  log: "📓",
  art: "🎨",
  commentary: "💬",
  deleted_scene: "✂",
  map: "🗺",
  glossary: "📖",
}

export default async function CompanionDashboard() {
  const session = await auth()
  if (!session?.user) redirect("/companion/signin")

  const userBooks: string[] = (session as any)?.userBooks || []
  const userAccess: string[] = (session as any)?.userAccess || []

  const items = await prisma.contentItem.findMany({
    where: { published: true },
    select: {
      slug: true,
      title: true,
      contentType: true,
      excerpt: true,
      createdAt: true,
      tags: { select: { tag: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  const isAdmin = session.user.email === process.env.ADMIN_EMAIL

  // Group items by contentType
  const groupedItems = items.reduce<Record<string, typeof items>>((acc, item) => {
    ;(acc[item.contentType] ??= []).push(item)
    return acc
  }, {})

  return (
    <section className="mx-auto max-w-4xl px-6 pt-12 pb-12">
      {/* Entry banner */}
      <div className="companion-entry-banner mb-10">
        <div className="text-center pb-6">
          <div className="companion-section-rule">
            <span className="companion-section-ornament">✧</span>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-2">
            The Darkland Saga
          </p>
          <h1 className="font-display text-4xl text-ember-200 emberglow-text">
            The Companion Archive
          </h1>
          <p className="mt-2 text-sm text-parchment-500 font-mono">
            A collection of lore, stories, and secrets from the world of the Darkland Saga
          </p>

          <div className="companion-section-rule companion-section-rule--flip mt-4">
            <span className="companion-section-ornament">✧</span>
          </div>
        </div>
      </div>

      {/* Sign out */}
      <div className="text-right mb-8">
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button className="text-sm text-parchment-500 hover:text-parchment-300 transition-colors font-mono">
            Sign Out
          </button>
        </form>
      </div>

      {/* Seeker Record — status plaque */}
      <div className="companion-plaque mb-8">
        <div className="companion-plaque-inner p-6">
          <div className="flex items-center gap-2 mb-3">
            <svg className="h-4 w-4 text-ember-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
              <path d="M8 2v3M8 11v3M2 8h3M11 8h3" strokeLinecap="round"/>
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember-500">
              Seeker Record
            </span>
          </div>
          <p className="text-sm text-parchment-400">
            Signed in as <span className="text-parchment-200 font-medium">{session.user.email}</span>
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="companion-tag">
              {userBooks.length > 0
                ? `Unlocked: ${userBooks.join(", ")}`
                : "No books unlocked yet"}
            </span>
            {userAccess.includes("kofi_supporter") && (
              <span className="companion-tag companion-tag--patron">✦ Patron</span>
            )}
          </div>
        </div>
      </div>

      {/* Content shelves — grouped by type */}
      {Object.keys(groupedItems).length === 0 ? (
        <div className="companion-vault p-8 text-center">
          <p className="text-parchment-400 mb-4">
            The companion content is being prepared. Check back soon!
          </p>
          {userBooks.length === 0 && (
            <p className="text-sm text-parchment-500">
              If you&apos;ve purchased a book, enter your code on the{" "}
              <Link href="/companion/redeem" className="text-ember-400 underline">
                redeem page
              </Link>
              .
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([type, typeItems]) => (
            <div key={type}>
              <div className="companion-section-rule mb-4">
                <span className="companion-section-label">
                  {contentTypeIcons[type] || "📜"} {contentTypeLabels[type] || type}
                </span>
              </div>
              <div className="space-y-2">
                {typeItems.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/companion/${item.slug}`}
                    className="companion-tome-entry"
                  >
                    <div className="companion-tome-spine" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-parchment-200 font-medium">{item.title}</h3>
                      {item.excerpt && (
                        <p className="text-xs text-parchment-500 mt-0.5 line-clamp-1">{item.excerpt}</p>
                      )}
                    </div>
                    {item.createdAt && (
                      <span className="shrink-0 text-[10px] font-mono text-parchment-600">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Archive alcoves — quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        <Link href="/companion/redeem" className="companion-alcove group">
          <div className="companion-alcove-icon">🗝</div>
          <h3 className="font-mono text-sm text-ember-300 mb-1 group-hover:text-emberglow-bright transition-colors">
            Redeem a Code
          </h3>
          <p className="text-xs text-parchment-500">Unlock hidden content from your books</p>
        </Link>
        <Link href="/support" className="companion-alcove group">
          <div className="companion-alcove-icon">☕</div>
          <h3 className="font-mono text-sm text-ember-300 mb-1 group-hover:text-emberglow-bright transition-colors">
            Support on Ko-fi
          </h3>
          <p className="text-xs text-parchment-500">Become a patron for early access</p>
        </Link>
        {isAdmin && (
          <Link href="/companion/admin" className="companion-alcove group">
            <div className="companion-alcove-icon">⚙</div>
            <h3 className="font-mono text-sm text-ember-300 mb-1 group-hover:text-emberglow-bright transition-colors">
              Admin
            </h3>
            <p className="text-xs text-parchment-500">Manage content and codes</p>
          </Link>
        )}
      </div>
    </section>
  )
}