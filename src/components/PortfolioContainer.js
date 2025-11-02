import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onSellStock }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map((stock) => (
        <Stock key={stock.id} stock={stock} onClick={onSellStock} />
      ))}
    </div>
  );
}

export default PortfolioContainer;
