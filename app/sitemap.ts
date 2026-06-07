import type { MetadataRoute } from "next"
import { SITE } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/books`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/why-fantasy`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/world-of-eadrom`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/support`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/companion`, changeFrequency: "weekly" as const, priority: 0.4 },
  ]

  return staticPages
}