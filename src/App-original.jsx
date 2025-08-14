import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts'
import { 
  TrendingUp, TrendingDown, Users, DollarSign, Target, 
  Clock, Award, AlertTriangle, Star, Activity
} from 'lucide-react'
import './App.css'

// Sample data based on the presentation insights
const teamData = {
  totalSalaryCap: 165.2,
  currentPayroll: 158.7,
  payrollChange: 2.1,
  performanceScore: 82.4,
  performanceChange: 5.3,
  valuePlayers: 12,
  capEfficiency: 88.7,
  efficiencyImprovement: 12
}

const salaryPerformanceData = [
  { name: 'Giannis Antetokounmpo', salary: 45.6, performance: 95, efficiency: 2.08, position: 'PF' },
  { name: 'Jayson Tatum', salary: 32.6, performance: 88, efficiency: 2.70, position: 'SF' },
  { name: 'Joel Embiid', salary: 47.6, performance: 85, efficiency: 1.79, position: 'C' },
  { name: 'Luka Doncic', salary: 40.1, performance: 92, efficiency: 2.29, position: 'PG' },
  { name: 'Ja Morant', salary: 12.1, performance: 78, efficiency: 6.45, position: 'PG' },
  { name: 'Tyrese Maxey', salary: 5.8, performance: 74, efficiency: 12.76, position: 'PG' },
  { name: 'Franz Wagner', salary: 4.2, performance: 68, efficiency: 16.19, position: 'SF' },
  { name: 'Austin Reaves', salary: 1.9, performance: 58, efficiency: 30.53, position: 'SG' }
]

const teamEfficiencyData = [
  { team: 'MIL', efficiency: 92.3, payroll: 165.2, performance: 88 },
  { team: 'BOS', efficiency: 89.7, payroll: 162.8, performance: 85 },
  { team: 'PHI', efficiency: 78.4, payroll: 158.9, performance: 79 },
  { team: 'LAL', efficiency: 71.2, payroll: 161.4, performance: 74 },
  { team: 'GSW', efficiency: 68.9, payroll: 163.7, performance: 72 }
]

const playerEfficiencyByPosition = [
  { position: 'PG', efficiency: 85, count: 8 },
  { position: 'SG', efficiency: 78, count: 6 },
  { position: 'SF', efficiency: 82, count: 7 },
  { position: 'PF', efficiency: 88, count: 5 },
  { position: 'C', efficiency: 79, count: 4 }
]

const futurePillarsData = [
  { name: 'Tyrese Maxey', age: 23, efficiency: 12.76, potential: 95, salary: 5.8 },
  { name: 'Franz Wagner', age: 22, efficiency: 16.19, potential: 88, salary: 4.2 },
  { name: 'Austin Reaves', age: 25, efficiency: 30.53, potential: 82, salary: 1.9 },
  { name: 'Ja Morant', age: 24, efficiency: 6.45, potential: 92, salary: 12.1 }
]

const rosterPlayers = [
  { name: 'Giannis Antetokounmpo', position: 'PF', age: 28, mpg: 32.1, status: 'Starter', efficiency: 2.08, salary: 45.6 },
  { name: 'Jayson Tatum', position: 'SF', age: 25, mpg: 32.1, status: 'Starter', efficiency: 2.70, salary: 32.6 },
  { name: 'Joel Embiid', position: 'C', age: 29, mpg: 32.1, status: 'Rotation', efficiency: 1.79, salary: 47.6 },
  { name: 'Nikola Jokic', position: 'C', age: 28, mpg: 32.1, status: 'Rotation', efficiency: 2.45, salary: 47.6 },
  { name: 'Luka Doncic', position: 'PG', age: 24, mpg: 32.1, status: 'Rotation', efficiency: 2.29, salary: 40.1 },
  { name: 'Ja Morant', position: 'PG', age: 23, mpg: 32.1, status: 'Rotation', efficiency: 6.45, salary: 12.1 }
]

const targetPlayers = [
  { name: 'Ja Morant', salary: 12.1, efficiency: 6.5, team: 'MEM', position: 'PG', age: 23, value: 'Excellent' },
  { name: 'Tyrese Haliburton', salary: 5.8, efficiency: 12.8, team: 'IND', position: 'PG', age: 23, value: 'Excellent' },
  { name: 'Franz Wagner', salary: 4.2, efficiency: 16.2, team: 'ORL', position: 'SF', age: 22, value: 'Excellent' },
  { name: 'Austin Reaves', salary: 1.9, efficiency: 30.5, team: 'LAL', position: 'SG', age: 25, value: 'Excellent' }
]

function MetricCard({ title, value, change, changeType, icon: Icon, suffix = '' }) {
  return (
    <Card className="metric-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="metric-label">{title}</p>
            <p className="metric-value">{value}{suffix}</p>
            {change && (
              <p className={`metric-change ${changeType}`}>
                {changeType === 'positive' ? '+' : ''}{change}
                {changeType === 'positive' ? ' vs league avg' : ' from last season'}
              </p>
            )}
          </div>
          {Icon && (
            <div className="p-3 bg-primary/10 rounded-full">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function PlayerCard({ player }) {
  const getStatusBadge = (status) => {
    const statusClass = status.toLowerCase()
    return <Badge className={`status-badge ${statusClass}`}>{status}</Badge>
  }

  const getEfficiencyColor = (efficiency) => {
    if (efficiency > 10) return 'bg-green-500'
    if (efficiency > 5) return 'bg-blue-500'
    if (efficiency > 2) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <Card className="player-card">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{player.name}</h3>
            <p className="text-sm text-muted-foreground">{player.position} • {player.age} years</p>
          </div>
          {getStatusBadge(player.status)}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Minutes per game:</span>
            <span className="font-medium">{player.mpg} MPG</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>PS/$M Efficiency:</span>
            <span className="font-medium">{player.efficiency}</span>
          </div>
          <div className="efficiency-bar bg-gray-200">
            <div 
              className={`efficiency-fill ${getEfficiencyColor(player.efficiency)}`}
              style={{ width: `${Math.min(player.efficiency * 10, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function GMView() {
  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Salary Cap"
          value="$165.2M"
          change={teamData.payrollChange}
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Performance Score"
          value={teamData.performanceScore}
          change={teamData.performanceChange}
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Value Players"
          value={teamData.valuePlayers}
          change="Top 5 in league"
          changeType="positive"
          icon={Star}
        />
        <MetricCard
          title="Cap Efficiency"
          value={teamData.capEfficiency}
          suffix="%"
          change={`+${teamData.efficiencyImprovement}% improvement`}
          changeType="positive"
          icon={Target}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Salary vs Performance Analysis</CardTitle>
            <CardDescription>Player value analysis across the roster</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={salaryPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="salary" name="Salary (M)" />
                <YAxis dataKey="performance" name="Performance Score" />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'salary' ? 'Salary ($M)' : 'Performance Score']}
                  labelFormatter={(label) => `Player: ${salaryPerformanceData.find(p => p.salary === label)?.name || ''}`}
                />
                <Scatter dataKey="performance" fill="oklch(0.65 0.25 30)" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Team Payroll Efficiency</CardTitle>
            <CardDescription>Performance per dollar spent by team</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="team" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="efficiency" fill="oklch(0.25 0.15 240)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Roster Sandbox</CardTitle>
          <CardDescription>Simulate roster changes and see impact on team metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Button variant="outline" className="h-12">
              <Users className="mr-2 h-4 w-4" />
              Add Player
            </Button>
            <Button variant="outline" className="h-12">
              <Users className="mr-2 h-4 w-4" />
              Remove Player
            </Button>
            <Button className="h-12">
              <Activity className="mr-2 h-4 w-4" />
              Simulate Changes
            </Button>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Projected Impact:</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Salary Change:</span>
                <span className="ml-2 font-medium text-green-600">+$2.1M</span>
              </div>
              <div>
                <span className="text-muted-foreground">Performance Change:</span>
                <span className="ml-2 font-medium text-green-600">+3.2</span>
              </div>
              <div>
                <span className="text-muted-foreground">Efficiency Change:</span>
                <span className="ml-2 font-medium text-green-600">+1.8%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CoachView() {
  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Team Efficiency"
          value="88.7"
          change="+2.3 vs last month"
          changeType="positive"
          icon={Activity}
        />
        <MetricCard
          title="Rotation Players"
          value="9"
          change="Optimal range"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Minutes Load"
          value="34.2"
          change="Within safe range"
          changeType="positive"
          icon={Clock}
        />
        <MetricCard
          title="Bench Production"
          value="28.4"
          change="+4.1 vs league avg"
          changeType="positive"
          icon={Award}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Player Efficiency by Position</CardTitle>
            <CardDescription>Performance ratings across positions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={playerEfficiencyByPosition}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="position" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="efficiency" fill="oklch(0.65 0.25 30)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Load Management Status</CardTitle>
            <CardDescription>Player workload and injury risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Low Risk</span>
                <Badge className="bg-green-100 text-green-800">6 players</Badge>
              </div>
              <Progress value={60} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Medium Risk</span>
                <Badge className="bg-yellow-100 text-yellow-800">2 players</Badge>
              </div>
              <Progress value={20} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">High Risk</span>
                <Badge className="bg-red-100 text-red-800">4 players</Badge>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Player Status Overview</CardTitle>
          <CardDescription>Current rotation and performance status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rosterPlayers.map((player, index) => (
              <PlayerCard key={index} player={player} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ScoutView() {
  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Value Targets"
          value="23"
          change="Updated weekly"
          changeType="positive"
          icon={Target}
        />
        <MetricCard
          title="Young Talent"
          value="8"
          change="High potential (U25)"
          changeType="positive"
          icon={Star}
        />
        <MetricCard
          title="Trade Assets"
          value="5"
          change="Market ready"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Draft Capital"
          value="3"
          change="2024-2026 picks"
          changeType="positive"
          icon={Award}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Value vs Age Analysis</CardTitle>
            <CardDescription>Identifying future stars and value contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={futurePillarsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" name="Age" />
                <YAxis dataKey="efficiency" name="PS/$M Efficiency" />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'age' ? 'Age' : 'PS/$M Efficiency']}
                  labelFormatter={(label) => `Player: ${futurePillarsData.find(p => p.age === label)?.name || ''}`}
                />
                <Scatter dataKey="efficiency" fill="oklch(0.55 0.2 120)" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Market Opportunities</CardTitle>
            <CardDescription>Players by value tier and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Excellent Value', value: 4, fill: 'oklch(0.55 0.2 120)' },
                    { name: 'Good Value', value: 3, fill: 'oklch(0.65 0.25 30)' },
                    { name: 'Average Value', value: 2, fill: 'oklch(0.6 0.25 15)' },
                    { name: 'Overpriced', value: 6, fill: 'oklch(0.45 0.05 240)' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Target Players</CardTitle>
          <CardDescription>High-value acquisition targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {targetPlayers.map((player, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{player.name}</h3>
                    <Badge className="value-indicator excellent">{player.value} Value</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {player.team} • {player.position} • {player.age} years
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${player.salary}M</p>
                  <p className="text-sm text-muted-foreground">{player.efficiency} PS/$M</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function App() {
  const [activeView, setActiveView] = useState('gm')

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
              <Badge variant="secondary" className="bg-white/20 text-white">
                Team DN8
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveView('gm')}
              className={`nav-button ${activeView === 'gm' ? 'active' : ''}`}
              variant={activeView === 'gm' ? 'default' : 'ghost'}
            >
              GM View
            </Button>
            <Button
              onClick={() => setActiveView('coach')}
              className={`nav-button ${activeView === 'coach' ? 'active' : ''}`}
              variant={activeView === 'coach' ? 'default' : 'ghost'}
            >
              Coach View
            </Button>
            <Button
              onClick={() => setActiveView('scout')}
              className={`nav-button ${activeView === 'scout' ? 'active' : ''}`}
              variant={activeView === 'scout' ? 'default' : 'ghost'}
            >
              Scout View
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeView === 'gm' && <GMView />}
        {activeView === 'coach' && <CoachView />}
        {activeView === 'scout' && <ScoutView />}
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

