import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import './Forms.css'

const emptyProject = {
    title: '',
    description: '',
    technologies: '',
    link: '',
    startDate: '',
    endDate: ''
}

function ProjectsForm() {
    const { state, dispatch } = useResume()
    const [expandedIndex, setExpandedIndex] = useState(0)

    const addProject = () => {
        dispatch({ type: 'ADD_PROJECT', payload: { ...emptyProject } })
        setExpandedIndex(state.projects.length)
    }

    const updateProject = (index, field, value) => {
        dispatch({
            type: 'UPDATE_PROJECT',
            index,
            payload: { [field]: value }
        })
    }

    const removeProject = (index) => {
        dispatch({ type: 'REMOVE_PROJECT', index })
        if (expandedIndex >= state.projects.length - 1) {
            setExpandedIndex(Math.max(0, state.projects.length - 2))
        }
    }

    return (
        <div className="form-section">
            <p className="form-intro">
                Showcase your projects. This is especially important for students, freshers,
                or anyone with personal/open-source work.
            </p>

            {state.projects.length === 0 ? (
                <div className="empty-state">
                    <p>No projects added yet. Projects help demonstrate your practical skills!</p>
                    <button className="btn btn-primary" onClick={addProject}>
                        <Plus size={18} />
                        Add Project
                    </button>
                </div>
            ) : (
                <div className="entries-list">
                    {state.projects.map((project, index) => (
                        <div key={index} className="entry-card">
                            <div
                                className="entry-header"
                                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                            >
                                <div className="entry-drag">
                                    <GripVertical size={18} />
                                </div>
                                <div className="entry-summary">
                                    <h4>{project.title || 'Untitled Project'}</h4>
                                    <p>{project.technologies || 'Technologies used'}</p>
                                </div>
                                <div className="entry-actions">
                                    <button
                                        className="btn btn-ghost btn-icon"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeProject(index)
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
                                            <label className="form-label">Project Title *</label>
                                            <input
                                                type="text"
                                                value={project.title}
                                                onChange={(e) => updateProject(index, 'title', e.target.value)}
                                                placeholder="e.g., E-commerce Web Application"
                                            />
                                        </div>

                                        <div className="form-group full-width">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                value={project.description}
                                                onChange={(e) => updateProject(index, 'description', e.target.value)}
                                                placeholder="Describe what the project does, your role, and any notable achievements..."
                                                rows={3}
                                            />
                                        </div>

                                        <div className="form-group full-width">
                                            <label className="form-label">Technologies Used</label>
                                            <input
                                                type="text"
                                                value={project.technologies}
                                                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                                                placeholder="e.g., React, Node.js, MongoDB, AWS"
                                            />
                                        </div>

                                        <div className="form-group full-width">
                                            <label className="form-label">Project Link</label>
                                            <input
                                                type="url"
                                                value={project.link}
                                                onChange={(e) => updateProject(index, 'link', e.target.value)}
                                                placeholder="https://github.com/username/project"
                                                inputMode="url"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Start Date</label>
                                            <input
                                                type="month"
                                                value={project.startDate}
                                                onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">End Date</label>
                                            <input
                                                type="month"
                                                value={project.endDate}
                                                onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <button className="btn btn-secondary add-entry-btn" onClick={addProject}>
                        <Plus size={18} />
                        Add Another Project
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProjectsForm
