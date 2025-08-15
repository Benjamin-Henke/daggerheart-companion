import './CharacterInfo.css'

interface CharacterInfoBoxProps {
  mainValue: string;
  secondaryValue: string;
  mainPlaceholder: string;
  secondaryPlaceholder: string;
  onMainChange: (value: string) => void;
  onSecondaryChange: (value: string) => void;
  className?: string;
};

const CharacterInfoBox = ({
  mainValue,
  secondaryValue,
  mainPlaceholder,
  secondaryPlaceholder,
  onMainChange,
  onSecondaryChange,
  className = ""
}: CharacterInfoBoxProps) => {
  return (
    <div className={`character-info-box ${className}`}>
      <input
        type="text"
        placeholder={mainPlaceholder}
        value={mainValue}
        onChange={(e) => onMainChange(e.target.value)}
        className="main-input"
      />
      <input
        type="text"
        placeholder={secondaryPlaceholder}
        value={secondaryValue}
        onChange={(e) => onSecondaryChange(e.target.value)}
        className="secondary-input"
      />
    </div>
  );
};

export default CharacterInfoBox;
