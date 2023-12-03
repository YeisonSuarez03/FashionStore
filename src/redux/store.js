import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../paginas/Seguridad/redux'
import { productsSlice } from '../paginas/Home/redux'


export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
  },
})