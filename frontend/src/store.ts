import { useEffect } from 'react'
import { createStore } from 'redux'
import { userData, action } from 'src/type'

let initialState: userData = {
  email: '',
  firstName: '',
  lastName: '',
  userName: '',
  token: '',
}

export const login = () => ({ type: 'login' })
export const logout = () => ({ type: 'logout' })

function reducer(state = initialState, action: action) {
  switch (action.type) {
    case 'login':
      return { ...state, token: action.payload }
    case 'logout':
      return { ...state, email: 'bye' }
    default:
      return state
  }
}

export const store = createStore(reducer, initialState)

// function fetchData() {
//   useEffect(() => {})
// }
