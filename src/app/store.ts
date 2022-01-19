import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import contactosReducer from "../features/contactos/contactosSlice";
import vehiculosReducer from "../features/slices/vehiculosSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    contactos: contactosReducer,
    vehiculos: vehiculosReducer,
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
