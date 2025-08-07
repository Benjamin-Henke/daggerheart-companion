import React, { useState, useEffect } from 'react';
import { supabase } from '../../SupabaseClient.ts';
import './FearTracker.css';
import wwSkull from '../../assets/ww_skull.png'

function FearTracker() {
  const [fear, setFear] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load fear value on component mount
  useEffect(() => {
    loadFear();
  }, []);

  const loadFear = async () => {
    try {
      const { data, error } = await supabase
        .from('fear_tracker')
        .select('fear_value')
        .eq('id', 1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading fear:', error);
      } else if (data) {
        setFear(data.fear_value);
      }
    } catch (error) {
      console.error('Error loading fear:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFear = async (newFear) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('fear_tracker')
        .upsert({
          id: 1,
          fear_value: newFear,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving fear:', error);
      }
    } catch (error) {
      console.error('Error saving fear:', error);
    } finally {
      setSaving(false);
    }
  };

  const increaseFear = () => {
    if (fear === 12) {
      return;
    }
    const newFear = fear + 1;
    setFear(newFear);
    saveFear(newFear);
  };

  const decreaseFear = () => {
    const newFear = Math.max(0, fear - 1);
    setFear(newFear);
    saveFear(newFear);
  };

  const resetFear = () => {
    setFear(0);
    saveFear(0);
  };

  const renderSkulls = () => {
    const skulls = [];
    for (let i = 0; i < 12; i++) {
      skulls.push(
        <span key={i} className={`skull ${i < fear ? 'active' : 'inactive'}`}>
          <img src={wwSkull} alt="skull" />
        </span>
      );
    }
    return skulls;
  };

  // const renderSkulls = () => {
  //   const skulls = [];
  //   for (let i = 0; i < 12; i++) {
  //     skulls.push(
  //       <span key={i} className={`skull ${i < fear ? 'active' : 'inactive'}`}>
  //         💀
  //       </span>
  //     );
  //   }
  //   return skulls;
  // };

  if (loading) {
    return (
      <div className="fear-tracker-loading">
        <div className="loading-content">
          <div className="spinner">⟲</div>
          <span>Loading Fear Tracker...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fear-tracker">
      <h1 className="fear-title">FEAR</h1>

      <div className="fear-display">
        {fear >= 12 && <div className="max-fear-warning">MAX FEAR REACHED!</div>}
        <div className="skulls">{renderSkulls()}</div>
      </div>

      <div className="fear-controls">
        <button
          onClick={decreaseFear}
          className="control-btn decrease"
          disabled={fear === 0 || saving}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14"/>
          </svg>
        </button>

        <button
          onClick={increaseFear}
          className="control-btn increase"
          disabled={saving || fear >= 12}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m-7-7h14"/>
          </svg>
        </button>
      </div>

      <div className="reset-container">
        <button
          onClick={resetFear}
          className="reset-btn"
          disabled={saving}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M8 16H3v5"/>
          </svg>
          {saving ? 'Saving...' : 'Reset'}
        </button>
      </div>
    </div>
  );
}

export default FearTracker;
