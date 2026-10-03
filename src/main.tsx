import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { KepProvider } from './contexts/KepContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KepProvider>
      <App />
    </KepProvider>
  </StrictMode>,
)
