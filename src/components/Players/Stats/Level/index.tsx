import './Level.css'

import type { Player } from '../../../../types/Player'

type LevelProps = {
  player: Player;
  updatePlayerField: (id: number, field: keyof Player, value: string | number) => void
};

const Levels = ({ player, updatePlayerField }: LevelProps) => {

  return (
    <div className="level-box">
      <input
        type="number"
        min="1"
        max="10"
        value={player.level}
        onChange={(e) => updatePlayerField(player.id, 'level', parseInt(e.target.value))}
        className="level-input"
      />
      <div className="level-label">LEVEL</div>
    </div>
  );
};

export default Levels;
