import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { count } from "console";
import { RootState, AppThunk } from "../../app/store";
import Contacto from "../../Models/Contacto";
import { fetchContactos } from "./contactosAPI";

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

export const createContactoAsync = createAsyncThunk(
  "contactos/createContacto",
  async (Contactos: Contacto[]) => {
    // const nuevoContacto = await createContacto()
  }
);

export const contactosSlice = createSlice({
  name: "contactos",
  initialState,
  reducers: {
    addContacto: (state, action) => {
      state.value = [...state.value, action.payload];
    },

    //TODO DIVIDER (actions)
    deleteContacto: (state, action) => {
      state.value = state.value;
    },
    updateContacto: (state, action) => {
      state.value = state.value;
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

export const { addContacto, deleteContacto } = contactosSlice.actions;

export const selectContactos = (state: RootState) => state.contactos.value;

export default contactosSlice.reducer;
