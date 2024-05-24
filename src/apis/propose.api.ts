import service from "./use-axios";

const proposeEnpoint = "/propose";

export const getPropose = async () => {
  const response = await service({
    method: "GET",
    url: proposeEnpoint,
  });
  return response;
};
