export function formatDate(dateStr) {
    if (!dateStr) return ''

    try {
        const date = new Date(dateStr + '-01')
        return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        })
    } catch {
        return dateStr
    }
}

export function truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}
