<template>
  <div class="toolbar h-[50px] bg-sky-800 flex items-center justify-between px-2">
    <span class="title flex items-center gap-2">
      <RouterLink to="/dashboard">
        <Icon icon="mdi:arrow-left" class="text-sky-100 text-2xl" />
      </RouterLink>

      <span class="text-white text-lg tracking-wide">{{ detail?.nama }}</span>
    </span>

    <button class="cursor-pointer" @click="logout">
      <Icon icon="mdi:logout-variant" class="text-red-200 text-2xl" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const user = userStore
const detail = user.detail
const router = useRouter()

const logout = () => {
  userStore.logout()
  router.push({ name: 'home' })
}
</script>
