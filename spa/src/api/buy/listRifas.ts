import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const listRifasBuyApi = async (): Promise<AxiosResponse> => {
	const req = await axiosInstance.get("/buy/");
	return req;
};
