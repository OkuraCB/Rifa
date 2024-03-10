import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const cancelSeatApi = async (id: number | null): Promise<AxiosResponse> => {
	const req = await axiosInstance.patch(`/seats/cancel/${id}`);
	return req;
};
