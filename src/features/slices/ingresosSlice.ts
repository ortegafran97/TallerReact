import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Vehiculo from "../../Models/Vehiculo";
import Ingreso from "../../Models/Ingreso";
import ItemIngreso from "../../Models/ItemIngreso";

import { getIngresos } from "../../Services/ingresosService";
import { stat } from "fs";
import vehiculosSlice from "./vehiculosSlice";

export interface IngresoState {
  value: Ingreso[];
  status: "idle" | "loading" | "failed";
}

const initialState: IngresoState = {
  value: [],
  status: "idle",
};

export const getIngresoAsync = createAsyncThunk(
  "ingresos/fetchIngresos",
  async (ingresos: Ingreso[]) => {
    const res = await getIngresos();
    return res.content;
  }
);

/* SLICE */
export const ingresosSlice = createSlice({
  name: "ingresos",
  initialState,
  reducers: {
    addIngreso: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    deleteIngreso: (state, action) => {
      state.value = state.value.filter((e) => e.id !== action.payload.id);
    },
    updateIngreso: (state, action) => {
      state.value = state.value.map((v) => {
        return v.id !== action.payload.id ? v : action.payload;
      });
    },
    setIngresos: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngresoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getIngresoAsync.fulfilled,
        (state, action: PayloadAction<Ingreso[]>) => {
          state.status = "idle";
          state.value = action.payload;
        }
      );
  },
});

export const { addIngreso, updateIngreso, deleteIngreso, setIngresos } =
  ingresosSlice.actions;

export const selectIngresos = (state: RootState) => state.ingresos.value;

export default ingresosSlice.reducer;
