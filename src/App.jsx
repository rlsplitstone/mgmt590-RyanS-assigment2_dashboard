import { useState } from "react"
import { Button } from "./components/ui/button.jsx"
import { Badge } from "./components/ui/badge.jsx"
import "./App.css"
import GMView from "./GMView"

function App() {
  const [activeView, setActiveView] = useState("gm")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">NBA Analytics Dashboard</h1>
              <p className="text-blue-100 mt-1">The Value Game: Unlocking Performance and Cap Flexibility</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500">General Manager</Badge>
              <Badge className="bg-blue-500">Coach</Badge>
              <Badge className="bg-purple-500">Scout</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-muted py-4 border-b">
        <div className="container mx-auto px-6">
          <div className="flex gap-4">
            <Button
              variant={activeView === "gm" ? "default" : "outline"}
              onClick={() => setActiveView("gm")}
              className="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              GM View
            </Button>
            <Button
              variant={activeView === "coach" ? "default" : "outline"}
              onClick={() => setActiveView("coach")}
              className="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Coach View
            </Button>
            <Button
              variant={activeView === "scout" ? "default" : "outline"}
              onClick={() => setActiveView("scout")}
              className="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Scout View
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeView === "gm" && <GMView />}
        {activeView === "coach" && <div>Coach View Coming Soon</div>}
        {activeView === "scout" && <div>Scout View Coming Soon</div>}
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 NBA Analytics Dashboard - Team DN8</p>
            <p>MGMT 5900 Final Project</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
