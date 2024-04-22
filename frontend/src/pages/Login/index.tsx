import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getToken } from 'src/services/userFetch'
import { login } from 'src/store/user/user.actions'
import { stateType } from 'src/type'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [click, setClick] = useState(false)
  const [btn, setBtn] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState(false)
  const connected = useSelector((state: stateType) => state.user.connected)

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
    if (click) {
      const fetch = async () => {
        const data = await getToken(remember, formValue)
        if (data) {
          dispatch(login(data))
          setError(false)
        } else {
          setError(true)
        }
      }
      fetch()
    }
    if (connected === true) {
      navigate('/user')
    }
  }, [btn, connected])

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {error ? (
            <p className="error-text">Your username or password is invalid</p>
          ) : null}
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                defaultValue={
                  localStorage.getItem('email')
                    ? localStorage.getItem('email')
                    : ''
                }
                className={error ? 'error-input' : ''}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className={error ? 'error-input' : ''}
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
