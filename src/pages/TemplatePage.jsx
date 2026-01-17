import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Check, Star } from 'lucide-react'
import { useResume } from '../context/ResumeContext'
import ShakraTemplate from '../templates/ShakraTemplate'
import AshishTemplate from '../templates/AshishTemplate'
import './TemplatePage.css'

// ONLY 2 ATS-Optimized LaTeX Templates
const templates = [
    {
        id: 'shakra',
        name: 'Data Analyst Pro',
        description: 'Clean B&W LaTeX style - Based on sample.sty',
        component: ShakraTemplate,
        atsScore: 99,
        rating: 4.9,
        uses: '5.2k',
        category: 'professional'
    },
    {
        id: 'ashish',
        name: 'Tech Professional',
        description: 'Purple accent LaTeX style',
        component: AshishTemplate,
        atsScore: 98,
        rating: 4.9,
        uses: '4.8k',
        category: 'professional'
    }
]

function TemplatePage() {
    const navigate = useNavigate()
    const { state, dispatch } = useResume()

    const selectTemplate = (templateId) => {
        dispatch({ type: 'SET_TEMPLATE', payload: templateId })
    }

    return (
        <div className="template-page">
            {/* Header */}
            <header className="template-header">
                <button className="icon-btn" onClick={() => navigate('/builder')}>
                    <ArrowLeft size={22} />
                </button>
                <h1>Resume Templates</h1>
                <button className="icon-btn">
                    <Search size={22} />
                </button>
            </header>

            {/* Subtitle */}
            <div className="template-subtitle">
                <p>ATS-Optimized LaTeX-Style Professional Designs</p>
            </div>

            {/* Template Grid - Only 2 templates */}
            <main className="template-grid">
                {templates.map((template) => {
                    const TemplateComponent = template.component
                    const isSelected = state.selectedTemplate === template.id

                    return (
                        <div
                            key={template.id}
                            className={`template-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => selectTemplate(template.id)}
                        >
                            {/* Preview */}
                            <div className="card-preview">
                                <div className="preview-scale">
                                    <TemplateComponent data={state} />
                                </div>

                                {/* ATS Score Badge */}
                                <div className="ats-badge">
                                    <Check size={12} className="ats-icon success" />
                                    <span>{template.atsScore}% ATS</span>
                                </div>

                                {/* Selected Overlay */}
                                {isSelected && (
                                    <div className="selected-overlay">
                                        <Check size={24} />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="card-info">
                                <h3>{template.name}</h3>
                                <div className="card-meta">
                                    <Star size={12} className="star-icon" />
                                    <span>{template.rating} ({template.uses})</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </main>

            {/* Continue Button */}
            <div className="template-action">
                <button
                    className="continue-btn"
                    onClick={() => navigate('/preview')}
                >
                    Continue to Preview
                </button>
            </div>
        </div>
    )
}

export default TemplatePage
