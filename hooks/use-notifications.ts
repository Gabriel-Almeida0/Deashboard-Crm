"use client"

import { create } from 'zustand'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

type NotificationType = 'info' | 'success' | 'warning' | 'error'

interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  date: Date
}

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  addNotification: (title: string, message: string, type: NotificationType) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotifications = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  
  addNotification: (title, message, type) => {
    const id = uuidv4()
    const newNotification: Notification = {
      id,
      title,
      message,
      type,
      read: false,
      date: new Date()
    }
    
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }))
    
    // Mostrar toast para notificação
    toast[type](title, {
      description: message,
      id,
    })
    
    return id
  },
  
  markAsRead: (id) => {
    set((state) => {
      const notification = state.notifications.find(n => n.id === id)
      if (!notification || notification.read) return state
      
      return {
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: state.unreadCount - 1
      }
    })
  },
  
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0
    }))
  },
  
  removeNotification: (id) => {
    set((state) => {
      const notification = state.notifications.find(n => n.id === id)
      const unreadChange = notification && !notification.read ? 1 : 0
      
      return {
        notifications: state.notifications.filter(n => n.id !== id),
        unreadCount: state.unreadCount - unreadChange
      }
    })
  },
  
  clearAll: () => {
    set({
      notifications: [],
      unreadCount: 0
    })
  }
})) 