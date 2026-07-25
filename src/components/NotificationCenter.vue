<template>
  <div class="fixed top-8 left-[50%] -translate-x-[50%] flex flex-col gap-3 z-[999999999]">
    <NotificationItem
      v-for="note in notifications"
      :key="note.id"
      :id="note.id"
      :message="note.message"
      :type="note.type"
    />
  </div>
</template>

<script lang="ts" setup>
import { notifications } from '@/composables/useNotification'
import NotificationItem from '@/components/NotificationItem.vue'
</script>
