import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { changeUserName } from 'src/services/userFetch'
import { rename } from 'src/store/user/user.actions'

function EditUserInfo({ onClick }) {
  const [error, setError] = useState(false)
  const [saveBtn, setSaveBtn] = useState(false)
  const [newUserName, setNewUserName] = useState('')

  const firstName: string = useSelector((state) => state.user.firstName)
  const lastName: string = useSelector((state) => state.user.lastName)
  const userName: string = useSelector((state) => state.user.userName)
  const token: string = useSelector((state) => state.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    if (saveBtn === true) {
      const fetch = async () => {
        const data = await changeUserName(token, newUserName)
        dispatch(rename(data))
      }
      fetch()
      setSaveBtn(false)
    }
  }, [saveBtn])

  return (
    <>
      <h1>Edit user info</h1>
      <form className="form-edit">
        <div className="input-line">
          <label htmlFor="username">User name: </label>
          <input
            defaultValue={userName}
            className={error ? 'error-input' : ''}
            placeholder={error ? 'À compléter' : ''}
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
                onClick()
              } else {
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
