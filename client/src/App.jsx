import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom'
import Landing from '@/pages/LandingPage'
import Login from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import Dashboard from '@/pages/Manager/DashboardPage'
import Tasks from '@/pages/Manager/TasksPage'
import Groups from '@/pages/Manager/GroupsPage'
import './App.css'

// Componente de Ruta Protegida
const ProtectedRoutes = () => {
  const token = localStorage.getItem('token')

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/auth/login" replace />
  }

  // Si hay token, renderiza las rutas hijas
  return <Outlet />
}

// Componente de Rutas Públicas
const PublicRoutes = () => {
  const token = localStorage.getItem('token')

  // Si ya hay token, redirige al dashboard
  if (token) {
    return <Navigate to="/manager/dashboard" replace />
  }

  // Si no hay token, renderiza las rutas hijas
  return <Outlet />
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de Inicio */}
        <Route path="/" element={<Landing />} />

        {/* Rutas Públicas */}
        <Route element={<PublicRoutes />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>

        {/* Rutas Protegidas de Manager */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/manager/dashboard" element={<Dashboard />} />
          <Route path="/manager/userTasks" element={<Tasks />} />
          <Route path="/manager/groupTasks/:groupId?" element={<Tasks />} />
          <Route path="/manager/groups" element={<Groups />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
