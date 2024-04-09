import Logo from 'components/Logo'
import Linkto from 'components/Linkto'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

function Header() {
  const [disconnect, setDisconnect] = useState(false)

  const userName = useSelector((state) => state.userName)
  const token = useSelector((state) => state.token)

  const dispatch = useDispatch()

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
        if (data.status === 200) {
          dispatch({
            type: 'getData',
            payload: {
              email: data.body.email,
              firstName: data.body.firstName,
              lastName: data.body.lastName,
              userName: data.body.userName,
            },
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
    if (token !== '' && userName === '') {
      fetcher()
    }
  }, [token])

  if (disconnect == true) {
    setDisconnect(false)
    dispatch({ type: 'logout' })
    localStorage.removeItem('token')
  }

  return (
    <nav className="main-nav">
      <Logo className="main-nav-logo" />
      <div>
        {userName !== '' ? (
          <>
            <Linkto
              className="main-nav-item"
              fa="fa fa-user-circle"
              text={' ' + userName + ' '}
              path="/user"
            ></Linkto>
            <Linkto
              className="main-nav-item"
              fa="fa fa-sign-out"
              text={' ' + 'Log Out' + ' '}
              path="/"
              onClick={() => setDisconnect(true)}
            ></Linkto>{' '}
          </>
        ) : (
          <Linkto
            className="main-nav-item"
            fa="fa fa-user-circle"
            text={' ' + 'Sign In' + ' '}
            path="/login"
          ></Linkto>
        )}
      </div>
    </nav>
  )
}

export default Header
