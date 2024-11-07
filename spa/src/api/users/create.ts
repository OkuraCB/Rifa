import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const newUserApi = async (data: any): Promise<AxiosResponse> => {
  const cleanData = { ...data, password: data.pass };
  const req = await axiosInstance.post("/auth/signup", cleanData);
  return req;
};
