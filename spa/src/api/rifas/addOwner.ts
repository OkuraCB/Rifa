import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const addOwnerApi = async (data: any): Promise<AxiosResponse> => {
  const req = await axiosInstance.post("/rifas/addOwner", data);
  return req;
};
