import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Load all CSS normally - Vite will optimize this
import './styles/index.css'

// Lazy load analytics to reduce main bundle size
const Analytics = lazy(() => import("@vercel/analytics/react").then(m => ({ default: m.Analytics })))
const SpeedInsights = lazy(() => import("@vercel/speed-insights/react").then(m => ({ default: m.SpeedInsights })))

createRoot(
  document.getElementById('root')!
).render(
  <StrictMode>
    <App />
    <Suspense fallback={null}>
      <Analytics/>
      <SpeedInsights/>
    </Suspense>
  </StrictMode>
)

// Mark React as loaded to hide critical elements and show React versions
// Increased delay to reduce flickering during initial load
setTimeout(() => {
  document.documentElement.classList.add('react-loaded')
}, 200)
