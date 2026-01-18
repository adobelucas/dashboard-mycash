import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { ProtectedRoute } from '@/components/auth'
import { Login } from '@/components/auth'
import { Dashboard } from '@/pages/Dashboard'
import { Cards } from '@/pages/Cards'
import { Transactions } from '@/pages/Transactions'
import { Profile } from '@/pages/Profile'
import './styles/globals.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/cards" element={<Cards />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
