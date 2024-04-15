import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

function EditUserInfo({ onClick }) {
  const [error, setError] = useState(false)
  const [saveBtn, setSaveBtn] = useState(false)
  const [newUserName, setNewUserName] = useState('')

  const firstName: string = useSelector((state) => state.firstName)
  const lastName: string = useSelector((state) => state.lastName)
  const token: string = useSelector((state) => state.token)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetcher() {
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
          dispatch({
            type: 'rename',
            payload: {
              userName: newUserName,
            },
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
    if (saveBtn === true) {
      fetcher()
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
            defaultValue="username"
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
              if (newUserName !== '') {
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
