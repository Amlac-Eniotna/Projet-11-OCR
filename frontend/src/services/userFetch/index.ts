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
    if (data.status === 200) {
      const dataUserName: string = data.body.userName
      return { userName: dataUserName, status: 200 }
    } else if (data.status === 401) {
      return { status: 401 }
    } else {
      return { status: 0 }
    }
  } catch (err) {
    console.error(err)
    return { status: 0 }
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
        status: number
      } = {
        firstName: data.body.firstName,
        lastName: data.body.lastName,
        userName: data.body.userName,
        userId: data.body.id,
        status: 200,
      }
      return dataTypage
    } else {
      sessionStorage.removeItem('token')
      return { status: 0 }
    }
  } catch (err) {
    console.error(err)
    return { status: 0 }
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
      return { token: token, status: 200 }
    } else if (data.status === 400) {
      return { status: 400 }
    } else {
      return { status: 0 }
    }
  } catch (err) {
    console.error(err)
    return { status: 0 }
  }
}
