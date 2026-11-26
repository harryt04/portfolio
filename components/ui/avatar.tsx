'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@ui-sdk/react/avatar'

import { cn } from '@/lib/utils'

type StyledProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<T>,
  'className'
> & { className?: string }

const Avatar = React.forwardRef<
  HTMLSpanElement,
  StyledProps<typeof AvatarPrimitive.Avatar>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Avatar
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
))
Avatar.displayName = 'Avatar'

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  StyledProps<typeof AvatarPrimitive.AvatarImage>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.AvatarImage
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  StyledProps<typeof AvatarPrimitive.AvatarFallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.AvatarFallback
    ref={ref}
    className={cn(
      'bg-muted flex h-full w-full items-center justify-center rounded-full',
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }
