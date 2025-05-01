<template>
  <div class="w-screen h-screen p-4 flex items-center justify-center relative">
    <button class="fixed top-4 right-4 cursor-pointer" @click="logout">
      <Icon icon="mdi:logout-variant" class="text-2xl text-red-500" />
    </button>
    <div class="wrapper p-2 w-full">
      <h1 class="text-center font-bold text-3xl text-slate-700">
        Halo,<br />
        {{ detail?.nama }}
      </h1>
      <h3 class="text-center text-lg text-gray-600">Silahkan Pilih Menu</h3>
      <div class="menu flex flex-col p-4">
        <RouterLink
          to="akademik"
          class="text-center w-full my-4 p-4 text-lg uppercase font-semibold tracking-wider text-white rounded-full bg-sky-500"
        >
          Akademik
        </RouterLink>
        <RouterLink
          to="kaih"
          class="text-center w-full my-4 p-4 text-lg uppercase font-semibold tracking-wider text-white rounded-full bg-sky-500"
        >
          Pembiasaan
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Icon } from '@iconify/vue'
const router = useRouter()
const userStore = useUserStore()
const user = userStore
const detail = user.detail

const logout = async () => {
  userStore.logout()
  await router.push({ name: 'home' })
}
</script>
