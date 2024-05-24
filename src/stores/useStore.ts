import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { StoreType } from "./type";
import categorySlice from "./category/slice";
import systemMenuSlice from "./system-menu/slice";
import productSlice from "./product/slice";
import proposeSlice from "./propose/slice";
import orderSlice from "./order/slice";

const useStore = create<StoreType>()(
  devtools((...a) => ({
    ...categorySlice(...a),
    ...systemMenuSlice(...a),
    ...productSlice(...a),
    ...proposeSlice(...a),
    ...orderSlice(...a),
  }))
);

export default useStore;
