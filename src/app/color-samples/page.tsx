'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function ColorSamples() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>← Back to Home</Link>
      <h1 className={styles.pageTitle}>포인트 컬러 비교</h1>
      <p className={styles.description}>Resume 페이지 레이아웃으로 3가지 색상을 비교해보세요</p>

      <div className={styles.samples}>
        {/* 1. 클래식 블루 */}
        <div className={`${styles.sample} ${styles.classicBlue}`}>
          <h2 className={styles.sampleTitle}>1. 클래식 블루 (#0066CC)</h2>
          <p className={styles.sampleDesc}>신문/블로그 전통적 링크색, 가독성 우수</p>

          <div className={styles.resumePreview}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>About</h3>
              <p className={styles.description}>
                Make systems with data, currently working at{' '}
                <a href="https://981park.com" className={styles.link}>
                  @9.81park
                </a>
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Work Experience</h3>
              <div className={styles.item}>
                <div className={styles.itemHeader}>
                  <h4 className={styles.itemTitle}>9.81park</h4>
                  <span className={styles.period}>2024 - Present</span>
                </div>
                <p className={styles.role}>System Engineer</p>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Skills</h3>
              <div className={styles.skills}>
                <span className={styles.skill}>Systems Design</span>
                <span className={styles.skill}>Data Engineering</span>
                <span className={styles.skill}>Infrastructure</span>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Contact</h3>
              <a href="https://981park.com" className={styles.contactLink}>
                9.81park
              </a>
            </section>
          </div>
        </div>

        {/* 2. 브라이트 블루 */}
        <div className={`${styles.sample} ${styles.brightBlue}`}>
          <h2 className={styles.sampleTitle}>2. 브라이트 블루 (#1E90FF)</h2>
          <p className={styles.sampleDesc}>현대적이고 밝은 느낌, 시원한 느낌</p>

          <div className={styles.resumePreview}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>About</h3>
              <p className={styles.description}>
                Make systems with data, currently working at{' '}
                <a href="https://981park.com" className={styles.link}>
                  @9.81park
                </a>
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Work Experience</h3>
              <div className={styles.item}>
                <div className={styles.itemHeader}>
                  <h4 className={styles.itemTitle}>9.81park</h4>
                  <span className={styles.period}>2024 - Present</span>
                </div>
                <p className={styles.role}>System Engineer</p>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Skills</h3>
              <div className={styles.skills}>
                <span className={styles.skill}>Systems Design</span>
                <span className={styles.skill}>Data Engineering</span>
                <span className={styles.skill}>Infrastructure</span>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Contact</h3>
              <a href="https://981park.com" className={styles.contactLink}>
                9.81park
              </a>
            </section>
          </div>
        </div>

        {/* 3. 퓨어 블랙 */}
        <div className={`${styles.sample} ${styles.pureBlack}`}>
          <h2 className={styles.sampleTitle}>3. 퓨어 블랙 (#000000)</h2>
          <p className={styles.sampleDesc}>미니멀하고 깔끔, 심플함</p>

          <div className={styles.resumePreview}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>About</h3>
              <p className={styles.description}>
                Make systems with data, currently working at{' '}
                <a href="https://981park.com" className={styles.link}>
                  @9.81park
                </a>
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Work Experience</h3>
              <div className={styles.item}>
                <div className={styles.itemHeader}>
                  <h4 className={styles.itemTitle}>9.81park</h4>
                  <span className={styles.period}>2024 - Present</span>
                </div>
                <p className={styles.role}>System Engineer</p>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Skills</h3>
              <div className={styles.skills}>
                <span className={styles.skill}>Systems Design</span>
                <span className={styles.skill}>Data Engineering</span>
                <span className={styles.skill}>Infrastructure</span>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Contact</h3>
              <a href="https://981park.com" className={styles.contactLink}>
                9.81park
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
