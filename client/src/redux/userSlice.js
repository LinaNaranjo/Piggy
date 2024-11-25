// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "", // Nombre del usuario
  email: "", // Correo del usuario
  isLoggedIn: false, // Estado de inicio de sesión
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.name = action.payload.name; // Actualiza el nombre
      state.email = action.payload.email; // Actualiza el correo
      state.isLoggedIn = true; // Cambia el estado de login
    },
    logout(state) {
      state.name = ""; // Limpia el nombre
      state.email = ""; // Limpia el correo
      state.isLoggedIn = false; // Cambia el estado de login
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
