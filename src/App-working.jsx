import { useState } from "react"

function App() {
  const [activeView, setActiveView] = useState("gm")

  // Sample data for the dashboard
  const teamData = {
    totalSalaryCap: 165.2,
    currentPayroll: 158.7,
    payrollChange: 2.1,
    performanceScore: 82.4,
    performanceChange: 5.3,
    valuePlayers: 12,
    capEfficiency: 88.7,
    efficiencyImprovement: 3.2
  }

  const salaryPerformanceData = [
    { name: 'Giannis Antetokounmpo', salary: 45.6, performance: 95, efficiency: 2.08, position: 'PF' },
    { name: 'Jayson Tatum', salary: 32.6, performance: 88, efficiency: 2.70, position: 'SF' },
    { name: 'Joel Embiid', salary: 47.6, performance: 85, efficiency: 1.79, position: 'C' },
    { name: 'Luka Doncic', salary: 40.1, performance: 92, efficiency: 2.29, position: 'PG' },
    { name: 'Ja Morant', salary: 12.1, performance: 78, efficiency: 6.45, position: 'PG' }
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', 
        color: 'white',
        padding: '24px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>NBA Analytics Dashboard</h1>
              <p style={{ color: '#bfdbfe', margin: 0 }}>The Value Game: Unlocking Performance and Cap Flexibility</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ 
                backgroundColor: '#10b981', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '16px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>General Manager</span>
              <span style={{ 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '16px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>Coach</span>
              <span style={{ 
                backgroundColor: '#8b5cf6', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '16px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>Scout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ backgroundColor: '#f1f5f9', padding: '16px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['gm', 'coach', 'scout'].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: activeView === view ? '#1e40af' : 'white',
                  color: activeView === view ? 'white' : '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
              >
                {view === 'gm' && '📊'}
                {view === 'coach' && '⚡'}
                {view === 'scout' && '🔍'}
                {view.charAt(0).toUpperCase() + view.slice(1)} View
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {activeView === "gm" && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937' }}>
              General Manager View
            </h2>
            
            {/* Key Metrics */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '24px', 
              marginBottom: '32px' 
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280', margin: 0 }}>Total Salary Cap</h3>
                  <span style={{ fontSize: '24px' }}>💰</span>
                </div>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#059669', margin: '0 0 8px 0' }}>
                  ${teamData.totalSalaryCap}M
                </p>
                <p style={{ fontSize: '14px', color: '#10b981', margin: 0 }}>
                  ↗ +{teamData.payrollChange}% from last season
                </p>
              </div>

              <div style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280', margin: 0 }}>Current Payroll</h3>
                  <span style={{ fontSize: '24px' }}>📈</span>
                </div>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc2626', margin: '0 0 8px 0' }}>
                  ${teamData.currentPayroll}M
                </p>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  {((teamData.currentPayroll / teamData.totalSalaryCap) * 100).toFixed(1)}% of salary cap
                </p>
              </div>

              <div style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280', margin: 0 }}>Performance Score</h3>
                  <span style={{ fontSize: '24px' }}>⭐</span>
                </div>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e40af', margin: '0 0 8px 0' }}>
                  {teamData.performanceScore}
                </p>
                <p style={{ fontSize: '14px', color: '#10b981', margin: 0 }}>
                  ↗ +{teamData.performanceChange}% improvement
                </p>
              </div>

              <div style={{ 
                backgroundColor: 'white', 
                padding: '24px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280', margin: 0 }}>Cap Efficiency</h3>
                  <span style={{ fontSize: '24px' }}>🎯</span>
                </div>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6', margin: '0 0 8px 0' }}>
                  {teamData.capEfficiency}%
                </p>
                <p style={{ fontSize: '14px', color: '#10b981', margin: 0 }}>
                  ↗ +{teamData.efficiencyImprovement}% optimization
                </p>
              </div>
            </div>

            {/* Player Performance Table */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                  Top Player Value Analysis
                </h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Player</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Position</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Salary</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Performance</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryPerformanceData.map((player, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '16px', fontWeight: '500', color: '#1f2937' }}>{player.name}</td>
                        <td style={{ padding: '16px', color: '#6b7280' }}>{player.position}</td>
                        <td style={{ padding: '16px', color: '#6b7280' }}>${player.salary}M</td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ 
                              width: '60px', 
                              height: '8px', 
                              backgroundColor: '#e5e7eb', 
                              borderRadius: '4px',
                              overflow: 'hidden'
                            }}>
                              <div style={{ 
                                width: `${player.performance}%`, 
                                height: '100%', 
                                backgroundColor: player.performance > 90 ? '#10b981' : player.performance > 80 ? '#3b82f6' : '#f59e0b',
                                borderRadius: '4px'
                              }}></div>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>{player.performance}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ 
                            color: player.efficiency > 3 ? '#10b981' : player.efficiency > 2 ? '#3b82f6' : '#f59e0b',
                            fontWeight: '600'
                          }}>
                            {player.efficiency.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeView === "coach" && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>⚡</div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>Coach View</h2>
            <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Operational efficiency and player management dashboard coming soon. 
              This view will include player rotation analysis, performance metrics, and game strategy insights.
            </p>
          </div>
        )}

        {activeView === "scout" && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔍</div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>Scout View</h2>
            <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Future talent identification and market analysis dashboard coming soon. 
              This view will include draft prospects, trade opportunities, and market value assessments.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#f1f5f9', marginTop: '48px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: '#6b7280' }}>
            <p style={{ margin: 0 }}>© 2024 NBA Analytics Dashboard - Team DN8</p>
            <p style={{ margin: 0 }}>MGMT 5900 Final Project</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

