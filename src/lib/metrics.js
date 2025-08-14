const N = (x) => Number.isFinite(Number(x)) ? Number(x) : 0;

/** Performance Score (Option E): PER + PTS + AST + REB + BLK + (MP/5) */
export function performanceScore(metrics) {
  const PER = N(metrics?.PER), PTS = N(metrics?.PTS), AST = N(metrics?.AST);
  const REB = N(metrics?.REB), BLK = N(metrics?.BLK), MP = N(metrics?.MP);
  return PER + PTS + AST + REB + BLK + (MP / 5);
}

/** Performance Score per $1M */
export function psPerMillion(ps, salary) {
  const m = N(salary) / 1_000_000;
  return m > 0 ? (ps / m) : 0;
}

/** PS for a Firestore player doc */
export function playerPS(player) {
  return performanceScore(player?.metrics || {});
}

/** Aggregate roster metrics from full player docs */
export function aggregateRoster(players) {
  if (!players || !Array.isArray(players)) {
    return {
      totalSalary: 0,
      totalPerformance: 0,
      psPerMillion: 0,
      averageAge: 0,
      positions: {},
      efficiencyRating: 0
    };
  }

  const totalSalary = players.reduce((s, p) => s + N(p.salary), 0);
  const totalPS = players.reduce((s, p) => s + playerPS(p), 0);
  
  // Calculate position distribution
  const positions = players.reduce((acc, player) => {
    const pos = player.position || 'Unknown';
    acc[pos] = (acc[pos] || 0) + 1;
    return acc;
  }, {});

  // Calculate average age if available
  const totalAge = players.reduce((sum, player) => sum + (player.age || 0), 0);
  const averageAge = players.length ? totalAge / players.length : 0;

  // Calculate efficiency rating
  const psPerM = psPerMillion(totalPS, totalSalary);
  
  return {
    totalSalary,
    totalPerformance: Number(totalPS.toFixed(2)),
    psPerMillion: Number(psPerM.toFixed(2)),
    averageAge: Number(averageAge.toFixed(1)),
    positions,
    efficiencyRating: Number((psPerM / 10).toFixed(2))
  };
}
