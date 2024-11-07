import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOwnerApi } from "../../api/rifas/addOwner";
import { listRifasApi } from "../../api/rifas/list";
import { newRifaApi } from "../../api/rifas/new";
import { removeOwnerApi } from "../../api/rifas/removeOwner";
import { cancelSeatApi } from "../../api/seats/cancel";
import { updateSeatApi } from "../../api/seats/update";
import { searchUserApi } from "../../api/users/search";
import { RootState } from "../../app/store";

export interface Seat {
  id: number;
  seat: number;
  pago: boolean;
  name: string;
}
export interface Owner {
  id: number;
  name: string;
  email: string;
}
export interface Rifa {
  id: number;
  name: string;
  end: Date;
  seats: Seat[];
  owners: Owner[];
  price: number;
}

export interface User {
  id: any;
  name: string;
  email: string;
  contact: string;
}

interface IInitial {
  rifas: Rifa[];
  user: User;
  status: string;
}

const initialState: IInitial = {
  rifas: [],
  user: { id: 0, name: "", email: "", contact: "" },
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

export const searchUser = createAsyncThunk(
  "user/searchUser",
  async (email: string) => {
    const res = await searchUserApi(email);
    return res.data;
  }
);

export const resetUser = createAction("RESET_USER");

export const addOwner = createAsyncThunk(
  "rifas/addOwner",
  async (data: any) => {
    const res = await addOwnerApi({ ...data, rifaId: data.rifaId });
    return res.data;
  }
);

export const removeOwner = createAsyncThunk(
  "rifas/removeOwner",
  async (data: any) => {
    const res = await removeOwnerApi({ ...data, rifaId: data.rifaId });
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

    builder
      .addCase(addOwner.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(addOwner.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addOwner.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        const index = state.rifas.findIndex((rifa) => rifa.id === payload.id);
        state.rifas[index] = payload;
      });

    builder
      .addCase(removeOwner.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(removeOwner.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeOwner.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        const index = state.rifas.findIndex((rifa) => rifa.id === payload.id);
        console.log(index);
        state.rifas[index] = payload;
      });

    builder
      .addCase(searchUser.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(searchUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(searchUser.fulfilled, (state, { payload }: any) => {
        state.status = "idle";
        state.user = payload;
      });

    builder.addCase(resetUser, (state) => {
      state.user = initialState.user;
    });
  },
});

export const selectStatus = (state: RootState) => state.rifas.status;
export const selectRifas = (state: RootState) => state.rifas.rifas;
export const selectUser = (state: RootState) => state.rifas.user;

export default rifasSlice.reducer;
