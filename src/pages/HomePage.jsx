import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ArticleCard from '../components/ArticleCard'
import VideoSection from '../components/VideoSection'
import styles from './HomePage.module.css'

const HOOK_PHRASES = [
  '👀 מה שלא ידעת עד עכשיו',
  '🔥 הסוד שנחשף סוף סוף',
  '😱 אף אחד לא האמין שזה יקרה',
]

const VIRAL_HOOKS = [
  'כולם מדברים על זה — ואתה עוד לא יודע?',
  'הסיפור שמסרב לרדת מהטרנד',
  'מי שלא קרא את זה — פספס הכל',
]

const SLIDE_DURATION = 6000

function RotatingHero({ articles }) {
  const top = [...articles].sort((a, b) => b.views - a.views).slice(0, 3)
  const [idx, setIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const progressRef = useRef(0)

  const startCycle = (startIdx) => {
    clearInterval(intervalRef.current)
    progressRef.current = 0
    setProgress(0)
    if (startIdx !== undefined) setIdx(startIdx)
    const step = (50 / SLIDE_DURATION) * 100
    intervalRef.current = setInterval(() => {
      progressRef.current += step
      if (progressRef.current >= 100) {
        progressRef.current = 0
        setIdx(i => (i + 1) % top.length)
      }
      setProgress(Math.min(progressRef.current, 100))
    }, 50)
  }

  useEffect(() => {
    if (!top.length) return
    startCycle()
    return () => clearInterval(intervalRef.current)
  }, [top.length])

  if (!top.length) return null
  const article = top[idx]

  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${article.image})` }}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroProgress}>
        <div className={styles.heroProgressBar} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.heroDots}>
        {top.map((_, i) => (
          <button
            key={i}
            className={`${styles.heroDot} ${i === idx ? styles.heroDotActive : ''}`}
            onClick={() => startCycle(i)}
          />
        ))}
      </div>
      <div className={styles.heroContent}>
        <div className={styles.heroHook}>{HOOK_PHRASES[idx]}</div>
        <div className={styles.heroBadges}>
          <span className="category-badge">{article.category}</span>
          {article.hot && <span className="hot-badge">🔥 חם</span>}
        </div>
        <h1 className={styles.heroTitle}>{article.title}</h1>
        <p className={styles.heroExcerpt}>{article.excerpt}</p>
        <div className={styles.heroCtas}>
          <Link to={`/article/${article.id}`} className={styles.heroBtn}>
            קרא עכשיו — לא תאמין מה יש שם →
          </Link>
          <span className={styles.heroViews}>👁 {article.views.toLocaleString('he-IL')} צפיות</span>
        </div>
      </div>
    </div>
  )
}

function ViralTop3({ articles }) {
  const top = [...articles].sort((a, b) => b.views - a.views).slice(0, 3)
  const ranks = ['🏆', '🥈', '🥉']
  const colors = ['#FF1493', '#CC00FF', '#FF6B00']

  return (
    <section className={styles.viralTop3}>
      <div className="container">
        <div className={styles.viralHeader}>
          <h2 className={styles.viralTitle}>
            <span>🔥</span> 3 הסיפורים שסוחפים את ישראל
          </h2>
          <span className={styles.viralSubtitle}>קוראים עכשיו • ממכר</span>
        </div>
        <div className={styles.viralGrid}>
          {top.map((article, i) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className={styles.viralCard}
              style={{ '--viral-color': colors[i] }}
            >
              <div className={styles.viralRankNum}>{ranks[i]}</div>
              <div className={styles.viralImg} style={{ backgroundImage: `url(${article.image})` }} />
              <div className={styles.viralBody}>
                <p className={styles.viralHook}>{VIRAL_HOOKS[i]}</p>
                <h3 className={styles.viralCardTitle}>{article.title}</h3>
                <div className={styles.viralMeta}>
                  <span className={styles.viralViews}>👁 {article.views.toLocaleString('he-IL')}</span>
                  <span className={styles.viralCta}>קרא עכשיו →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrendingBar({ articles }) {
  const top = [...articles].sort((a, b) => b.views - a.views).slice(0, 5)
  return (
    <div className={styles.trending}>
      <div className="container">
        <div className={styles.trendingInner}>
          <span className={styles.trendingLabel}>🔥 טרנדינג</span>
          <div className={styles.trendingList}>
            {top.map((a, i) => (
              <Link key={a.id} to={`/article/${a.id}`} className={styles.trendingItem}>
                <span className={styles.trendingNum}>{i + 1}</span>
                <span className={styles.trendingTitle}>{a.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { articles } = useApp()
  const [searchParams] = useSearchParams()
  const selectedCat = searchParams.get('cat')
  const [visibleCount, setVisibleCount] = useState(6)

  const filtered = selectedCat ? articles.filter(a => a.category === selectedCat) : articles
  const displayed = filtered.slice(0, visibleCount)

  return (
    <div>
      {!selectedCat && <RotatingHero articles={articles} />}
      <TrendingBar articles={articles} />
      {!selectedCat && <ViralTop3 articles={articles} />}

      <main className="container">
        {selectedCat && (
          <div className={styles.catHeader}>
            <h1 className={styles.catTitle}>
              <span className={styles.catAccent}>#</span> {selectedCat}
            </h1>
            <p className={styles.catCount}>{filtered.length} כתבות</p>
          </div>
        )}

        <section className={styles.section}>
          {!selectedCat && (
            <h2 className="section-title">
              <span className="accent">📰</span> עוד סיפורים שיוציאו אותך מדעתך
            </h2>
          )}
          <div className={styles.grid}>
            {displayed.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                size={i === 0 && !selectedCat ? 'featured' : 'normal'}
              />
            ))}
          </div>

          {displayed.length === 0 && (
            <div className={styles.empty}>אין כתבות בקטגוריה זו</div>
          )}

          {visibleCount < filtered.length && (
            <div className={styles.loadMoreWrap}>
              <button className={styles.loadMore} onClick={() => setVisibleCount(v => v + 6)}>
                עוד סיפורים מטורפים ↓
              </button>
            </div>
          )}
        </section>

        <VideoSection />
      </main>
    </div>
  )
}
