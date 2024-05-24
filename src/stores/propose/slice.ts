import { StateCreator } from "zustand";
import { ProposeState, initialStateAllProposeList } from "./models";
import { getPropose } from "@/apis/propose.api";

const proposeSlice: StateCreator<ProposeState> = (set, get) => ({
  allPropose: initialStateAllProposeList,
  getAllPropose: () => {
    const state = get().allPropose;

    set({
      allPropose: {
        ...state,
        isLoading: true,
      },
    });
    getPropose()
      .then((res) => {
        set({
          allPropose: {
            ...state,
            isLoading: false,
            data: res?.data,
          },
        });
      })
      .catch((err) => {
        set({
          allPropose: {
            ...state,
            isLoading: false,
            error: err,
          },
        });
      });
  },
});

export default proposeSlice;
