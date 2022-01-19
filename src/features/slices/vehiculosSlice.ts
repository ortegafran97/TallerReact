import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Vehiculo from "../../Models/Vehiculo";
import { getVehiculos } from "../../Services/vehiculosService";

export interface VehiculosState {
  value: Vehiculo[];
  status: "idle" | "loading" | "failed";
}

const initialState: VehiculosState = {
  value: [],
  status: "idle",
};

export const getVehiculosAsync = createAsyncThunk(
  "vehiculos/fetchVehiculos",
  async (vehiculos: Vehiculo[]) => {
    const res = await getVehiculos();
    return res.content;
  }
);

/* SLICE */
export const vehiculosSlice = createSlice({
  name: "vehiculos",
  initialState,
  reducers: {
    addVehiculo: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    deleteVehiculo: (state, action) => {
      state.value = state.value.filter((e) => e.id !== action.payload.id);
    },
    updateVehiculo: (state, action) => {
      state.value = state.value.map((v) => {
        return v.id !== action.payload.id ? v : action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehiculosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getVehiculosAsync.fulfilled,
        (state, action: PayloadAction<Vehiculo[]>) => {
          state.status = "idle";
          state.value = action.payload;
        }
      );
  },
});

export const { addVehiculo, updateVehiculo, deleteVehiculo } =
  vehiculosSlice.actions;

export const selectVehiculos = (state: RootState) => state.vehiculos.value;

export default vehiculosSlice.reducer;
