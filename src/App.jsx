import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BuilderPage from './pages/BuilderPage'
import TemplatePage from './pages/TemplatePage'
import PreviewPage from './pages/PreviewPage'
import BottomNav from './components/BottomNav'
import ScrollToTop from './components/ScrollToTop'

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/builder" element={<BuilderPage />} />
                <Route path="/templates" element={<TemplatePage />} />
                <Route path="/preview" element={<PreviewPage />} />
            </Routes>
            <BottomNav />
        </>
    )
}

export default App
