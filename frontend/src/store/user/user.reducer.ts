import { userData } from 'src/type'
import { login, getData, logout, rename } from './user.actions'
import { createReducer } from '@reduxjs/toolkit'

let initialState: userData = {
  email: '',
  firstName: '',
  lastName: '',
  userName: '',
  userId: '',
  token: '',
  connected: false,
}

export const userReducer = createReducer(initialState, (builder) => {
  return builder
    .addCase(login, (state, action) => {
      return { ...state, token: action.payload.token }
    })
    .addCase(getData, (state, action) => {
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
        userId: action.payload.userId,
        connected: true,
      }
    })
    .addCase(logout, () => {
      return {
        ...initialState,
      }
    })
    .addCase(rename, (state, action) => {
      return {
        ...state,
        userName: action.payload.userName,
      }
    })
})
