import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    User, Briefcase, GraduationCap, Wrench, FolderOpen, Award,
    ChevronDown, ChevronUp, Check, X, Sparkles, Eye, FileText
} from 'lucide-react'
import { useResume, useAtsScore } from '../context/ResumeContext'
import PersonalInfoForm from '../components/forms/PersonalInfoForm'
import ExperienceForm from '../components/forms/ExperienceForm'
import EducationForm from '../components/forms/EducationForm'
import SkillsForm from '../components/forms/SkillsForm'
import ProjectsForm from '../components/forms/ProjectsForm'
import CertificationsForm from '../components/forms/CertificationsForm'
import ShakraTemplate from '../templates/ShakraTemplate'
import AshishTemplate from '../templates/AshishTemplate'
import './BuilderPage.css'

const sections = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'certifications', label: 'Certifications', icon: Award },
]

function BuilderPage() {
    const navigate = useNavigate()
    const { state } = useResume()
    const atsData = useAtsScore()
    const [activeTab, setActiveTab] = useState('editor') // 'editor' or 'preview'
    const [expandedSection, setExpandedSection] = useState('personal')

    const getSectionStatus = (sectionId) => {
        switch (sectionId) {
            case 'personal':
                return state.personalInfo.fullName && state.personalInfo.email ? 'complete' : 'incomplete'
            case 'experience':
                return state.experience.length > 0 ? 'complete' : 'incomplete'
            case 'education':
                return state.education.length > 0 ? 'complete' : 'incomplete'
            case 'skills':
                return (state.skills.technical.length + state.skills.soft.length) > 0 ? 'complete' : 'incomplete'
            case 'projects':
                return state.projects.length > 0 ? 'complete' : 'optional'
            case 'certifications':
                return state.certifications.length > 0 ? 'complete' : 'optional'
            default:
                return 'incomplete'
        }
    }

    const renderForm = (sectionId) => {
        switch (sectionId) {
            case 'personal':
                return <PersonalInfoForm />
            case 'experience':
                return <ExperienceForm />
            case 'education':
                return <EducationForm />
            case 'skills':
                return <SkillsForm />
            case 'projects':
                return <ProjectsForm />
            case 'certifications':
                return <CertificationsForm />
            default:
                return null
        }
    }

    const toggleSection = (sectionId) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId)
    }

    // Get missing keywords from real ATS analysis
    const missingKeywords = atsData.missingKeywords || []

    return (
        <div className="builder">
            {/* Header */}
            <header className="builder-header">
                <button className="icon-btn" onClick={() => navigate('/')}>
                    <FileText size={20} />
                </button>
                <h1>{state.personalInfo.fullName || 'Your Resume'}</h1>
                <button className="export-btn" onClick={() => navigate('/preview')}>
                    Export
                </button>
            </header>

            {/* Tab Toggle */}
            <div className="tab-toggle">
                <button
                    className={`tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('editor')}
                >
                    <FileText size={16} />
                    Editor
                </button>
                <button
                    className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('preview')}
                >
                    <Eye size={16} />
                    Preview
                </button>
            </div>

            {activeTab === 'editor' ? (
                <main className="builder-main">
                    {/* ATS Score Card */}
                    <div className="ats-card">
                        <div className="ats-score-ring">
                            <svg viewBox="0 0 100 100">
                                <circle
                                    cx="50" cy="50" r="42"
                                    fill="none"
                                    stroke="var(--color-bg-tertiary)"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="50" cy="50" r="42"
                                    fill="none"
                                    stroke="var(--color-accent-primary)"
                                    strokeWidth="8"
                                    strokeDasharray={`${atsData.score * 2.64} 264`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div className="score-value">{atsData.score}</div>
                        </div>
                        <div className="ats-info">
                            <div className="ats-label">
                                <span className="label-text">ATS Score</span>
                                <span className="status-badge">
                                    <Sparkles size={12} />
                                    OPTIMIZATION ACTIVE
                                </span>
                            </div>
                            <div className="missing-keywords">
                                {missingKeywords.length > 0 ? (
                                    <>
                                        <span className="keywords-label">SUGGESTED KEYWORDS TO ADD</span>
                                        <div className="keyword-chips">
                                            {missingKeywords.map((kw, i) => (
                                                <span key={i} className="keyword-chip">
                                                    <X size={10} />
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <span className="keywords-label success">✓ KEYWORD COVERAGE OPTIMAL</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Accordion Sections */}
                    <div className="accordion">
                        {sections.map((section) => {
                            const Icon = section.icon
                            const status = getSectionStatus(section.id)
                            const isExpanded = expandedSection === section.id

                            return (
                                <div
                                    key={section.id}
                                    className={`accordion-item ${isExpanded ? 'expanded' : ''}`}
                                >
                                    <button
                                        className="accordion-header"
                                        onClick={() => toggleSection(section.id)}
                                    >
                                        <div className="header-left">
                                            <Icon size={18} />
                                            <span>{section.label}</span>
                                        </div>
                                        <div className="header-right">
                                            {status === 'complete' && (
                                                <span className="status-check">
                                                    <Check size={14} />
                                                </span>
                                            )}
                                            {isExpanded ? (
                                                <ChevronUp size={18} />
                                            ) : (
                                                <ChevronDown size={18} />
                                            )}
                                        </div>
                                    </button>
                                    {isExpanded && (
                                        <div className="accordion-content">
                                            {renderForm(section.id)}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </main>
            ) : (
                <main className="builder-preview-container">
                    <div className="live-preview-wrapper">
                        <div className="live-preview-scale">
                            {state.selectedTemplate === 'ashish' ? (
                                <AshishTemplate data={state} />
                            ) : (
                                <ShakraTemplate data={state} />
                            )}
                        </div>
                    </div>
                    <button
                        className="btn-primary full-preview-btn"
                        onClick={() => navigate('/preview')}
                    >
                        <Eye size={16} />
                        Open Full Preview
                    </button>
                </main>
            )}
        </div>
    )
}

export default BuilderPage
