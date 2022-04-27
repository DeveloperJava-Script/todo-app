import React from "react"
import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

export default function Header() {
  const { logout, token } = useAppContext()
  return (
    <div className="card">
      <div className="card-header">
        <div className="container d-flex justify-content-between">
          <div>
            <h4>Todo application</h4>
          </div>
          <nav>
            <Link to="/">Home</Link> |{" "}
            {token ? (
              <a href={"/"} onClick={logout}>
                Log out
              </a>
            ) : (
              <Link to="login">Log in</Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
