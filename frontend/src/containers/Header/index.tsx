import Logo from 'components/Logo'
import Linkto from 'components/Linkto'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getName } from 'src/services/userFetch'
import { login, logout, getData } from 'src/store/user/user.actions'
import { stateType } from 'src/type'

function Header() {
  const [disconnect, setDisconnect] = useState(false)

  const userName = useSelector((state: stateType) => state.user.userName)
  const token = useSelector((state: stateType) => state.user.token)
  const connected = useSelector((state: stateType) => state.user.connected)

  const dispatch = useDispatch()

  const storageToken = sessionStorage.getItem('token')

  useEffect(() => {
    if (token !== '' && connected === false) {
      const fetch = async () => {
        const data = await getName(token)
        if (data.status === 200) {
          dispatch(getData(data))
        } else {
          dispatch(logout())
        }
      }
      fetch()
    } else if (token === '' && storageToken !== null && connected === false) {
      dispatch(login({ token: storageToken }))
    } else if (disconnect == true) {
      setDisconnect(false)
      dispatch(logout())
      sessionStorage.removeItem('token')
      localStorage.removeItem('email')
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
              onClick={() => {
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
