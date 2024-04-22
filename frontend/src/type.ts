export type userData = {
  firstName: string
  lastName: string
  userName: string
  token: string
  userId: string
  connected: boolean
  email: string
}

export type userDataUncompleted = {
  email?: string
  firstName?: string
  lastName?: string
  userName?: string
  token?: string
  userId?: string
}

export type userAction = {
  type: string
  payload: userDataUncompleted
}

export type stateType = {
  user: userData
}
