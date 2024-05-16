import { createContext, useContext, useState } from 'react';
import { useRouter } from "next/router";

interface ContextValue {
  contextCurrent: string;
  updateContextCurrent: (values: any) => void;
}

const CurrentsContext = createContext<ContextValue | null>(null);

const CurrentsContextProvider = ({ children }: any) => {

  const router = useRouter()
  const [contextCurrent, setContextCurrent] = useState("vn");
  const updateContextCurrent = (values: any) => {
    setContextCurrent(values);
  };

  const contextValue: ContextValue = {
    contextCurrent,
    updateContextCurrent,
  };

  return (
    <CurrentsContext.Provider value={contextValue}>
      {children}
    </CurrentsContext.Provider>
  );
};

export { CurrentsContext, CurrentsContextProvider };