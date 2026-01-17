import { createContext, useContext, useReducer, useEffect } from 'react'

const ResumeContext = createContext(null)

const initialState = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',
        summary: ''
    },
    experience: [],
    education: [],
    skills: {
        technical: [],
        soft: [],
        languages: []
    },
    projects: [],
    certifications: [],
    achievements: [],
    selectedTemplate: 'classic',
    lastSaved: null
}

function resumeReducer(state, action) {
    switch (action.type) {
        case 'SET_PERSONAL_INFO':
            return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } }

        case 'ADD_EXPERIENCE':
            return { ...state, experience: [...state.experience, action.payload] }

        case 'UPDATE_EXPERIENCE':
            return {
                ...state,
                experience: state.experience.map((exp, i) =>
                    i === action.index ? { ...exp, ...action.payload } : exp
                )
            }

        case 'REMOVE_EXPERIENCE':
            return {
                ...state,
                experience: state.experience.filter((_, i) => i !== action.index)
            }

        case 'ADD_EDUCATION':
            return { ...state, education: [...state.education, action.payload] }

        case 'UPDATE_EDUCATION':
            return {
                ...state,
                education: state.education.map((edu, i) =>
                    i === action.index ? { ...edu, ...action.payload } : edu
                )
            }

        case 'REMOVE_EDUCATION':
            return {
                ...state,
                education: state.education.filter((_, i) => i !== action.index)
            }

        case 'SET_SKILLS':
            return { ...state, skills: { ...state.skills, ...action.payload } }

        case 'ADD_SKILL':
            return {
                ...state,
                skills: {
                    ...state.skills,
                    [action.category]: [...state.skills[action.category], action.payload]
                }
            }

        case 'REMOVE_SKILL':
            return {
                ...state,
                skills: {
                    ...state.skills,
                    [action.category]: state.skills[action.category].filter((_, i) => i !== action.index)
                }
            }

        case 'ADD_PROJECT':
            return { ...state, projects: [...state.projects, action.payload] }

        case 'UPDATE_PROJECT':
            return {
                ...state,
                projects: state.projects.map((proj, i) =>
                    i === action.index ? { ...proj, ...action.payload } : proj
                )
            }

        case 'REMOVE_PROJECT':
            return {
                ...state,
                projects: state.projects.filter((_, i) => i !== action.index)
            }

        case 'ADD_CERTIFICATION':
            return { ...state, certifications: [...state.certifications, action.payload] }

        case 'UPDATE_CERTIFICATION':
            return {
                ...state,
                certifications: state.certifications.map((cert, i) =>
                    i === action.index ? { ...cert, ...action.payload } : cert
                )
            }

        case 'REMOVE_CERTIFICATION':
            return {
                ...state,
                certifications: state.certifications.filter((_, i) => i !== action.index)
            }

        case 'ADD_ACHIEVEMENT':
            return { ...state, achievements: [...state.achievements, action.payload] }

        case 'REMOVE_ACHIEVEMENT':
            return {
                ...state,
                achievements: state.achievements.filter((_, i) => i !== action.index)
            }

        case 'SET_TEMPLATE':
            return { ...state, selectedTemplate: action.payload }

        case 'LOAD_RESUME':
            return { ...action.payload, lastSaved: new Date().toISOString() }

        case 'RESET_RESUME':
            return { ...initialState }

        case 'MARK_SAVED':
            return { ...state, lastSaved: new Date().toISOString() }

        default:
            return state
    }
}

export function ResumeProvider({ children }) {
    const [state, dispatch] = useReducer(resumeReducer, initialState, (initial) => {
        const saved = localStorage.getItem('kwikcv_resume')
        if (saved) {
            try {
                return { ...initial, ...JSON.parse(saved) }
            } catch {
                return initial
            }
        }
        return initial
    })

    // Auto-save to localStorage
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            localStorage.setItem('kwikcv_resume', JSON.stringify(state))
            dispatch({ type: 'MARK_SAVED' })
        }, 1000)

        return () => clearTimeout(timeoutId)
    }, [state])

    return (
        <ResumeContext.Provider value={{ state, dispatch }}>
            {children}
        </ResumeContext.Provider>
    )
}

export function useResume() {
    const context = useContext(ResumeContext)
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider')
    }
    return context
}

export function useAtsScore() {
    const { state } = useResume()

    const calculateScore = () => {
        let score = 0
        let maxScore = 0
        const tips = []
        const missingKeywords = []

        // Get all resume text for keyword analysis
        const resumeText = getResumeText(state).toLowerCase()

        // Personal Info (20 points)
        maxScore += 20
        const { personalInfo } = state
        if (personalInfo.fullName) score += 4
        else tips.push({ category: 'Personal Info', tip: 'Add your full name' })

        if (personalInfo.email) score += 4
        else tips.push({ category: 'Personal Info', tip: 'Add your email address' })

        if (personalInfo.phone) score += 4
        else tips.push({ category: 'Personal Info', tip: 'Add your phone number' })

        if (personalInfo.location) score += 3
        else tips.push({ category: 'Personal Info', tip: 'Add your location' })

        if (personalInfo.linkedin) score += 3
        else tips.push({ category: 'Personal Info', tip: 'Add your LinkedIn profile' })

        if (personalInfo.summary && personalInfo.summary.length >= 50) score += 2
        else tips.push({ category: 'Personal Info', tip: 'Add a professional summary (50+ characters)' })

        // Experience (30 points)
        maxScore += 30
        if (state.experience.length > 0) {
            score += 10
            let expPoints = 0
            state.experience.forEach((exp) => {
                if (exp.company && exp.title) expPoints += 3
                if (exp.responsibilities && exp.responsibilities.filter(r => r).length >= 2) expPoints += 4
                if (exp.responsibilities && exp.responsibilities.some(r => /\d+%|\d+ |\$\d+/i.test(r))) expPoints += 3 // Has metrics
            })
            score += Math.min(expPoints, 20)
        } else {
            tips.push({ category: 'Experience', tip: 'Add at least one work experience' })
        }

        // Check for action verbs and metrics in experience
        const hasActionVerbs = /\b(led|managed|developed|created|implemented|designed|improved|increased|decreased|achieved|delivered|built|launched|optimized|analyzed|coordinated)\b/i.test(resumeText)
        if (!hasActionVerbs && state.experience.length > 0) {
            tips.push({ category: 'Experience', tip: 'Use strong action verbs (Led, Managed, Developed, etc.)' })
        }

        const hasMetrics = /\d+%|\d+\+|\$\d+|\d+ (users|customers|projects|clients|team)/i.test(resumeText)
        if (!hasMetrics && state.experience.length > 0) {
            tips.push({ category: 'Experience', tip: 'Add quantifiable achievements (%, $, numbers)' })
        }

        // Education (15 points)
        maxScore += 15
        if (state.education.length > 0) {
            score += 15
        } else {
            tips.push({ category: 'Education', tip: 'Add your educational background' })
        }

        // Skills (20 points)
        maxScore += 20
        const totalSkills = state.skills.technical.length + state.skills.soft.length
        if (totalSkills >= 8) {
            score += 20
        } else if (totalSkills >= 5) {
            score += 15
            tips.push({ category: 'Skills', tip: 'Add more skills (aim for 8+)' })
        } else if (totalSkills >= 3) {
            score += 10
            tips.push({ category: 'Skills', tip: 'Add more skills to improve ATS match' })
        } else if (totalSkills > 0) {
            score += 5
            tips.push({ category: 'Skills', tip: 'Add more technical and soft skills' })
        } else {
            tips.push({ category: 'Skills', tip: 'Add your technical and soft skills' })
        }

        // Projects (10 points)
        maxScore += 10
        if (state.projects.length > 0) {
            score += 10
        } else {
            tips.push({ category: 'Projects', tip: 'Add projects to showcase your work' })
        }

        // Certifications (5 points)
        maxScore += 5
        if (state.certifications.length > 0) {
            score += 5
        }

        // Analyze missing keywords based on skills and job type
        const detectedMissingKeywords = analyzeMissingKeywords(state, resumeText)
        missingKeywords.push(...detectedMissingKeywords)

        const percentage = Math.round((score / maxScore) * 100)

        return {
            score: percentage,
            tips: tips.slice(0, 5),
            missingKeywords: missingKeywords.slice(0, 5),
            breakdown: {
                personalInfo: calculateSectionScore(state, 'personalInfo'),
                experience: calculateSectionScore(state, 'experience'),
                education: calculateSectionScore(state, 'education'),
                skills: calculateSectionScore(state, 'skills'),
                projects: calculateSectionScore(state, 'projects')
            }
        }
    }

    return calculateScore()
}

// Helper function to get all text from resume
function getResumeText(state) {
    const texts = []
    
    // Personal info
    texts.push(state.personalInfo.summary || '')
    texts.push(state.personalInfo.title || '')
    
    // Experience
    state.experience.forEach(exp => {
        texts.push(exp.title || '')
        texts.push(exp.company || '')
        texts.push(exp.technologies || '')
        if (exp.responsibilities) {
            texts.push(exp.responsibilities.join(' '))
        }
    })
    
    // Skills
    texts.push(state.skills.technical.join(' '))
    texts.push(state.skills.soft.join(' '))
    if (state.skills.languages) {
        texts.push(state.skills.languages.join(' '))
    }
    
    // Projects
    state.projects.forEach(proj => {
        texts.push(proj.title || '')
        texts.push(proj.description || '')
        texts.push(proj.technologies || '')
    })
    
    // Certifications
    state.certifications.forEach(cert => {
        texts.push(cert.name || '')
        texts.push(cert.issuer || '')
    })
    
    return texts.join(' ')
}

// Analyze missing keywords based on detected job type and industry standards
function analyzeMissingKeywords(state, resumeText) {
    const missing = []
    const allSkills = [...state.skills.technical, ...state.skills.soft].map(s => s.toLowerCase())
    
    // Detect job type from title/experience
    const jobType = detectJobType(state)
    
    // Common ATS keywords by job type
    const keywordsByJobType = {
        software: ['git', 'agile', 'api', 'testing', 'ci/cd', 'docker', 'aws', 'rest', 'sql', 'linux'],
        data: ['sql', 'python', 'excel', 'tableau', 'power bi', 'statistics', 'analytics', 'visualization', 'etl', 'data modeling'],
        web: ['html', 'css', 'javascript', 'react', 'node.js', 'responsive', 'api', 'git', 'typescript', 'frontend'],
        mobile: ['ios', 'android', 'swift', 'kotlin', 'react native', 'flutter', 'mobile', 'app', 'ui/ux', 'api'],
        design: ['figma', 'adobe', 'ui/ux', 'wireframe', 'prototype', 'user research', 'design system', 'sketch', 'illustrator', 'photoshop'],
        marketing: ['seo', 'analytics', 'social media', 'content', 'campaigns', 'google ads', 'email marketing', 'crm', 'hubspot', 'metrics'],
        management: ['agile', 'scrum', 'jira', 'leadership', 'stakeholder', 'roadmap', 'kpi', 'budget', 'team', 'strategy'],
        general: ['communication', 'teamwork', 'problem-solving', 'leadership', 'time management', 'analytical', 'detail-oriented', 'collaboration']
    }
    
    // Get relevant keywords for detected job type
    const relevantKeywords = [
        ...(keywordsByJobType[jobType] || []),
        ...keywordsByJobType.general
    ]
    
    // Find missing keywords that are not in resume
    relevantKeywords.forEach(keyword => {
        const keywordLower = keyword.toLowerCase()
        const isInResume = resumeText.includes(keywordLower) || 
                          allSkills.some(skill => skill.includes(keywordLower) || keywordLower.includes(skill))
        
        if (!isInResume && missing.length < 5) {
            // Capitalize properly
            missing.push(keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
        }
    })
    
    return missing
}

// Detect job type from resume content
function detectJobType(state) {
    const text = [
        state.personalInfo.title || '',
        state.personalInfo.summary || '',
        ...state.experience.map(e => e.title || ''),
        ...state.skills.technical
    ].join(' ').toLowerCase()
    
    if (/data|analyst|analytics|bi|business intelligence|sql|tableau|power bi/i.test(text)) return 'data'
    if (/software|developer|engineer|backend|fullstack|programming/i.test(text)) return 'software'
    if (/frontend|web|react|javascript|html|css|ui developer/i.test(text)) return 'web'
    if (/mobile|ios|android|app developer|react native|flutter/i.test(text)) return 'mobile'
    if (/design|ux|ui|graphic|creative|figma|adobe/i.test(text)) return 'design'
    if (/marketing|seo|content|social media|digital marketing/i.test(text)) return 'marketing'
    if (/manager|lead|director|management|scrum|agile/i.test(text)) return 'management'
    
    return 'general'
}

// Calculate section score percentage
function calculateSectionScore(state, section) {
    switch (section) {
        case 'personalInfo': {
            let filled = 0
            if (state.personalInfo.fullName) filled++
            if (state.personalInfo.email) filled++
            if (state.personalInfo.phone) filled++
            if (state.personalInfo.location) filled++
            if (state.personalInfo.linkedin) filled++
            if (state.personalInfo.summary && state.personalInfo.summary.length >= 50) filled++
            return Math.round((filled / 6) * 100)
        }
        case 'experience': {
            if (state.experience.length === 0) return 0
            let score = 50 // Base for having experience
            state.experience.forEach(exp => {
                if (exp.title && exp.company) score += 15
                if (exp.responsibilities && exp.responsibilities.filter(r => r).length >= 2) score += 10
            })
            return Math.min(score, 100)
        }
        case 'education':
            return state.education.length > 0 ? 100 : 0
        case 'skills': {
            const total = state.skills.technical.length + state.skills.soft.length
            if (total >= 8) return 100
            if (total >= 5) return 75
            if (total >= 3) return 50
            if (total > 0) return 25
            return 0
        }
        case 'projects':
            return state.projects.length > 0 ? 100 : 0
        default:
            return 0
    }
}
