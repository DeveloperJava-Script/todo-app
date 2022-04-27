import React, { useState } from "react"
import Modal from "../components/Modal"
import Pagination from "../components/Pagination"
import TodoList from "../components/TodoList"
import { useAppContext } from "../context/AppContext"

export default function Home() {
  const { todos, sortings, changeSorting, page, setPage } = useAppContext()
  const [show, setShow] = useState(false)
  const activeSorting = sortings.find(i => i.selected)?.name

  const changeHandler = (e, item) => {
    e.preventDefault()
    changeSorting(item)
  }

  return (
    <div className="container">
      <div className="d-flex align-items-center">
        <button
          type="button"
          className="btn btn-primary my-3 me-3"
          onClick={() => setShow(true)}
        >
          Create new
        </button>
        <div className="dropdown">
          <button className="dropbtn">{activeSorting}</button>
          <div className="dropdown-content">
            {sortings.map(item => (
              <a key={item.id} href="/" onClick={e => changeHandler(e, item)}>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <Modal show={show} handleClose={() => setShow(false)} />
      <TodoList todos={todos} />
      <Pagination
        total={todos.length}
        page={page}
        changePage={num => setPage(num)}
      />
    </div>
  )
}
