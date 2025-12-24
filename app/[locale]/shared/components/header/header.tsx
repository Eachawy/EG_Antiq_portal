'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import styles from './header.module.scss'

export default function Header() {
  const pathname = usePathname()
  const t = useTranslations('navigation')

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/sites', label: t('sites') },
    { href: '/map', label: t('map') },
    { href: '/tour-guides', label: t('tourGuides') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? styles.active : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
