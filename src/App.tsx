import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/Layout'
import { ModalHost } from './components/Modal'
import { Toasts } from './components/Toasts'
import { Dashboard } from './pages/Dashboard'
import { Farm } from './pages/Farm'
import { User } from './pages/User'
import { Govern } from './pages/Govern'
import { Redemption } from './pages/Redemption'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/farm/:id" element={<Farm />} />
            <Route path="/user" element={<User />} />
            <Route path="/govern" element={<Govern />} />
            <Route path="/redemption" element={<Redemption />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <ModalHost />
        <Toasts />
      </AppProvider>
    </BrowserRouter>
  )
}
