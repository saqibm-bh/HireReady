import * as React from 'react'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        style: {
          background: 'var(--sienna)',
          color: 'var(--warm-white)',
          border: '1px solid var(--sienna)',
        },
        classNames: {
          toast: "group toast shadow-2xl font-heading",
          description: "text-warm-white/90",
          actionButton: "bg-warm-white text-sienna font-bold",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
