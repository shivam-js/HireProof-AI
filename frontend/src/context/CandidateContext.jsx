import { createContext, useContext, useMemo, useState } from "react";

const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [activeCandidate, setActiveCandidate] = useState(null);

  const clearActiveCandidate = () => {
    setActiveCandidate(null);
  };

  const value = useMemo(
    () => ({
      activeCandidate,
      setActiveCandidate,
      clearActiveCandidate,
    }),
    [activeCandidate]
  );

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => {
  const context = useContext(CandidateContext);

  if (!context) {
    throw new Error(
      "useCandidate must be used inside CandidateProvider"
    );
  }

  return context;
};