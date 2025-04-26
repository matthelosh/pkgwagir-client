import axios from 'axios'

const api = axios.create({
  baseURL: 'https://raporsd.test/api',
})

export const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api
