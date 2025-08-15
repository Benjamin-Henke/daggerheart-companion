import { useState } from 'react';

import UtilityBar from './components/UtilityBar';
// import Landing from './components/Landing';
import FearTracker from './components/FearTracker';
import PlayerManager from './components/Players/PlayerManager'

import type { Player } from './types/Player';
import './App.css'

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);

  // const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)

  // ADD in later
  // if (!selectedCampaign) {
  //   return (
  //     <div className="app-container">
  //       <Landing onCampaignSelect={setSelectedCampaign} />
  //     </div>
  //   )
  // }


  const addPlayerToList = (newPlayer: Player) => {
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  };


  return (
    <div className="app-container">
      <UtilityBar onPlayerAdded={addPlayerToList} onError={setError} />
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
      <div className="dashboard">
        <FearTracker />
        <PlayerManager players={players} setPlayers={setPlayers} />
      </div>
    </div>
  );
}

export default App;
