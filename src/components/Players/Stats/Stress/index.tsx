import { supabase } from '../../../../supabaseClient'
import './Stress.css'

import type { Player } from '../../../../types/Player'

import { Plus, Minus } from "lucide-react";

type StressProps = {
  player: Player;
  onPlayerUpdate: (player: Player) => void;
  onError: (message: string) => void;
};

const Stress = ({ player, onPlayerUpdate, onError }: StressProps) => {
  const addStressSlot = async (playerId: number) => {
    try {
      const newMaxStress = player.max_stress + 1;
      const { data, error } = await supabase
        .from('players')
        .update({ max_stress: newMaxStress })
        .eq('id', playerId)
        .select();
      if (error) throw error;
      onPlayerUpdate(data[0]);
    } catch (error) {
      console.error('Error adding Stress slot: ', error);
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError(String(error));
      }
    }
  };

  const removeStressSlot = async (playerId: number) => {
    try {
      const newMaxStress = player.max_stress - 1;
      const { data, error } = await supabase
        .from('players')
        .update({ max_stress: newMaxStress })
        .eq('id', playerId)
        .select();
      if (error) throw error;
      onPlayerUpdate(data[0]);
    } catch (error) {
      console.error('Error removing Stress slot: ', error);
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError(String(error));
      }
    }
  };

  const toggleStressSlot = async (playerId: number, slotIndex: number) => {
    const newCurrentStress = slotIndex + 1 <= player.current_stress ? slotIndex : slotIndex + 1;
    const originalStress = player.current_stress;

    const optimisticPlayer = { ...player, current_stress: newCurrentStress };
    onPlayerUpdate(optimisticPlayer);

    try {
      const { data, error } = await supabase
        .from('players')
        .update({ current_stress: newCurrentStress })
        .eq('id', playerId)
        .select();

      if (error) throw error;

      onPlayerUpdate(data[0]);
    } catch (error) {
      const rollbackPlayer = { ...player, current_stess: originalStress };
      onPlayerUpdate(rollbackPlayer)

      console.error('Error toggling Stress slot: ', error);
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError(String(error));
      }
    }
  };

  const renderStressSlots = (player: Player) => {
    const slots = [];
    for (let i = 0; i < player.max_stress; i++) {
      slots.push(
        <div
          key={i}
          className={`stress-slot ${i < player.current_stress ? 'filled' : 'empty'}`}
          onClick={() => toggleStressSlot(player.id, i)}
        />
      );
    }
    return slots;
  };

  return (
    <div className="stress-section">
      <div className="stress-header">
        <span className="stress-label">Stress ({player.current_stress}/{player.max_stress})</span>

        <div className="slot-buttons">
          <button
            onClick={() => addStressSlot(player.id)}
            className="slot-btn"
            title="Add Stress slot"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => removeStressSlot(player.id)}
            className="slot-btn"
            title="Remove Stress slot"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="stress-slots">
        {renderStressSlots(player)}
      </div>
    </div>
  );
}

export default Stress
