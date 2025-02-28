import React, { useEffect, useRef } from "react";
import { createChart, ISeriesApi, CandlestickData } from "lightweight-charts";

const ChartContainer = ({ theme, timeframe }: { theme: string; timeframe: string }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight, // Đảm bảo lấy đúng chiều cao
      layout: {
        backgroundColor: theme === "dark" ? "#222" : "#fff",
        textColor: theme === "dark" ? "#DDD" : "#333",
      },
    });

    const candleSeries = chart.addCandlestickSeries();
    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    // Gọi API lấy dữ liệu nến
    const fetchData = async () => {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${timeframe}&limit=50`);
      const data = await res.json();
      const formattedData: CandlestickData[] = data.map((d: any) => ({
        time: d[0] / 1000,
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      }));

      candleSeriesRef.current?.setData(formattedData);
    };

    fetchData();

    // Resize biểu đồ khi cửa sổ thay đổi kích thước
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, timeframe]);

  return <div ref={chartContainerRef} className="chart-container"></div>;
};

export default ChartContainer;
