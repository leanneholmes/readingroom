import { createContext, useContext } from "react";
import BookClubStore from "./bookClubStore";

interface Store {
  bookClubStore: BookClubStore;
}

export const store: Store = {
  bookClubStore: new BookClubStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
