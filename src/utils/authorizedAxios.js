// Author: Hwinkdev: https://www.youtube.com/@hwinkdev.official

import axios from 'axios'
import { toast } from 'react-toastify'
import { handleLogoutAPI, handleRefreshTokenAPI } from '~/apis'

// Khởi tạo đối tượng Axios (authorizedAxios) với cấu hình mặc định

let authorizedAxiosInstance = axios.create()
// Thời gian chờ tối đa của một request (10 phút)
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials để gửi kèm cookie trong các request lên phía server (phục vụ cho việc lưu JWT tokens vào trong httpOnly cookies của trình duyệt)
authorizedAxiosInstance.defaults.withCredentials = true

/**
 * Cấu hình Interceptors
 * https://axios-http.com/docs/interceptors
 */

authorizedAxiosInstance.interceptors.request.use((config) => {
  // Do something before request is sent
  // No need to manually attach tokens - cookies are sent automatically with withCredentials: true
  return config
}, (error) => {
  // Handle request error
  return Promise.reject(error)
})

// KHởi tạo promise cho việc gọi api refresh
// Mục đích để khi nhận yêu cầu refreshToken đầu tiên thì hold lại việc gọi API refresh_Token cho tới khi xong xuôi thì mới retry lại những api bị lỗi 410 trước đó thay vì cứ gọi song song nhiều lần
let refreshTokenPromise = null

authorizedAxiosInstance.interceptors.response.use((response) => {
  // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
  // Làm gì đó với dữ liệu response
  return response
}, (error) => {
  // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger
  // Làm gì đó với lỗi response

  /** Khu vực xử lí Refresh Token tự động */
  // If we receive 401 from backend, call logout API
  if (error.response?.status === 401) {
    handleLogoutAPI().then(() => {
      // Only remove userInfo (used for UI) - tokens are cleared via cookie deletion on server
      localStorage.removeItem('userInfo')
      window.location.href = '/login'
    })
  }

  // Nếu nhận mã 410 từ BE, tức là accessToken đã hết hạn, cần gọi API lấy accessToken mới (refreshToken)
  const originalRequest = error.config
  if (error.response?.status === 410 && !originalRequest._retry) {
    // Gán thêm một giá trị _retry luôn = true trong khoảng thời gian chờ, để việc refresh token không bị lặp vô hạn
    originalRequest._retry = true

    if (!refreshTokenPromise) {
      // Call API to refresh accessToken - refreshToken is automatically sent via cookie
      refreshTokenPromise = handleRefreshTokenAPI()
        .then(() => {
          // Token refreshed successfully - new accessToken cookie set by server
          // No need to manually store anything
        })
        .catch((_error) => {
          // If refresh token also fails (e.g., expired), must logout
          handleLogoutAPI().then(() => {
            // Only remove userInfo (used for UI) - tokens cleared via cookie deletion on server
            localStorage.removeItem('userInfo')
            window.location.href = '/login'
          })

          return Promise.reject(_error)
        })
        .finally(() => {
          // Clear promise reference to allow future refresh attempts
          refreshTokenPromise = null
        })
    }

    // Cuối cùng mới return cái refreshTokenPromise này để chờ việc refresh token hoàn tất
    return refreshTokenPromise.then(() => {
      // QUAN TRỌNG: return lại authorizedAxiosInstance(originalRequest) để tiếp tục thực hiện lại request ban đầu đã bị lỗi (do accessToken hết hạn)
      return authorizedAxiosInstance(originalRequest)
    })

  }

  // Xử lí lỗi tập trung hiển thị mọi thông báo lỗi từ API (ngoại trừ lỗi 410 - GONE phục vụ refresh token)
  if (error.response?.status !== 410) {
    toast.error(error.response?.data?.message || error?.message)
  }

  return Promise.reject(error)
})


export default authorizedAxiosInstance