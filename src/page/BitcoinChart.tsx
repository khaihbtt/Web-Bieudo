import React, { useState } from "react";
import ChartContainer from "../components/ChartContainer";
import ThemeToggle from "../components/Toggle";
import TimeframeButtons from "../components/TimeframeButtons";
import PriceFetcher from "../components/PriceFetcher";
import "../style/chart.css"; 

const BitcoinChart = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [timeframe, setTimeframe] = useState("1m");

  return (
    <div className="container">
      <div className="left-panel">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <TimeframeButtons setTimeframe={setTimeframe} />
      </div>
      <div className="right-panel">
        <PriceFetcher />
      </div>
      <div className="middle-panel">
        <ChartContainer theme={theme} timeframe={timeframe} />
      </div>
      
    </div>
  );
};

export default BitcoinChart;
