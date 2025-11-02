import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then((stocks) => setStocks(stocks));
  }, []);

  const buyStock = (stock) => {
    if (!portfolio.find((s) => s.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  const sellStock = (stock) => {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  const handleFilter = (filterType) => {
    setFilterBy(filterType);
  };

  const getFilteredStocks = () => {
    let filteredStocks = stocks;

    if (filterBy !== "All") {
      filteredStocks = filteredStocks.filter((stock) => stock.type === filterBy);
    }

    if (sortBy === "Alphabetically") {
      filteredStocks = [...filteredStocks].sort((a, b) => a.ticker.localeCompare(b.ticker));
    } else if (sortBy === "Price") {
      filteredStocks = [...filteredStocks].sort((a, b) => a.price - b.price);
    }

    return filteredStocks;
  };

  return (
    <div>
      <SearchBar sortBy={sortBy} onSort={handleSort} filterBy={filterBy} onFilter={handleFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={getFilteredStocks()} onBuyStock={buyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onSellStock={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
