import { CategoryState } from "./category/models";
import { SystemMenuState } from "./system-menu/models";
import { ProductState } from "./product/models";
import { ProposeState } from "./propose/models";
import { OrderState } from "./order/models";

export type ResponseType = {
  isLoading: boolean;
  error?: any;
  data: any;
};

export type StoreType = CategoryState &
  SystemMenuState &
  ProductState &
  ProposeState &
  OrderState;
