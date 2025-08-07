import FearTracker from './components/FearTracker/FearTracker';
import Players from './components/Players/PlayerManager'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <div className="dashboard">
        <FearTracker />
        <Players />
      </div>
    </div>
  );
}

export default App;
