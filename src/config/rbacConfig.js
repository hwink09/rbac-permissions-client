// Author: Hwinkdev: https://www.youtube.com/@hwinkdev.official

// Định nghĩa các roles của user trong hệ thống RBAC
export const roles = {
  CLIENT: 'client',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
}

// Định nghĩa các quyền hạn (permissions) mà từng role được phép truy cập
export const permissions = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_SUPPORT: 'view_support',
  VIEW_MESSAGES: 'view_messages',
  VIEW_REVENUE: 'view_revenue',
  VIEW_ADMIN_TOOLS: 'view_admin_tools'
  // EDIT_PRODUCT: 'edit_product',
  // DELETE_POST: 'delete_post'
  // ...etc
}

// Kết hợp roles và permissions để kiểm soát truy cập
export const rolePermissions = {
  [roles.CLIENT]: [
    permissions.VIEW_DASHBOARD,
    permissions.VIEW_SUPPORT
  ],

  [roles.MODERATOR]: [
    permissions.VIEW_DASHBOARD,
    permissions.VIEW_SUPPORT,
    permissions.VIEW_MESSAGES
  ],

  [roles.ADMIN]: Object.values(permissions) // all permissions for admin
}