import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import './Forms.css'

function SkillsForm() {
    const { state, dispatch } = useResume()
    const [technicalInput, setTechnicalInput] = useState('')
    const [softInput, setSoftInput] = useState('')
    const [languageInput, setLanguageInput] = useState('')

    const addSkill = (category, input, setInput) => {
        const value = input.trim()
        if (value && !state.skills[category].includes(value)) {
            dispatch({
                type: 'ADD_SKILL',
                category,
                payload: value
            })
            setInput('')
        }
    }

    const removeSkill = (category, index) => {
        dispatch({ type: 'REMOVE_SKILL', category, index })
    }

    const handleKeyDown = (e, category, input, setInput) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            addSkill(category, input, setInput)
        }
    }

    const suggestedTechnical = [
        'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git',
        'TypeScript', 'AWS', 'Docker', 'Java', 'C++', 'MongoDB'
    ]

    const suggestedSoft = [
        'Leadership', 'Communication', 'Problem Solving', 'Team Collaboration',
        'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity'
    ]

    return (
        <div className="form-section">
            <p className="form-intro">
                Add your skills. Technical skills should be specific technologies, tools, or methodologies.
                Soft skills are interpersonal abilities.
            </p>

            {/* Technical Skills */}
            <div className="skill-section">
                <h3>Technical Skills</h3>
                <div className="tags-container">
                    {state.skills.technical.map((skill, index) => (
                        <span key={index} className="tag">
                            {skill}
                            <button
                                className="tag-remove"
                                onClick={() => removeSkill('technical', index)}
                            >
                                <X size={10} />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="tag-input-container">
                    <input
                        type="text"
                        value={technicalInput}
                        onChange={(e) => setTechnicalInput(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'technical', technicalInput, setTechnicalInput)}
                        placeholder="Type a skill and press Enter..."
                    />
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => addSkill('technical', technicalInput, setTechnicalInput)}
                        disabled={!technicalInput.trim()}
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <div className="skill-suggestions">
                    <span className="suggestion-label">Suggestions:</span>
                    {suggestedTechnical
                        .filter(s => !state.skills.technical.includes(s))
                        .slice(0, 6)
                        .map((skill, i) => (
                            <button
                                key={i}
                                className="suggestion-tag"
                                onClick={() => {
                                    dispatch({ type: 'ADD_SKILL', category: 'technical', payload: skill })
                                }}
                            >
                                + {skill}
                            </button>
                        ))}
                </div>
            </div>

            {/* Soft Skills */}
            <div className="skill-section">
                <h3>Soft Skills</h3>
                <div className="tags-container">
                    {state.skills.soft.map((skill, index) => (
                        <span key={index} className="tag">
                            {skill}
                            <button
                                className="tag-remove"
                                onClick={() => removeSkill('soft', index)}
                            >
                                <X size={10} />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="tag-input-container">
                    <input
                        type="text"
                        value={softInput}
                        onChange={(e) => setSoftInput(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'soft', softInput, setSoftInput)}
                        placeholder="Type a skill and press Enter..."
                    />
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => addSkill('soft', softInput, setSoftInput)}
                        disabled={!softInput.trim()}
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <div className="skill-suggestions">
                    <span className="suggestion-label">Suggestions:</span>
                    {suggestedSoft
                        .filter(s => !state.skills.soft.includes(s))
                        .slice(0, 4)
                        .map((skill, i) => (
                            <button
                                key={i}
                                className="suggestion-tag"
                                onClick={() => {
                                    dispatch({ type: 'ADD_SKILL', category: 'soft', payload: skill })
                                }}
                            >
                                + {skill}
                            </button>
                        ))}
                </div>
            </div>

            {/* Languages */}
            <div className="skill-section">
                <h3>Languages</h3>
                <div className="tags-container">
                    {state.skills.languages.map((lang, index) => (
                        <span key={index} className="tag">
                            {lang}
                            <button
                                className="tag-remove"
                                onClick={() => removeSkill('languages', index)}
                            >
                                <X size={10} />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="tag-input-container">
                    <input
                        type="text"
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'languages', languageInput, setLanguageInput)}
                        placeholder="e.g., English (Fluent), Hindi (Native)..."
                    />
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => addSkill('languages', languageInput, setLanguageInput)}
                        disabled={!languageInput.trim()}
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SkillsForm
