import { useState, useEffect } from 'react'
import { X, Save } from 'lucide-react'
import './QuickEditModal.css'

function QuickEditModal({ isOpen, onClose, field, value, onSave, multiline = false }) {
    const [editValue, setEditValue] = useState(value || '')

    useEffect(() => {
        setEditValue(value || '')
    }, [value, isOpen])

    if (!isOpen) return null

    const handleSave = () => {
        onSave(editValue)
        onClose()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !multiline) {
            handleSave()
        }
        if (e.key === 'Escape') {
            onClose()
        }
    }

    return (
        <div className="quick-edit-overlay" onClick={onClose}>
            <div className="quick-edit-modal" onClick={(e) => e.stopPropagation()}>
                <div className="quick-edit-header">
                    <h3>Edit {field}</h3>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="quick-edit-content">
                    {multiline ? (
                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Enter ${field.toLowerCase()}...`}
                            autoFocus
                            rows={4}
                        />
                    ) : (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Enter ${field.toLowerCase()}...`}
                            autoFocus
                        />
                    )}
                </div>

                <div className="quick-edit-actions">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={16} />
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuickEditModal
