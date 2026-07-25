<template>
  <div
    ref="target"
    class="notification p-2 rounded shadow-xl text-white cursor-pointer w-full flex flex-col items-start justify-center"
    :class="type"
    @click="dismiss"
  >
    <!-- <Icon icon="mdi:bell" class="text-6xl" /> -->
    <p class="text-center w-full">{{ message }}</p>
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
  background-color: #4caf5099;
  backdrop-filter: blur(10px);
}
.error {
  background-color: #f4433699;
  backdrop-filter: blur(10px);
}
.info {
  background-color: #2196f399;
  backdrop-filter: blur(10px);
}
.warning {
  background-color: #ffc10799;
}
</style>
