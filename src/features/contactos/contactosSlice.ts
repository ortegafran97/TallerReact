import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Contacto from "../../Models/Contacto";

import {
  getContactos,
  createContacto,
  editContacto,
  deleteContacto as deleteAsync,
} from "../../Services/contactosService";
import { Contactos } from "../../Components/Contactos/Index";

export interface ContactosState {
  value: Contacto[];
  status: "idle" | "loading" | "failed";
}

const initialState: ContactosState = {
  value: [],
  status: "idle",
};

export const getContactosAsync = createAsyncThunk(
  "contactos/fetchContactos",
  async (contactos: Contacto[]) => {
    const response = await getContactos();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

/* export const createContactoAsync = createAsyncThunk(
  "contactos/createContacto",
  async (Contactos: Contacto[]) => {
    // const nuevoContacto = await createContacto()
    // const response = await create
  }
); */

/* SLICE */
export const contactosSlice = createSlice({
  name: "contactos",
  initialState,
  reducers: {
    addContacto: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    deleteContacto: (state, action) => {
      state.value = state.value.filter((e) => e.id !== action.payload.id);
    },
    updateContacto: (state, action) => {
      state.value = state.value.map((c) => {
        return c.id !== action.payload.id ? c : action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getContactosAsync.fulfilled,
        (state, action: PayloadAction<Contacto[]>) => {
          state.status = "idle";
          state.value = action.payload;
        }
      );
  },
});

export const { addContacto, deleteContacto, updateContacto } =
  contactosSlice.actions;

export const selectContactos = (state: RootState) => state.contactos.value;

/* Funciones async */
export const newContacto = async (contacto: Contacto): Promise<Contacto> => {
  const res = await createContacto(contacto);

  return res;
};

export default contactosSlice.reducer;
