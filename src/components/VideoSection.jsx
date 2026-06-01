import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import styles from './VideoSection.module.css'

function VideoModal({ video, onClose }) {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <div className={styles.videoEmbed}>
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={styles.modalBody}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
        </div>
      </div>
    </div>
  )
}

function VideoCard({ video }) {
  const [showModal, setShowModal] = useState(false)
  const [imgError, setImgError] = useState(false)

  const formatViews = (n) => n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n

  return (
    <>
      <div className={styles.videoCard} onClick={() => setShowModal(true)}>
        <div className={styles.thumbnail}>
          <img
            src={imgError ? `https://picsum.photos/seed/${video.id + 10}/480/270` : video.thumbnail}
            alt={video.title}
            onError={() => setImgError(true)}
          />
          <div className={styles.playBtn}>▶</div>
          <div className={styles.overlay} />
        </div>
        <div className={styles.videoBody}>
          <h4 className={styles.videoTitle}>{video.title}</h4>
          <p className={styles.videoDesc}>{video.description}</p>
          <div className={styles.videoMeta}>
            <span>📅 {video.date}</span>
            <span>👁 {formatViews(video.views)}</span>
          </div>
        </div>
      </div>
      {showModal && <VideoModal video={video} onClose={() => setShowModal(false)} />}
    </>
  )
}

export default function VideoSection() {
  const { videos } = useApp()

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className="section-title">
          <span className="accent">🎬</span> סרטונים חמים
        </h2>
        <div className={styles.grid}>
          {videos.map(v => <VideoCard key={v.id} video={v} />)}
        </div>
      </div>
    </section>
  )
}
