import { useState } from "react"

function App() {
  const [activeView, setActiveView] = useState("gm")

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1e40af', marginBottom: '10px' }}>NBA Analytics Dashboard</h1>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>The Value Game: Unlocking Performance and Cap Flexibility</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveView("gm")}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: activeView === "gm" ? '#1e40af' : '#f3f4f6',
            color: activeView === "gm" ? 'white' : 'black',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          GM View
        </button>
        <button 
          onClick={() => setActiveView("coach")}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: activeView === "coach" ? '#1e40af' : '#f3f4f6',
            color: activeView === "coach" ? 'white' : 'black',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Coach View
        </button>
        <button 
          onClick={() => setActiveView("scout")}
          style={{ 
            padding: '10px 20px',
            backgroundColor: activeView === "scout" ? '#1e40af' : '#f3f4f6',
            color: activeView === "scout" ? 'white' : 'black',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Scout View
        </button>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        {activeView === "gm" && (
          <div>
            <h2>General Manager View</h2>
            <p>Financial strategy and roster optimization dashboard.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3>Total Salary Cap</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>$165.2M</p>
              </div>
              <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3>Current Payroll</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>$158.7M</p>
              </div>
              <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3>Performance Score</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af' }}>82.4</p>
              </div>
            </div>
          </div>
        )}
        {activeView === "coach" && (
          <div>
            <h2>Coach View</h2>
            <p>Operational efficiency and player management dashboard coming soon.</p>
          </div>
        )}
        {activeView === "scout" && (
          <div>
            <h2>Scout View</h2>
            <p>Future talent identification and market analysis dashboard coming soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

