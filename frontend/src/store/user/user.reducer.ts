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
      // @ts-ignore
      return { ...state, token: action.payload.token } // payload et considéré comme n'étant pas présent à coup sur, pareil en dessous
    })
    .addCase(getData, (state, action) => {
      return {
        ...state,
        // @ts-ignore
        firstName: action.payload.firstName,
        // @ts-ignore
        lastName: action.payload.lastName,
        // @ts-ignore
        userName: action.payload.userName,
        // @ts-ignore
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
        // @ts-ignore
        userName: action.payload.userName,
      }
    })
})
