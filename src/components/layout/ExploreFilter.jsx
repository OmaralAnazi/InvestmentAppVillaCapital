import { useState, useEffect } from "react";

function ExploreFilter({ investments, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [minInvestment, setMinInvestment] = useState("");
  const [minReturn, setMinReturn] = useState("");
  const [maxReturn, setMaxReturn] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleRiskLevelChange = (event) => {
    setRiskLevel(event.target.value);
  };
  const handleMinInvestmentChange = (event) => {
    const value = event.target.value;
    if (value >= 0) setMinInvestment(value);
  };
  const handleMinReturnChange = (event) => {
    const value = event.target.value;
    if (value >= 0 && value <= 100) setMinReturn(value);
  };
  const handleMaxReturnChange = (event) => {
    const value = event.target.value;
    if (value >= 0 && value <= 100) setMaxReturn(value);
  };

  useEffect(() => {
    const filtered = investments.filter((investment) => {
      const matchesSearchTerm = investment.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRiskLevel = riskLevel ? investment.riskLevel === parseInt(riskLevel) : true;
      const matchesMinInvestment = minInvestment ? investment.minimumInvestmentAmount <= parseFloat(minInvestment) : true;
      const matchesMinReturn = minReturn ? investment.potentialReturns.min >= parseFloat(minReturn) : true;
      const matchesMaxReturn = maxReturn ? investment.potentialReturns.max <= parseFloat(maxReturn) : true;
      return matchesSearchTerm && matchesRiskLevel && matchesMinInvestment && matchesMinReturn && matchesMaxReturn;
    });
    onFilter(filtered);
  }, [searchTerm, riskLevel, minInvestment, minReturn, maxReturn, investments, onFilter]);

  return (
    <div className="container mx-3 my-4 py-3 border rounded shadow-sm" style={{ maxWidth: "720px" }}>
      <h3 className="text-center mb-4 fw-normal">Search and Filters</h3>
      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search investments by name"
              aria-label="Search investments by name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="input-group">
            <label className="input-group-text" htmlFor="filterByRisk">
              Risk
            </label>
            <select
              id="filterByRisk"
              className="form-select"
              aria-label="Filter by risk level"
              onChange={handleRiskLevelChange}
              value={riskLevel}
            >
              <option value="">All Levels</option>
              <option value="1">Very Low</option>
              <option value="2">Low</option>
              <option value="3">Moderate</option>
              <option value="4">High</option>
              <option value="5">Very High</option>
            </select>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="input-group">
            <label className="input-group-text" htmlFor="minInvestment">
              Min Invest
            </label>
            <input
              id="minInvestment"
              type="number"
              className="form-control"
              placeholder="Amount"
              aria-label="Minimum investment amount"
              value={minInvestment}
              min={0}
              onChange={handleMinInvestmentChange}
            />
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="input-group">
            <label className="input-group-text" htmlFor="minReturn">
              Returns
            </label>
            <input
              id="minReturn"
              type="number"
              className="form-control"
              placeholder="Min %"
              aria-label="Minimum return percentage"
              value={minReturn}
              onChange={handleMinReturnChange}
              min={0}
              max={100}
            />
            <input
              id="maxReturn"
              type="number"
              className="form-control"
              placeholder="Max %"
              aria-label="Maximum return percentage"
              value={maxReturn}
              onChange={handleMaxReturnChange}
              min={0}
              max={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreFilter;
