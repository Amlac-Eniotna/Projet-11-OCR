import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { changeUserName } from 'src/services/userFetch'
import { rename } from 'src/store/user/user.actions'
import { stateType } from 'src/type'

function EditUserInfo({ onClick }: { onClick: any }) {
  const [msgError, setMsgError] = useState('')
  const [error, setError] = useState(false)
  const [saveBtn, setSaveBtn] = useState(false)
  const [newUserName, setNewUserName] = useState('')

  const firstName = useSelector((state: stateType) => state.user.firstName)
  const lastName = useSelector((state: stateType) => state.user.lastName)
  const userName = useSelector((state: stateType) => state.user.userName)
  const token = useSelector((state: stateType) => state.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (saveBtn === true) {
      const fetch = async () => {
        const data = await changeUserName(token, newUserName)
        if (data.status === 401) {
          setMsgError('Please log in again')
          setError(true)
        } else if (data.status === 0) {
          setMsgError('Server unavailable, please try again later')
          setError(true)
        } else if (data.status === 200) {
          dispatch(rename(data))
          setMsgError('')
          onClick()
        }
      }
      setSaveBtn(false)
      fetch()
    }
  }, [saveBtn])

  return (
    <>
      <h1>Edit user info</h1>
      {msgError === '' ? null : <p className="error-text">{msgError}</p>}
      <form className="form-edit">
        <div className="input-line">
          <label htmlFor="username">User name: </label>
          <input
            defaultValue={userName}
            className={error ? 'error-input' : ''}
            placeholder={error ? 'To be completed' : ''}
            type="text"
            id="username"
            onChange={(e) => setNewUserName(e.target.value)}
          />
        </div>
        <div className="input-line">
          <label htmlFor="firstname">First name: </label>
          <input type="text" id="firstname" disabled value={firstName} />
        </div>
        <div className="input-line">
          <label htmlFor="lastname">Last name:</label>
          <input type="text" id="lastname" disabled value={lastName} />
        </div>
        <div className="div-edit-button">
          <button
            onClick={async (e) => {
              e.preventDefault()
              if (newUserName !== userName && newUserName !== '') {
                await setSaveBtn(true)
                setError(false)
              } else {
                setMsgError('Please enter a new username')
                setError(true)
              }
            }}
          >
            Save
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              onClick()
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}

export default EditUserInfo
