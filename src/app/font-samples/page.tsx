'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function FontSamples() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>← Back to Home</Link>

      <h1 className={styles.pageTitle}>한줄소개 폰트 비교</h1>
      <p className={styles.description}>각 폰트의 타이핑 효과를 비교해보세요 (페이지 새로고침하면 다시 재생됩니다)</p>

      <div className={styles.samples}>
        {/* 1. Pretendard */}
        <div className={styles.sample}>
          <h2 className={styles.sampleTitle}>1. Pretendard</h2>
          <p className={styles.sampleDesc}>한글과 영문이 조화로운 범용 폰트</p>
          <div className={styles.typingContainer}>
            <p className={`${styles.typingText} ${styles.pretendard}`}>
              Make systems with data, currently working{' '}
              <a href="https://981park.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                @9.81park
              </a>
            </p>
          </div>
        </div>

        {/* 2. D2Coding */}
        <div className={styles.sample}>
          <h2 className={styles.sampleTitle}>2. D2Coding</h2>
          <p className={styles.sampleDesc}>네이버 D2의 코딩 전용 폰트</p>
          <div className={styles.typingContainer}>
            <p className={`${styles.typingText} ${styles.d2coding}`}>
              Make systems with data, currently working{' '}
              <a href="https://981park.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                @9.81park
              </a>
            </p>
          </div>
        </div>

        {/* 3. JetBrains Mono */}
        <div className={styles.sample}>
          <h2 className={styles.sampleTitle}>3. JetBrains Mono</h2>
          <p className={styles.sampleDesc}>개발자에게 최적화된 모노스페이스 폰트</p>
          <div className={styles.typingContainer}>
            <p className={`${styles.typingText} ${styles.jetbrains}`}>
              Make systems with data, currently working{' '}
              <a href="https://981park.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                @9.81park
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.notes}>
        <h3>폰트 특징 비교</h3>
        <ul>
          <li><strong>Pretendard:</strong> 가독성 우수, 한글/영문 균형, 범용성 높음</li>
          <li><strong>D2Coding:</strong> 코드 가독성 좋음, 고정폭, 개발자 친화적</li>
          <li><strong>JetBrains Mono:</strong> 고정폭, 리거처 지원, IDE에 최적화</li>
        </ul>
      </div>
    </div>
  );
}
