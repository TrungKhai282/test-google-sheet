import service from "./use-axios";

const productEnpoint = "/product/getByFilter";

export const getProduct = async (params: any) => {
  const response = await service({
    method: "POST",
    url: productEnpoint,
    data: params,
  });
  return response;
};
