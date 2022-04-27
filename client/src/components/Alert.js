import React from "react"

export default function Alert({ error, hide }) {
  return (
    error && (
      <div
        className={
          "alert alert-danger alert d-flex justify-content-between mt-3 p-2"
        }
      >
        <span>{error}</span>
        <button
          onClick={hide}
          type="button"
          className="close"
          aria-label="Close"
        ></button>
      </div>
    )
  )
}
