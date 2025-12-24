import { createNavigation } from 'next-intl/navigation'

export const locales = ['en', 'ar'] as const
export const defaultLocale = 'en' as const

export const routing = {
  locales,
  defaultLocale,
}

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
