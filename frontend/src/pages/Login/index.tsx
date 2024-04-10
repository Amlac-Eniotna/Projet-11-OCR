import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [click, setClick] = useState(false)
  const [btn, setBtn] = useState(false)
  const [remember, setRemember] = useState(false)
  const connected = useSelector((state) => state.connected)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  // const formValue = {
  //   email: username,
  //   password: password,
  // }
  const formValue = {
    email: 'tony@stark.com',
    password: 'password123',
  }
  useEffect(() => {
    async function asyncer() {
      if (click) {
        const data = await fetchData(formValue)
        if (data.status === 200) {
          dispatch({ type: 'login', payload: data.body.token })
          if (remember) {
            localStorage.setItem('token', data.body.token)
          } else {
            localStorage.removeItem('token')
          }
          navigate('/user')
        }
      }
    }
    if (connected === true) {
      navigate('/user')
    }
    asyncer()
  }, [btn, connected])

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button
              className="sign-in-button"
              onClick={(e) => {
                e.preventDefault()
                setClick(true)
                setBtn(!btn)
              }}
            >
              Sign In
            </button>
          </form>
        </section>
      </main>
    </>
  )
}

export default Login

async function fetchData(formValue: { email: string; password: string }) {
  try {
    const res = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValue),
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
