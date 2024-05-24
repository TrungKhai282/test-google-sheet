import service from "./use-axios";

const categoryEnpoint = "/category/getByFilter";

export const getCategory = async (params: any) => {
  const response = await service({
    method: "POST",
    url: categoryEnpoint,
    data: params,
  });
  return response;
};
