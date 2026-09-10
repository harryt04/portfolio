'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Github, MonitorUp, X } from 'lucide-react'

import type { PortfolioProject } from '@/lib/portfolio-projects'
import { cn } from '@/lib/utils'

const desktopQuery = '(min-width: 768px)'

function useDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(desktopQuery)
    const update = () => setIsDesktop(media.matches)

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isDesktop
}

function previewUrl(liveUrl: string) {
  const url = new URL(liveUrl)
  url.searchParams.set('embed', 'portfolio')
  return url.toString()
}

function ProjectPreview({
  project,
  isDesktop,
  isMobileOpen,
}: {
  project: PortfolioProject
  isDesktop: boolean
  isMobileOpen: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [desktopEligible, setDesktopEligible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const mounted =
    project.previewEnabled && (isDesktop ? desktopEligible : isMobileOpen)

  useEffect(() => {
    if (!isDesktop || !project.previewEnabled || desktopEligible) return

    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDesktopEligible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [desktopEligible, isDesktop, project.previewEnabled])

  useEffect(() => {
    setLoaded(false)
    setTimedOut(false)
    if (!mounted) return

    const timeout = window.setTimeout(() => setTimedOut(true), 9000)
    return () => window.clearTimeout(timeout)
  }, [mounted])

  return (
    <div
      ref={containerRef}
      className="project-preview"
      aria-label={`${project.name} preview`}
    >
      <div aria-hidden="true" className="browser-bar">
        <span />
        <span />
        <span />
        <span className="browser-address">{project.name.toLowerCase()}</span>
      </div>

      {!project.previewEnabled ? (
        <PreviewFallback
          project={project}
          detail={project.previewDisabledReason}
        />
      ) : mounted ? (
        <>
          {!loaded && !timedOut && <PreviewSkeleton project={project} />}
          {timedOut && !loaded && <PreviewFallback project={project} />}
          <iframe
            title={`${project.name} live preview`}
            src={previewUrl(project.liveUrl)}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => setLoaded(true)}
            className={cn(
              'h-full w-full border-0 transition-opacity',
              loaded ? 'opacity-100' : 'opacity-0',
            )}
          />
          {loaded && (
            <span className="live-status">
              <span aria-hidden="true" /> Live
            </span>
          )}
        </>
      ) : (
        <PreviewPlaceholder project={project} />
      )}
    </div>
  )
}

function PreviewPlaceholder({ project }: { project: PortfolioProject }) {
  return (
    <div className="preview-message" aria-hidden="true">
      <MonitorUp className="h-6 w-6" />
      <span>{project.name}</span>
    </div>
  )
}

function PreviewSkeleton({ project }: { project: PortfolioProject }) {
  return (
    <div className="preview-message absolute inset-x-0 bottom-0 top-8 animate-pulse">
      <span className="sr-only">Loading {project.name} live preview</span>
      <div aria-hidden="true" className="w-2/3 space-y-3">
        <span className="block h-5 rounded-sm bg-muted" />
        <span className="block h-3 rounded-sm bg-muted" />
        <span className="block h-3 w-3/4 rounded-sm bg-muted" />
      </div>
    </div>
  )
}

function PreviewFallback({
  project,
  detail,
}: {
  project: PortfolioProject
  detail?: string
}) {
  return (
    <div className="preview-message absolute inset-x-0 bottom-0 top-8 z-10 px-5 text-center">
      <MonitorUp aria-hidden="true" className="h-6 w-6" />
      <span className="font-semibold text-foreground">{project.name}</span>
      <span className="max-w-xs text-xs text-muted-foreground">
        {detail ??
          'Live preview unavailable. The app and source links still work.'}
      </span>
    </div>
  )
}

export function ProjectShowcase({
  projects,
}: {
  projects: PortfolioProject[]
}) {
  const isDesktop = useDesktopViewport()
  const [openMobilePreview, setOpenMobilePreview] = useState<string | null>(
    null,
  )

  return (
    <ul className="grid list-none gap-5 p-0 md:grid-cols-2 md:gap-7">
      {projects.map((project) => {
        const isOpen = openMobilePreview === project.slug

        return (
          <li key={project.slug} className="project-card group">
            <div className="order-1 flex flex-1 flex-col p-5 sm:p-6 md:order-2">
              <h2 className="text-xl font-bold tracking-[-0.025em]">
                {project.name}
              </h2>
              <p className="mt-2 min-h-[2.9em] text-[0.95rem] leading-[1.5] text-muted-foreground">
                {project.description}
              </p>

              {project.previewEnabled ? (
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobilePreview(isOpen ? null : project.slug)
                  }
                  aria-expanded={isOpen}
                  aria-controls={`${project.slug}-preview`}
                  className="portfolio-action mt-5 w-full md:hidden"
                >
                  {isOpen ? (
                    <X aria-hidden="true" className="h-[18px] w-[18px]" />
                  ) : (
                    <MonitorUp
                      aria-hidden="true"
                      className="h-[18px] w-[18px]"
                    />
                  )}
                  {isOpen ? 'Close live preview' : 'Load live preview'}
                </button>
              ) : (
                <div className="mt-5 flex min-h-11 items-center justify-center gap-2 border border-dashed border-border px-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground md:hidden">
                  <MonitorUp aria-hidden="true" className="h-4 w-4" />
                  Preview unavailable
                </div>
              )}

              <div className="mt-3 grid grid-cols-2 gap-2 md:mt-6">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="portfolio-action"
                >
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  Open app
                </Link>
                <Link
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="portfolio-action"
                >
                  <Github aria-hidden="true" className="h-4 w-4" />
                  Source
                </Link>
              </div>
            </div>

            <div
              id={`${project.slug}-preview`}
              className={cn(
                'order-2 px-5 pb-5 sm:px-6 sm:pb-6 md:order-1 md:p-0',
                !isDesktop && !isOpen && 'hidden md:block',
              )}
            >
              <ProjectPreview
                project={project}
                isDesktop={isDesktop}
                isMobileOpen={isOpen}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
