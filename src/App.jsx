// Author: Hwinkdev: https://www.youtube.com/@hwinkdev.official
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'
import NotFound from '~/pages/NotFound'
import AccessDenied from '~/pages/AccessDenied'
import RbacRoute from '~/components/core/RbacRoute'
import { permissions } from '~/config/rbacConfig'

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
        {/* Tất cả element đều dùng chung component Dashboard dưới dạng tabs và code hết trong Dashboard.jsx để test các chức năng khác nhau, thực tế có thể tách ra các component riêng biệt */}
        <Route element={<RbacRoute requiredPermission={permissions.VIEW_DASHBOARD} />} >
          <Route path='/dashboard' element={<Dashboard />} />
          {/* <Route path='/dashboard/create' element={<Dashboard />} />
          <Route path='/dashboard/update' element={<Dashboard />} />
          <Route path='/dashboard/delete' element={<Dashboard />} /> */}
        </Route>

        <Route element={<RbacRoute requiredPermission={permissions.VIEW_SUPPORT} />} >
          <Route path='/support' element={<Dashboard />} />
        </Route>

        <Route element={<RbacRoute requiredPermission={permissions.VIEW_MESSAGES} />} >
          <Route path='/messages' element={<Dashboard />} />
        </Route>

        <Route element={<RbacRoute requiredPermission={permissions.VIEW_REVENUE} />} >
          <Route path='/revenue' element={<Dashboard />} />
        </Route>

        <Route element={<RbacRoute requiredPermission={permissions.VIEW_ADMIN_TOOLS} />} >
          <Route path='/admin-tools' element={<Dashboard />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
      <Route path='/access-denied' element={<AccessDenied />} />
    </Routes>
  )
}

export default App
