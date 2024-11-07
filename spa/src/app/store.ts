import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import buyReducer from "../features/buy/buySlice";
import signupReducer from "../features/login/signupSlice";
import rifasReducer from "../features/rifas/rifasSlice";
import userReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    rifas: rifasReducer,
    buyRifas: buyReducer,
    signup: signupReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
