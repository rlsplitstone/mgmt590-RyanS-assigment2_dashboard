import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  collection, addDoc, doc, deleteDoc, serverTimestamp, onSnapshot,
  orderBy, query, updateDoc, limit
} from 'firebase/firestore';
import { db } from '../firebase';
import { fetchPlayersByIds } from '../lib/fetchPlayersByIds';
import { aggregateRoster } from '../lib/metrics';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from './ui/card';
import { Button } from './ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from './ui/badge';

const MAX_PLAYERS = 15;

const RosterSandbox = ({ teamData }) => {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [currentIds, setCurrentIds] = useState([]);
  const [currentDocs, setCurrentDocs] = useState([]);
  const [addSelect, setAddSelect] = useState('');
  const [removeSelect, setRemoveSelect] = useState('');
  const [rosterName, setRosterName] = useState('');
  const [savedRosters, setSavedRosters] = useState([]);
  const [selectedRoster, setSelectedRoster] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Dialog state
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [isRemovePlayerOpen, setIsRemovePlayerOpen] = useState(false);
  const [isSaveRosterOpen, setIsSaveRosterOpen] = useState(false);
  const [isLoadRosterOpen, setIsLoadRosterOpen] = useState(false);

  // Subscribe to players collection
  useEffect(() => {
    const q = query(collection(db, 'players'));
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map(d => {
        const v = d.data();
        return { id: d.id, name: v.name, position: v.position, salary: v.salary };
      });
      setAvailablePlayers(rows);
    }, (e) => console.error('players onSnapshot error', e));
    return () => unsub();
  }, []);

  // Subscribe to saved rosters
  useEffect(() => {
    const q = query(collection(db, 'userRosters'), orderBy('createdAt', 'desc'), limit(25));
    const unsub = onSnapshot(q, (snap) => {
      setSavedRosters(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (e) => console.error('rosters onSnapshot error', e));
    return () => unsub();
  }, []);

  // Fetch full player details for current roster
  useEffect(() => {
    if (!currentIds.length) {
      setCurrentDocs([]);
      return;
    }
    
    setIsLoading(true);
    fetchPlayersByIds(currentIds)
      .then(docs => {
        setCurrentDocs(docs);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching players:', err);
        setIsLoading(false);
      });
  }, [currentIds]);

  // Calculate derived metrics
  const derived = useMemo(() => {
    if (!currentDocs.length) {
      return {
        totalSalary: 0,
        totalPerformance: 0,
        psPerMillion: 0,
        positions: {}
      };
    }
    return aggregateRoster(currentDocs);
  }, [currentDocs]);

  // Calculate impact metrics for chart display
  const chartData = useMemo(() => {
    return [
      {
        name: 'Salary (millions)',
        Original: (teamData?.totalSalaryCap || 0) / 1000000,
        New: derived.totalSalary / 1000000
      },
      {
        name: 'Performance',
        Original: teamData?.performanceScore || 0,
        New: derived.totalPerformance
      },
      {
        name: 'Efficiency',
        Original: teamData?.capEfficiency || 0,
        New: derived.psPerMillion
      }
    ];
  }, [derived, teamData]);

  // Player management actions
  const addPlayer = useCallback((id) => {
    if (!id) return;
    if (currentIds.includes(id)) return;
    if (currentIds.length >= MAX_PLAYERS) {
      alert(`Max ${MAX_PLAYERS} players per roster for this demo.`);
      return;
    }
    setCurrentIds(prev => [...prev, id]);
    setAddSelect('');
    setIsAddPlayerOpen(false);
  }, [currentIds]);

  const removePlayer = useCallback((id) => {
    if (!id) return;
    setCurrentIds(prev => prev.filter(x => x !== id));
    setRemoveSelect('');
    setIsRemovePlayerOpen(false);
  }, []);

  // Roster management actions
  const saveRoster = async () => {
    if (!rosterName.trim()) return alert('Please enter a roster name');

    const snapshot = currentDocs.map(p => ({ 
      id: p.id, name: p.name, position: p.position, salary: p.salary 
    }));
    
    const payload = {
      name: rosterName,
      createdAt: serverTimestamp(),
      lastModified: serverTimestamp(),
      playerIds: currentIds,
      playerSnapshot: snapshot,
      totals: {
        salary: derived.totalSalary,
        performanceScore: derived.totalPerformance,
        psPerMillion: derived.psPerMillion
      }
    };
    
    if (selectedRoster?.id) {
      await updateDoc(doc(db, 'userRosters', selectedRoster.id), payload);
    } else {
      await addDoc(collection(db, 'userRosters'), payload);
    }

    setIsSaveRosterOpen(false);
  };

  const loadRoster = async (rosterId) => {
    const roster = savedRosters.find(r => r.id === rosterId);
    if (!roster) return;
    
    setRosterName(roster.name);
    setCurrentIds(roster.playerIds || []);
    setSelectedRoster(roster);
    setIsLoadRosterOpen(false);
  };

  const deleteRoster = async (rosterId) => {
    try {
      await deleteDoc(doc(db, 'userRosters', rosterId));
      if (selectedRoster?.id === rosterId) {
        setSelectedRoster(null);
      }
    } catch (error) {
      console.error("Error deleting roster:", error);
      alert(`Error deleting roster: ${error.message}`);
    }
  };

  // Position distribution display
  const positionDistribution = useMemo(() => {
    if (!derived.positions) return [];
    return Object.entries(derived.positions).map(([position, count]) => ({
      position,
      count,
      percentage: Math.round((count / currentDocs.length) * 100)
    }));
  }, [derived.positions, currentDocs.length]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roster Sandbox</CardTitle>
        <CardDescription>
          Experiment with different roster configurations and see their impact on team metrics.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Current Roster */}
          <div className="w-full md:w-auto flex-1">
            <h3 className="text-lg font-semibold mb-2">Current Roster</h3>
            <div className="border rounded-md p-4 min-h-[200px]">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <p>Loading roster...</p>
                </div>
              ) : currentDocs.length === 0 ? (
                <p className="text-gray-500">No players added. Click "Add Player" to build your roster.</p>
              ) : (
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-medium">Player</span>
                    <span className="font-medium">Position</span>
                  </div>
                  <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                    {currentDocs.map(player => (
                      <li key={player.id} className="flex justify-between items-center py-1 border-b">
                        <div className="flex-1">
                          <span>{player.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{player.position}</Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removePlayer(player.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Position distribution */}
            {currentDocs.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">Position Distribution</h4>
                <div className="border rounded-md p-4">
                  <div className="grid grid-cols-5 gap-2">
                    {positionDistribution.map(({ position, count, percentage }) => (
                      <div key={position} className="text-center">
                        <div className="font-semibold">{position}</div>
                        <div className="text-sm">{count} ({percentage}%)</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Projected Impact */}
          <div className="w-full md:w-auto flex-1">
            <h3 className="text-lg font-semibold mb-2">Projected Impact</h3>
            <div className="border rounded-md p-4 min-h-[200px]">
              {currentDocs.length === 0 ? (
                <p className="text-gray-500">Add players to see projected impact.</p>
              ) : (
                <div className="space-y-4">
                  <div>
                    <span className="font-medium">Salary Cap Impact: </span>
                    <span className={derived.totalSalary > (teamData?.totalSalaryCap || 0) ? 'text-red-500' : 'text-green-500'}>
                      {derived.totalSalary > (teamData?.totalSalaryCap || 0) ? '+' : ''}
                      {(((derived.totalSalary - (teamData?.totalSalaryCap || 0)) / (teamData?.totalSalaryCap || 1)) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Performance Score Impact: </span>
                    <span className={derived.totalPerformance > (teamData?.performanceScore || 0) ? 'text-green-500' : 'text-red-500'}>
                      {derived.totalPerformance > (teamData?.performanceScore || 0) ? '+' : ''}
                      {(((derived.totalPerformance - (teamData?.performanceScore || 0)) / (teamData?.performanceScore || 1)) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Efficiency Impact: </span>
                    <span className={derived.psPerMillion > (teamData?.capEfficiency || 0) ? 'text-green-500' : 'text-red-500'}>
                      {derived.psPerMillion > (teamData?.capEfficiency || 0) ? '+' : ''}
                      {(((derived.psPerMillion - (teamData?.capEfficiency || 0)) / (teamData?.capEfficiency || 1)) * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  {/* Impact Chart */}
                  <div className="h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Original" fill="#8884d8" name="Current Team" />
                        <Bar dataKey="New" fill="#82ca9d" name="New Roster" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Roster Summary */}
                  <div className="mt-4 border-t pt-4">
                    <h4 className="text-md font-semibold mb-2">Roster Summary</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Total Salary</div>
                        <div className="font-medium">${(derived.totalSalary / 1000000).toFixed(1)}M</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Performance Score</div>
                        <div className="font-medium">{derived.totalPerformance.toFixed(1)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">PS per $1M</div>
                        <div className="font-medium">{derived.psPerMillion.toFixed(1)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Dialog open={isAddPlayerOpen} onOpenChange={setIsAddPlayerOpen}>
            <DialogTrigger asChild>
              <Button>Add Player</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Player to Roster</DialogTitle>
                <DialogDescription>
                  Select a player to add to your custom roster.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <Label htmlFor="player-select">Select Player</Label>
                <Select 
                  value={addSelect}
                  onValueChange={setAddSelect}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a player" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>Loading players...</SelectItem>
                    ) : availablePlayers.length === 0 ? (
                      <SelectItem value="none" disabled>No players available</SelectItem>
                    ) : (
                      availablePlayers
                        .filter(p => !currentIds.includes(p.id))
                        .map(player => (
                          <SelectItem key={player.id} value={player.id}>
                            {player.name} ({player.position}) - ${(player.salary / 1000000).toFixed(1)}M
                          </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddPlayerOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => addPlayer(addSelect)} 
                  disabled={!addSelect}
                >
                  Add to Roster
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isRemovePlayerOpen} onOpenChange={setIsRemovePlayerOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Remove Player</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove Player from Roster</DialogTitle>
                <DialogDescription>
                  Select a player to remove from your custom roster.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <Label htmlFor="player-remove">Select Player</Label>
                <Select 
                  value={removeSelect}
                  onValueChange={setRemoveSelect}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a player to remove" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentDocs.length === 0 ? (
                      <SelectItem value="none" disabled>No players in roster</SelectItem>
                    ) : (
                      currentDocs.map(player => (
                        <SelectItem key={player.id} value={player.id}>
                          {player.name} ({player.position})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRemovePlayerOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => removePlayer(removeSelect)} 
                  disabled={!removeSelect}
                >
                  Remove from Roster
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isSaveRosterOpen} onOpenChange={setIsSaveRosterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Save Roster</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Custom Roster</DialogTitle>
                <DialogDescription>
                  Give your roster a name to save it for future reference.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <Label htmlFor="roster-name">Roster Name</Label>
                <Input 
                  id="roster-name" 
                  value={rosterName} 
                  onChange={(e) => setRosterName(e.target.value)} 
                  placeholder="My Dream Team"
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSaveRosterOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={saveRoster} 
                  disabled={currentDocs.length === 0 || !rosterName.trim()}
                >
                  {selectedRoster ? 'Update Roster' : 'Save Roster'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isLoadRosterOpen} onOpenChange={setIsLoadRosterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Load Roster</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Load Saved Roster</DialogTitle>
                <DialogDescription>
                  Select a previously saved roster to load.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <Label>Saved Rosters</Label>
                {savedRosters.length === 0 ? (
                  <p className="text-sm text-gray-500 mt-2">No saved rosters found.</p>
                ) : (
                  <ul className="space-y-2 mt-2">
                    {savedRosters.map(roster => (
                      <li key={roster.id} className="flex justify-between items-center border-b pb-2">
                        <span>{roster.name}</span>
                        <div className="space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => loadRoster(roster.id)}
                          >
                            Load
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => deleteRoster(roster.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsLoadRosterOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <p className="text-sm text-gray-500">
          This sandbox allows you to experiment with different player combinations based on Option-E's 
          Performance Score (PER + PTS + AST + REB + BLK + MP/5) and Performance Score per $1M metrics.
        </p>
      </CardFooter>
    </Card>
  );
};

export default RosterSandbox;
