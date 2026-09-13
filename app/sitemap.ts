import type { MetadataRoute } from 'next'

const siteUrl = 'https://harryt.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/work` },
    { url: `${siteUrl}/resume.pdf` },
  ]
}
