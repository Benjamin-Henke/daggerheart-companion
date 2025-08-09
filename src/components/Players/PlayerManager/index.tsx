import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../supabaseClient';
import './PlayerManager.css'
import './Damage.css'

import type { Player } from '../../../types/Player'

import Hp from '../Stats/HP'
import Level from '../Stats/Level'
import Stress from '../Stats/Stress'
import Hope from '../Stats/Hope'

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
        max_hope: 6
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

  const handlePlayerUpdate = (updatedPlayer: Player) => {
    setPlayers(players.map(p =>
      p.id === updatedPlayer.id ? updatedPlayer : p
    ))
  };

  const getDamageLevel = (current_hp: number, max_hp: number): number => {
    if (max_hp <= 0) return 0;
    const healthPercent = (current_hp / max_hp) * 100;
    return Math.min(Math.floor(healthPercent / 10), 10);
  };

  if (error) return <div>Error: {error}</div>;

  if (loading) {
    return (
      <div className="players-loading">
        <div className="loading-content">
          <div className="spinner">⟲</div>
          <span>Loading Players...</span>
        </div>
      </div>
    );
  };

  return (
    <div className="player-stats">
      <div className="header">
        <h3>PLAYERS</h3>
        <button onClick={addPlayer} className="add-player-btn">
          Add Player
        </button>
      </div>

      <div className="players-container-scrollable">
        <div className="players-container">
          {players.map(player => (

            <div
              key={player.id}
              className={`player-card damage-level-${getDamageLevel( player.current_hp, player.max_hp )}`}
            >
              <button
                className="delete-btn"
                title="Delete Player"
                onClick={() => deletePlayer(player.id)}
              >
                ✕
              </button>

              <div className="player-header">
                <div className="player-info">
                  <Level
                    player={player}
                    updatePlayerField={updatePlayerField}
                  />

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

              <Hope
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
    </div>
  );
};

export default Players;
