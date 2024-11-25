// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Importa el slice del usuario

export const store = configureStore({
  reducer: {
    user: userReducer, // Añade el slice al store
  },
});
