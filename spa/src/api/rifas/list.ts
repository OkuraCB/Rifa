import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const listRifasApi = async (): Promise<AxiosResponse> => {
	const req = await axiosInstance.get("/rifas/");
	return req;
};
