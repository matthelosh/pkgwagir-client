import { useUserStore } from '@/stores/user'
import router from '@/router'

const baseURL = import.meta.env.VITE_API_BASE_URL!
interface RequestOptions extends RequestInit {
  body?: any
}

export class ApiError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export const api = async (endpoint: string, options: RequestOptions = {}) => {
  try {
    const auth = useUserStore()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(auth.token && { Authorization: `Bearer ${auth.token}` }),
      ...options.headers,
    }

    const response: any = await fetch(`${baseURL}${endpoint}`, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    if (response.status === 401) {
      auth.logout()
      throw new ApiError('Sesi telah habis. Silahkan login kembali', 401)
    }

    if (response.status === 404) {
      throw new ApiError('Endpoint tidak ditemukan.')
    }

    // if (response.status === 403) {
    //     console.error(response);
    //     throw new ApiError(await response.json());
    // }

    let data
    try {
      data = await response.json()
    } catch (e) {
      data = null
    }

    if (!response.ok) {
      // console.error(response);
      const errorMsg =
        data?.error?.message ||
        data?.message ||
        data?.error ||
        `Terjadi error pada server ${response.status}`
      throw new ApiError(errorMsg, response.status)
    }

    return data
  } catch (error: any) {
    // console.error(error);
    if (error instanceof ApiError && error.message === 'Endpoint tidak ditemukan.') {
      throw error
    }
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new ApiError('Gagal terhubung ke server. Periksa koneksi internet atau server Anda.', 0)
    }
    // console.error(error.message);
    // Lempar kembali error jika sudah berwujud ApiError
    throw error
  }
}

export default api
