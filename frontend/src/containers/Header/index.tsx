import Logo from 'components/Logo'
import Linkto from 'components/Linkto'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getName } from 'src/services/userFetch'

function Header() {
  const [disconnect, setDisconnect] = useState(false)

  const userName = useSelector((state) => state.userName)
  const token = useSelector((state) => state.token)
  const connected = useSelector((state) => state.connected)

  const dispatch = useDispatch()

  const storageToken = sessionStorage.getItem('token')

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
      sessionStorage.removeItem('token')
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
