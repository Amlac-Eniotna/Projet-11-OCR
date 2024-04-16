import Logo from 'components/Logo'
import Linkto from 'components/Linkto'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getName } from 'src/services/fetch'

function Header() {
  const [disconnect, setDisconnect] = useState(false)

  const userName = useSelector((state) => state.userName)
  const token = useSelector((state) => state.token)
  const connected = useSelector((state) => state.connected)

  const dispatch = useDispatch()

  const storageToken = localStorage.getItem('token')

  function dateVerify() {
    const storageTime = new Date(localStorage.getItem('time'))
    const currentTime = new Date()
    if (
      storageTime.getTime() + 10 * 60 * 1000 < currentTime.getTime() ||
      storageTime.getTime() > currentTime.getTime()
    ) {
      localStorage.removeItem('token')
    }
  }
  dateVerify()

  useEffect(() => {
    if (token !== '' && connected === false) {
      const fetch = async () => {
        const data = await getName(token)
        dispatch(data)
      }
      fetch()
    } else if (token === '' && storageToken !== null && connected === false) {
      dispatch({ type: 'login', payload: storageToken })
    } else if (disconnect == true) {
      setDisconnect(false)
      dispatch({ type: 'logout' })
      localStorage.removeItem('token')
    }
  }, [token, disconnect])

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
              path="/login"
              onClick={(): void => {
                setDisconnect(true)
              }}
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
