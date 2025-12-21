// Author: Hwinkdev: https://www.youtube.com/@hwinkdev.official
import { rolePermissions } from '~/config/rbacConfig'

// Custom hook to check permissions based on user role
export const usePermission = (userRole) => {
  const hasPermission = (permission) => {
    const allowedPermissions = rolePermissions[userRole] || []
    return allowedPermissions.includes(permission)
  }
  return { hasPermission }
}