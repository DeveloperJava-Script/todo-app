import React, { useState } from "react"
import { useAppContext } from "../context/AppContext"
import EditModal from "./EditModal"

export default function TodoList({ todos }) {
  const { token, completeTodo, page } = useAppContext()
  const [show, setShow] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const handleEdit = (e, todo) => {
    e.preventDefault()
    setSelectedTodo(todo)
    setShow(true)
  }

  const handleComplete = (e, todo) => {
    e.preventDefault()
    if (!todo.completed) {
      completeTodo(todo.id)
    }
  }
  return (
    <>
      <table className="table border">
        <thead className="">
          <tr>
            <th scope="col">№</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Text</th>
            <th scope="col">Status</th>
            {token && <th scope="col">Action</th>}
          </tr>
        </thead>
        <tbody>
          {todos.slice((page - 1) * 3, (page - 1) * 3 + 3).map(todo => (
            <tr
              key={todo.id}
              className={todo.completed ? "table-success" : "table-secondary"}
            >
              <th scope="row">{todo.id}</th>
              <td>{todo.username}</td>
              <td>{todo.email}</td>
              <td>{todo.text}</td>
              <td>{todo.completed ? "✓" : "-"}</td>
              {token && (
                <td width={"10%"}>
                  <a onClick={e => handleEdit(e, todo)} href={"/"}>
                    Edit
                  </a>
                  {" | "}
                  <a onClick={e => handleComplete(e, todo)} href={"/"}>
                    Complete
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <EditModal
        show={show}
        handleClose={() => setShow(false)}
        todo={selectedTodo}
      />
    </>
  )
}
