import { StateCreator } from "zustand";
import { ProductState, initialStateAllProductList } from "./models";
import { getProduct } from "@/apis/product.api";

const productSlice: StateCreator<ProductState> = (set, get) => ({
  products: initialStateAllProductList,
  getAllProduct: () => {
    const state = get().products;

    set({
      products: {
        ...state,
        isLoading: true,
      },
    });
    getProduct({})
      .then((res) => {
        set({
          products: {
            ...state,
            isLoading: false,
            data: res?.data,
          },
        });
      })
      .catch((err) => {
        set({
          products: {
            ...state,
            isLoading: false,
            error: err,
          },
        });
      });
  },
  getProductFilter: (params: any) => {
    const state = get().products;

    set({
      products: {
        ...state,
        isLoading: true,
      },
    });
    getProduct(params)
      .then((res) => {
        set({
          products: {
            ...state,
            isLoading: false,
            data: res?.data,
          },
        });
      })
      .catch((err) => {
        set({
          products: {
            ...state,
            isLoading: false,
            error: err,
          },
        });
      });
  },
});

export default productSlice;
