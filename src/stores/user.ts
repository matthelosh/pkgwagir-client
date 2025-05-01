import { defineStore } from 'pinia'
import type { UserBasic, UserDetail, UserState } from '@/types/types'
export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    detail: null,
    token: '',
    role: '',
  }),
  actions: {
    setUser(user: UserBasic) {
      this.user = user
    },
    setDetail(detail: UserDetail) {
      this.detail = detail
    },
    setRole(role: string) {
      this.role = role
    },
    setToken(token: string) {
      this.token = token
    },
    logout() {
      this.user = null
      this.token = ''
      this.role = ''
      this.detail = null
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
