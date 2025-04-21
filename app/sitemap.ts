import type { MetadataRoute } from "next"
import { generateSitemapData } from "@/lib/location-utils"
import { agents } from "@/data/agents"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { locations, suburbs } = await generateSitemapData()

  const baseUrl = "https://realtymate.com"

  // Core pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/find-agents`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ]

  // Location pages
  const locationPages = locations.map((location) => ({
    url: `${baseUrl}/find-agents/${location}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }))

  // Suburb pages
  const suburbPages = suburbs.map(({ location, suburb }) => ({
    url: `${baseUrl}/find-agents/${location}/${suburb}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }))

  // Agent pages
  const agentPages = agents.map((agent) => ({
    url: `${baseUrl}/find-agents/agent/${agent.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [...staticPages, ...locationPages, ...suburbPages, ...agentPages]
}
