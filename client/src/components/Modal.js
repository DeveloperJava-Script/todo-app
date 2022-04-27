import React, { useState } from "react"
import { useAppContext } from "../context/AppContext"
import Modal from "@mui/material/Modal"
import Alert from "./Alert"

export default function CreateModal({ show, handleClose }) {
  const { createTodo, loading, validateEmail } = useAppContext()
  const [error, setError] = useState("")
  const [values, setValues] = useState({
    user: "",
    email: "",
    text: "",
  })

  const changeHandler = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const createHandler = e => {
    e.preventDefault()
    if (!values.user.length) {
      setError("Внимание! Заполните поле username.")
      return
    }
    if (!validateEmail(values.email)) {
      setError("Внимание! Введите корректный email.")
      return
    }
    if (!values.text.length) {
      setError("Внимание! Заполните поле text.")
      return
    }
    createTodo(values.user, values.email, values.text)
    setValues({
      user: "",
      email: "",
      text: "",
    })
    handleClose()
  }

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-2">
                <label htmlFor="nameLabel" className="form-label">
                  Username
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="nameLabel"
                  aria-describedby="emailHelp"
                  name="user"
                  value={values.user}
                  onChange={changeHandler}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="emailLabel" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emailLabel"
                  aria-describedby="emailHelp"
                  name={"email"}
                  value={values.email}
                  onChange={changeHandler}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="textLabel" className="form-label">
                  Text
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="textLabel"
                  aria-describedby="emailHelp"
                  name={"text"}
                  value={values.text}
                  onChange={changeHandler}
                />
              </div>
              <Alert error={error} hide={() => setError("")} />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={createHandler}
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
