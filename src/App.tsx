import FearTracker from './components/FearTracker/FearTracker';
import PlayerManager from './components/Players/PlayerManager'
import './App.css'

function App() {
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
