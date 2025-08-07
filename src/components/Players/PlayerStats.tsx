import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../SupabaseClient';
import './PlayerStats.css'

import Hp from './Stats/HP'
import Stress from './Stats/Stress'

export type Player = {
  id: number;
  name: string;
  class: string;
  heritage: string;
  subclass: string;
  level: number;
  agility: number;
  current_hp: number;
  max_hp: number;
  current_armor: number;
  max_armor: number;
  current_stress: number;
  max_stress: number;
  current_hope: number;
  max_hope: number;
}

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const saveTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      setPlayers(data || []);
    } catch (error) {
      console.error('Error loading players:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const addPlayer = async () => {
    try {
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
        max_hope: 5
      };

      const { data, error } = await supabase
        .from('players')
        .insert([newPlayer])
        .select();

      if (error) throw error;

      setPlayers([...players, data[0]]);
    } catch (error) {
      console.error('Error adding player: ', error);
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(String(error))
      }
    }
  };

  // Updated to sync with database
  const updatePlayerField = (id: number, field: keyof Player, value: string | number) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === id ? { ...player, [field]: value } : player
      )
    );

    debouncedSave(id, field, value);
  };

  const debouncedSave = (id: number, field: keyof Player, value: string | number) => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current)
    }

    saveTimeout.current = setTimeout(async () => {
      try {
        const { error } = await supabase
          .from('players')
          .update({ [field]: value })
          .eq('id', id)

        if (error) throw error
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error saving to Supabase:', error.message);
        } else {
          console.error('Error saving to Supabase:', String(error));
        }
      }
    }, 500)
  };

  const deletePlayer = async (id: number) => {
    try {
      const { error } = await supabase.from('players').delete().eq('id', id);
      if (error) throw error;

      setPlayers(players.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting player:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error))
      }
    }
  };

  if (loading) return <div>Loading players...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePlayerUpdate = (updatedPlayer: Player) => {
    setPlayers(players.map(p =>
      p.id === updatedPlayer.id ? updatedPlayer : p
    ))
  };

  return (
    <div className="player-stats">
      <div className="header">
        <h3>PLAYERS</h3>
        <button onClick={addPlayer} className="add-player-btn">
          Add Player
        </button>
      </div>

      <div className="players-container">
        {players.map(player => (

          <div key={player.id} className="player-card">
            <button
              className="delete-btn"
              title="Delete Player"
              onClick={() => deletePlayer(player.id)}
            >
              ✕
            </button>

            <div className="player-header">
              <div className="player-info">
                <div className="level-box">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={player.level}
                    onChange={(e) => updatePlayerField(player.id, 'level', parseInt(e.target.value))}
                    className="level-input"
                  />
                  <div className="level-label">Level</div>
                </div>

                <div className="character-box">
                  <input
                    type="text"
                    placeholder="Name"
                    value={player.name}
                    onChange={(e) => updatePlayerField(player.id, 'name', e.target.value)}
                    className="player-input"
                  />
                  <input
                    type="text"
                    placeholder="Heritage"
                    value={player.heritage}
                    onChange={(e) => updatePlayerField(player.id, 'heritage', e.target.value)}
                    className="heritage-input"
                  />
                </div>

                <div className="class-box">
                  <input
                    type="text"
                    placeholder="Class"
                    value={player.class}
                    onChange={(e) => updatePlayerField(player.id, 'class', e.target.value)}
                    className="class-input"
                  />
                  <input
                    type="text"
                    placeholder="Subclass"
                    value={player.subclass}
                    onChange={(e) => updatePlayerField(player.id, 'subclass', e.target.value)}
                    className="subclass-input"
                  />
                </div>
              </div>
            </div>

            <Hp
              player={player}
              onPlayerUpdate={handlePlayerUpdate}
              onError={setError}
            />

            <Stress
              player={player}
              onPlayerUpdate={handlePlayerUpdate}
              onError={setError}
            />
          </div>
        ))}

        {players.length === 0 && (
          <div className="no-players">
            <p>No players added yet. Click "Add Player" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;
