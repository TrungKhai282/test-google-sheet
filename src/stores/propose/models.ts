import { ResponseType } from "../type";

export type ProposeState = {
  allPropose: ResponseType;
  getAllPropose: () => void;
};

export const initialStateAllProposeList: ResponseType = {
  isLoading: true,
  data: undefined,
};
