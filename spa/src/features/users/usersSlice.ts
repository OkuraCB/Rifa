import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Base {
	id: number;
	name: string;
	email: string;
}

export interface User extends Base {
	logged: boolean;
}

const initialState: User = {
	id: 0,
	name: "",
	email: "",
	logged: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<Base>) => {
			const { id, name, email } = action.payload;
			state.id = id;
			state.name = name;
			state.email = email;
			state.logged = true;
		},
		logout: (state) => {
			state.id = initialState.id;
			state.name = initialState.name;
			state.email = initialState.email;
			state.logged = initialState.logged;
		},
	},
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
