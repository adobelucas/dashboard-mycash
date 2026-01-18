import { useState, useCallback } from 'react'
import { useToast } from '@/components/ui'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { showToast } = useToast()

  const addNotification = useCallback((
    title: string,
    message: string,
    type: Notification['type'] = 'info'
  ) => {
    const notification: Notification = {
      id: Math.random().toString(36).substring(7),
      title,
      message,
      type,
      read: false,
      createdAt: new Date(),
    }

    setNotifications((prev) => [notification, ...prev])
    showToast(message, type)
  }, [showToast])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
  }
}
