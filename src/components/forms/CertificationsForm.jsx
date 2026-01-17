import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import './Forms.css'

const emptyCertification = {
    name: '',
    issuer: '',
    date: '',
    credentialId: '',
    link: ''
}

function CertificationsForm() {
    const { state, dispatch } = useResume()
    const [expandedIndex, setExpandedIndex] = useState(0)

    const addCertification = () => {
        dispatch({ type: 'ADD_CERTIFICATION', payload: { ...emptyCertification } })
        setExpandedIndex(state.certifications.length)
    }

    const updateCertification = (index, field, value) => {
        dispatch({
            type: 'UPDATE_CERTIFICATION',
            index,
            payload: { [field]: value }
        })
    }

    const removeCertification = (index) => {
        dispatch({ type: 'REMOVE_CERTIFICATION', index })
        if (expandedIndex >= state.certifications.length - 1) {
            setExpandedIndex(Math.max(0, state.certifications.length - 2))
        }
    }

    return (
        <div className="form-section">
            <p className="form-intro">
                Add relevant certifications and professional credentials.
                These demonstrate your commitment to learning and expertise.
            </p>

            {state.certifications.length === 0 ? (
                <div className="empty-state">
                    <p>No certifications added yet. Certifications are optional but can strengthen your resume!</p>
                    <button className="btn btn-primary" onClick={addCertification}>
                        <Plus size={18} />
                        Add Certification
                    </button>
                </div>
            ) : (
                <div className="entries-list">
                    {state.certifications.map((cert, index) => (
                        <div key={index} className="entry-card">
                            <div
                                className="entry-header"
                                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                            >
                                <div className="entry-drag">
                                    <GripVertical size={18} />
                                </div>
                                <div className="entry-summary">
                                    <h4>{cert.name || 'Certification Name'}</h4>
                                    <p>{cert.issuer || 'Issuing Organization'}</p>
                                </div>
                                <div className="entry-actions">
                                    <button
                                        className="btn btn-ghost btn-icon"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeCertification(index)
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
                                            <label className="form-label">Certification Name *</label>
                                            <input
                                                type="text"
                                                value={cert.name}
                                                onChange={(e) => updateCertification(index, 'name', e.target.value)}
                                                placeholder="e.g., AWS Certified Solutions Architect"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Issuing Organization *</label>
                                            <input
                                                type="text"
                                                value={cert.issuer}
                                                onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                                                placeholder="e.g., Amazon Web Services"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Date Obtained</label>
                                            <input
                                                type="month"
                                                value={cert.date}
                                                onChange={(e) => updateCertification(index, 'date', e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Credential ID</label>
                                            <input
                                                type="text"
                                                value={cert.credentialId}
                                                onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                                                placeholder="e.g., ABC123XYZ"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Verification Link</label>
                                            <input
                                                type="url"
                                                value={cert.link}
                                                onChange={(e) => updateCertification(index, 'link', e.target.value)}
                                                placeholder="https://..."
                                                inputMode="url"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <button className="btn btn-secondary add-entry-btn" onClick={addCertification}>
                        <Plus size={18} />
                        Add Another Certification
                    </button>
                </div>
            )}
        </div>
    )
}

export default CertificationsForm
