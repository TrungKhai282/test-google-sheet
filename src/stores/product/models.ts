import { ResponseType } from "../type";

export type ProductState = {
  products: ResponseType;
  getAllProduct: () => void;
  getProductFilter: (params: any) => void;
};

export const initialStateAllProductList: ResponseType = {
  isLoading: true,
  data: undefined,
};
