import { userDataUncompleted } from 'src/type'

// Type
export const LOGIN = 'login'
export const LOGOUT = 'logout'
export const GET_DATA = 'getData'
export const RENAME = 'rename'

// Action
export const login = (payload: userDataUncompleted | undefined) => ({
  type: LOGIN,
  payload,
})

export const logout = () => ({ type: LOGOUT })

export const getData = (payload: userDataUncompleted | undefined) => ({
  type: GET_DATA,
  payload,
})

export const rename = (payload: userDataUncompleted | undefined) => ({
  type: RENAME,
  payload,
})
