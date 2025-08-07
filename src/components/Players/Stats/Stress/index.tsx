import { supabase } from "../../../supabaseClient";
import './Stress.css'

const Stress = ({ player, onPlayerUpdate, onError }) => {
  // const addStressSlot = async (playerId) => {
  //   try {
  //     const newMaxStress = player.max_stress + 1;
  //     const { data, error } = await supabase
  //       .from('players')
  //       .update({ max_stress: newMaxStress })
  //       .eq('id', playerId)
  //       .select();
  //     if (error) throw error;
  //     onPlayerUpdate(data[0]);
  //   } catch (error) {
  //     console.error('Error adding Stress slot: ', error);
  //     onError(error.message);
  //   }
  // };

  // const removeStressSlot = async (playerId) => {
  //   try {
  //     const newMaxStress = player.max_stress - 1;
  //     const { data, error } = await supabase
  //       .from('players')
  //       .update({ max_stress: newMaxStress })
  //       .eq('id', playerId)
  //       .select();
  //     if (error) throw error;
  //     onPlayerUpdate(data[0]);
  //   } catch (error) {
  //     console.error('Error removing Stress slot: ', error);
  //     onError(error.message);
  //   }
  // };

  // const toggleStressSlot = async (playerId, slotIndex) => {
  //   try {
  //     const newCurrentStress = slotIndex + 1 <= player.current_stress ? slotIndex : slotIndex + 1;
  //     const { data, error } = await supabase
  //       .from('players')
  //       .update({ current_stress: newCurrentStress })
  //       .eq('id', playerId)
  //       .select();
  //     if (error) throw error;
  //     onPlayerUpdate(data[0]);
  //   } catch (error) {
  //     console.error('Error toggling Stress slot: ', error);
  //     onError(error.message);
  //   }
  // };

  // const renderStressSlots = (player) => {
  //   const slots = [];
  //   for (let i = 0; i < player.max_stress; i++) {
  //     slots.push(
  //       <div
  //         key={i}
  //         className={`stress-slot ${i < player.current_stress ? 'filled' : 'empty'}`}
  //         onClick={() => toggleStressSlot(player.id, i)}
  //       />
  //     );
  //   }
  //   return slots;
  // };

  // return (
  //   <div className="stress-section">
  //     <div className="stress-header">
  //       <span className="stress-label">Stress ({player.current_stress}/{player.max_stress})</span>

  //       <div className="slot-buttons">
  //         <button
  //           onClick={() => addStressSlot(player.id)}
  //           className="slot-btn"
  //           title="Add Stress slot"
  //         >
  //           +
  //         </button>
  //         <button
  //           onClick={() => removeStressSlot(player.id)}
  //           className="slot-btn"
  //           title="Remove Stress slot"
  //         >
  //           -
  //         </button>
  //       </div>
  //     </div>
  //     <div className="stress-slots">
  //       {renderStressSlots(player)}
  //     </div>
  //   </div>
  // );
}

export default Stress
