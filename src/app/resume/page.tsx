'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Resume() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Home</Link>
        <h1 className={styles.title}>Resume</h1>
      </header>

      <main className={styles.main}>
        {/* About */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.description}>
            Make systems with data, currently working at{' '}
            <a href="https://981park.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
              @9.81park
            </a>
          </p>
        </section>

        {/* Work Experience */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <div className={styles.item}>
            <div className={styles.itemHeader}>
              <h3 className={styles.itemTitle}>9.81park</h3>
              <span className={styles.period}>2024 - Present</span>
            </div>
            <p className={styles.role}>System Engineer</p>
            <p className={styles.itemDescription}>
              Building data-driven systems and infrastructure.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skills}>
            <span className={styles.skill}>Systems Design</span>
            <span className={styles.skill}>Data Engineering</span>
            <span className={styles.skill}>Infrastructure</span>
          </div>
        </section>

        {/* Contact */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <div className={styles.contact}>
            <a href="https://981park.com" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              9.81park
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
