export default function CompanionLoading() {
  return (
    <section className="mx-auto max-w-lg px-6 pt-24 pb-12">
      <div className="mb-10 text-center">
        <div className="companion-section-rule mb-6">
          <span className="companion-section-ornament">✦</span>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="h-4 w-4 animate-pulse rounded-full bg-ember-600/50" />
          <span className="ml-3 text-sm text-parchment-500 font-mono tracking-wider">LOADING</span>
        </div>
        <div className="companion-section-rule companion-section-rule--flip mt-6">
          <span className="companion-section-ornament">✦</span>
        </div>
      </div>
    </section>
  )
}