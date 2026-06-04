import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ArticleCard from '../components/ArticleCard'
import styles from './ArticlePage.module.css'

const RABBIT_TEASERS = [
  '😱 הסיפור שאנשים לא מאמינים שהוא אמיתי',
  '🔥 הפצצה הבאה שמרעידה את הרשתות',
  '👀 מה שכולם מחפשים לדעת עכשיו',
]

function StickyNext({ nextArticle }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [countdown, setCountdown] = useState(8)
  const navigate = useNavigate()
  const timerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      if (total > 0 && scrolled / total > 0.55 && !dismissed) {
        setVisible(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  useEffect(() => {
    if (!visible || !nextArticle) return
    timerRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timerRef.current)
          navigate(`/article/${nextArticle.id}`)
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [visible, nextArticle?.id, navigate])

  const dismiss = () => {
    clearInterval(timerRef.current)
    setDismissed(true)
    setVisible(false)
  }

  if (!visible || !nextArticle) return null

  return (
    <div className={styles.stickyNext}>
      <div className={styles.stickyImgWrap}>
        <div className={styles.stickyImg} style={{ backgroundImage: `url(${nextArticle.image})` }} />
      </div>
      <div className={styles.stickyBody}>
        <span className={styles.stickyLabel}>🔥 הבא בתור — לא תרצה לפספס</span>
        <p className={styles.stickyTitle}>{nextArticle.title}</p>
        <div className={styles.stickyActions}>
          <Link to={`/article/${nextArticle.id}`} className={styles.stickyBtn} onClick={dismiss}>
            קרא עכשיו
          </Link>
          <span className={styles.stickyCountdown}>עובר אוטומטית בעוד {countdown}...</span>
        </div>
      </div>
      <button className={styles.stickyClose} onClick={dismiss} aria-label="סגור">✕</button>
    </div>
  )
}

export default function ArticlePage() {
  const { id } = useParams()
  const { articles } = useApp()

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  const article = articles.find(a => a.id === Number(id))

  if (!article) {
    return (
      <div className={styles.notFound}>
        <h2>הכתבה לא נמצאה 😢</h2>
        <Link to="/" className={styles.backBtn}>חזרה לעמוד הראשי</Link>
      </div>
    )
  }

  const topArticles = [...articles].sort((a, b) => b.views - a.views)
  const nextArticle = topArticles.find(a => a.id !== article.id)
  const rabbitHole = topArticles.filter(a => a.id !== article.id).slice(0, 3)

  return (
    <>
      <main className="container">
        <article className={styles.article}>
          <div className={styles.meta}>
            <Link to={`/?cat=${article.category}`} className="category-badge">{article.category}</Link>
            {article.hot && <span className="hot-badge">🔥 חם</span>}
            <span className={styles.date}>📅 {article.date}</span>
            <span className={styles.views}>👁 {article.views.toLocaleString('he-IL')} צפיות</span>
          </div>

          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.excerpt}>{article.excerpt}</p>

          <div className={styles.imageWrap}>
            <img src={article.image} alt={article.title} className={styles.image} />
          </div>

          <div className={styles.content}>
            <p>{article.content}</p>
            <p className={styles.disclaimer}>
              * כל הפרטים המובאים בכתבה זו מבוססים על מקורות בתעשייה ואינם בהכרח מאומתים. מגזין בידור.
            </p>
          </div>

          <Link to="/" className={styles.backBtn}>← חזרה לכל הכתבות</Link>
        </article>

        {/* Rabbit hole section */}
        <section className={styles.rabbitHole}>
          <div className={styles.rabbitHoleHeader}>
            <span className={styles.rabbitHoleIcon}>🐇</span>
            <div>
              <h2 className={styles.rabbitHoleTitle}>הדרדרת ממשיכה</h2>
              <p className={styles.rabbitHoleSub}>עצור אם אתה יכול</p>
            </div>
          </div>
          <div className={styles.rabbitGrid}>
            {rabbitHole.map((a, i) => (
              <Link key={a.id} to={`/article/${a.id}`} className={styles.rabbitCard}>
                <div className={styles.rabbitImg} style={{ backgroundImage: `url(${a.image})` }}>
                  <div className={styles.rabbitImgOverlay} />
                  <span className={styles.rabbitTeaser}>{RABBIT_TEASERS[i]}</span>
                </div>
                <div className={styles.rabbitBody}>
                  <span className="category-badge">{a.category}</span>
                  <h3 className={styles.rabbitTitle}>{a.title}</h3>
                  <div className={styles.rabbitMeta}>
                    <span className={styles.rabbitViews}>👁 {a.views.toLocaleString('he-IL')}</span>
                    <span className={styles.rabbitCta}>קרא →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <StickyNext key={article.id} nextArticle={nextArticle} />
    </>
  )
}
