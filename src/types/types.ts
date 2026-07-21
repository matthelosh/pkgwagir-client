export interface UserBasic {
  name: string
  email: string
}
export interface UserDetail {
  id: String
  nama: string
  nisn: string
  token: string
  role: string
  foto: string
  agama: string
  jenis_kelamin: string
  rombel: [
    {
      id: number
      kode: string
      label: string
      tapel: string
    },
  ]
}

export interface UserState {
  user: UserBasic | null
  detail: UserDetail | null
  token: string
  role: string
}

export interface ApiError {
  success: boolean
  message: string
  code: string
  response: {
    data: {
      message: string
    }
  }
}

export interface ApiResponse {
  success: boolean
  message: string
  data?: any
}
