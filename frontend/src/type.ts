export type userData = {
  firstName?: string
  lastName?: string
  userName?: string
  token?: string
  userId?: string
  connected?: boolean
}

export type userAction = {
  type: string
  payload: userData
}

export type stateType = {
  user: userData
}
