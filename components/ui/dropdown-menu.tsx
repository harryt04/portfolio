'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import * as Parts from '@ui-sdk/react/menu'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from '@/lib/utils'

type StyledProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  'className' | 'children'
> & { className?: string; children?: React.ReactNode }

const DropdownMenu = Parts.Menu

function DropdownMenuTrigger({
  asChild,
  children,
  ...props
}: StyledProps<typeof Parts.MenuTrigger> & { asChild?: boolean }) {
  if (asChild)
    return (
      <Parts.MenuTrigger
        {...props}
        render={React.Children.only(children) as React.ReactElement}
      />
    )
  return <Parts.MenuTrigger {...props}>{children}</Parts.MenuTrigger>
}

const DropdownMenuGroup = Parts.MenuGroup

function DropdownMenuPortal({
  children,
  container,
}: {
  children: React.ReactNode
  container?: Element | DocumentFragment
}) {
  return typeof document === 'undefined'
    ? null
    : createPortal(children, container ?? document.body)
}

const DropdownMenuSub = Parts.MenuSub

const DropdownMenuRadioGroup = Parts.MenuRadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  StyledProps<typeof Parts.MenuSubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <Parts.MenuSubTrigger
    ref={ref}
    className={cn(
      'data-highlighted:bg-accent data-open:bg-accent flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </Parts.MenuSubTrigger>
))
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger'

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  StyledProps<typeof Parts.MenuSubContent>
>(({ className, ...props }, ref) => (
  <Parts.MenuSubContent
    ref={ref}
    className={cn(
      'bg-popover text-popover-foreground data-open:animate-in data-ending-style:animate-out data-ending-style:fade-out-0 data-open:fade-in-0 data-ending-style:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-lg',
      className,
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent'

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  StyledProps<typeof Parts.MenuContent>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Parts.MenuContent
    ref={ref}
    sideOffset={sideOffset}
    container={typeof document === 'undefined' ? undefined : document.body}
    className={cn(
      'bg-popover text-popover-foreground data-open:animate-in data-ending-style:animate-out data-ending-style:fade-out-0 data-open:fade-in-0 data-ending-style:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-md',
      className,
    )}
    {...props}
  />
))
DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  StyledProps<typeof Parts.MenuItem> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <Parts.MenuItem
    ref={ref}
    className={cn(
      'data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = 'DropdownMenuItem'

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  StyledProps<typeof Parts.MenuCheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <Parts.MenuCheckboxItem
    ref={ref}
    className={cn(
      'data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Parts.MenuItemIndicator>
        <Check className="h-4 w-4" />
      </Parts.MenuItemIndicator>
    </span>
    {children}
  </Parts.MenuCheckboxItem>
))
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  StyledProps<typeof Parts.MenuRadioItem>
>(({ className, children, ...props }, ref) => (
  <Parts.MenuRadioItem
    closeOnSelect
    ref={ref}
    className={cn(
      'data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Parts.MenuItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </Parts.MenuItemIndicator>
    </span>
    {children}
  </Parts.MenuRadioItem>
))
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem'

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = 'DropdownMenuLabel'

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  StyledProps<typeof Parts.MenuSeparator>
>(({ className, ...props }, ref) => (
  <Parts.MenuSeparator
    ref={ref}
    className={cn('bg-muted -mx-1 my-1 h-px', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
