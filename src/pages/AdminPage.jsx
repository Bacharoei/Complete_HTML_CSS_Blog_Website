import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { categories } from '../data/initialData'
import styles from './AdminPage.module.css'

function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const ok = onLogin(password)
      if (!ok) {
        setError('סיסמה שגויה. נסה שוב.')
        setPassword('')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <div className={styles.loginLogo}>
          <span style={{ color: '#FF1493' }}>ה</span>
          <span style={{ color: '#FFE500' }}>!</span>
          <span style={{ color: '#CC00FF' }}>מ</span>
          <span style={{ color: '#FFE500' }}>!</span>
          <span style={{ color: '#FF6B00' }}>עית</span>
        </div>
        <h2 className={styles.loginTitle}>כניסת מנהלים</h2>
        <p className={styles.loginSub}>אזור מוגן — לצוות בלבד</p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputWrap}>
            <label className={styles.label}>סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.input}
              placeholder="הכנס סיסמה..."
              autoComplete="current-password"
              required
            />
          </div>

          {error && <div className={styles.errorMsg}>{error}</div>}

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? '...' : 'כניסה'}
          </button>
        </form>

        <p className={styles.hint}>💡 רמז: hamait + שנה</p>
      </div>
    </div>
  )
}

function ArticleForm({ article, onSave, onCancel }) {
  const [form, setForm] = useState(article || {
    title: '', excerpt: '', content: '', category: categories[0],
    image: '', hot: false
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className={styles.formOverlay} onClick={onCancel}>
      <div className={styles.formCard} onClick={e => e.stopPropagation()}>
        <div className={styles.formHeader}>
          <h3>{article ? 'עריכת כתבה' : 'כתבה חדשה'}</h3>
          <button className={styles.closeBtn} onClick={onCancel}>✕</button>
        </div>

        <div className={styles.formBody}>
          <div className={styles.field}>
            <label className={styles.label}>כותרת</label>
            <input
              className={styles.input}
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="כותרת הכתבה..."
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>תקציר</label>
            <textarea
              className={styles.textarea}
              value={form.excerpt}
              onChange={e => set('excerpt', e.target.value)}
              placeholder="תקציר קצר..."
              rows={3}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>תוכן הכתבה</label>
            <textarea
              className={styles.textarea}
              value={form.content}
              onChange={e => set('content', e.target.value)}
              placeholder="תוכן מלא של הכתבה..."
              rows={6}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>קטגוריה</label>
              <select
                className={styles.select}
                value={form.category}
                onChange={e => set('category', e.target.value)}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>URL תמונה</label>
              <input
                className={styles.input}
                value={form.image}
                onChange={e => set('image', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className={styles.checkboxWrap}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.hot}
                onChange={e => set('hot', e.target.checked)}
                className={styles.checkbox}
              />
              🔥 כתבה חמה (תופיע בבאנר ראשי)
            </label>
          </div>
        </div>

        <div className={styles.formFooter}>
          <button className={styles.cancelBtn} onClick={onCancel}>ביטול</button>
          <button
            className={styles.saveBtn}
            onClick={() => onSave(form)}
            disabled={!form.title.trim()}
          >
            שמור
          </button>
        </div>
      </div>
    </div>
  )
}

function VideoForm({ video, onSave, onCancel }) {
  const [form, setForm] = useState(video || {
    title: '', description: '', thumbnail: '', youtubeId: ''
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className={styles.formOverlay} onClick={onCancel}>
      <div className={styles.formCard} onClick={e => e.stopPropagation()}>
        <div className={styles.formHeader}>
          <h3>{video ? 'עריכת סרטון' : 'סרטון חדש'}</h3>
          <button className={styles.closeBtn} onClick={onCancel}>✕</button>
        </div>

        <div className={styles.formBody}>
          <div className={styles.field}>
            <label className={styles.label}>כותרת</label>
            <input
              className={styles.input}
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="כותרת הסרטון..."
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>תיאור</label>
            <textarea
              className={styles.textarea}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="תיאור קצר..."
              rows={3}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>YouTube ID</label>
              <input
                className={styles.input}
                value={form.youtubeId}
                onChange={e => set('youtubeId', e.target.value)}
                placeholder="dQw4w9WgXcQ"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>URL תמונה ממוזערת</label>
              <input
                className={styles.input}
                value={form.thumbnail}
                onChange={e => set('thumbnail', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div className={styles.formFooter}>
          <button className={styles.cancelBtn} onClick={onCancel}>ביטול</button>
          <button
            className={styles.saveBtn}
            onClick={() => onSave(form)}
            disabled={!form.title.trim()}
          >
            שמור
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const {
    articles, videos,
    isAdminLoggedIn, adminLogin, adminLogout,
    addArticle, updateArticle, deleteArticle,
    addVideo, updateVideo, deleteVideo
  } = useApp()

  const [tab, setTab] = useState('articles')
  const [editingArticle, setEditingArticle] = useState(null)
  const [editingVideo, setEditingVideo] = useState(null)
  const [addingArticle, setAddingArticle] = useState(false)
  const [addingVideo, setAddingVideo] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleSaveArticle = (form) => {
    if (editingArticle) {
      updateArticle(editingArticle.id, form)
      showToast('✅ הכתבה עודכנה בהצלחה')
    } else {
      addArticle(form)
      showToast('✅ הכתבה נוספה בהצלחה')
    }
    setEditingArticle(null)
    setAddingArticle(false)
  }

  const handleSaveVideo = (form) => {
    if (editingVideo) {
      updateVideo(editingVideo.id, form)
      showToast('✅ הסרטון עודכן בהצלחה')
    } else {
      addVideo(form)
      showToast('✅ הסרטון נוסף בהצלחה')
    }
    setEditingVideo(null)
    setAddingVideo(false)
  }

  const handleDeleteArticle = (id) => {
    if (confirm('האם למחוק כתבה זו?')) {
      deleteArticle(id)
      showToast('🗑 הכתבה נמחקה')
    }
  }

  const handleDeleteVideo = (id) => {
    if (confirm('האם למחוק סרטון זה?')) {
      deleteVideo(id)
      showToast('🗑 הסרטון נמחק')
    }
  }

  if (!isAdminLoggedIn) {
    return <LoginScreen onLogin={adminLogin} />
  }

  return (
    <div className={styles.dashboard}>
      {toast && <div className={styles.toast}>{toast}</div>}

      {(editingArticle || addingArticle) && (
        <ArticleForm
          article={editingArticle}
          onSave={handleSaveArticle}
          onCancel={() => { setEditingArticle(null); setAddingArticle(false) }}
        />
      )}

      {(editingVideo || addingVideo) && (
        <VideoForm
          video={editingVideo}
          onSave={handleSaveVideo}
          onCancel={() => { setEditingVideo(null); setAddingVideo(false) }}
        />
      )}

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span style={{ color: '#FF1493', fontWeight: 900 }}>ה</span>
          <span style={{ color: '#FFE500', fontWeight: 900 }}>!</span>
          <span style={{ color: '#CC00FF', fontWeight: 900 }}>מ</span>
          <span style={{ color: '#FFE500', fontWeight: 900 }}>!</span>
          <span style={{ color: '#FF6B00', fontWeight: 900 }}>עית</span>
          <div className={styles.adminBadge}>Admin</div>
        </div>

        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navItem} ${tab === 'articles' ? styles.active : ''}`}
            onClick={() => setTab('articles')}
          >
            📰 כתבות
            <span className={styles.count}>{articles.length}</span>
          </button>
          <button
            className={`${styles.navItem} ${tab === 'videos' ? styles.active : ''}`}
            onClick={() => setTab('videos')}
          >
            🎬 סרטונים
            <span className={styles.count}>{videos.length}</span>
          </button>
        </nav>

        <button className={styles.logoutBtn} onClick={adminLogout}>
          🚪 התנתק
        </button>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <div>
            <h1 className={styles.pageTitle}>
              {tab === 'articles' ? '📰 ניהול כתבות' : '🎬 ניהול סרטונים'}
            </h1>
            <p className={styles.pageSub}>
              {tab === 'articles' ? `${articles.length} כתבות סה"כ` : `${videos.length} סרטונים סה"כ`}
            </p>
          </div>
          <button
            className={styles.addBtn}
            onClick={() => tab === 'articles' ? setAddingArticle(true) : setAddingVideo(true)}
          >
            + {tab === 'articles' ? 'כתבה חדשה' : 'סרטון חדש'}
          </button>
        </div>

        {tab === 'articles' && (
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>תמונה</span>
              <span>כותרת</span>
              <span>קטגוריה</span>
              <span>תאריך</span>
              <span>צפיות</span>
              <span>פעולות</span>
            </div>
            {articles.map(article => (
              <div key={article.id} className={styles.tableRow}>
                <div className={styles.thumbCell}>
                  <img src={article.image} alt="" className={styles.thumb} onError={e => e.target.style.display='none'} />
                </div>
                <div className={styles.titleCell}>
                  <span className={styles.rowTitle}>{article.title}</span>
                  {article.hot && <span className={styles.hotTag}>🔥</span>}
                </div>
                <div>
                  <span className="category-badge">{article.category}</span>
                </div>
                <div className={styles.dateCell}>{article.date}</div>
                <div className={styles.viewsCell}>{article.views?.toLocaleString('he-IL')}</div>
                <div className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => setEditingArticle(article)}
                  >
                    ✏️
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteArticle(article.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'videos' && (
          <div className={styles.videoGrid}>
            {videos.map(video => (
              <div key={video.id} className={styles.videoItem}>
                <div className={styles.videoThumbWrap}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={styles.videoThumb}
                    onError={e => e.target.style.display='none'}
                  />
                  <div className={styles.videoPlay}>▶</div>
                </div>
                <div className={styles.videoInfo}>
                  <h4 className={styles.videoTitle}>{video.title}</h4>
                  <p className={styles.videoDesc}>{video.description}</p>
                  <div className={styles.videoMeta}>
                    <span>📅 {video.date}</span>
                    <span>🎞 {video.youtubeId}</span>
                  </div>
                </div>
                <div className={styles.videoActions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => setEditingVideo(video)}
                  >
                    ✏️ עריכה
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteVideo(video.id)}
                  >
                    🗑 מחיקה
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
