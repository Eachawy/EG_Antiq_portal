'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import styles from './LanguageSwitcher.module.scss'

export default function LanguageSwitcher() {
  const t = useTranslations('common')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className={styles.languageSwitcher}>
      <label htmlFor="language-select" className={styles.label}>
        {t('language')}:
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => switchLanguage(e.target.value)}
        className={styles.select}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc === 'en' ? 'English' : 'العربية'}
          </option>
        ))}
      </select>
    </div>
  )
}
