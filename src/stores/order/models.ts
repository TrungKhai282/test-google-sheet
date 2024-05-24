import { ResponseType } from "../type";

export type OrderState = {
  orderDetail: ResponseType;
  isCreateLoadingOrder: boolean;
  getOrderDetail: (id: string) => void;
  createOrder: (data: any, onSuccess: any, onError: any) => void;
};

export const initialStateOrder: ResponseType = {
  isLoading: true,
  data: undefined,
};
