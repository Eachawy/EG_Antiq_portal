import styles from './page.module.scss'

export default function Map() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Map</h1>
        <p>Interactive map of all available sites and locations.</p>
        <div className={styles.mapPlaceholder}>
          <p>Map will be integrated here</p>
        </div>
      </div>
    </main>
  )
}
