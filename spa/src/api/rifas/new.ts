import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const newRifaApi = async (data: any): Promise<AxiosResponse> => {
  const req = await axiosInstance.post("/rifas", data);
  return req;
};
