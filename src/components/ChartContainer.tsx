import React, { useEffect, useRef } from "react";
import { createChart, ISeriesApi, CandlestickSeriesOptions, CandlestickData } from "lightweight-charts";



const ChartContainer = ({ theme, timeframe }: { theme: string; timeframe: string }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null); // ✅ Định nghĩa kiểu dữ liệu đúng

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Tạo biểu đồ
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: window.innerHeight - 100,
      layout: {
        backgroundColor: theme === "dark" ? "#222" : "#fff",
        textColor: theme === "dark" ? "#DDD" : "#333",
      },
    });

    // Thêm Candlestick series
    const candleSeries = chart.addCandlestickSeries();
    chartRef.current = chart;
    candleSeriesRef.current = candleSeries; // ✅ Lưu reference đúng kiểu dữ liệu

    // Gọi API lấy dữ liệu nến
    const fetchData = async () => {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${timeframe}&limit=50`);
      const data = await res.json();
      const formattedData: CandlestickData[] = data.map((d: any) => ({
        time: d[0] / 1000, // Chuyển timestamp về giây
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      }));

      candleSeriesRef.current?.setData(formattedData);
    };

    fetchData();

    return () => chart.remove();
  }, [theme, timeframe]); // Cập nhật khi theme hoặc timeframe thay đổi

  return <>
    <div className="page-container">

        <div className="chart-container" ref={chartContainerRef}></div>

  </div>
  </>;
};

export default ChartContainer;
