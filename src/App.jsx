// Author: Hwinkdev: https://www.youtube.com/@hwinkdev.official
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'

const ProtectedRoute = () => {
  // Check userInfo in localStorage for UI routing only
  // Actual authentication is validated server-side via httpOnly cookies
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (!user) return <Navigate to="/login" replace={true} />
  return <Outlet />
}

const UnauthenticatedRoute = () => {
  // Check userInfo in localStorage for UI routing only
  // Actual authentication is validated server-side via httpOnly cookies
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (user) return <Navigate to="/dashboard" replace={true} />
  return <Outlet />
}

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to="/login" replace={true} />
      } />

      <Route element={<UnauthenticatedRoute />}>
        <Route path='/login' element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        {/* Sau này sẽ còn nhiều route cần bảo vệ ở đây */}
      </Route>
    </Routes>
  )
}

export default App
