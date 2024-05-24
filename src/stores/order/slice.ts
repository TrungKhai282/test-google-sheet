import { StateCreator } from "zustand";
import { OrderState, initialStateOrder } from "./models";
import { createOrder, getOrderDetail } from "@/apis/order.api";

const productSlice: StateCreator<OrderState> = (set, get) => ({
  orderDetail: initialStateOrder,
  isCreateLoadingOrder: false,
  getOrderDetail: (id: string) => {
    const state = get().orderDetail;

    set({
      orderDetail: {
        ...state,
        isLoading: true,
      },
    });
    getOrderDetail(id)
      .then((res) => {
        set({
          orderDetail: {
            ...state,
            isLoading: false,
            data: res?.data,
          },
        });
      })
      .catch((err) => {
        set({
          orderDetail: {
            ...state,
            isLoading: false,
            error: err,
          },
        });
      });
  },
  createOrder: async (data, onSuccess, onError) => {
    set({
      isCreateLoadingOrder: true,
    });
    const response = await createOrder(JSON.stringify(data));
    if (response?.status === 200) {
      onSuccess(response);
    } else {
      onError();
    }
    set({
      isCreateLoadingOrder: false,
    });
  },
});

export default productSlice;
