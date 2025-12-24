import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Next.js with TypeScript & SASS</h1>
        <p>Custom Webpack Configuration</p>
      </div>
    </main>
  )
}
