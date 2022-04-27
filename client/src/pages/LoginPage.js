import React, { useState, useEffect } from "react"
import { useAppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import Alert from "../components/Alert"

export default function LoginPage() {
  const { login, loginError, setLoginError, loading, token } = useAppContext()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
  })
  const changeHandler = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const loginHandler = e => {
    e.preventDefault()
    const { username, password } = values
    if (!username.length) {
      setError("Внимание! Введите имя пользователя.")
      return
    }
    if (!password.length) {
      setError("Внимание! Введите пароль.")
      return
    }
    login(username, password)
  }
  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token, navigate])

  return (
    <div className="container">
      <form>
        <div className="mb-3 mt-3">
          <label htmlFor="labelName" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="labelName"
            name="username"
            value={values.username}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pas" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="pas"
            name="password"
            value={values.password}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={loginHandler}
          disabled={loading}
        >
          Submit
        </button>
        <Alert
          error={loginError || error}
          hide={() => {
            if (loginError.length) {
              setLoginError("")
            }
            if (error.length) {
              setError("")
            }
          }}
        />
      </form>
    </div>
  )
}
