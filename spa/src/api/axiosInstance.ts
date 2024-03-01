import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: `http://${process.env.REACT_SERVER}:${process.env.REACT_PORT}`,
	timeout: 60 * 1000,
});

axiosInstance.interceptors.request.use((config: any) => {
	const token = localStorage.getItem(process.env.REACT_TOKEN!);
	config.headers.Authorization = token ? `Bearer ${token}` : "";
	return config;
});
