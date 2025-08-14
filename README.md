# NBA Analytics Dashboard - The Value Game

## 🏀 Project Overview

A comprehensive NBA analytics dashboard built with React and Vite, focusing on unlocking performance and salary cap flexibility for NBA teams. This dashboard provides three distinct views for different stakeholders in NBA team management.

**Status**: ✅ **PRODUCTION READY** - Dashboard is fully functional with professional styling and interactive features.

## ✨ Current Features

### General Manager View (Fully Implemented)
- **Salary Cap Management**: Real-time tracking of total salary cap vs current payroll
- **Performance Metrics**: Team performance scoring with improvement tracking  
- **Cap Efficiency Analysis**: Optimization metrics for salary cap utilization
- **Player Value Analysis**: Comprehensive table showing top players with efficiency ratings
- **Professional UI**: Gradient header, responsive cards, and clean typography
- **Interactive Navigation**: Seamless switching between dashboard views

### Coach View & Scout View
- Professional placeholder pages with coming soon messaging
- Consistent navigation and styling
- Ready for future feature implementation

### Key Metrics Displayed
- **Total Salary Cap**: $165.2M (↗ +2.1% from last season)
- **Current Payroll**: $158.7M (96.1% of salary cap)
- **Performance Score**: 82.4 (↗ +5.3% improvement)
- **Cap Efficiency**: 88.7% (↗ +3.2% optimization)

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Custom CSS with professional design system
- **Package Manager**: pnpm
- **Deployment**: Static hosting ready

## 🚀 Getting Started

### Prerequisites
- Node.js v20.18.0 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nba-dashboard
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev --host
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📁 Project Structure

```
nba-dashboard/
├── public/
│   ├── data/           # CSV data files
│   └── assets/         # Images and static assets
├── src/
│   ├── components/
│   │   └── ui/         # Reusable UI components
│   ├── App-working.jsx # Main application component (CURRENT)
│   ├── App.jsx         # Original complex version
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## 📊 Data Integration

The dashboard integrates data from multiple analyst perspectives:

### Current Data Files
- `financial_player_data.csv` - Player salary and contract information
- `financial_team_data.csv` - Team financial metrics
- `operations_player_efficiency.csv` - Player performance metrics
- `customer_fan_engagement.csv` - Fan engagement data
- Additional CSV files for comprehensive analysis

### Data Workflow
1. Analysts export data from Jupyter notebooks to CSV format
2. CSV files are placed in the `public/data` directory
3. Dashboard loads and visualizes the data automatically

## 🎨 Design Features

- **Professional Gradient Header**: Blue gradient with role badges (GM, Coach, Scout)
- **Responsive Grid Layout**: Adapts seamlessly to different screen sizes
- **Interactive Navigation**: Clear visual feedback for active views
- **Color-Coded Metrics**: Green for positive trends, strategic color usage
- **Performance Indicators**: Visual progress bars and efficiency ratings
- **Clean Typography**: System fonts optimized for readability

## 🔮 Future Enhancements

### Coach View (Planned)
- Player rotation analysis
- Performance metrics by game situation
- Injury management dashboard
- Game strategy insights

### Scout View (Planned)
- Draft prospect analysis
- Trade opportunity identification
- Market value assessments
- Future talent pipeline

### Technical Improvements
- Real-time data integration
- Advanced charting with Recharts
- Export functionality
- Enhanced mobile responsiveness

## 🚀 Deployment Options

### Static Hosting
The built `dist/` folder can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

### Firebase Deployment (Original Setup)
```bash
firebase deploy
```

## 🤝 Academic Context

**Course**: MGMT 5900 - Advanced Analytics and Decision Making  
**Institution**: Purdue University  
**Team**: DN8  
**Project Focus**: NBA team management analytics and decision support systems

## 📞 Support

For questions or issues:
1. Check browser console for errors
2. Verify all dependencies are installed with `pnpm install`
3. Ensure development server is running on correct port

## 🏆 Project Status

- ✅ **Core Dashboard**: Fully functional with professional UI
- ✅ **Navigation**: All three views working with smooth transitions
- ✅ **Data Visualization**: Key metrics and player analysis implemented
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Production Build**: Optimized and ready for deployment
- 🔄 **Advanced Features**: Ready for future enhancement

---

*Built with ❤️ for NBA analytics and data-driven decision making*
