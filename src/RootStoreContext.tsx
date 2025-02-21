import React, { createContext, useContext, ReactNode } from "react";
import { rootStore } from "stores";

const RootStoreContext = createContext(rootStore);

export function useRootStore() {
  return useContext(RootStoreContext);
}

interface RootStoreProviderProps {
  children: ReactNode;
}

export const RootStoreProvider = ({ children }: RootStoreProviderProps) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};
