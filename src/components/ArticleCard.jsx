import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ArticleCard.module.css'

export default function ArticleCard({ article, size = 'normal' }) {
  const [imgError, setImgError] = useState(false)

  const formatViews = (n) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n
  }

  return (
    <Link to={`/article/${article.id}`} className={`${styles.card} ${styles[size]}`}>
      <div className={styles.imageWrap}>
        <img
          src={imgError ? `https://picsum.photos/seed/${article.id}/600/400` : article.image}
          alt={article.title}
          className={styles.image}
          onError={() => setImgError(true)}
        />
        <div className={styles.overlay} />
        <div className={styles.badges}>
          <span className="category-badge">{article.category}</span>
          {article.hot && <span className="hot-badge">🔥 חם</span>}
        </div>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{article.title}</h3>
        {size !== 'small' && (
          <p className={styles.excerpt}>{article.excerpt}</p>
        )}
        <div className={styles.meta}>
          <span className={styles.date}>📅 {article.date}</span>
          <span className={styles.views}>👁 {formatViews(article.views)}</span>
        </div>
      </div>
    </Link>
  )
}
