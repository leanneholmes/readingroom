import { createContext, useContext } from "react";
import BookClubStore from "./bookClubStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
  bookClubStore: BookClubStore;
  commonStore: CommonStore;
  userStore: UserStore;
}

export const store: Store = {
  bookClubStore: new BookClubStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
