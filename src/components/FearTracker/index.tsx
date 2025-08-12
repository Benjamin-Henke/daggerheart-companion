import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient'
import { getFearStyles } from './colorUtils';

import './FearTracker.css';
import wwSkull from '../../assets/ww_skull.png'

import { RotateCcw } from 'lucide-react';

function FearTracker() {
  const [fear, setFear] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const saveFear = async (newFear: number) => {
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

  const resetFear = () => {
    setFear(0);
    saveFear(0);
  };

  const handleSkullClick = async (index: number) => {
    if (fear === 12 && index >= 12) return;

    let newFear;
    if (index + 1 === fear) {
      newFear = fear - 1;
    } else {
      newFear = index + 1;
    }

    const previousFear = fear;

    setFear(newFear);

    try {
      await saveFear(newFear);
    } catch (error) {
      setFear(previousFear);
      console.error('Failed to save fear:', error);
    }
  };

  const renderSkulls = () => {
    const skulls = [];
    for (let i = 0; i < 12; i++) {
      skulls.push(
        <span
          key={i}
          className={`skull ${i < fear ? 'active' : 'inactive'}`}
          onClick={() => handleSkullClick(i)}
        >
          <img src={wwSkull} alt="skull" />
        </span>
      );
    }
    return skulls;
  };

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

  const fearRatio = fear / 12;
  const styles = getFearStyles(fearRatio);

  return (
    <div className="fear-tracker">
      <div className="fear-header">
        <h1 className="fear-title">FEAR</h1>
        <button
          onClick={resetFear}
          className="reset-btn"
          disabled={saving}
        >
          <RotateCcw />
        </button>
      </div>
      <div className="fear-content" style={styles}>
        <div className="fear-display">
          {fear >= 12 && <div className="max-fear-warning">MAX FEAR REACHED!</div>}
          <div
            className="skulls"
          >
              {renderSkulls()}
            </div>
        </div>
      </div>
    </div>
  );
}

export default FearTracker;
