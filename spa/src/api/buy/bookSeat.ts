import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const bookSeatApi = async (data: any): Promise<AxiosResponse> => {
	const req = await axiosInstance.post(`/buy/${data.id}`, { name: data.name });
	return req;
};
