'use client'

import { useTranslations } from 'next-intl'

import styles from './page.module.scss'
import { HomePageExploreEgyptSection } from './component/NewHeroSection'
import { HistoricalEras } from './component/HistoricalEras'

export default function Home() {
  const t = useTranslations('homepage')

  return (
    <div>
      <HomePageExploreEgyptSection />
      <HistoricalEras />
    </div>
  )
}
