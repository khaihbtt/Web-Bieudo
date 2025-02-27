import React from "react";

interface TimeframeProps {
  setTimeframe: (timeframe: string) => void;
}

const TimeframeButtons: React.FC<TimeframeProps> = ({ setTimeframe }) => {
  const timeframes = ["1m", "5m", "30m", "1h", "4h", "1d"];

  return (
    <div>
      {timeframes.map((tf) => (
        <button key={tf} onClick={() => setTimeframe(tf)}>
          {tf}
        </button>
      ))}
    </div>
  );
};

export default TimeframeButtons;
