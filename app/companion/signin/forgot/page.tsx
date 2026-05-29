import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <section className="mx-auto max-w-md px-6 pt-24 pb-12">
      <div className="mb-10 text-center">
        <div className="companion-section-rule mb-6">
          <span className="companion-section-ornament">✦</span>
        </div>
        <div className="mb-4">
          <svg className="mx-auto h-8 w-6 text-ember-400" viewBox="0 0 32 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M16 4v3"/><path d="M10 7h12"/>
            <path d="M8 10l3 18h18l3-18z"/>
            <line x1="12" y1="18" x2="28" y2="18"/>
            <path d="M12 28l-2 4h20l-2-4"/>
            <circle cx="20" cy="14" r="1.5" fill="currentColor"/>
          </svg>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-2">
          The Companion Archive
        </p>
        <h1 className="font-display text-3xl text-ember-200 emberglow-text">Forgot Password</h1>
        <div className="companion-section-rule companion-section-rule--flip mt-6">
          <span className="companion-section-ornament">✦</span>
        </div>
      </div>

      <div className="companion-plaque p-6 md:p-8 max-w-sm mx-auto">
        <div className="companion-plaque-inner p-6 text-center">
          <p className="text-sm text-parchment-300 mb-4">
            Contact us to reset your password.
          </p>
          <p className="text-sm text-parchment-400 mb-6">
            Send an email to{" "}
            <a href="mailto:jlallred.author@gmail.com" className="text-ember-400 hover:text-emberglow-bright">
              jlallred.author@gmail.com
            </a>{" "}
            with the email address associated with your account and we&apos;ll get you a new password.
          </p>
          <a
            href="mailto:jlallred.author@gmail.com?subject=Companion%20Password%20Reset&body=I%20need%20a%20password%20reset%20for%20my%20Companion%20account.%20My%20email%20is%3A%20"
            className="inline-flex items-center gap-2 rounded border border-ember-600 bg-ember-700/20 px-5 py-2.5 font-mono text-sm text-ember-300 hover:bg-ember-700/40 transition-all"
          >
            Send Email
          </a>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-parchment-500">
        <Link href="/companion/signin" className="text-ember-400 hover:text-emberglow-bright">
          ← Back to Sign In
        </Link>
      </p>
    </section>
  )
}