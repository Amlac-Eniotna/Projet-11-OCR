import { userData } from 'src/type'

// Type
export const LOGIN = 'login'
export const LOGOUT = 'logout'
export const GET_DATA = 'getData'
export const RENAME = 'rename'

// Action
export const login = (payload: userData) => ({ type: LOGIN, payload })

export const logout = () => ({ type: LOGOUT })

export const getData = (payload: userData) => ({ type: GET_DATA, payload })

export const rename = (payload: userData) => ({
  type: RENAME,
  payload,
})
