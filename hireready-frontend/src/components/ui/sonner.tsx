import * as React from 'react'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--sienna)',
          '--normal-text': 'var(--warm-white)',
          '--normal-border': 'var(--sienna)',
          '--error-bg': 'var(--sienna)',
          '--error-text': 'var(--warm-white)',
          '--error-border': 'var(--sienna)',
          '--success-bg': 'var(--sienna)',
          '--success-text': 'var(--warm-white)',
          '--success-border': 'var(--sienna)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
