import { supabase } from '../../../../SupabaseClient'
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

  return (
    <div className="hope-banner">
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
