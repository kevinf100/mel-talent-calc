import { Header } from './components/Header'
import { Layout } from './components/Layout'
import { TalentGrid } from './components/TalentGrid'

function App() {
  return (
    <Layout header={<Header />}>
      <TalentGrid />
    </Layout>
  )
}

export default App
