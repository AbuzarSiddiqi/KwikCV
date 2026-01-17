import { formatDate } from '../utils/formatters'
import './Templates.css'

/**
 * Shakra Template - EXACT LaTeX Replica
 * Based on sample.sty - Professional ATS-optimized resume
 * Matches the reference PDF exactly
 */
function ShakraTemplate({ data }) {
    const { personalInfo, experience, education, skills, projects, certifications } = data

    return (
        <div className="template shakra-template">
            {/* Header - Centered with small-caps name */}
            <header className="shakra-header">
                <h1 className="shakra-name">{personalInfo.fullName || 'Shakra Shamim'}</h1>
                {personalInfo.title && <div className="shakra-title">{personalInfo.title}</div>}
                <div className="shakra-contact">
                    {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
                    {personalInfo.email && <span>✉ {personalInfo.email}</span>}
                    {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
                </div>
            </header>

            {/* Summary Section */}
            {personalInfo.summary && (
                <section className="shakra-section">
                    <h2 className="shakra-section-title">Summary</h2>
                    <p className="shakra-summary">{personalInfo.summary}</p>
                </section>
            )}

            {/* Skills Section */}
            {(skills.technical.length > 0 || skills.soft.length > 0 || (skills.languages && skills.languages.length > 0)) && (
                <section className="shakra-section">
                    <h2 className="shakra-section-title">Skills</h2>
                    <div className="shakra-skills">
                        {skills.technical.length > 0 && (
                            <div className="shakra-skill-row">
                                <strong>Programming & Querying:</strong> {skills.technical.join(', ')}
                            </div>
                        )}
                        {skills.soft.length > 0 && (
                            <div className="shakra-skill-row">
                                <strong>Data Visualization Tools:</strong> {skills.soft.join(', ')}
                            </div>
                        )}
                        {skills.languages && skills.languages.length > 0 && (
                            <div className="shakra-skill-row">
                                <strong>Analytical Abilities:</strong> {skills.languages.join(', ')}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Experience Section */}
            {experience.length > 0 && (
                <section className="shakra-section">
                    <h2 className="shakra-section-title">Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="shakra-exp-item">
                            <div className="shakra-exp-header">
                                <div className="shakra-exp-left">
                                    <div className="shakra-exp-title">{exp.title}</div>
                                    <div className="shakra-exp-company">{exp.company}{exp.location && ` (${exp.location})`}</div>
                                </div>
                                <div className="shakra-exp-right">
                                    <div className="shakra-exp-date">
                                        {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                                    </div>
                                    {exp.technologies && (
                                        <div className="shakra-exp-tools">Tools Used: {exp.technologies}</div>
                                    )}
                                </div>
                            </div>
                            {exp.responsibilities && exp.responsibilities.filter(r => r).length > 0 && (
                                <ul className="shakra-bullets">
                                    {exp.responsibilities.filter(r => r).map((resp, i) => (
                                        <li key={i}>{resp}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
                <section className="shakra-section">
                    <h2 className="shakra-section-title">Projects</h2>
                    {projects.map((project, index) => (
                        <div key={index} className="shakra-project-item">
                            <div className="shakra-project-header">
                                <div className="shakra-project-name">
                                    <strong>{project.title}</strong>
                                    {project.technologies && <> | <em>{project.technologies}</em></>}
                                </div>
                                {(project.startDate || project.endDate) && (
                                    <div className="shakra-project-date">
                                        {formatDate(project.startDate)} – {formatDate(project.endDate)}
                                    </div>
                                )}
                            </div>
                            {project.description && (
                                <ul className="shakra-bullets">
                                    {project.description.split('\n').filter(d => d.trim()).map((desc, i) => (
                                        <li key={i}>{desc.trim()}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Awards & Certifications Section */}
            {certifications.length > 0 && (
                <section className="shakra-section">
                    <h2 className="shakra-section-title">Awards & Certifications</h2>
                    <ul className="shakra-cert-list">
                        {certifications.map((cert, index) => (
                            <li key={index}>
                                <strong>{cert.name}</strong>
                                {cert.issuer && ` – ${cert.issuer}`}
                                {cert.date && ` (${formatDate(cert.date)})`}
                                {cert.description && `: ${cert.description}`}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
                <section className="shakra-section">
                    <h2 className="shakra-section-title">Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="shakra-edu-item">
                            <div className="shakra-edu-header">
                                <div className="shakra-edu-left">
                                    <div className="shakra-edu-degree">{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                                    <div className="shakra-edu-school">{edu.institution}{edu.location && `, ${edu.location}`}</div>
                                </div>
                                <div className="shakra-edu-right">
                                    <div className="shakra-edu-date">Graduated: {formatDate(edu.endDate)}</div>
                                    {edu.gpa && <div className="shakra-edu-gpa">CGPA: {edu.gpa}</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </div>
    )
}

export default ShakraTemplate
