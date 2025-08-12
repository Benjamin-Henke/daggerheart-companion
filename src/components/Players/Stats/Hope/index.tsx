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
      console.error('Error updating hope:', error);
      onError('Failed to update hope');
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
    <div className={hopeClassName}>
      <span className="hope-label">Hope</span>
        {[...Array(6)].map((_, index) => (
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
