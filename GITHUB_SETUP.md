# 🐙 GitHub Repository Setup Guide

## 📋 Quick Setup Instructions

### 1. Create GitHub Repository
```bash
# On GitHub.com, create a new repository named: nba-analytics-dashboard
# Choose: Public repository
# Add: README.md (will be replaced)
# Add: .gitignore (Node.js template)
# Add: License (MIT recommended)
```

### 2. Clone and Setup Local Repository
```bash
# Clone your new repository
git clone https://github.com/YOUR_USERNAME/nba-analytics-dashboard.git
cd nba-analytics-dashboard

# Extract the provided zip file into this directory
unzip nba-dashboard-firebase.zip
cp -r nba-dashboard/* .
rm -rf nba-dashboard/

# Install dependencies
pnpm install
# or
npm install
```

### 3. Initial Commit and Push
```bash
# Add all files
git add .

# Commit with descriptive message
git commit -m "🏀 Initial commit: NBA Analytics Dashboard

✨ Features:
- Professional dashboard with Purdue University & NBA branding
- Three-view navigation (GM, Coach, Scout)
- Comprehensive financial analytics and player value analysis
- Responsive design with enhanced logo integration
- Firebase deployment ready

🎓 Academic Project:
- Course: MGMT 5900 - Advanced Analytics
- Team: DN8
- Institution: Purdue University

🚀 Tech Stack:
- React 19.1.0 + Vite 6.3.5
- Professional CSS with logo integration
- Firebase hosting configuration
- Production-optimized build"

# Push to GitHub
git push origin main
```

## 🚀 Repository Structure

Your GitHub repository will contain:

```
nba-analytics-dashboard/
├── .firebaserc                    # Firebase project configuration
├── .gitignore                     # Git ignore rules
├── firebase.json                  # Firebase hosting settings
├── package.json                   # Dependencies and scripts
├── pnpm-lock.yaml                # Lock file for dependencies
├── vite.config.js                # Vite build configuration
├── README.md                      # Project documentation
├── FIREBASE_DEPLOYMENT_INSTRUCTIONS.md
├── ENHANCED_FEATURES.md           # Logo integration details
├── GITHUB_SETUP.md               # This file
├── public/
│   ├── data/                      # CSV data files
│   ├── Purdue-University-Logo.jpg # University branding
│   ├── nba-logo-png_seeklogo-247736.png # NBA branding
│   └── 30-308332_image-result-for-nba-logo-nba-logo-png.png
├── src/
│   ├── App-enhanced.jsx           # Main application with logos
│   ├── App-enhanced.css           # Enhanced styling
│   ├── App-working.jsx            # Previous working version
│   ├── App.jsx                    # Original version
│   ├── main.jsx                   # Application entry point
│   ├── index.css                  # Global styles
│   └── components/                # UI components
└── dist/                          # Built files (generated)
```

## 📝 Repository Settings

### Repository Description
```
NBA Analytics Dashboard - The Value Game: Unlocking Performance and Cap Flexibility. Academic project for MGMT 5900 at Purdue University featuring professional NBA analytics with React, Firebase, and enhanced branding.
```

### Topics/Tags
```
nba-analytics, react, vite, firebase, purdue-university, sports-analytics, dashboard, mgmt-5900, data-visualization, basketball
```

### Branch Protection (Optional)
- Protect `main` branch
- Require pull request reviews
- Require status checks to pass

## 🔧 Development Workflow

### Local Development
```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Deploy to Firebase
pnpm run deploy
```

### Making Changes
```bash
# Create feature branch
git checkout -b feature/new-enhancement

# Make your changes
# ... edit files ...

# Commit changes
git add .
git commit -m "✨ Add new feature: description"

# Push branch
git push origin feature/new-enhancement

# Create Pull Request on GitHub
```

## 📊 GitHub Pages Deployment (Alternative)

If you prefer GitHub Pages over Firebase:

### 1. Enable GitHub Pages
- Go to repository Settings
- Scroll to "Pages" section
- Source: "GitHub Actions"

### 2. Create Workflow File
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 3. Update Vite Config
Add to `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/nba-analytics-dashboard/', // Your repository name
  // ... rest of config
})
```

## 🎯 Best Practices

### Commit Messages
Use conventional commits:
- `✨ feat:` New features
- `🐛 fix:` Bug fixes
- `📝 docs:` Documentation
- `💄 style:` UI/styling changes
- `♻️ refactor:` Code refactoring
- `🚀 deploy:` Deployment changes

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `style/description` - Styling changes

### Pull Request Template
Create `.github/pull_request_template.md`:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Style/UI change

## Testing
- [ ] Tested locally
- [ ] Build passes
- [ ] Responsive design verified

## Screenshots
(If applicable)

## Academic Context
- Course: MGMT 5900
- Team: DN8
- Institution: Purdue University
```

## 🏆 Repository Features

### README Badges
Add to your README.md:
```markdown
![Build Status](https://github.com/YOUR_USERNAME/nba-analytics-dashboard/workflows/Deploy/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple.svg)
```

### Issue Templates
Create `.github/ISSUE_TEMPLATE/`:
- `bug_report.md` - Bug reports
- `feature_request.md` - Feature requests
- `question.md` - Questions

## 🎓 Academic Submission

### For Course Submission
1. **Repository URL**: Provide GitHub repository link
2. **Live Demo**: Include Firebase or GitHub Pages URL
3. **Documentation**: Ensure README.md is comprehensive
4. **Code Quality**: Clean, commented code with proper structure

### Presentation Ready
- Professional branding with Purdue and NBA logos
- Clear academic attribution
- Comprehensive documentation
- Live deployment for demonstration

---

*Ready for professional GitHub hosting and academic presentation!*

