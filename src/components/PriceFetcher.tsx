import React, { useState } from "react";

const PriceFetcher = () => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceOneMinuteAgo, setPriceOneMinuteAgo] = useState(null);

  const fetchPrice = async () => {
    const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
    const data = await res.json();
    setCurrentPrice(data.price);

    const res2 = await fetch("https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=2");
    const data2 = await res2.json();
    setPriceOneMinuteAgo(data2[0][4]);
  };

  return (
    <div>
      <button onClick={fetchPrice}>Lấy giá Bitcoin</button>
      {currentPrice && (
        <p>💰 Giá hiện tại: ${currentPrice} | 1 phút trước: ${priceOneMinuteAgo}</p>
      )}
    </div>
  );
};

export default PriceFetcher;
