import Link from "next/link"

export default function ErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const errorMessages: Record<string, string> = {
    CredentialsSignin: "Invalid email or password.",
    default: "Something went wrong. Please try again.",
  }

  const error = searchParams?.error || "default"
  const message = errorMessages[error] || errorMessages.default

  return (
    <section className="mx-auto max-w-md px-6 pt-24 pb-12 text-center">
      <h1 className="font-display text-3xl text-ember-200 mb-4">Error</h1>
      <p className="text-sm text-parchment-400 mb-8">{message}</p>
      <Link
        href="/companion/signin"
        className="inline-flex items-center gap-1.5 rounded border border-ember-600 bg-ember-700/20 px-5 py-2.5 font-mono text-sm text-ember-300 hover:bg-ember-700/40 transition-all"
      >
        Try Again
      </Link>
    </section>
  )
}