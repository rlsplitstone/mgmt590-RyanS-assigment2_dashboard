import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Imports player data from CSV files into Firestore
 * @param {Array} playerData - Player data from CSV
 * @returns {Promise<void>}
 */
export const importPlayerData = async (playerData) => {
  if (!playerData || playerData.length === 0) {
    console.error('No player data provided');
    return;
  }

  try {
    // Check if players are already imported
    const playersSnapshot = await getDocs(collection(db, 'players'));
    
    if (playersSnapshot.docs.length > 0) {
      console.log('Players are already imported into Firestore');
      return;
    }

    console.log(`Importing ${playerData.length} players to Firestore...`);
    
    // Batch import players
    const importPromises = playerData.map(async (player) => {
      // Check if player already exists to avoid duplicates
      const playerQuery = query(
        collection(db, 'players'), 
        where('name', '==', player.Player)
      );
      const existingPlayers = await getDocs(playerQuery);
      
      if (existingPlayers.docs.length === 0) {
        // Format player data for Firestore
        const playerDoc = {
          name: player.Player,
          team: player.Team,
          position: player.Position,
          age: parseInt(player.Age),
          salary: parseFloat(player.Salary),
          performance_score: parseFloat(player.Performance_Score),
          imported_at: new Date()
        };
        
        // Add to Firestore
        await addDoc(collection(db, 'players'), playerDoc);
      }
    });
    
    await Promise.all(importPromises);
    console.log('Player data imported successfully');
    
  } catch (error) {
    console.error('Error importing player data:', error);
    throw error;
  }
};

/**
 * Imports team data from CSV files into Firestore
 * @param {Array} teamData - Team data from CSV
 * @returns {Promise<void>}
 */
export const importTeamData = async (teamData) => {
  if (!teamData || teamData.length === 0) {
    console.error('No team data provided');
    return;
  }

  try {
    // Check if teams are already imported
    const teamsSnapshot = await getDocs(collection(db, 'teams'));
    
    if (teamsSnapshot.docs.length > 0) {
      console.log('Teams are already imported into Firestore');
      return;
    }

    console.log(`Importing ${teamData.length} teams to Firestore...`);
    
    // Batch import teams
    const importPromises = teamData.map(async (team) => {
      // Check if team already exists to avoid duplicates
      const teamQuery = query(
        collection(db, 'teams'), 
        where('name', '==', team.Team)
      );
      const existingTeams = await getDocs(teamQuery);
      
      if (existingTeams.docs.length === 0) {
        // Format team data for Firestore
        const teamDoc = {
          name: team.Team,
          salary_cap: parseFloat(team.Salary_Cap),
          team_performance_score: parseFloat(team.Team_Performance_Score),
          cap_efficiency: parseFloat(team.Cap_Efficiency),
          imported_at: new Date()
        };
        
        // Add to Firestore
        await addDoc(collection(db, 'teams'), teamDoc);
      }
    });
    
    await Promise.all(importPromises);
    console.log('Team data imported successfully');
    
  } catch (error) {
    console.error('Error importing team data:', error);
    throw error;
  }
};

/**
 * Initializes Firestore with data from CSV files
 * @param {Array} playerData - Player data from CSV
 * @param {Array} teamData - Team data from CSV
 * @returns {Promise<void>}
 */
export const initializeFirestore = async (playerData, teamData) => {
  try {
    await importPlayerData(playerData);
    await importTeamData(teamData);
    console.log('Firestore data initialization complete');
  } catch (error) {
    console.error('Error initializing Firestore data:', error);
    throw error;
  }
};
