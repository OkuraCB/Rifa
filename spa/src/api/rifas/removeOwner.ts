import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const removeOwnerApi = async (data: any): Promise<AxiosResponse> => {
  const req = await axiosInstance.post("/rifas/removeOwner", data);
  return req;
};
