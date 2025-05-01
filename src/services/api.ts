import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const baseURL = import.meta.env.VITE_API_BASE_URL

const api: AxiosInstance = axios.create({
  baseURL,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const userStore = useUserStore()

    if (
      error.response &&
      error.response.status === 401 &&
      router.currentRoute.value.name !== 'login'
    ) {
      userStore.logout()
      router.replace({ name: 'home' })
    }

    return Promise.reject(error)
  },
)

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api
