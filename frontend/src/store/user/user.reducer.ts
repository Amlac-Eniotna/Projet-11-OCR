import { userData } from 'src/type'
import { GET_DATA, LOGIN, LOGOUT, RENAME } from './user.actions'

let initialState: userData = {
  firstName: '',
  lastName: '',
  userName: '',
  userId: '',
  token: '',
  connected: false,
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.payload }
    case GET_DATA:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
        userId: action.payload.id,
        connected: true,
      }
    case LOGOUT:
      return {
        ...initialState,
        connected: false,
      }
    case RENAME:
      return {
        ...state,
        userName: action.payload,
      }
    default:
      return state
  }
}
