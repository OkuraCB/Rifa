import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listRifasApi } from "../../api/rifas/list";
import { newRifaApi } from "../../api/rifas/new";
import { cancelSeatApi } from "../../api/seats/cancel";
import { updateSeatApi } from "../../api/seats/update";
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

export const listRifas = createAsyncThunk("rifas/listRifas", async () => {
  const res = await listRifasApi();
  return res.data;
});

export const newRifa = createAsyncThunk("rifas/newRifa", async (data: any) => {
  const res = await newRifaApi(data);
  return res.data;
});

export const updateSeat = createAsyncThunk(
  "seats/updateSeat",
  async (id: number | null) => {
    const res = await updateSeatApi(id);
    return res.data;
  }
);

export const cancelSeat = createAsyncThunk(
  "seats/cancelSeat",
  async (id: number | null) => {
    const res = await cancelSeatApi(id);
    return res.data;
  }
);

export const rifasSlice = createSlice({
  name: "rifas",
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

    builder
      .addCase(updateSeat.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(updateSeat.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateSeat.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        const index = state.rifas.findIndex(
          (rifa) => rifa.id === payload.rifaId
        );
        state.rifas[index].seats = payload.seats;
      });

    builder
      .addCase(cancelSeat.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(cancelSeat.pending, (state) => {
        state.status = "pending";
      })
      .addCase(cancelSeat.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        const index = state.rifas.findIndex(
          (rifa) => rifa.id === payload.rifaId
        );
        state.rifas[index].seats = payload.seats;
      });
  },
});

export const selectRifas = (state: RootState) => state.rifas.rifas;

export default rifasSlice.reducer;
