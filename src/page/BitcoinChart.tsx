import { useState } from "react";
import ChartContainer from "../components/ChartContainer";
import ThemeToggle from "../components/Toggle";
import TimeframeButtons from "../components/TimeframeButtons";
import PriceFetcher from "../components/PriceFetcher";
import "../style/chart.css"; 

const BitcoinChart = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [timeframe, setTimeframe] = useState("1m");

  return (
    <div className="chart-layout">
      {/* Bên trái (các nút bấm, giá cả) */}
      <div className="chart-sidebar">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <TimeframeButtons setTimeframe={setTimeframe} />
        <PriceFetcher />
      </div>
  
      {/* Bên phải (Biểu đồ) */}
      <div className="chart-main">
        <ChartContainer theme={theme} timeframe={timeframe} />
        
      </div>
    </div>
  );
  
};

export default BitcoinChart;
