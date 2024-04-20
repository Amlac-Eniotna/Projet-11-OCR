import { userData, userAction } from 'src/type'
import { GET_DATA, LOGIN, LOGOUT, RENAME } from './user.actions'

let initialState: userData = {
  firstName: '',
  lastName: '',
  userName: '',
  userId: '',
  token: '',
  connected: false,
}

export function userReducer(state = initialState, action: userAction) {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.payload.token }
    case GET_DATA:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
        userId: action.payload.userId,
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
        userName: action.payload.userName,
      }
    default:
      return state
  }
}
