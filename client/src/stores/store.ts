import { createContext, useContext } from "react";
import BookClubStore from "./bookClubStore";
import CommonStore from "./commonStore";

interface Store {
  bookClubStore: BookClubStore;
  commonStore: CommonStore;
}

export const store: Store = {
  bookClubStore: new BookClubStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
