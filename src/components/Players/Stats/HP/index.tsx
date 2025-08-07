import { supabase } from '../../../../SupabaseClient'
import './HP.css'

const HP = ({ player, onPlayerUpdate, onError }) => {
  // const addHpSlot = async (playerId) => {
  //   try {
  //     const newMaxHp = player.max_hp + 1;
  //     const { data, error } = await supabase
  //       .from('players')
  //       .update({ max_hp: newMaxHp })
  //       .eq('id', playerId)
  //       .select();
  //     if (error) throw error;
  //     onPlayerUpdate(data[0]);
  //   } catch (error) {
  //     console.error('Error adding HP slot: ', error);
  //     onError(error.message);
  //   }
  // };

  // const removeHpSlot = async (playerId) => {
  //   try {
  //     const newMaxHp = player.max_hp - 1;
  //     const { data, error } = await supabase
  //       .from('players')
  //       .update({ max_hp: newMaxHp })
  //       .eq('id', playerId)
  //       .select();
  //     if (error) throw error;
  //     onPlayerUpdate(data[0]);
  //   } catch (error) {
  //     console.error('Error removing HP slot: ', error);
  //     onError(error.message);
  //   }
  // };

  // const toggleHpSlot = async (playerId, slotIndex) => {
  //   try {
  //     const newCurrentHp = slotIndex + 1 <= player.current_hp ? slotIndex : slotIndex + 1;
  //     const { data, error } = await supabase
  //       .from('players')
  //       .update({ current_hp: newCurrentHp })
  //       .eq('id', playerId)
  //       .select();
  //     if (error) throw error;
  //     onPlayerUpdate(data[0]);
  //   } catch (error) {
  //     console.error('Error toggling HP slot: ', error);
  //     onError(error.message);
  //   }
  // };

  // const renderHpSlots = (player) => {
  //   const slots = [];
  //   for (let i = 0; i < player.max_hp; i++) {
  //     slots.push(
  //       <div
  //         key={i}
  //         className={`hp-slot ${i < player.current_hp ? 'filled' : 'empty'}`}
  //         onClick={() => toggleHpSlot(player.id, i)}
  //       />
  //     );
  //   }
  //   return slots;
  // };

  // return (
  //   <div className="hp-section">
  //     <div className="hp-header">
  //       <span className="hp-label">HP ({player.current_hp}/{player.max_hp})</span>
  //       <div className="slot-buttons">
  //         <button
  //           onClick={() => addHpSlot(player.id)}
  //           className="slot-btn"
  //           title="Add HP slot"
  //         >
  //           +
  //         </button>
  //         <button
  //           onClick={() => removeHpSlot(player.id)}
  //           className="slot-btn"
  //           title="Remove HP slot"
  //         >
  //           -
  //         </button>
  //       </div>
  //     </div>
  //     <div className="hp-slots">
  //       {renderHpSlots(player)}
  //     </div>
  //   </div>
  // );
};

export default HP;
