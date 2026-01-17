import { useAtsScore } from '../../context/ResumeContext'
import { Sparkles, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react'
import './ATSScoreCard.css'

function ATSScoreCard({ compact = false }) {
    const { score, tips, breakdown } = useAtsScore()

    const getScoreColor = () => {
        if (score >= 80) return 'success'
        if (score >= 60) return 'warning'
        return 'error'
    }

    const getScoreMessage = () => {
        if (score >= 80) return 'Excellent! Your resume is ATS-ready.'
        if (score >= 60) return 'Good progress! A few improvements needed.'
        return 'Needs work. Follow the tips below.'
    }

    if (compact) {
        return (
            <div className="ats-compact">
                <div className="ats-compact-header">
                    <Sparkles size={16} />
                    <span>ATS Score</span>
                </div>
                <div className={`ats-compact-score ${getScoreColor()}`}>
                    <svg viewBox="0 0 36 36" className="circular-chart">
                        <path
                            className="circle-bg"
                            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                            className="circle"
                            strokeDasharray={`${score}, 100`}
                            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <span className="score-text">{score}%</span>
                </div>
                {tips.length > 0 && (
                    <div className="ats-compact-tip">
                        <Lightbulb size={12} />
                        <span>{tips[0].tip}</span>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="ats-card">
            <div className="ats-header">
                <Sparkles size={20} />
                <h3>ATS Score</h3>
            </div>

            <div className="ats-score-container">
                <div className={`ats-score-ring ${getScoreColor()}`}>
                    <svg viewBox="0 0 100 100">
                        <circle
                            cx="50" cy="50" r="45"
                            fill="none"
                            stroke="var(--ring-bg)"
                            strokeWidth="8"
                        />
                        <circle
                            cx="50" cy="50" r="45"
                            fill="none"
                            stroke="var(--ring-color)"
                            strokeWidth="8"
                            strokeDasharray={`${score * 2.83} 283`}
                            strokeLinecap="round"
                            className="progress-ring-circle"
                        />
                    </svg>
                    <div className="score-inner">
                        <span className="score-value">{score}%</span>
                    </div>
                </div>
                <p className="score-message">{getScoreMessage()}</p>
            </div>

            {/* Breakdown */}
            <div className="ats-breakdown">
                {Object.entries(breakdown).map(([key, value]) => (
                    <div key={key} className="breakdown-item">
                        <div className="breakdown-label">
                            <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="breakdown-value">{value}%</span>
                        </div>
                        <div className="breakdown-bar">
                            <div
                                className="breakdown-fill"
                                style={{ width: `${value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Tips */}
            {tips.length > 0 && (
                <div className="ats-tips">
                    <h4>
                        <Lightbulb size={16} />
                        Improvement Tips
                    </h4>
                    <ul>
                        {tips.map((tip, index) => (
                            <li key={index}>
                                <AlertCircle size={14} />
                                <span>{tip.tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {score >= 80 && (
                <div className="ats-success">
                    <CheckCircle size={16} />
                    <span>Great job! Your resume is ready to submit.</span>
                </div>
            )}
        </div>
    )
}

export default ATSScoreCard
