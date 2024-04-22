export async function changeUserName(token: string, newUserName: string) {
  try {
    const res = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: newUserName }),
    })
    const data = await res.json()
    const dataUserName: string = data.body.userName
    if (data.status === 200) {
      return { userName: dataUserName }
    }
  } catch (err) {
    console.error(err)
  }
}

export async function getName(token: string) {
  try {
    const res = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    if (data.status === 200) {
      const dataTypage: {
        firstName: string
        lastName: string
        userName: string
        userId: string
      } = {
        firstName: data.body.firstName,
        lastName: data.body.lastName,
        userName: data.body.userName,
        userId: data.body.id,
      }
      return dataTypage
    } else {
      sessionStorage.removeItem('token')
      return false
    }
  } catch (err) {
    console.error(err)
    return false
  }
}

export async function getToken(
  remember: boolean,
  formValue: { email: string; password: string }
) {
  try {
    const res = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValue),
    })
    const data = await res.json()
    if (data.status === 200) {
      sessionStorage.setItem('token', data.body.token)
      if (remember) {
        localStorage.setItem('email', formValue.email)
      } else {
        localStorage.removeItem('email')
      }
      const token: string = data.body.token
      return { token: token }
    } else {
      return null
    }
  } catch (err) {
    console.error(err)
    return false
  }
}
