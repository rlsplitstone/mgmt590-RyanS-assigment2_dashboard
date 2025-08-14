import React, { useState } from 'react';
import './App-enhanced.css';

const App = () => {
  const [activeView, setActiveView] = useState('gm');

  const renderGMView = () => (
    <div className="dashboard-content">
      <div className="view-header">
        <h2>General Manager View</h2>
        <p className="view-subtitle">Financial strategy and roster optimization</p>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-card salary-cap">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>Total Salary Cap</h3>
            <div className="metric-value">$165.2M</div>
            <div className="metric-trend positive">↗ +2.1% from last season</div>
          </div>
        </div>

        <div className="metric-card payroll">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>Current Payroll</h3>
            <div className="metric-value">$158.7M</div>
            <div className="metric-subtitle">96.1% of salary cap</div>
          </div>
        </div>

        <div className="metric-card performance">
          <div className="metric-icon">⭐</div>
          <div className="metric-content">
            <h3>Performance Score</h3>
            <div className="metric-value">82.4</div>
            <div className="metric-trend positive">↗ +5.3% improvement</div>
          </div>
        </div>

        <div className="metric-card efficiency">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <h3>Cap Efficiency</h3>
            <div className="metric-value">88.7%</div>
            <div className="metric-trend positive">↗ +3.2% optimization</div>
          </div>
        </div>
      </div>

      <div className="player-analysis">
        <h3>Top Player Value Analysis</h3>
        <div className="player-table">
          <div className="table-header">
            <div>Player</div>
            <div>Position</div>
            <div>Salary</div>
            <div>Performance</div>
            <div>Efficiency</div>
          </div>
          
          <div className="table-row">
            <div className="player-name">Giannis Antetokounmpo</div>
            <div>PF</div>
            <div>$45.6M</div>
            <div className="performance-bar">
              <div className="bar-fill" style={{width: '95%', backgroundColor: '#22c55e'}}></div>
              <span>95</span>
            </div>
            <div className="efficiency-score high">2.08</div>
          </div>

          <div className="table-row">
            <div className="player-name">Jayson Tatum</div>
            <div>SF</div>
            <div>$32.6M</div>
            <div className="performance-bar">
              <div className="bar-fill" style={{width: '88%', backgroundColor: '#3b82f6'}}></div>
              <span>88</span>
            </div>
            <div className="efficiency-score high">2.70</div>
          </div>

          <div className="table-row">
            <div className="player-name">Joel Embiid</div>
            <div>C</div>
            <div>$47.6M</div>
            <div className="performance-bar">
              <div className="bar-fill" style={{width: '85%', backgroundColor: '#3b82f6'}}></div>
              <span>85</span>
            </div>
            <div className="efficiency-score medium">1.79</div>
          </div>

          <div className="table-row">
            <div className="player-name">Luka Doncic</div>
            <div>PG</div>
            <div>$40.1M</div>
            <div className="performance-bar">
              <div className="bar-fill" style={{width: '92%', backgroundColor: '#22c55e'}}></div>
              <span>92</span>
            </div>
            <div className="efficiency-score high">2.29</div>
          </div>

          <div className="table-row">
            <div className="player-name">Ja Morant</div>
            <div>PG</div>
            <div>$12.1M</div>
            <div className="performance-bar">
              <div className="bar-fill" style={{width: '78%', backgroundColor: '#f59e0b'}}></div>
              <span>78</span>
            </div>
            <div className="efficiency-score very-high">6.45</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCoachView = () => (
    <div className="dashboard-content">
      <div className="coming-soon">
        <div className="coming-soon-icon">⚡</div>
        <h2>Coach View</h2>
        <p>Operational efficiency and player management dashboard coming soon. This view will include player rotation analysis, performance metrics, and game strategy insights.</p>
      </div>
    </div>
  );

  const renderScoutView = () => (
    <div className="dashboard-content">
      <div className="coming-soon">
        <div className="coming-soon-icon">🔍</div>
        <h2>Scout View</h2>
        <p>Future talent identification and market analysis dashboard coming soon. This view will include draft prospect analysis, trade opportunities, and market value assessments.</p>
      </div>
    </div>
  );

  return (
    <div className="app">
      {/* Enhanced Header with Logos */}
      <header className="app-header">
        <div className="header-content">
          <div className="logos-section">
            <div className="logo-container purdue-logo">
              <img src="/Purdue-University-Logo.jpg" alt="Purdue University" className="purdue-img" />
            </div>
            <div className="partnership-divider">
              <div className="divider-line"></div>
              <span className="partnership-text">×</span>
              <div className="divider-line"></div>
            </div>
            <div className="logo-container nba-logo">
              <img src="/nba-logo-png_seeklogo-247736.png" alt="NBA" className="nba-img" />
            </div>
          </div>
          
          <div className="header-text">
            <h1>NBA Analytics Dashboard</h1>
            <p className="tagline">The Value Game: Unlocking Performance and Cap Flexibility</p>
            <div className="academic-badge">
              <span className="course-info">MGMT 5900 • Team DN8 • Advanced Analytics</span>
            </div>
          </div>

          <div className="role-badges">
            <span className="role-badge gm">General Manager</span>
            <span className="role-badge coach">Coach</span>
            <span className="role-badge scout">Scout</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navigation">
        <button 
          className={`nav-button ${activeView === 'gm' ? 'active' : ''}`}
          onClick={() => setActiveView('gm')}
        >
          📊 GM View
        </button>
        <button 
          className={`nav-button ${activeView === 'coach' ? 'active' : ''}`}
          onClick={() => setActiveView('coach')}
        >
          ⚡ Coach View
        </button>
        <button 
          className={`nav-button ${activeView === 'scout' ? 'active' : ''}`}
          onClick={() => setActiveView('scout')}
        >
          🔍 Scout View
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeView === 'gm' && renderGMView()}
        {activeView === 'coach' && renderCoachView()}
        {activeView === 'scout' && renderScoutView()}
      </main>

      {/* Enhanced Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span>© 2024 NBA Analytics Dashboard - Team DN8</span>
          </div>
          <div className="footer-center">
            <div className="footer-logos">
              <img src="/Purdue-University-Logo.jpg" alt="Purdue" className="footer-logo" />
              <span className="footer-separator">•</span>
              <img src="/30-308332_image-result-for-nba-logo-nba-logo-png.png" alt="NBA" className="footer-logo-nba" />
            </div>
          </div>
          <div className="footer-right">
            <span>MGMT 5900 Final Project</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

