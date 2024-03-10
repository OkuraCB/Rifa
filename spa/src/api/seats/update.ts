import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const updateSeatApi = async (id: number | null): Promise<AxiosResponse> => {
	const req = await axiosInstance.patch(`/seats/${id}`);
	return req;
};
