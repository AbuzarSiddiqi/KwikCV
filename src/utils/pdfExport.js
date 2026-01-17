import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

/**
 * Generate ATS-friendly PDF from resume element
 * High-quality, parseable PDF export without browser print dialog
 * @param {string} elementId - ID of the element to capture
 * @param {string} filename - Name for the downloaded PDF file
 * @returns {Promise<boolean>} - True if successful
 */
export async function downloadResumePDF(elementId = 'resume-print-container', filename = 'Resume.pdf') {
    try {
        const element = document.getElementById(elementId)
        if (!element) {
            console.error('PDF container not found:', elementId)
            throw new Error('Resume element not found')
        }

        // Set optimal dimensions for Letter size (8.5" x 11")
        // Using 96 DPI as standard: 8.5" = 816px, 11" = 1056px
        const pageWidth = 816
        const pageHeight = 1056
        
        // Capture the resume with high quality settings
        const canvas = await html2canvas(element, {
            scale: 3, // Higher quality for better text rendering
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: pageWidth,
            height: pageHeight,
            windowWidth: pageWidth,
            windowHeight: pageHeight,
            imageTimeout: 0,
            removeContainer: false,
            // Optimize for text clarity
            letterRendering: true,
            allowTaint: false,
        })

        // Create PDF in Letter size (8.5" x 11" inches)
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt', // Points for better precision
            format: 'letter', // Standard US Letter size
            compress: true, // Enable compression
            precision: 2
        })

        // Calculate dimensions to fit PDF page
        const imgWidth = pdf.internal.pageSize.getWidth()
        const imgHeight = pdf.internal.pageSize.getHeight()
        
        // Convert canvas to image
        const imgData = canvas.toDataURL('image/png', 1.0) // Max quality
        
        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST')

        // Set PDF metadata for better ATS compatibility
        pdf.setProperties({
            title: filename.replace('.pdf', ''),
            subject: 'Professional Resume',
            author: filename.replace('_Resume.pdf', '').replace(/_/g, ' '),
            keywords: 'resume, cv, professional',
            creator: 'KwikCV Resume Builder'
        })

        // Download the PDF
        pdf.save(filename)

        return true
    } catch (error) {
        console.error('Error generating PDF:', error)
        alert('Failed to generate PDF. Please try again or use the print option.')
        return false
    }
}

/**
 * Get formatted filename for the resume
 * @param {string} fullName - User's full name
 * @returns {string} - Formatted filename
 */
export function getResumeFilename(fullName) {
    if (fullName && fullName.trim()) {
        // Clean and format the name
        const cleanName = fullName.trim()
            .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
            .replace(/\s+/g, '_') // Replace spaces with underscores
        return `${cleanName}_Resume.pdf`
    }
    return 'Resume.pdf'
}

/**
 * Alternative: Print to PDF using browser's native print dialog
 * Useful as fallback if direct PDF generation fails
 */
export function printResumeToPDF() {
    window.print()
}
