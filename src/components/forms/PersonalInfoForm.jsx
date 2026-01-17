import { useResume } from '../../context/ResumeContext'
import './Forms.css'

function PersonalInfoForm() {
    const { state, dispatch } = useResume()
    const { personalInfo } = state

    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch({
            type: 'SET_PERSONAL_INFO',
            payload: { [name]: value }
        })
    }

    return (
        <div className="form-section">
            <p className="form-intro">
                Let's start with your basic information. This will appear at the top of your resume.
            </p>

            <div className="form-grid">
                <div className="form-group full-width">
                    <label className="form-label">
                        Full Name <span className="form-required">*</span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handleChange}
                        placeholder="e.g., John Doe"
                        autoComplete="name"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Email <span className="form-required">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        autoComplete="email"
                        inputMode="email"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Phone <span className="form-required">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        inputMode="tel"
                    />
                </div>

                <div className="form-group full-width">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={personalInfo.location}
                        onChange={handleChange}
                        placeholder="e.g., Mumbai, India"
                    />
                    <span className="form-helper">City, State or City, Country</span>
                </div>

                <div className="form-group">
                    <label className="form-label">LinkedIn</label>
                    <input
                        type="url"
                        name="linkedin"
                        value={personalInfo.linkedin}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/johndoe"
                        inputMode="url"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Portfolio/Website</label>
                    <input
                        type="url"
                        name="portfolio"
                        value={personalInfo.portfolio}
                        onChange={handleChange}
                        placeholder="johndoe.com"
                        inputMode="url"
                    />
                </div>

                <div className="form-group full-width">
                    <label className="form-label">Professional Summary</label>
                    <textarea
                        name="summary"
                        value={personalInfo.summary}
                        onChange={handleChange}
                        placeholder="Brief 2-3 sentence overview of your experience, skills, and career goals..."
                        rows={4}
                    />
                    <span className="form-helper">
                        {personalInfo.summary.length}/300 characters (aim for 50-150)
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfoForm
