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

  const getStressClass = (slotIndex: number, player: Player) => {
    const stressPercentage = (player.current_stress / player.max_stress) * 100;

    if (slotIndex >= player.current_stress) return 'empty';
    if (stressPercentage <= 20) return 'filled stress-0-20';
    if (stressPercentage <= 40) return 'filled stress-21-40';
    if (stressPercentage <= 60) return 'filled stress-41-60';
    if (stressPercentage <= 80) return 'filled stress-61-80';
    if (stressPercentage < 100) return 'filled stress-81-99';
    return 'filled stress-100';
  };


  const renderStressSlots = (player: Player) => {
    return Array.from({ length: player.max_stress }, (_, index) => (
      <div
        key={index}
        className={`stress-slot ${getStressClass(index, player)}`}
        onClick={() => toggleStressSlot(player.id, index)}
      />
    ));
  };

  return (
    <div className="stress-section">
      <div className="stress-header">
        <span className="stress-label">STRESS ({player.current_stress}/{player.max_stress})</span>

        <div className="slot-buttons">
          <button
            onClick={() => addStressSlot(player.id)}
            className="slot-btn"
            title="Add Stress slot"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={() => removeStressSlot(player.id)}
            className="slot-btn"
            title="Remove Stress slot"
          >
            <Minus className="w-3 h-3" />
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
