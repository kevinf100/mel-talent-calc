import { lazy, Suspense } from 'react'
import { Header } from './components/Header'
import { Layout } from './components/Layout'

// Lazy load the heavy TalentGrid component
const TalentGrid = lazy(() => import('./components/TalentGrid').then(m => ({ default: m.TalentGrid })))

function App() {
  return (
    <Layout header={<Header />}>
      <Suspense fallback={
        <div className="w-full h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
        </div>
      }>
        <TalentGrid />
      </Suspense>
    </Layout>
  )
}

export default App
