import { useState } from 'react';

import Landing from './components/Landing';
import FearTracker from './components/FearTracker/FearTracker';
import PlayerManager from './components/Players/PlayerManager'
import './App.css'

function App() {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null)

  // ADD in later
  // if (!selectedCampaign) {
  //   return (
  //     <div className="app-container">
  //       <Landing onCampaignSelect={setSelectedCampaign} />
  //     </div>
  //   )
  // }

  return (
    <div className="app-container">
      <div className="dashboard">
        <FearTracker />
        <PlayerManager />
      </div>
    </div>
  );
}

export default App;
