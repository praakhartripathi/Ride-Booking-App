import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/useAuth'
import { CaptainPage } from './pages/CaptainPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { RidePage } from './pages/RidePage'

type ProtectedRouteProps = {
  children: React.JSX.Element
  allowedRoles?: string[]
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, session } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && session && !allowedRoles.includes(session.role)) {
    return <Navigate to="/home" replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/ride"
            element={
              <ProtectedRoute allowedRoles={['RIDER', 'ADMIN']}>
                <RidePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/captain"
            element={<CaptainPage />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
