import AddPlayer from './Actions/AddPlayer';
import Rest from './Actions/Rest';
import type { Player } from '../../types/Player';
import './UtilityBar.css';

interface UtilityBarProps {
  onPlayerAdded: (newPlayer: Player) => void;
  onError: (error: string) => void;
}

const UtilityBar = ({ onPlayerAdded, onError }: UtilityBarProps) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Daggerheart Companion</h1>
        <div className="navbar-actions">
          <Rest />
          <AddPlayer onPlayerAdded={onPlayerAdded} onError={onError} />
        </div>
      </div>
    </nav>
  );
};

export default UtilityBar;
