import { reactive } from 'vue'

export interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration: number
}

export const notifications = reactive<Notification[]>([])

// export function useNotification() {
//   const notify = (message: string, type: Notification['type'] = 'info', duration = 3000) => {
//     // console.log('Sending notif:', message, type)
//     const id = Date.now()
//     notifications.push({ id, message, type, duration })

//     setTimeout(() => {
//       const index = notifications.findIndex((n) => n.id === id)
//       if (index !== -1) notifications.splice(index, 1)
//     }, duration)
//   }

//   return {
//     notify,
//     success: (message: string, duration = 3000) => notify(message, 'success', duration ?? 3000),
//     error: (message: string, duration = 3000) => notify(message, 'error', duration ?? 3000),
//     info: (message: string, duration = 3000) => notify(message, 'info', duration ?? 3000),
//   }
function notify(message: string, type: Notification['type'] = 'info', duration = 3000) {
  // console.log('Sending notif:', message, type)
  const id = Date.now()
  notifications.push({ id, message, type, duration })

  setTimeout(() => {
    const index = notifications.findIndex((n) => n.id === id)
    if (index !== -1) notifications.splice(index, 1)
  }, duration)
}

const notificationAPI = {
  notify,
  success: (message: string, duration = 3000) => notify(message, 'success', duration ?? 3000),
  error: (message: string, duration = 3000) => notify(message, 'error', duration ?? 3000),
  info: (message: string, duration = 3000) => notify(message, 'info', duration ?? 3000),
  warning: (message: string, duration = 3000) => notify(message, 'warning', duration ?? 3000),
}

export default notificationAPI
