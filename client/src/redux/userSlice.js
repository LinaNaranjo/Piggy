import { createSlice } from "@reduxjs/toolkit";

// Cargar el usuario desde el almacenamiento local si está disponible
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  name: storedUser?.name,
  lastName: storedUser?.lastName,
  email: storedUser?.email,
  age: storedUser?.age,
  phone: storedUser?.phone,
  birthdate: storedUser?.birthdate,
  address: storedUser?.address,
  nivel: storedUser?.nivel,
  metasActivas: storedUser?.metasActivas,
  ingresosTotales: storedUser?.ingresosTotales,
  gastosTotales: storedUser?.gastosTotales,
  ahorrosActuales: storedUser?.ahorrosActuales,
  lastLogin: storedUser?.lastLogin,
  profilePicture: storedUser?.profilePicture,
  isLoggedIn: storedUser?.isLoggedIn || false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.age = action.payload.age;
      state.phone = action.payload.phone;
      state.birthdate = action.payload.birthdate;
      state.address = action.payload.address;
      state.nivel = action.payload.nivel;
      state.metasActivas = action.payload.metasActivas;
      state.ingresosTotales = action.payload.ingresosTotales;
      state.gastosTotales = action.payload.gastosTotales;
      state.ahorrosActuales = action.payload.ahorrosActuales;
      state.lastLogin = action.payload.lastLogin;
      state.profilePicture = action.payload.profilePicture;

      state.isLoggedIn = true;
      // Guardar los datos del usuario en localStorage
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout(state) {
      state.name = "";
      state.lastName = "";
      state.email = "";
      state.isLoggedIn = false;
      // Eliminar los datos del usuario de localStorage
      localStorage.removeItem("user");
    },
    updateName(state, action) {
      state.name = action.payload.name;
    },
  },
});

export const { login, logout, updateName } = userSlice.actions;
export default userSlice.reducer;
