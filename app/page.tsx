import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { BriefcaseBusiness, FileText } from 'lucide-react'

import { ThemeSwitcher } from '@/components/custom/themeSwitcher'

export const metadata: Metadata = {
  title: 'Harry Thomas — Staff Software Engineer',
  description:
    'Harry Thomas is a staff software engineer who builds web and mobile products.',
  alternates: { canonical: '/' },
}

const actions = [
  { label: 'My work', href: '/work', icon: BriefcaseBusiness, external: false },
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

export default function Home() {
  return (
    <main className="portfolio-grid relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.09),transparent_48%)]" />
      <section
        aria-labelledby="introduction-heading"
        className="portfolio-window relative w-full max-w-[27rem] px-[clamp(1.125rem,5vw,1.75rem)] pb-7 pt-16 text-center sm:pt-14"
      >
        <div className="absolute right-3 top-3">
          <ThemeSwitcher />
        </div>
        <div className="mx-auto mb-6 w-fit rounded-full border border-accent/70 bg-background p-1 shadow-[0_0_0_4px_hsl(var(--accent)/0.08)]">
          <Image
            src="/harry-thomas.jpg"
            alt="Harry Thomas in ski gear in the mountains"
            width={328}
            height={328}
            priority
            className="h-[132px] w-[132px] rounded-full object-cover sm:h-[164px] sm:w-[164px]"
          />
        </div>
        <div className="space-y-2">
          <h1
            id="introduction-heading"
            className="text-2xl font-bold tracking-[-0.035em] sm:text-[1.75rem]"
          >
            Hi, I&apos;m Harry Thomas
          </h1>
          <p className="text-[0.95rem] text-muted-foreground">
            I&apos;m a staff software engineer.
          </p>
          <p className="text-[0.95rem] text-muted-foreground">
            I have a passion for separating signal from noise.
          </p>
          <p className="text-[0.95rem] text-muted-foreground">
            Please ask me about it! 😊
          </p>
        </div>
        <nav
          aria-label="Harry Thomas links"
          className="mt-7 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2"
        >
          {actions.map(({ label, href, icon: Icon, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="portfolio-action"
            >
              <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  )
}
