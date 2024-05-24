import service from "./use-axios";

export const createOrder = async (body: any) => {
  const response = await service({
    method: "POST",
    url: "/order/create",
    data: body,
  });
  return response;
};

export const getOrderDetail = async (id: string) => {
  const response = await service({
    method: "POST",
    url: "/order/detail",
    data: {
      id,
    },
  });
  return response;
};
