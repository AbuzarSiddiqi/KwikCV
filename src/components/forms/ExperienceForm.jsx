import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import './Forms.css'

const emptyExperience = {
    company: '',
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    responsibilities: ['']
}

function ExperienceForm() {
    const { state, dispatch } = useResume()
    const [expandedIndex, setExpandedIndex] = useState(0)

    const addExperience = () => {
        dispatch({ type: 'ADD_EXPERIENCE', payload: { ...emptyExperience } })
        setExpandedIndex(state.experience.length)
    }

    const updateExperience = (index, field, value) => {
        dispatch({
            type: 'UPDATE_EXPERIENCE',
            index,
            payload: { [field]: value }
        })
    }

    const removeExperience = (index) => {
        dispatch({ type: 'REMOVE_EXPERIENCE', index })
        if (expandedIndex >= state.experience.length - 1) {
            setExpandedIndex(Math.max(0, state.experience.length - 2))
        }
    }

    const updateResponsibility = (expIndex, respIndex, value) => {
        const newResponsibilities = [...state.experience[expIndex].responsibilities]
        newResponsibilities[respIndex] = value
        dispatch({
            type: 'UPDATE_EXPERIENCE',
            index: expIndex,
            payload: { responsibilities: newResponsibilities }
        })
    }

    const addResponsibility = (expIndex) => {
        const newResponsibilities = [...state.experience[expIndex].responsibilities, '']
        dispatch({
            type: 'UPDATE_EXPERIENCE',
            index: expIndex,
            payload: { responsibilities: newResponsibilities }
        })
    }

    const removeResponsibility = (expIndex, respIndex) => {
        const newResponsibilities = state.experience[expIndex].responsibilities.filter(
            (_, i) => i !== respIndex
        )
        dispatch({
            type: 'UPDATE_EXPERIENCE',
            index: expIndex,
            payload: { responsibilities: newResponsibilities }
        })
    }

    return (
        <div className="form-section">
            <p className="form-intro">
                Add your work experience, starting with your most recent position.
            </p>

            {state.experience.length === 0 ? (
                <div className="empty-state">
                    <p>No work experience added yet.</p>
                    <button className="btn btn-primary" onClick={addExperience}>
                        <Plus size={18} />
                        Add Experience
                    </button>
                </div>
            ) : (
                <div className="entries-list">
                    {state.experience.map((exp, index) => (
                        <div key={index} className="entry-card">
                            <div
                                className="entry-header"
                                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                            >
                                <div className="entry-drag">
                                    <GripVertical size={18} />
                                </div>
                                <div className="entry-summary">
                                    <h4>{exp.title || 'Untitled Position'}</h4>
                                    <p>{exp.company || 'Company Name'}</p>
                                </div>
                                <div className="entry-actions">
                                    <button
                                        className="btn btn-ghost btn-icon"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeExperience(index)
                                        }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    {expandedIndex === index ? (
                                        <ChevronUp size={20} />
                                    ) : (
                                        <ChevronDown size={20} />
                                    )}
                                </div>
                            </div>

                            {expandedIndex === index && (
                                <div className="entry-content">
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label className="form-label">Job Title *</label>
                                            <input
                                                type="text"
                                                value={exp.title}
                                                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                                placeholder="e.g., Software Engineer"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Company *</label>
                                            <input
                                                type="text"
                                                value={exp.company}
                                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                                placeholder="e.g., Google"
                                            />
                                        </div>

                                        <div className="form-group full-width">
                                            <label className="form-label">Location</label>
                                            <input
                                                type="text"
                                                value={exp.location}
                                                onChange={(e) => updateExperience(index, 'location', e.target.value)}
                                                placeholder="e.g., Bangalore, India"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Start Date</label>
                                            <input
                                                type="month"
                                                value={exp.startDate}
                                                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">End Date</label>
                                            <input
                                                type="month"
                                                value={exp.endDate}
                                                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                                disabled={exp.current}
                                            />
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={exp.current}
                                                    onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                                                />
                                                Currently working here
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Key Responsibilities & Achievements</label>
                                        <div className="responsibilities-list">
                                            {exp.responsibilities.map((resp, respIndex) => (
                                                <div key={respIndex} className="responsibility-item">
                                                    <span className="bullet">•</span>
                                                    <input
                                                        type="text"
                                                        value={resp}
                                                        onChange={(e) => updateResponsibility(index, respIndex, e.target.value)}
                                                        placeholder="Start with an action verb (e.g., Developed, Led, Improved...)"
                                                    />
                                                    {exp.responsibilities.length > 1 && (
                                                        <button
                                                            className="btn btn-ghost btn-icon btn-sm"
                                                            onClick={() => removeResponsibility(index, respIndex)}
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            className="btn btn-ghost btn-sm add-resp-btn"
                                            onClick={() => addResponsibility(index)}
                                        >
                                            <Plus size={16} />
                                            Add Bullet Point
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <button className="btn btn-secondary add-entry-btn" onClick={addExperience}>
                        <Plus size={18} />
                        Add Another Experience
                    </button>
                </div>
            )}
        </div>
    )
}

export default ExperienceForm
