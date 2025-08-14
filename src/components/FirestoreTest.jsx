// FirestoreTest.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

const FirestoreTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Not tested');
  const [playersCount, setPlayersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setConnectionStatus('Testing...');
    
    try {
      // Try to get players collection
      const playersSnapshot = await getDocs(collection(db, 'players'));
      setPlayersCount(playersSnapshot.docs.length);
      
      if (playersSnapshot.docs.length > 0) {
        setConnectionStatus('Connected! Firestore is working properly.');
      } else {
        setConnectionStatus('Connected, but no player data found in Firestore.');
      }
    } catch (error) {
      console.error('Firestore connection error:', error);
      setConnectionStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addTestDocument = async () => {
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'test_collection'), {
        message: 'Test document',
        timestamp: new Date()
      });
      setConnectionStatus(`Successfully added test document with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error adding test document:', error);
      setConnectionStatus(`Error adding test document: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Firestore Connection Test</CardTitle>
        <CardDescription>
          Verify that your application is properly connected to Firebase/Firestore
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Connection Status:</p>
            <p className="text-sm">
              {connectionStatus === 'Connected! Firestore is working properly.' ? 
                <span className="text-green-600">{connectionStatus}</span> : 
                connectionStatus === 'Testing...' ?
                <span className="text-amber-600">{connectionStatus}</span> :
                connectionStatus.startsWith('Error') ?
                <span className="text-red-600">{connectionStatus}</span> :
                <span>{connectionStatus}</span>
              }
            </p>
          </div>

          {playersCount > 0 && (
            <div>
              <p className="text-sm font-medium">Players in Firestore:</p>
              <p className="text-sm">{playersCount} players found</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={testConnection} disabled={isLoading}>
          Test Connection
        </Button>
        <Button onClick={addTestDocument} disabled={isLoading} variant="outline">
          Add Test Document
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FirestoreTest;
