import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../paginas/Seguridad/redux'


export const store = configureStore({
  reducer: {
    auth: authSlice
  },
})