import { ResponseType } from "../type";

export type CategoryState = {
  allCategory: ResponseType;
  getAllCategory: () => void;
  categoryFilter: ResponseType;
  getCategoryFilter: (params: any) => void;
};

export const initialStateAllCategoryList: ResponseType = {
  isLoading: true,
  data: undefined,
};
