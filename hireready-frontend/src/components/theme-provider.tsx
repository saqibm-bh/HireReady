import * as React from 'react'

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
  attribute?: 'class' | 'data-theme'
}

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ 
  children, 
  defaultTheme = 'system',
  storageKey = 'theme',
  attribute = 'class',
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    // Get theme from localStorage
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null
    return (stored as Theme) || (defaultTheme as Theme)
  })

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, newTheme)
      
      // Apply theme to DOM
      const root = document.documentElement
      if (attribute === 'class') {
        root.classList.remove('light', 'dark')
        if (newTheme === 'system') {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          root.classList.add(isDark ? 'dark' : 'light')
        } else {
          root.classList.add(newTheme)
        }
      } else if (attribute === 'data-theme') {
        root.setAttribute('data-theme', newTheme)
      }
    }
  }, [storageKey, attribute])

  // Apply theme on mount
  React.useEffect(() => {
    setTheme(theme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
