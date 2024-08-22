import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://harryt.dev',
      lastModified: new Date(),
    },
    {
      url: 'https://harryt.dev/resume.pdf',
      lastModified: new Date(),
    },
  ]
}
