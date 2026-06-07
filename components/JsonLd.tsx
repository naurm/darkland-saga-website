import { SITE, BOOKS } from "@/lib/constants"

/**
 * JSON-LD structured data for the Darkland Saga website.
 * Renders schema.org markup for: WebSite, Author, Book (x2).
 */
export default function JsonLd() {
  const baseUrl = SITE.url

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: baseUrl,
    description: SITE.description,
    author: {
      "@type": "Person",
      name: "J.L. Allred",
      url: baseUrl,
      description: SITE.description,
      sameAs: [
        "https://www.royalroad.com/fiction/159610/darkness-kindled",
        "https://bridgeoftwo.com",
      ],
    },
  }

  const booksSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Book",
      name: BOOKS.darknessKindled.title,
      alternateName: "Darkness Kindled: Book One of the Darkland Saga",
      description: BOOKS.darknessKindled.synopsis,
      isPartOf: {
        "@type": "BookSeries",
        name: "The Darkland Saga",
        description: "Nobledark fantasy series by J.L. Allred — stories of living darkness, impossible choices, and light that pushes back.",
        bookCount: 2,
      },
      author: {
        "@type": "Person",
        name: "J.L. Allred",
      },
      genre: ["Fantasy", "Nobledark Fantasy", "Epic Fantasy"],
      inLanguage: "en",
      workExample: {
        "@type": "CreativeWork",
        url: BOOKS.darknessKindled.free
          ? "https://www.royalroad.com/fiction/159610/darkness-kindled"
          : `${baseUrl}/books`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Book",
      name: BOOKS.huntingMisfortune.title,
      alternateName: "Hunting Misfortune: A Darkland Saga Novel (Prequel)",
      description: BOOKS.huntingMisfortune.synopsis,
      isPartOf: {
        "@type": "BookSeries",
        name: "The Darkland Saga",
        bookCount: 2,
      },
      author: {
        "@type": "Person",
        name: "J.L. Allred",
      },
      genre: ["Fantasy", "Nobledark Fantasy", "Epic Fantasy"],
      inLanguage: "en",
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {booksSchema.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}