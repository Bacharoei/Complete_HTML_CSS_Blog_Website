import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ArticleCard from '../components/ArticleCard'
import styles from './ArticlePage.module.css'

export default function ArticlePage() {
  const { id } = useParams()
  const { articles } = useApp()
  const article = articles.find(a => a.id === Number(id))

  if (!article) {
    return (
      <div className={styles.notFound}>
        <h2>הכתבה לא נמצאה 😢</h2>
        <Link to="/" className={styles.backBtn}>חזרה לעמוד הראשי</Link>
      </div>
    )
  }

  const related = articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3)

  return (
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
            * כל הפרטים המובאים בכתבה זו מבוססים על מקורות בתעשייה ואינם בהכרח מאומתים. HotGossip מגזין בידור.
          </p>
        </div>

        <Link to="/" className={styles.backBtn}>← חזרה לכל הכתבות</Link>
      </article>

      {related.length > 0 && (
        <section className={styles.related}>
          <h2 className="section-title">
            <span className="accent">📌</span> כתבות קשורות
          </h2>
          <div className={styles.relatedGrid}>
            {related.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        </section>
      )}
    </main>
  )
}
