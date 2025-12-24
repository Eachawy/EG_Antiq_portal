import styles from './page.module.scss'

export default function TourGuides() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Tour Guides</h1>
        <p>Meet our experienced tour guides and book your guided tour.</p>
        <div className={styles.guidesGrid}>
          <div className={styles.guidePlaceholder}>Guide 1</div>
          <div className={styles.guidePlaceholder}>Guide 2</div>
          <div className={styles.guidePlaceholder}>Guide 3</div>
        </div>
      </div>
    </main>
  )
}
