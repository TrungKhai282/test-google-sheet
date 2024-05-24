import { StateCreator } from "zustand";
import { SystemMenuState, initialSystemMenuState } from "./models";
import { getSystemMenu } from "@/apis/system-menu.api";

const systemMenuSlice: StateCreator<SystemMenuState> = (set, get) => ({
  menu: initialSystemMenuState,
  getMenu: () => {
    const state = get().menu;

    set({
      menu: {
        ...state,
        isLoading: true,
      },
    });
    getSystemMenu()
      .then((res) => {
        set({
          menu: {
            ...state,
            isLoading: false,
            data: res?.data,
          },
        });
      })
      .catch((err) => {
        set({
          menu: {
            ...state,
            isLoading: false,
            error: err,
          },
        });
      });
  },
});

export default systemMenuSlice;
