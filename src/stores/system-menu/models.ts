import { ResponseType } from "../type";

export type SystemMenuState = {
  menu: ResponseType;
  getMenu: () => void;
};

export const initialSystemMenuState: ResponseType = {
  isLoading: true,
  data: undefined,
};
