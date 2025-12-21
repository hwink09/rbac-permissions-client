// Author: Hwinkdev: https://www.youtube.com/@hwinkdev.official

import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const handleLogoutAPI = async () => {
  // Call logout API to clear httpOnly cookies on server
  // No localStorage token cleanup needed - tokens stored only in httpOnly cookies
  return await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
}

export const handleRefreshTokenAPI = async () => {
  // No need to pass refreshToken - it's automatically sent via httpOnly cookie
  return await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/refresh_token`)
}
