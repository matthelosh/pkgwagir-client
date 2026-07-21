<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import api from '@/services/api'
// import type { ApiError } from '@/types/types'
import notify from '@/composables/useNotification'
import KaihLogo from '@/assets/kaih.png'

const router = useRouter()

const credentials = ref({
  name: '',
  password: '',
})

const errorMsg = ref(null)
const login = async () => {
  const userStore = useUserStore()
  errorMsg.value = null
  // console.log('halo')
  try {
    const response = await api('/login', {
      method: 'POST',
      body: credentials.value,
    })
    // console.log(response.user)
    if (!response.user?.roles?.includes('siswa')) {
      // alert('Hanya untuk siswa')
      errorMsg.value = 'App ini hanya untuk siswa!'
      userStore.logout()
      // window.location.reload()
      return false
    }
    const token = response.token
    const role = response.user?.roles[0]
    const user = response.user
    const profile = response.profile

    userStore.setToken(token)
    userStore.setUser(user)
    userStore.setRole(role)
    // const me = await api('/me', {
    //   method: 'GET',
    // })

    userStore.setDetail(profile)

    router.push({ name: 'dashboard' })
  } catch (err) {
    // console.error(err.message || err.error || 'Unknown')
    // const error = err as ApiError
    // notify.error(error?.message || 'Unknown Error.')
    errorMsg.value = err?.message || 'Unknown Error.'
  }
}
</script>
<template>
  <div
    class="w-screen h-screen p-2 flex sm:items-center justify-center bg-linear-to-r from-indigo-100 to-sky-100"
  >
    <div class="card bg-white sm:rounded-lg sm:hover:shadow-lg sm:w-1/3 h-full sm:h-1/2">
      <div class="card-body flex flex-col items-center justify-center">
        <div class="alert fixed alert-error top-4" v-if="errorMsg">
          {{ errorMsg }}
        </div>
        <div class="login-form w-full">
          <img :src="KaihLogo" alt="Tutwuri" class="w-[25%] mx-auto mb-8" />
          <h1 class="text-center text-slate-600 text-2xl font-black uppercase">7 KAIH</h1>
          <h3 class="text-center text-slate-600 font-bold uppercase">PKG Kec. Wagir</h3>
          <div class="form px-4 w-full py-4 rounded my-4">
            <form @submit.prevent="login" class="flex flex-col gap-4">
              <label for="username" class="input w-full input-info">
                <span class="label">Username:</span>
                <input
                  type="text"
                  name="username"
                  v-model="credentials.name"
                  class="grow"
                  placeholder="Isi Username"
                />
              </label>
              <label for="password" class="input w-full input-info">
                <span class="label">Password:</span>
                <input
                  type="password"
                  name="password"
                  v-model="credentials.password"
                  class="grow"
                  placeholder="Isi Password"
                />
              </label>
              <button type="submit" class="btn btn-primary mt-4">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
