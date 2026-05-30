import { LINKS } from "@/lib/constants"
import Link from "next/link"
import RotatingQuote, { type Quote } from "@/components/RotatingQuote"

const authorQuotes: Quote[] = [
  {
    text: "You have to write the book that wants to be written. And if the book will be too difficult for grown-ups, then you write it for children.",
    source: "Madeleine L'Engle",
  },
  {
    text: "All you have to do is write one true sentence. Write the truest sentence that you know.",
    source: "Ernest Hemingway",
  },
  {
    text: "Fill your paper with the breathings of your heart.",
    source: "William Wordsworth",
  },
  {
    text: "There is something delicious about writing the first words of a story. You never quite know where they'll take you.",
    source: "Beatrix Potter",
  },
  {
    text: "A story is a way to say something that can't be said any other way, and it takes every word in the story to say what the meaning is.",
    source: "Flannery O'Connor",
  },
  {
    text: "The first business of a story is to be a good story. When Our Lord made a wheel in the carpenter shop, depend upon it: It was first and foremost a good wheel.",
    source: "C.S. Lewis",
  },
  {
    text: "A book, too, can be a star, a living fire to lighten the darkness, leading out into the expanding universe.",
    source: "Madeleine L'Engle",
  },
  {
    text: "The realm of fairy-story is wide and deep and high and filled with many things: all manner of beasts and birds are found there; shoreless seas and stars uncounted; beauty that is an enchantment, and an ever-present peril; both joy and sorrow as sharp as swords.",
    source: "J.R.R. Tolkien",
  },
  {
    text: "Fantasy remains a human right: we make in our measure and in our derivative mode, because we are made: and not only made, but made in the image and likeness of a Maker.",
    source: "J.R.R. Tolkien",
  },
]

export default function WhyFantasyPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ember-500 mb-3">
          On Writing
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-ember-200 mb-8">
          Why Fantasy?
        </h1>

        <div className="space-y-5 text-sm sm:text-base text-parchment-400 leading-relaxed">

          {/* Opening — the Lewis quote anchor */}
          <p>
            C.S. Lewis once wrote that fantasy has the power to &ldquo;steal past our watchful
            dragons&rdquo;&mdash;to bypass the defenses we build around our hearts and speak directly
            to the truths we already know but have forgotten how to hear.
          </p>

          <p>
            That&rsquo;s why I write fantasy. Not because dragons and magic are escapist, but
            because they give us permission to ask the real questions without feeling like
            we&rsquo;re being lectured.
          </p>

          <div className="my-10 border-l-2 border-ember-700/50 pl-5 py-2">
            <p className="font-display text-lg text-ember-300 italic">
              &ldquo;I have to write it in story form to actually experience the inspiration needed to find my way.&rdquo;
            </p>
          </div>

          {/* The Tolkien influence */}
          <p>
            Tolkien&rsquo;s essay &ldquo;On Fairy Stories&rdquo; shaped my understanding of what fantasy
            can do. He described it as a world-building act that creates &ldquo;secondary
            belief&rdquo;&mdash;the moment a reader stops seeing words on a page and starts
            living in the world you&rsquo;ve made. That&rsquo;s the goal. Not to escape reality,
            but to see it more clearly through a different lens.
          </p>

          {/* Art and faith — the Peterson influence */}
          <p>
            Andrew Peterson once said something that reframed writing for me entirely. He
            talks about the intersection of art, faith, and community&mdash;how creating
            stories isn&rsquo;t just about pursuing a dream, but about loving your neighbor.
            Fantasy, at its best, gives people a way to wrestle with hope, loss, redemption,
            and sacrifice&mdash;the things that matter most&mdash;in a space that feels safe
            enough to feel them.
          </p>

          {/* The story's purpose */}
          <div className="my-10 border-l-2 border-ember-700/50 pl-5 py-2">
            <p className="font-display text-lg text-ember-300 italic">
              &ldquo;Themes of redemption, corruption, and self-sacrifice. The tension in how far you go to protect those you care about. And a painful theme of sometimes being unable to save those we care about.&rdquo;
            </p>
          </div>

          <p>
            The Darkland Saga lives in that space between hope and despair. The darkness is
            real. The stakes are high. But the light is always worth fighting for&mdash;because
            the stories that stay with us aren&rsquo;t the ones where everything goes right.
            They&rsquo;re the ones where people make impossible choices, fail, get back up, and
            choose again.
          </p>

          {/* Closing */}
          <p>
            Whether building new worlds or exploring old truths, the stories of the Darkland
            Saga remind us that light overcomes darkness&mdash;and hope always has the final word.
          </p>
        </div>
      </section>

      {/* Author quotes rotator */}
      <section className="mx-auto max-w-3xl px-6 py-16 border-t border-ember-dim text-center">
        <div className="max-w-lg mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-6">
            Voices on Writing &amp; Story
          </p>
          <RotatingQuote quotes={authorQuotes} intervalMs={10000} />
          <p className="mt-6 font-mono text-[11px] text-parchment-600">
            click to advance
          </p>
        </div>
      </section>

      {/* Coda — reading recommendation */}
      <section className="mx-auto max-w-3xl px-6 py-16 border-t border-ember-dim text-center">
        <div className="max-w-md mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-500 mb-3">
            Recommended Reading
          </p>
          <p className="text-sm text-parchment-400 leading-relaxed mb-2">
            If this resonates, Tolkien&rsquo;s essay &ldquo;On Fairy Stories&rdquo; is where I&rsquo;d point you first.
          </p>
          <p className="text-sm text-parchment-500 leading-relaxed">
            Then come explore the Darkland Saga.
          </p>
          <div className="mt-6">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 rounded border border-ember-600 bg-ember-700/20 px-5 py-2.5 font-mono text-sm text-ember-300 hover:bg-ember-700/40 hover:text-emberglow-bright transition-all emberglow"
            >
              Explore the Books
              <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
