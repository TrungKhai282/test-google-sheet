import { StateCreator } from "zustand";
import { CategoryState, initialStateAllCategoryList } from "./models";
import { getCategory } from "@/apis/category.api";

const categorySlice: StateCreator<CategoryState> = (set, get) => ({
  allCategory: initialStateAllCategoryList,
  categoryFilter: initialStateAllCategoryList,
  getAllCategory: () => {
    const state = get().allCategory;

    set({
      allCategory: {
        ...state,
        isLoading: true,
      },
    });
    getCategory({})
      .then((res) => {
        set({
          allCategory: {
            ...state,
            isLoading: false,
            data: res?.data,
          },
        });
      })
      .catch((err) => {
        set({
          allCategory: {
            ...state,
            isLoading: false,
            error: err,
          },
        });
      });
  },
  getCategoryFilter: (params: any) => {
    console.log("payload :>> ", params);
    const state = get().categoryFilter;

    set({
      categoryFilter: {
        ...state,
        isLoading: true,
      },
    });
    getCategory(params)
      .then((res) => {
        set({
          categoryFilter: {
            ...state,
            isLoading: false,
            data: res?.data,
          },
        });
      })
      .catch((err) => {
        set({
          categoryFilter: {
            ...state,
            isLoading: false,
            error: err,
          },
        });
      });
  },
});

export default categorySlice;
