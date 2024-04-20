// Type
export const LOGIN = 'login'
export const LOGOUT = 'logout'
export const GET_DATA = 'getData'
export const RENAME = 'rename'

// Action
export const login = (token: string) => ({ type: LOGIN, payload: token })

export const logout = () => ({ type: LOGOUT })

export const getData = (payload) => ({ type: GET_DATA, payload })

export const rename = (userName: string) => ({
  type: RENAME,
  payload: userName,
})
