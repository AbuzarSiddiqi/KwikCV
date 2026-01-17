import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import './Forms.css'

const emptyEducation = {
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    honors: ''
}

function EducationForm() {
    const { state, dispatch } = useResume()
    const [expandedIndex, setExpandedIndex] = useState(0)

    const addEducation = () => {
        dispatch({ type: 'ADD_EDUCATION', payload: { ...emptyEducation } })
        setExpandedIndex(state.education.length)
    }

    const updateEducation = (index, field, value) => {
        dispatch({
            type: 'UPDATE_EDUCATION',
            index,
            payload: { [field]: value }
        })
    }

    const removeEducation = (index) => {
        dispatch({ type: 'REMOVE_EDUCATION', index })
        if (expandedIndex >= state.education.length - 1) {
            setExpandedIndex(Math.max(0, state.education.length - 2))
        }
    }

    return (
        <div className="form-section">
            <p className="form-intro">
                Add your educational background, starting with the most recent.
            </p>

            {state.education.length === 0 ? (
                <div className="empty-state">
                    <p>No education added yet.</p>
                    <button className="btn btn-primary" onClick={addEducation}>
                        <Plus size={18} />
                        Add Education
                    </button>
                </div>
            ) : (
                <div className="entries-list">
                    {state.education.map((edu, index) => (
                        <div key={index} className="entry-card">
                            <div
                                className="entry-header"
                                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                            >
                                <div className="entry-drag">
                                    <GripVertical size={18} />
                                </div>
                                <div className="entry-summary">
                                    <h4>{edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}</h4>
                                    <p>{edu.institution || 'Institution Name'}</p>
                                </div>
                                <div className="entry-actions">
                                    <button
                                        className="btn btn-ghost btn-icon"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeEducation(index)
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
                                        <div className="form-group full-width">
                                            <label className="form-label">Institution Name *</label>
                                            <input
                                                type="text"
                                                value={edu.institution}
                                                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                                placeholder="e.g., Indian Institute of Technology"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Degree *</label>
                                            <input
                                                type="text"
                                                value={edu.degree}
                                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                                placeholder="e.g., Bachelor of Technology"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Field of Study</label>
                                            <input
                                                type="text"
                                                value={edu.field}
                                                onChange={(e) => updateEducation(index, 'field', e.target.value)}
                                                placeholder="e.g., Computer Science"
                                            />
                                        </div>

                                        <div className="form-group full-width">
                                            <label className="form-label">Location</label>
                                            <input
                                                type="text"
                                                value={edu.location}
                                                onChange={(e) => updateEducation(index, 'location', e.target.value)}
                                                placeholder="e.g., Mumbai, India"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Start Date</label>
                                            <input
                                                type="month"
                                                value={edu.startDate}
                                                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">End Date (or Expected)</label>
                                            <input
                                                type="month"
                                                value={edu.endDate}
                                                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">GPA / Percentage</label>
                                            <input
                                                type="text"
                                                value={edu.gpa}
                                                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                                                placeholder="e.g., 8.5/10 or 85%"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Honors / Awards</label>
                                            <input
                                                type="text"
                                                value={edu.honors}
                                                onChange={(e) => updateEducation(index, 'honors', e.target.value)}
                                                placeholder="e.g., Dean's List, Gold Medal"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <button className="btn btn-secondary add-entry-btn" onClick={addEducation}>
                        <Plus size={18} />
                        Add Another Education
                    </button>
                </div>
            )}
        </div>
    )
}

export default EducationForm
