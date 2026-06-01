import React, { createContext, useContext, useState, useEffect } from 'react'
import { initialArticles, initialVideos, ADMIN_PASSWORD } from '../data/initialData'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('gossip_articles')
    return saved ? JSON.parse(saved) : initialArticles
  })

  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('gossip_videos')
    return saved ? JSON.parse(saved) : initialVideos
  })

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('gossip_articles', JSON.stringify(articles))
  }, [articles])

  useEffect(() => {
    localStorage.setItem('gossip_videos', JSON.stringify(videos))
  }, [videos])

  const adminLogin = (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true')
      setIsAdminLoggedIn(true)
      return true
    }
    return false
  }

  const adminLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setIsAdminLoggedIn(false)
  }

  const addArticle = (article) => {
    const newArticle = { ...article, id: Date.now(), date: new Date().toLocaleDateString('he-IL'), views: 0 }
    setArticles(prev => [newArticle, ...prev])
  }

  const updateArticle = (id, updates) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
  }

  const deleteArticle = (id) => {
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  const addVideo = (video) => {
    const newVideo = { ...video, id: Date.now(), date: new Date().toLocaleDateString('he-IL'), views: 0 }
    setVideos(prev => [newVideo, ...prev])
  }

  const updateVideo = (id, updates) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v))
  }

  const deleteVideo = (id) => {
    setVideos(prev => prev.filter(v => v.id !== id))
  }

  return (
    <AppContext.Provider value={{
      articles, videos,
      isAdminLoggedIn, adminLogin, adminLogout,
      addArticle, updateArticle, deleteArticle,
      addVideo, updateVideo, deleteVideo
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
