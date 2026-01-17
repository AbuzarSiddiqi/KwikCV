<p align="center">
  <img src="AppIcons/appstore.png" alt="KwikCV Logo" width="120" height="120" style="border-radius: 24px;">
</p>

<h1 align="center">KwikCV</h1>

<p align="center">
  <strong>🚀 Create ATS-Optimized Resumes in Minutes</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#installation">Installation</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#templates">Templates</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/Made%20with-React-61DAFB.svg" alt="Made with React">
</p>

---

## ✨ What is KwikCV?

**KwikCV** is a modern, mobile-first resume builder that helps job seekers create professional, **ATS-friendly resumes** with beautiful templates. Built with React and designed for speed, it offers real-time ATS scoring and instant PDF export.

> 💡 **ATS (Applicant Tracking System)** - Software used by 75%+ of companies to filter resumes before human review. KwikCV ensures your resume passes these automated filters.

---

## 🎯 Features

### 📝 Smart Resume Builder
- **Intuitive Form Interface** - Step-by-step sections for personal info, experience, education, skills, projects & certifications
- **Auto-Save** - Never lose your progress with automatic local storage
- **Real-time Preview** - See changes instantly as you type

### 🎨 Professional Templates
- **LaTeX-Inspired Designs** - Clean, professional templates that recruiters love
- **ATS-Optimized Layouts** - Designed to pass automated resume scanners
- **Multiple Styles** - Choose from Shakra (minimal) or Ashish (modern) templates

### 📊 ATS Score Analysis
- **Real-time Scoring** - Get instant feedback on your resume's ATS compatibility
- **Section Analysis** - Detailed breakdown of each section's optimization
- **Improvement Tips** - Actionable suggestions to boost your score

### 📱 Mobile-First Design
- **Responsive UI** - Perfect experience on phones, tablets, and desktops
- **PWA Support** - Install as an app on any device
- **Offline Ready** - Work on your resume without internet connection

### 📄 Export Options
- **PDF Download** - High-quality PDF export ready for job applications
- **Print-Ready** - Optimized for both screen and paper

---

## 🚀 Demo

Visit the live app: **[KwikCV Live Demo](https://abuzarsiddiqi.github.io/KwikCV/)**

---

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/AbuzarSiddiqi/KwikCV.git

# Navigate to project directory
cd KwikCV

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

---

## 💻 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build Tool & Dev Server |
| **React Router** | Client-side Routing |
| **React-PDF** | PDF Generation |
| **Vite PWA** | Progressive Web App |
| **CSS3** | Styling & Animations |

---

## 📋 Templates

### 🔷 Shakra Template
A clean, minimal LaTeX-inspired design with:
- Centered header layout
- Dash bullet points
- Classic black & white styling
- Perfect for technical roles

### 🟣 Ashish Template  
A modern professional template featuring:
- Purple accent colors
- Skills section at top
- Clean typography
- Ideal for creative & business roles

---

## 📁 Project Structure

```
KwikCV/
├── public/
│   ├── icons/          # PWA icons
│   └── favicon.png     # App icon
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── forms/      # Input form components
│   │   └── ats/        # ATS scoring components
│   ├── pages/          # Route pages
│   ├── templates/      # Resume templates
│   ├── context/        # React Context providers
│   ├── styles/         # Global CSS
│   └── utils/          # Helper functions
├── AppIcons/           # App store icons
└── vite.config.js      # Vite configuration
```

---

## 🔧 Configuration

### Environment Variables
No environment variables required - KwikCV runs entirely client-side!

### PWA Configuration
PWA settings are configured in `vite.config.js` including:
- App manifest
- Service worker
- Offline caching strategies

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contributions
- [ ] Add more resume templates
- [ ] Implement cover letter builder
- [ ] Add LinkedIn import feature
- [ ] Multi-language support
- [ ] Dark mode toggle

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abuzar Siddiqi**

- GitHub: [@AbuzarSiddiqi](https://github.com/AbuzarSiddiqi)

---

## 🙏 Acknowledgments

- Inspired by modern LaTeX resume templates
- Built with ❤️ using React and Vite

---

<p align="center">
  <strong>⭐ Star this repo if you found it helpful!</strong>
</p>

<p align="center">
  Made with 💜 by Abuzar Siddiqi
</p>
