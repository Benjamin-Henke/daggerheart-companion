import { useState } from 'react';
import { UserRoundPlus } from 'lucide-react';
import { supabase } from '../../../../supabaseClient';
import type { Player } from '../../../../types/Player';
import './AddPlayer.css';

interface AddPlayerProps {
  onPlayerAdded: (newPlayer: Player) => void;
  onError: (error: string) => void;
}

const AddPlayer = ({ onPlayerAdded, onError }: AddPlayerProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const addPlayer = async () => {
    try {
      setIsAdding(true);
      const newPlayer = {
        name: '',
        class: '',
        heritage: '',
        subclass: '',
        level: 1,
        agility: 0,
        current_hp: 0,
        max_hp: 6,
        current_armor: 0,
        max_armor: 12,
        current_stress: 0,
        max_stress: 6,
        current_hope: 0,
        max_hope: 6
      };

      const { data, error } = await supabase
        .from('players')
        .insert([newPlayer])
        .select()
        .single();

      if (error) throw error;

      onPlayerAdded(data);
    } catch (error) {
      console.error('Error adding player:', error);
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError(String(error));
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={addPlayer}
      className="add-player-btn"
      disabled={isAdding}
    >
      <UserRoundPlus className="w-4 h-4" />
    </button>
  );
};

export default AddPlayer;
