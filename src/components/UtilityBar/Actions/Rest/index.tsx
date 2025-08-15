import { useState, useRef, useEffect } from 'react';
import { FlameKindling } from 'lucide-react';
import './Rest.css';


type RestButtonProps = {
  onLongRest?: () => void;
  onShortRest?: () => void;
};

const Rest = ({ onLongRest, onShortRest }: RestButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRestClick = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLongRest = () => {
    setIsDropdownOpen(false);
    onLongRest?.();
  };

  const handleShortRest = () => {
    setIsDropdownOpen(false);
    onShortRest?.();
  };

  return (
    <div className="rest-button-wrapper">
      <button
        ref={buttonRef}
        onClick={handleRestClick}
        className="rest-button"
      >
        <FlameKindling className="w-4 h-4 text-orange-400" />
        {/*Rest*/}
      </button>

      {isDropdownOpen && (
        <div ref={dropdownRef} className="rest-dropdown">
          <button className="dropdown-item long-rest" onClick={handleLongRest}>
            <div className="item-title">Long Rest</div>
            <div className="item-subtitle">8 hours</div>
          </button>
          <button className="dropdown-item short-rest" onClick={handleShortRest}>
            <div className="item-title">Short Rest</div>
            <div className="item-subtitle">1 hour</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Rest;
