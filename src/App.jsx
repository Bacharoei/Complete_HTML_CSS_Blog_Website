import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import AdminPage from './pages/AdminPage'

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/article/:id" element={<Layout><ArticlePage /></Layout>} />
        <Route path="*" element={<Layout><HomePage /></Layout>} />
      </Routes>
    </AppProvider>
  )
}
