import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listRifasApi } from "../../api/rifas/list";
import { newRifaApi } from "../../api/rifas/new";
import { RootState } from "../../app/store";

interface Seat {
	number: number;
	state: string;
}
interface Rifa {
	id: number;
	name: string;
	end: Date;
	numbers: Seat[];
}

interface IInitial {
	rifas: Rifa[];
	status: string;
}

const initialState: IInitial = {
	rifas: [],
	status: "idle",
};

export const listRifas = createAsyncThunk("rifas/listRifas", async () => {
	const res = await listRifasApi();
	return res.data;
});

export const newRifa = createAsyncThunk("rifas/newRifa", async (data: any) => {
	const res = await newRifaApi(data);
	return res.data;
});

export const homeSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(listRifas.rejected, (state) => {
				state.status = "idle";
			})
			.addCase(listRifas.pending, (state) => {
				state.status = "pending";
			})
			.addCase(listRifas.fulfilled, (state, { payload }: any) => {
				state.status = "idle";
				state.rifas = payload;
			});

		builder
			.addCase(newRifa.rejected, (state) => {
				state.status = "idle";
			})
			.addCase(newRifa.pending, (state) => {
				state.status = "pending";
			})
			.addCase(newRifa.fulfilled, (state) => {
				state.status = "idle";
			});
	},
});

export const selectRifas = (state: RootState) => state.rifas.rifas;

export default homeSlice.reducer;
