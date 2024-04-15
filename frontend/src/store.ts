import { useEffect } from 'react'
import { createStore } from 'redux'
import { userData, action } from 'src/type'
import { useSelector } from 'react-redux'

let initialState: userData = {
  firstName: '',
  lastName: '',
  userName: '',
  token: '',
  connected: false,
}

export const login = () => ({ type: 'login' })
export const logout = () => ({ type: 'logout' })

function reducer(state = initialState, action: action) {
  switch (action.type) {
    case 'login':
      return { ...state, token: action.payload }
    case 'getData':
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
        connected: true,
      }
    case 'logout':
      return {
        ...initialState,
        connected: false,
      }
    case 'rename':
      return {
        ...state,
        userName: action.payload.userName,
      }
    default:
      return state
  }
}

export const store = createStore(reducer, initialState)

export function fetchData() {
  const token = useSelector((state) => state.token)
  useEffect(() => {
    async function fetcher() {
      try {
        const res = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        return data
      } catch (err) {
        console.error(err)
      }
    }
    if (token !== '') {
      fetcher()
    }
  })
}
