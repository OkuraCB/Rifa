import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const searchUserApi = async (email: string): Promise<AxiosResponse> => {
  const req = await axiosInstance.get(`/users/email/`, {
    params: { email: email },
  });
  return req;
};
