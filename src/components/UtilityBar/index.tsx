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
    <nav className="utility-bar">
      <div className="utility-bar-content">
        {/*<h1 className="utility-bar-title">DAGGERHEART COMPANION</h1>*/}
        <div className="utility-bar-actions">
          <Rest />
          <AddPlayer onPlayerAdded={onPlayerAdded} onError={onError} />
        </div>
      </div>
    </nav>
  );
};

export default UtilityBar;
