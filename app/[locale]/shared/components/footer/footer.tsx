'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import styles from './footer.module.scss'

export default function Footer() {
    const pathname = usePathname()
    const t = useTranslations('footer')

    return (
        <div className={styles.nav}>
            {t('copyright')}
        </div>
    )
}
