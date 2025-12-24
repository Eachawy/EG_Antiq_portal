import styles from './page.module.scss'

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>About Us</h1>
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Our Mission</h2>
            <p>
              We are dedicated to preserving and sharing the rich cultural heritage
              of historical sites around the world.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Our History</h2>
            <p>
              Founded with a passion for history and education, we have been connecting
              visitors with amazing historical sites for years.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Our Team</h2>
            <p>
              Our team consists of experienced historians, archaeologists, and tour
              professionals committed to providing exceptional experiences.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
