'use client'

import { useTranslations } from 'next-intl'
import LanguageSwitcher from '../../shared/components/LanguageSwitcher'
import styles from './page.module.scss'

export default function Home() {
  const t = useTranslations('homepage')

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <LanguageSwitcher />
        <h1>{t('title')}</h1>
        <h2>{t('subtitle')}</h2>
        <p>{t('description')}</p>
      </div>
    </main>
  )
}
