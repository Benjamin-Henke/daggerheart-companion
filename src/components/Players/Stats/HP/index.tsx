import { supabase } from '../../../../supabaseClient'
import './HP.css'

import type { Player } from '../../../../types/Player'

import { Plus, Minus } from 'lucide-react';

type HpProps = {
  player: Player;
  onPlayerUpdate: (player: Player) => void;
  onError: (message: string) => void;
};

const HP = ({ player, onPlayerUpdate, onError }: HpProps) => {
  const addHpSlot = async (playerId: number) => {
    try {
      const newMaxHp = player.max_hp + 1;
      const { data, error } = await supabase
        .from('players')
        .update({ max_hp: newMaxHp })
        .eq('id', playerId)
        .select();
      if (error) throw error;
      onPlayerUpdate(data[0]);
    } catch (error) {
      console.error('Error adding HP slot:', error);
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError(String(error));
      }
    }
  };

  const removeHpSlot = async (playerId: number) => {
    try {
      const newMaxHp = player.max_hp - 1;
      const { data, error } = await supabase
        .from('players')
        .update({ max_hp: newMaxHp })
        .eq('id', playerId)
        .select();
      if (error) throw error;
      onPlayerUpdate(data[0]);
    } catch (error) {
      console.error('Error removing HP slot: ', error);
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError(String(error));
      }
    }
  };

  const toggleHpSlot = async (playerId: number, slotIndex: number) => {
    const newCurrentHp = slotIndex + 1 <= player.current_hp ? slotIndex : slotIndex + 1;
    const originalHp = player.current_hp;

    const optimisticPlayer = { ...player, current_hp: newCurrentHp };
    onPlayerUpdate(optimisticPlayer);

    try {
      const { data, error } = await supabase
        .from('players')
        .update({ current_hp: newCurrentHp })
        .eq('id', playerId)
        .select();

      if (error) throw error;

      onPlayerUpdate(data[0])
    } catch (error) {
      const rollbackPlayer = { ...player, current_hp: originalHp };
      onPlayerUpdate(rollbackPlayer)

      console.error('Error toggling HP slot: ', error);
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError(String(error));
      }
    }
  };

  const renderHpSlots = (player: Player) => {
    const slots = [];
    for (let i = 0; i < player.max_hp; i++) {
      slots.push(
        <div
          key={i}
          className={`hp-slot ${i < player.current_hp ? 'filled' : 'empty'}`}
          onClick={() => toggleHpSlot(player.id, i)}
        />
      );
    }
    return slots;
  };

  return (
    <div className="hp-section">
      <div className="hp-header">
        <span className="hp-label">HP ({player.current_hp}/{player.max_hp})</span>
        <div className="slot-buttons">
          <button
            onClick={() => addHpSlot(player.id)}
            className="slot-btn"
            title="Add HP slot"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => removeHpSlot(player.id)}
            className="slot-btn"
            title="Remove HP slot"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="hp-slots">
        {renderHpSlots(player)}
      </div>
    </div>
  );
};

export default HP;
