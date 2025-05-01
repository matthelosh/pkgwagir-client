<template>
  <div
    ref="target"
    class="notification p-6 rounded-full shadow-xl text-white cursor-pointer w-[200px] h-[200px] flex flex-col items-center justify-center animate-bounce"
    :class="type"
    @click="dismiss"
  >
    <Icon icon="mdi:bell" class="text-6xl" />
    <p class="text-center">{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import { notifications } from '@/composables/useNotification'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}>()

const target = ref<HTMLElement>()

onMounted(() => {
  if (target.value) {
    useMotion(target.value, {
      initial: { opacity: 0, y: -20 },
      enter: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } },
      leave: { opacity: 0, y: -20 },
    })
  }
})

const dismiss = () => {
  const index = notifications.findIndex((n) => n.id === props.id)
  if (index !== -1) notifications.splice(index, 1)
}
</script>

<style scoped>
.notification {
  transition: all 0.3s ease;
}
.success {
  background-color: #4caf50;
}
.error {
  background-color: #f44336;
}
.info {
  background-color: #2196f3;
}
.warning {
  background-color: #ffc107;
}
</style>
