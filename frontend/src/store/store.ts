import { createStore, combineReducers } from 'redux'
import { userReducer } from './user/user.reducer'

const reduxDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const rootReducer = combineReducers({
  user: userReducer,
})

export const store = createStore(rootReducer, reduxDevtools)
