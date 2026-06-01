import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { breakingNews, categories, BRAND_TAGLINE } from '../data/initialData'
import styles from './Header.module.css'

export default function Header() {
  const [tickerIndex, setTickerIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex(i => (i + 1) % breakingNews.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className={styles.header}>
      {/* Breaking news ticker */}
      <div className={styles.ticker}>
        <span className={styles.tickerLabel}>🔴 חם עכשיו</span>
        <div className={styles.tickerContent}>
          <span key={tickerIndex} className={styles.tickerText}>
            {breakingNews[tickerIndex]}
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className={styles.mainHeader}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoH}>ה</span>
            <span className={styles.logoBang}>!</span>
            <span className={styles.logoM}>מ</span>
            <span className={styles.logoBang}>!</span>
            <span className={styles.logoEnd}>עית</span>
          </Link>

          <div className={styles.taglineWrap}>
            <div className={styles.tagline}>{BRAND_TAGLINE}</div>
            <div className={styles.splat}>💦</div>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.navInner}>
            <Link to="/" className={styles.navLink}>🏠 ראשי</Link>
            {categories.map((cat, i) => (
              <Link key={cat} to={`/?cat=${cat}`} className={`${styles.navLink} ${styles['navColor' + (i % 5)]}`}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
