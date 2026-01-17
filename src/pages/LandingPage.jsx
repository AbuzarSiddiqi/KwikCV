import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    FileText, Sparkles, Smartphone, Download, Shield, Zap,
    Briefcase, GraduationCap, Code, AlertTriangle, Star,
    ChevronRight, Diamond
} from 'lucide-react'
import { useResume } from '../context/ResumeContext'
import './LandingPage.css'

function LandingPage() {
    const navigate = useNavigate()
    const { dispatch } = useResume()

    const resumeTypes = [
        { id: 'classic', icon: Briefcase, label: 'Professional', description: 'For experienced workers', template: 'classic' },
        { id: 'fresher', icon: GraduationCap, label: 'Fresher', description: 'For students & grads', template: 'fresher' },
        { id: 'tech', icon: Code, label: 'Tech', description: 'For developers & IT', template: 'tech' },
    ]

    const handleStartWithType = (type) => {
        dispatch({ type: 'SET_TEMPLATE', payload: type.template })
        navigate('/builder')
    }

    const features = [
        {
            icon: <Sparkles size={20} />,
            title: 'AI Analysis',
            description: 'Real-time content feedback',
            color: 'blue'
        },
        {
            icon: <Diamond size={20} />,
            title: 'Premium Design',
            description: 'Stand out visually',
            color: 'amber'
        },
        {
            icon: <Download size={20} />,
            title: 'PDF Export',
            description: 'Vector quality downloads',
            color: 'purple'
        },
        {
            icon: <Shield size={20} />,
            title: 'Data Secure',
            description: 'Local storage only',
            color: 'green'
        }
    ]

    return (
        <div className="landing">
            {/* Header */}
            <header className="landing-header">
                <div className="header-brand">
                    <div className="brand-icon">
                        <FileText size={20} />
                    </div>
                    <span className="brand-name">KwikCV</span>
                </div>

            </header>

            <main className="landing-main">
                {/* Hero Section */}
                <section className="hero-section">
                    {/* Headline */}
                    <h1 className="hero-title">
                        Build an <span className="text-gold">ATS-Proof</span> Career
                    </h1>

                    <p className="hero-subtitle">
                        Craft a resume that beats the bots and impresses recruiters.
                        High-end templates for the modern professional, optimized by AI.
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero-cta">
                        <button
                            className="btn-primary"
                            onClick={() => navigate('/builder')}
                        >
                            <span>Get Started Free</span>
                            <ChevronRight size={18} />
                        </button>
                        <button
                            className="btn-outline"
                            onClick={() => navigate('/templates')}
                        >
                            View Templates
                        </button>
                    </div>

                    {/* Rating */}
                    <div className="hero-rating">
                        <Star size={16} className="star-icon" />
                        <span>4.9/5 from 10K+ users</span>
                    </div>
                </section>

                {/* Resume Type Quick Start */}
                <section className="resume-types-section">
                    <p className="section-label">Quick Start</p>
                    <div className="resume-types">
                        {resumeTypes.map((type) => {
                            const Icon = type.icon
                            return (
                                <button
                                    key={type.id}
                                    className="resume-type-card"
                                    onClick={() => handleStartWithType(type)}
                                >
                                    <Icon size={24} />
                                    <span className="type-label">{type.label}</span>
                                    <span className="type-desc">{type.description}</span>
                                </button>
                            )
                        })}
                    </div>
                </section>

                {/* Feature Grid */}
                <section className="features-section">
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className={`feature-card feature-${feature.color}`}>
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <div className="feature-content">
                                    <h4>{feature.title}</h4>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why ATS Matters Card */}
                <section className="ats-section">
                    <div className="ats-card">
                        <div className="ats-header">
                            <AlertTriangle size={16} className="warning-icon" />
                            <span>CRUCIAL INSIGHT</span>
                        </div>
                        <h2 className="ats-title">Why ATS Matters?</h2>
                        <p className="ats-text">
                            75% of resumes are rejected by algorithms before a human ever sees them.
                            Traditional templates confuse the bots. Our "ATS-Proof" engine ensures
                            your skills are parsed correctly, increasing your interview chances by 3x.
                        </p>
                        <button className="ats-link">
                            Learn how it works
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="landing-footer">
                <p>© 2026 KwikCV. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default LandingPage
