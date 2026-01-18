import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider, ThemeProvider } from '@/contexts'
import { ErrorBoundary, ToastProvider } from '@/components/ui'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AppProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
