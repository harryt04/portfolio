import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import './globals.css'

import { cn } from '@/lib/utils'
import { PostHogProvider } from '@/providers/posthogProvider'
import { ThemeProvider } from '@/providers/themeProvider'

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  metadataBase: new URL('https://harryt.dev'),
  title: 'Harry Thomas — Staff Software Engineer',
  description:
    'Harry Thomas is a staff software engineer who builds web and mobile products.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased',
          fontSans.variable,
        )}
      >
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="harryt-portfolio-theme"
          >
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
