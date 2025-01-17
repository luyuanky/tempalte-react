import { createContext, useContext } from 'react';
import SystemStore from './system';

export interface Stores {
  system: SystemStore;
}

export const system = new SystemStore();

const storeContext = createContext<Stores>({
  system,
});

export function useStores() {
  return useContext<Stores>(storeContext);
}
