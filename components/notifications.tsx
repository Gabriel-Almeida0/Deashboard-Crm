"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/hooks/use-notifications"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NotificationsPopover() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications()
  const [open, setOpen] = useState(false)
  
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Quando abrir, marcar todas como lidas depois de um tempo
      setTimeout(() => {
        markAllAsRead()
      }, 1000)
    }
    setOpen(newOpen)
  }
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <div className="h-2 w-2 rounded-full bg-green-500" />
      case 'warning':
        return <div className="h-2 w-2 rounded-full bg-yellow-500" />
      case 'error':
        return <div className="h-2 w-2 rounded-full bg-red-500" />
      default:
        return <div className="h-2 w-2 rounded-full bg-blue-500" />
    }
  }
  
  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white px-1">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-medium">Notificações</h4>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs" 
              onClick={markAllAsRead}>
              Marcar todas como lidas
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-3 p-3 ${notification.read ? 'opacity-70' : ''}`}
                >
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        &times;
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(notification.date, { addSuffix: true, locale: ptBR })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Não há notificações no momento
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
} 