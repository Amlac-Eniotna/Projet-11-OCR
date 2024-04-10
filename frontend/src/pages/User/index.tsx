import Account from 'src/components/Account'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EditUserInfo from 'src/containers/EditUserInfo'

function User() {
  const [changeInfo, setChangeInfo] = useState(false)

  const connected: boolean = useSelector((state) => state.connected)
  const firstName: string = useSelector((state) => state.firstName)
  const lastName: string = useSelector((state) => state.lastName)

  const navigate = useNavigate()

  useEffect(() => {
    if (connected === false) navigate('/login')
  })

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          {changeInfo === false ? (
            <>
              <h1>
                Welcome back
                <br />
                {firstName} {lastName}!
              </h1>
              <button
                className="edit-button"
                onClick={() => setChangeInfo(true)}
              >
                Edit Name
              </button>
            </>
          ) : (
            <EditUserInfo onClick={() => setChangeInfo(false)} />
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Account
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
    </>
  )
}

export default User
