import { formatDate } from '../utils/formatters'
import './Templates.css'

/**
 * Ashish Template - ATS-Optimized Tech Resume
 * Skills-first approach, clean layout, perfect for Software Engineers
 * Based on industry-standard tech resume format
 */
function AshishTemplate({ data }) {
    const { personalInfo, experience, education, skills, projects, certifications } = data

    return (
        <div className="template ashish-template">
            {/* Header - Clean professional format */}
            <header className="ashish-header">
                <h1 className="ashish-name">{personalInfo.fullName || 'Ashish Pratap Singh'}</h1>
                <div className="ashish-contact">
                    {personalInfo.email && <span>✉ {personalInfo.email}</span>}
                    {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
                    {personalInfo.github && <span>🔗 {personalInfo.github}</span>}
                    {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
                </div>
            </header>

            {/* Skills Section - First! */}
            {(skills.technical.length > 0 || skills.soft.length > 0) && (
                <section className="ashish-section">
                    <h2 className="ashish-section-title">Skills</h2>
                    <div className="ashish-skills">
                        {skills.technical.length > 0 && (
                            <p><strong>Languages:</strong> {skills.technical.join(', ')}</p>
                        )}
                        {skills.soft.length > 0 && (
                            <p><strong>Technologies & Tools:</strong> {skills.soft.join(', ')}</p>
                        )}
                    </div>
                </section>
            )}

            {/* Work Experience Section */}
            {experience.length > 0 && (
                <section className="ashish-section">
                    <h2 className="ashish-section-title">Work Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="ashish-exp-item">
                            <div className="ashish-exp-header">
                                <div>
                                    <div className="ashish-exp-company">{exp.company}{exp.location && `, ${exp.location}`}</div>
                                    <div className="ashish-exp-title">{exp.title}</div>
                                </div>
                                <div className="ashish-exp-dates">
                                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                </div>
                            </div>
                            {exp.responsibilities && exp.responsibilities.filter(r => r).length > 0 && (
                                <ul className="ashish-bullet-list">
                                    {exp.responsibilities.filter(r => r).map((resp, i) => (
                                        <li key={i}>{resp}</li>
                                    ))}
                                </ul>
                            )}
                            {exp.technologies && (
                                <p className="ashish-tech-stack">{exp.technologies}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
                <section className="ashish-section">
                    <h2 className="ashish-section-title">Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="ashish-edu-item">
                            <div className="ashish-edu-header">
                                <div>
                                    <div className="ashish-edu-school">{edu.institution}</div>
                                    <div className="ashish-edu-degree">{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                                </div>
                                <div className="ashish-edu-dates">
                                    <div>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                                    {edu.gpa && <div>CGPA: {edu.gpa}</div>}
                                </div>
                            </div>
                            {edu.coursework && (
                                <p className="ashish-coursework">
                                    <strong>Relevant Coursework:</strong> {edu.coursework}
                                </p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Project Work Section */}
            {projects.length > 0 && (
                <section className="ashish-section">
                    <h2 className="ashish-section-title">Project Work</h2>
                    {projects.map((project, index) => (
                        <div key={index} className="ashish-project-item">
                            <div className="ashish-project-header">
                                <div className="ashish-project-title">
                                    <strong>{project.title} ({formatDate(project.endDate) || '2025'})</strong>
                                    {project.technologies && `: ${project.technologies}`}
                                </div>
                            </div>
                            {project.description && (
                                <p className="ashish-project-desc">{project.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}
        </div>
    )
}

export default AshishTemplate
