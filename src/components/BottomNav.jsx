import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, FileText, LayoutGrid, Eye, Download } from 'lucide-react'
import { downloadResumePDF, getResumeFilename } from '../utils/pdfExport'
import './BottomNav.css'

function BottomNav() {
    const location = useLocation()
    const navigate = useNavigate()
    const path = location.pathname
    const [isDownloading, setIsDownloading] = useState(false)

    // Don't show on landing page
    if (path === '/') return null

    const navItems = [
        { id: 'home', path: '/', icon: Home, label: 'Home' },
        { id: 'builder', path: '/builder', icon: FileText, label: 'Builder' },
        { id: 'templates', path: '/templates', icon: LayoutGrid, label: 'Gallery' },
        { id: 'preview', path: '/preview', icon: Eye, label: 'Preview' },
    ]

    const handleDownload = async () => {
        setIsDownloading(true)
        try {
            const savedData = localStorage.getItem('kwikcv-resume')
            let filename = 'Resume.pdf'
            if (savedData) {
                const parsed = JSON.parse(savedData)
                filename = getResumeFilename(parsed.personalInfo?.fullName)
            }
            await downloadResumePDF('resume-pdf-source', filename)
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <nav className="bottom-nav">
            <div className="nav-items">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = path === item.path
                    return (
                        <button
                            key={item.id}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            <span>{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}

export default BottomNav
