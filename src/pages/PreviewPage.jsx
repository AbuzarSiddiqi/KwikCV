import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
    FileText, ChevronLeft, Download, Share2, Edit,
    ZoomIn, ZoomOut, Sparkles, Printer
} from 'lucide-react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { useResume, useAtsScore } from '../context/ResumeContext'
import ShakraTemplate from '../templates/ShakraTemplate'
import AshishTemplate from '../templates/AshishTemplate'
import ATSScoreCard from '../components/ats/ATSScoreCard'
import './PreviewPage.css'

// Only 2 templates
const templates = {
    shakra: ShakraTemplate,
    ashish: AshishTemplate
}

function PreviewPage() {
    const navigate = useNavigate()
    const { state } = useResume()
    const atsData = useAtsScore()
    const previewRef = useRef(null)
    const printRef = useRef(null)
    const [isExporting, setIsExporting] = useState(false)
    const [showAts, setShowAts] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile viewport and set appropriate zoom
    const [zoom, setZoom] = useState(() => {
        return window.innerWidth <= 768 ? 0.4 : 0.7
    })

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)
            if (mobile && zoom > 0.5) {
                setZoom(0.4)
            } else if (!mobile && zoom < 0.5) {
                setZoom(0.7)
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [zoom])

    // Default to shakra template
    const TemplateComponent = templates[state.selectedTemplate] || ShakraTemplate

    const handlePrint = () => {
        window.print()
    }

    const handleExportPDF = async () => {
        if (!printRef.current) return

        setIsExporting(true)

        try {
            const element = printRef.current

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: 816,
                height: 1056,
                windowWidth: 816,
                windowHeight: 1056,
            })

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [816, 1056],
                hotfixes: ['px_scaling']
            })

            const imgData = canvas.toDataURL('image/png')
            pdf.addImage(imgData, 'PNG', 0, 0, 816, 1056)

            const filename = state.personalInfo.fullName
                ? `${state.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
                : 'Resume.pdf'

            pdf.save(filename)
        } catch (error) {
            console.error('PDF export failed:', error)
            alert('Failed to export PDF. Please try again.')
        } finally {
            setIsExporting(false)
        }
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${state.personalInfo.fullName || 'My'} Resume`,
                    text: 'Check out my resume created with KwikCV!',
                    url: window.location.href
                })
            } catch (error) {
                console.log('Share cancelled')
            }
        } else {
            alert('Sharing is not supported on this browser')
        }
    }

    const adjustZoom = (delta) => {
        setZoom(prev => {
            const newZoom = prev + delta
            return Math.max(0.3, Math.min(1.2, newZoom))
        })
    }

    return (
        <div className="preview-page">
            {/* Header */}
            <header className="preview-header">
                <div className="header-left">
                    <button className="btn" onClick={() => navigate('/templates')}>
                        <ChevronLeft size={20} />
                        <span className="header-text">Templates</span>
                    </button>
                </div>

                <div className="header-center">
                    <FileText size={20} />
                    <span>KwikCV</span>
                </div>

                <div className="header-right">
                    <button className="btn hide-mobile" onClick={() => navigate('/builder')}>
                        <Edit size={18} />
                    </button>
                    <button className="btn hide-mobile" onClick={handleShare}>
                        <Share2 size={18} />
                    </button>
                    <button className="btn hide-mobile" onClick={handlePrint}>
                        <Printer size={18} />
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleExportPDF}
                        disabled={isExporting}
                    >
                        <Download size={18} />
                        <span className="header-text">
                            {isExporting ? 'Exporting...' : 'Download PDF'}
                        </span>
                    </button>
                </div>
            </header>

            {/* Layout */}
            <div className="preview-layout">
                {/* Sidebar - ATS Score */}
                <aside className={`preview-sidebar ${showAts ? 'show' : ''}`}>
                    <ATSScoreCard {...atsData} />

                    <div className="sidebar-actions">
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/builder')}
                        >
                            <Edit size={16} />
                            Edit Resume
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/templates')}
                        >
                            Change Template
                        </button>
                    </div>
                </aside>

                {/* Main Preview */}
                <main className="preview-main">
                    {/* Zoom Controls */}
                    <div className="zoom-controls">
                        <button
                            className="zoom-btn"
                            onClick={() => adjustZoom(-0.1)}
                        >
                            <ZoomOut size={18} />
                        </button>
                        <span className="zoom-label">{Math.round(zoom * 100)}%</span>
                        <button
                            className="zoom-btn"
                            onClick={() => adjustZoom(0.1)}
                        >
                            <ZoomIn size={18} />
                        </button>

                        {isMobile && (
                            <button
                                className="ats-toggle-btn"
                                onClick={() => setShowAts(!showAts)}
                            >
                                <Sparkles size={16} />
                                {atsData.score}%
                            </button>
                        )}
                    </div>

                    {/* Resume Preview */}
                    <div className="preview-container" ref={previewRef}>
                        <div
                            className="preview-wrapper clickable-preview"
                            style={{ transform: `scale(${zoom})`, width: '8.5in' }}
                            onClick={() => navigate('/builder')}
                        >
                            <TemplateComponent data={state} />
                            <div className="edit-overlay">
                                <Edit size={24} />
                                <span>Click to Edit</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Hidden PDF export container - matches exact template dimensions */}
            <div className="pdf-container">
                <div ref={printRef} id="resume-print-container" className="pdf-resume-wrapper">
                    <TemplateComponent data={state} />
                </div>
            </div>

            {/* Print-only content */}
            <div className="print-only">
                <TemplateComponent data={state} />
            </div>
        </div>
    )
}

export default PreviewPage
