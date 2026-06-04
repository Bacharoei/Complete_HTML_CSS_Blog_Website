import React from 'react'
import { Link } from 'react-router-dom'
import { categories, BRAND_TAGLINE } from '../data/initialData'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.logo}>
              <span className={styles.lD}>D</span>
              <span className={styles.lI}>I</span>
              <span className={styles.lA}>A</span>
              <span className={styles.lR}>R</span>
              <span className={styles.lY}>Y</span>
              <span className={styles.lGemini}>♊</span>
            </div>
            <p className={styles.about}>{BRAND_TAGLINE}</p>
            <p className={styles.about} style={{ marginTop: 8 }}>
              כי כל גמיני צריך לכתוב על זה. אחד מהצדדים שלנו מסכים עם זה.
            </p>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>קטגוריות</h4>
            <div className={styles.links}>
              {categories.map(cat => (
                <Link key={cat} to={`/?cat=${cat}`} className={styles.link}>{cat}</Link>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>עקבו אחרינו</h4>
            <div className={styles.social}>
              <a href="#" className={styles.socialBtn}>📘 פייסבוק</a>
              <a href="#" className={styles.socialBtn}>📸 אינסטגרם</a>
              <a href="#" className={styles.socialBtn}>🐦 טוויטר</a>
              <a href="#" className={styles.socialBtn}>🎵 טיקטוק</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 <span className={styles.brandInline}>DIARY ♊ of a typical Gemini Man</span> – כל הזכויות שמורות (אבל לא הוחלט על כך סופית)</p>
        </div>
      </div>
    </footer>
  )
}
