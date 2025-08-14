import { useMemo } from 'react'
import { Button } from './components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs.jsx'
import { Badge } from './components/ui/badge.jsx'
import { Progress } from './components/ui/progress.jsx'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts'
import { 
  TrendingUp, TrendingDown, Users, DollarSign, Target, 
  Clock, Award, AlertTriangle, Star, Activity, Loader2
} from 'lucide-react'
import './App.css'
import RosterSandbox from './components/RosterSandbox'

// Sample data based on the presentation insights
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

const teamEfficiencyData = [
  { team: 'MIL', efficiency: 92.3, payroll: 165.2, performance: 88 },
  { team: 'BOS', efficiency: 89.7, payroll: 162.8, performance: 85 },
  { team: 'PHI', efficiency: 78.4, payroll: 158.9, performance: 79 },
  { team: 'LAL', efficiency: 71.2, payroll: 161.4, performance: 74 },
  { team: 'GSW', efficiency: 68.9, payroll: 163.7, performance: 72 }
]

function MetricCard({ title, value, suffix = '', change, changeType = 'neutral', icon: Icon, loading = false }) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">
              {typeof value === 'number' && !isNaN(value) ? value.toFixed(1) : value}
              {suffix}
            </div>
            {change && (
              <p className={`text-xs ${
                changeType === 'positive' ? 'text-green-500' : 
                changeType === 'negative' ? 'text-red-500' : 
                'text-gray-500'
              }`}>
                {change}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

function GMView() {
  // Prepare data for RosterSandbox
  const rosterTeamData = useMemo(() => ({
    totalSalaryCap: teamData.totalSalaryCap * 1000000, // Convert to raw amount
    performanceScore: teamData.performanceScore,
    capEfficiency: teamData.capEfficiency
  }), []);

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
                <Scatter dataKey="performance" fill="#8884d8" />
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
                <Bar dataKey="efficiency" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Roster Sandbox Component */}
      <RosterSandbox teamData={rosterTeamData} />
    </div>
  )
}

export default GMView;
