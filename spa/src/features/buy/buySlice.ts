import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookSeatApi } from "../../api/buy/bookSeat";
import { listRifasBuyApi } from "../../api/buy/listRifas";
import { RootState } from "../../app/store";

export interface Seat {
	id: number;
	seat: number;
	pago: boolean;
	name: string;
}
export interface Rifa {
	id: number;
	name: string;
	end: Date;
	seats: Seat[];
	price: number;
}

interface IInitial {
	rifas: Rifa[];
	status: string;
}

const initialState: IInitial = {
	rifas: [],
	status: "idle",
};

export const listRifas = createAsyncThunk("buy/listRifas", async () => {
	const res = await listRifasBuyApi();
	return res.data;
});

export const bookSeat = createAsyncThunk("buy/seat", async (data: any) => {
	const res = await bookSeatApi(data);
	return res.data;
});

export const buySlice = createSlice({
	name: "buy",
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
			.addCase(bookSeat.rejected, (state) => {
				state.status = "idle";
			})
			.addCase(bookSeat.pending, (state) => {
				state.status = "pending";
			})
			.addCase(bookSeat.fulfilled, (state, { payload }: any) => {
				state.status = "idle";

				const index = state.rifas.findIndex((rifa) => rifa.id === payload.rifaId);
				state.rifas[index].seats = payload.seats;
			});
	},
});

export const selectRifas = (state: RootState) => state.buyRifas.rifas;

export default buySlice.reducer;
