import { userReducer } from './user/user.reducer'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // middleware: [],
})
