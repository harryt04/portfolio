import type { Metadata } from 'next'
import Link from 'next/link'
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

const externalLinks = [
  {
    label: 'My resume',
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
    <main className="portfolio-grid min-h-[100svh]">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 px-4 backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
          <Link
            href="/"
            className="focus-ring flex min-h-11 items-center gap-2 font-mono text-sm font-semibold tracking-[-0.02em]"
          >
            <span className="hidden sm:inline">Harry Thomas</span>
            <span className="sm:hidden">HT</span>
            <span aria-hidden="true" className="text-accent">
              /
            </span>
            <span className="text-muted-foreground">My work</span>
          </Link>

          <nav
            aria-label="Portfolio navigation"
            className="flex items-center gap-1"
          >
            <Link href="/" className="header-link">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Home
            </Link>
            <div className="hidden items-center gap-1 md:flex">
              {externalLinks.map(({ label, href, external }) => (
                <Link
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="header-link"
                >
                  {label}
                </Link>
              ))}
            </div>
            <ThemeSwitcher />
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-[max(3rem,env(safe-area-inset-bottom))] pt-14 sm:px-8 sm:pt-20 lg:px-12">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Selected projects
          </p>
          <h1 className="text-[2.75rem] font-bold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            My work
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Personal products and open-source projects. Open the app or inspect
            the source.
          </p>
        </div>

        <section aria-label="Personal projects">
          <ProjectShowcase projects={portfolioProjects} />
        </section>

        <footer className="mt-14 border-t border-border py-8 md:hidden">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Elsewhere
          </p>
          <nav aria-label="Additional portfolio links" className="grid gap-2">
            {externalLinks.map(({ label, href, icon: Icon, external }) => (
              <Link
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="portfolio-action justify-start px-4"
              >
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                {label}
              </Link>
            ))}
          </nav>
        </footer>
      </div>
    </main>
  )
}
