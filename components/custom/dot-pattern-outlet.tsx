'use client'

import { cn } from '@/lib/utils'
import DotPattern from '@/components/magicui/dot-pattern'

export function DotPatternOutlet({ children }) {
  return (
    <div>
      {children}
      <DotPattern
        className={cn(
          '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
        )}
      />
    </div>
  )
}
