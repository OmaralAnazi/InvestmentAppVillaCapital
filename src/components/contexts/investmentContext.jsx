import { createContext, useState, useContext } from "react";

const InvestmentContext = createContext();

export const useInvestment = () => useContext(InvestmentContext);

export const InvestmentProvider = ({ children }) => {
  const [currentInvestment, setCurrentInvestment] = useState(null);

  return <InvestmentContext.Provider value={{ currentInvestment, setCurrentInvestment }}>{children}</InvestmentContext.Provider>;
};
