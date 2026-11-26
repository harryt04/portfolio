import type { Metadata } from 'next'
import { NavigationLink } from '@/components/ui/button'
import { ArrowLeft, FileText } from 'lucide-react'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

import { ProjectShowcase } from '@/components/custom/projectShowcase'
import { ThemeSwitcher } from '@/components/custom/themeSwitcher'
import { portfolioProjects } from '@/lib/portfolio-projects'

export const metadata: Metadata = {
  title: 'My Work — Harry Thomas',
  description:
    'Personal products and open-source projects built by Harry Thomas.',
  alternates: { canonical: '/work' },
}

// Static files and external profiles, rendered as plain anchors so Next does
// not prefetch them (the résumé PDF would otherwise download as an RSC fetch).
const externalLinks = [
  {
    label: 'My résumé',
    href: '/resume.pdf',
    icon: FileText,
    external: false,
  },
  {
    label: 'My GitHub',
    href: 'https://github.com/harryt04',
    icon: GitHubLogoIcon,
    external: true,
  },
  {
    label: 'My LinkedIn',
    href: 'https://www.linkedin.com/in/harrison-thomas04/',
    icon: LinkedInLogoIcon,
    external: true,
  },
] as const

export default function WorkPage() {
  return (
    <main className="portfolio-grid min-h-svh">
      <header className="border-border/80 bg-background/95 sticky top-0 z-40 border-b px-4 backdrop-blur-xs sm:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
          <NavigationLink
            route
            href="/"
            className="focus-ring flex min-h-11 items-center gap-2 font-mono text-sm font-semibold tracking-[-0.02em]"
          >
            <span>Harry Thomas</span>
            <span aria-hidden="true" className="text-accent">
              /
            </span>
            <span className="text-muted-foreground">Work</span>
          </NavigationLink>

          <nav
            aria-label="Portfolio navigation"
            className="flex items-center gap-1"
          >
            <NavigationLink route href="/" className="header-link">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Home
            </NavigationLink>
            <div className="hidden items-center gap-1 md:flex">
              {externalLinks.map(({ label, href, external }) => (
                <NavigationLink
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="header-link"
                >
                  {label}
                </NavigationLink>
              ))}
            </div>
            <ThemeSwitcher />
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pt-14 pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-20 lg:px-12">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <p className="text-accent mb-3 font-mono text-xs font-semibold tracking-[0.18em] uppercase">
            Harry Thomas / Staff Software Engineer
          </p>
          <h1 className="text-[2.5rem] leading-[0.95] font-bold tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            My work
          </h1>
          <p className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg">
            Personal products and open-source projects by Harry Thomas. Open the
            app or inspect the source.
          </p>
        </div>

        <section aria-label="Personal projects">
          <ProjectShowcase projects={portfolioProjects} />
        </section>

        <footer className="border-border mt-14 border-t py-8 md:hidden">
          <p className="text-muted-foreground mb-4 font-mono text-xs tracking-[0.16em] uppercase">
            Elsewhere
          </p>
          <nav aria-label="Additional portfolio links" className="grid gap-2">
            {externalLinks.map(({ label, href, icon: Icon, external }) => (
              <NavigationLink
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="portfolio-action justify-start px-4"
              >
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                {label}
              </NavigationLink>
            ))}
          </nav>
        </footer>
      </div>
    </main>
  )
}
