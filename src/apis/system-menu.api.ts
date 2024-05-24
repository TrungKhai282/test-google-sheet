import service from "./use-axios";

const systemMenuEnpoint = "/menu";

export const getSystemMenu = async () => {
  const response = await service({
    method: "GET",
    url: systemMenuEnpoint,
  });
  return response;
};
