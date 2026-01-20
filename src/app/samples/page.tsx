'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Samples() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>← Back to Home</Link>

      <h1 className={styles.pageTitle}>eunu.log 인터랙션 샘플</h1>
      <p className={styles.description}>각 효과에 마우스를 올려보세요!</p>

      <div className={styles.samples}>
        {/* 1. Wave 애니메이션 */}
        <div className={styles.sample}>
          <h2 className={styles.sampleTitle}>1. Wave 애니메이션</h2>
          <p className={styles.sampleDesc}>호버 시 글자가 순차적으로 물결치듯 움직임</p>
          <div className={styles.waveContainer}>
            {'eunu.log'.split('').map((char, i) => (
              <span
                key={i}
                className={styles.waveChar}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* 2. 글리치 효과 */}
        <div className={styles.sample}>
          <h2 className={styles.sampleTitle}>2. 글리치 효과</h2>
          <p className={styles.sampleDesc}>호버 시 RGB 분리 + 깜빡임 효과</p>
          <div className={styles.glitchContainer}>
            <span className={styles.glitchText} data-text="eunu.log">eunu.log</span>
          </div>
        </div>

        {/* 3. 그라디언트 플로우 */}
        <div className={styles.sample}>
          <h2 className={styles.sampleTitle}>3. 그라디언트 플로우</h2>
          <p className={styles.sampleDesc}>호버 시 그라디언트가 흐름</p>
          <div className={styles.gradientContainer}>
            <span className={styles.gradientText}>eunu.log</span>
          </div>
        </div>

        {/* 4. 3D 회전 */}
        <div className={styles.sample}>
          <h2 className={styles.sampleTitle}>4. 3D 회전</h2>
          <p className={styles.sampleDesc}>호버 시 각 글자가 3D로 회전</p>
          <div className={styles.rotateContainer}>
            {'eunu.log'.split('').map((char, i) => (
              <span
                key={i}
                className={styles.rotateChar}
                style={{ transitionDelay: `${i * 0.03}s` }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* 5. 타이핑 효과 */}
        <div className={styles.sample}>
          <h2 className={styles.sampleTitle}>5. 타이핑 효과</h2>
          <p className={styles.sampleDesc}>로드 시 타이핑되는 애니메이션 (페이지 새로고침 해보세요)</p>
          <div className={styles.typingContainer}>
            <span className={styles.typingText}>eunu.log</span>
          </div>
        </div>
      </div>
    </div>
  );
}
