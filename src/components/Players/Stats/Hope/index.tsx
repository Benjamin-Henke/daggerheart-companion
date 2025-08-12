import { supabase } from '../../../../supabaseClient'
import './Hope.css'
import type { Player } from '../../../../types/Player'

type HopeProps = {
  player: Player;
  onPlayerUpdate: (player: Player) => void;
  onError: (message: string) => void;
};

const Hope = ({ player, onPlayerUpdate, onError }: HopeProps) => {
  const handleDiamondClick = async (index: number) => {
    const newCurrentHope = index + 1 === player.current_hope ? index : index + 1;
    const originalHope = player.current_hope;

    const optimisticPlayer = { ...player, current_hope: newCurrentHope };
    onPlayerUpdate(optimisticPlayer);

    try {
      const newHope = index + 1 === player.current_hope ? index : index + 1;

      const { data, error } = await supabase
        .from('players')
        .update({ current_hope: newHope })
        .eq('id', player.id)
        .select()
        .single();

      if (error) throw error;

      onPlayerUpdate(data);
    } catch (error) {
      const rollbackPlayer = { ...player, current_hp: originalHope };
      onPlayerUpdate(rollbackPlayer);

      console.error('Error updating hope:', error);
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError(String(error));
      }
    }
  };

  const getHopeCount = (current_hope?: number, max_hope?: number): number => {
    if (!current_hope || current_hope <= 0) return 0;
    if (!max_hope || max_hope <= 0) return 0;
    return Math.min(current_hope, max_hope);
  };
  const hopeCount: number = getHopeCount(player.current_hope, player.max_hope) ?? 0;
  const hopeClassName: string = `hope-banner ${hopeCount > 0 ? `hope-level-${hopeCount}` : ''}`;

  return (
    <div key={hopeCount} className={hopeClassName}>
      <span className="hope-label">Hope</span>
      {[...Array(player.max_hope ?? player.max_hope)].map((_, index) => (
        <div
          key={index}
          className={`hope-diamond ${index < player.current_hope ? 'filled' : ''}`}
          onClick={() => handleDiamondClick(index)}
        />
      ))}
    </div>
  );
};

export default Hope;
