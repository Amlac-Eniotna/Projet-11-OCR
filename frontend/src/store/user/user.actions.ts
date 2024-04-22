import { createAction } from '@reduxjs/toolkit'

// Type
export const LOGIN = 'login'
export const LOGOUT = 'logout'
export const GET_DATA = 'getData'
export const RENAME = 'rename'

// Action
export const login = createAction(LOGIN)

export const logout = createAction(LOGOUT)

export const getData = createAction(GET_DATA)

export const rename = createAction(RENAME)
