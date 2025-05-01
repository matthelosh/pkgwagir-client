<template>
  <div
    class="w-screen h-screen p-2 flex items-center justify-center bg-gradient-to-r from-indigo-100 to-sky-100"
  >
    <div class="login-form">
      <img src="../assets/tutwuri.png" alt="Tutwuri" class="w-[25%] mx-auto mb-8" />
      <h1 class="text-center text-2xl font-black uppercase">Progres Belajar Siswa</h1>
      <h3 class="text-center font-bold uppercase">PKG Kec. Wagir</h3>
      <div class="form px-4 w-full py-4 rounded my-4">
        <form @submit.prevent="login" class="flex flex-col">
          <label for="username" class="my-2 flex flex-col justify-between">
            <span class="text-slate-700">Username:</span>
            <input
              type="text"
              name="username"
              v-model="credentials.name"
              class="border border-sky-600 rounded focus:border-sky-500 focus:outline-sky-500 outline-sky-400 px-2 py-1 text-lg bg-white"
              placeholder="Isi Username"
            />
          </label>
          <label for="password" class="my-2 flex flex-col justify-between">
            <span class="text-slate-700">Password:</span>
            <input
              type="password"
              name="password"
              v-model="credentials.password"
              class="border border-sky-600 rounded focus:border-sky-500 focus:outline-sky-500 px-2 py-1 text-lg bg-white"
              placeholder="Isi Password"
            />
          </label>
          <button
            type="submit"
            class="w-full my-4 rounded-full text-white py-2 uppercase font-bold bg-sky-400 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import api, { setAuthToken } from '@/services/api'
import type { ApiError } from '@/types/types'
import notify from '@/composables/useNotification'

const router = useRouter()

const credentials = ref({
  name: '',
  password: '',
})

const login = async () => {
  const userStore = useUserStore()
  // console.log('halo')
  try {
    const response = await api.post('/login', credentials.value)
    // console.log(response)

    const token = response.data.access_token
    const role = response.data.user.role
    const user = response.data.user

    userStore.setToken(token)
    userStore.setUser(user)
    userStore.setRole(role)
    setAuthToken(token)
    const me = await api.get('/me')

    userStore.setDetail(me.data.detail)

    router.push({ name: 'dashboard' })
  } catch (err: unknown) {
    const error = err as ApiError
    notify.error(error.response.data.message)
  }
}
</script>
