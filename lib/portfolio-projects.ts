export type PortfolioProject = {
  slug: string
  name: string
  description: string
  liveUrl: string
  sourceUrl: string
  previewEnabled: boolean
  previewDisabledReason?: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'kanji-forge',
    name: 'KanjiForge',
    description: 'Offline-first kanji and vocabulary study PWA.',
    liveUrl: 'https://kanjiforge.app',
    sourceUrl: 'https://github.com/harryt04/kanji-forge',
    previewEnabled: true,
  },
  {
    slug: 'platter',
    name: 'Platter',
    description: 'Recipes into one trustworthy, shared grocery list.',
    liveUrl: 'https://platter.harryt.dev',
    sourceUrl: 'https://github.com/harryt04/platter',
    previewEnabled: false,
    previewDisabledReason: 'Preview unavailable while HTTPS is being repaired.',
  },
  {
    slug: 'blockparty',
    name: 'Blockparty',
    description: 'Private multiplayer board game with a deterministic engine.',
    liveUrl: 'https://blockparty.harryt.dev',
    sourceUrl: 'https://github.com/harryt04/blockparty',
    previewEnabled: true,
  },
  {
    slug: 'mail-flow',
    name: 'MailFlow',
    description: 'A voice-first, hands-free experience for Gmail.',
    liveUrl: 'https://mail.harryt.dev',
    sourceUrl: 'https://github.com/harryt04/mail-flow',
    previewEnabled: true,
  },
  {
    slug: 'pantry-iq',
    name: 'PantryIQ',
    description: 'Explainable restaurant waste analysis from operational data.',
    liveUrl: 'https://pantry-iq.com',
    sourceUrl: 'https://github.com/harryt04/pantry-iq',
    previewEnabled: true,
  },
  {
    slug: 'voice-bridge',
    name: 'VoiceBridge',
    description: 'Visual communication tools for autistic people and families.',
    liveUrl: 'https://vb.harryt.dev',
    sourceUrl: 'https://github.com/harryt04/voice-bridge',
    previewEnabled: true,
  },
  {
    slug: 'grub-roulette',
    name: 'Grub Roulette',
    description: 'A simple way to discover a random local restaurant.',
    liveUrl: 'https://grub.harryt.dev',
    sourceUrl: 'https://github.com/harryt04/grub-roulette',
    previewEnabled: true,
  },
  {
    slug: 'sunshine-flower-bar',
    name: 'Sunshine Flower Bar',
    description: 'A warm gifting brand and customer lead experience.',
    liveUrl: 'https://www.sunshineflowerbar.com',
    sourceUrl: 'https://github.com/harryt04/flowers',
    previewEnabled: true,
  },
  {
    slug: 'route-roulette',
    name: 'Route Roulette',
    description: 'Random scenic-drive planning near your location.',
    liveUrl: 'https://rr.harryt.dev',
    sourceUrl: 'https://github.com/harryt04/route-roulette',
    previewEnabled: true,
  },
  {
    slug: 'tokei',
    name: 'Tokei',
    description: 'A multi-timer workspace designed for busy kitchens.',
    liveUrl: 'https://tokei.harryt.dev',
    sourceUrl: 'https://github.com/harryt04/tokei',
    previewEnabled: true,
  },
]
