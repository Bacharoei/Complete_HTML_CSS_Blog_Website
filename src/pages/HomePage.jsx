import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ArticleCard from '../components/ArticleCard'
import VideoSection from '../components/VideoSection'
import styles from './HomePage.module.css'

function HeroBanner({ article }) {
  if (!article) return null
  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${article.image})` }}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <span className="category-badge">{article.category}</span>
        {article.hot && <span className="hot-badge" style={{ marginRight: 8 }}>🔥 חם</span>}
        <h1 className={styles.heroTitle}>{article.title}</h1>
        <p className={styles.heroExcerpt}>{article.excerpt}</p>
        <a href={`/article/${article.id}`} className={styles.heroBtn}>
          קרא עוד →
        </a>
      </div>
    </div>
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
              <a key={a.id} href={`/article/${a.id}`} className={styles.trendingItem}>
                <span className={styles.trendingNum}>{i + 1}</span>
                <span className={styles.trendingTitle}>{a.title}</span>
              </a>
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

  const filtered = selectedCat
    ? articles.filter(a => a.category === selectedCat)
    : articles

  const featured = articles.find(a => a.hot) || articles[0]
  const displayed = filtered.slice(0, visibleCount)

  return (
    <div>
      {!selectedCat && <HeroBanner article={featured} />}
      <TrendingBar articles={articles} />

      <main className="container">
        {selectedCat && (
          <div className={styles.catHeader}>
            <h1 className={styles.catTitle}>
              <span className={styles.catAccent}>#</span> {selectedCat}
            </h1>
            <p className={styles.catCount}>{filtered.length} כתבות</p>
          </div>
        )}

        {!selectedCat && (
          <div className={styles.hotStrip}>
            <div className={styles.hotStripLabel}>🔥 כתבות חמות</div>
            <div className={styles.hotStripGrid}>
              {articles.filter(a => a.hot).slice(0, 3).map(a => (
                <ArticleCard key={a.id} article={a} size="small" />
              ))}
            </div>
          </div>
        )}

        <section className={styles.section}>
          {!selectedCat && (
            <h2 className="section-title">
              <span className="accent">📰</span> כל הכתבות
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
              <button
                className={styles.loadMore}
                onClick={() => setVisibleCount(v => v + 6)}
              >
                טען עוד כתבות ↓
              </button>
            </div>
          )}
        </section>

        <VideoSection />
      </main>
    </div>
  )
}
