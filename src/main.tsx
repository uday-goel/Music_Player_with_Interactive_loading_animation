import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Appf } from './Appf.tsx'
import { ContextProvider } from './Context/Context.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <Appf />
    </ContextProvider>
    
  </StrictMode>,
)
