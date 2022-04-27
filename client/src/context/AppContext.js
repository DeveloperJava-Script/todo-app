import React, { useContext, useState, createContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../config"
import axios from "axios"
const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const navigate = useNavigate()
  const storage = "userToken"
  const [page, setPage] = useState(1)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [sortings, setSortings] = useState([
    { id: 0, name: "Без сортировки", selected: true },
    {
      id: 1,
      name: "Email по возрастанию",
      selected: false,
      field: "email",
      reversed: false,
    },
    {
      id: 2,
      name: "Email по убыванию",
      selected: false,
      field: "email",
      reversed: true,
    },
    {
      id: 3,
      name: "Username по возрастанию",
      selected: false,
      field: "username",
      reversed: false,
    },
    {
      id: 4,
      name: "Username по убыванию",
      selected: false,
      field: "username",
      reversed: true,
    },
  ])
  const [todos, setTodos] = useState([])

  const changeSorting = sort => {
    let selectedSort
    setSortings(
      sortings.map(i => {
        if (i.id === sort.id) {
          selectedSort = sort
          return { ...i, selected: true }
        }
        return { ...i, selected: false }
      })
    )
    if (sort.id !== 0) {
      const sortedTodos = todos.sort((a, b) => {
        return a[selectedSort.field].length > b[selectedSort.field].length
          ? 1
          : -1
      })
      setTodos(selectedSort.reversed ? sortedTodos.reverse() : sortedTodos)
    } else {
      setTodos(
        todos.sort((a, b) => {
          return a.id > b.id ? 1 : -1
        })
      )
    }
  }

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const getTodos = async () => {
    setLoading(true)
    await axios
      .get(`${baseUrl}/api/todos/`)
      .then(res => {
        if (res.data) {
          setTodos(res.data)
        }
      })
      .catch(er => {
        console.log(er)
      })
    setLoading(false)
  }

  const createTodo = async (username, email, text) => {
    setLoading(true)
    await axios({
      method: "post",
      url: `${baseUrl}/api/todos`,
      data: {
        username,
        email,
        text,
        edited: false,
        completed: false,
      },
    })
      .then(res => {
        if (res.data) {
          getTodos()
        }
      })
      .catch(er => {
        console.log(er)
      })
    setLoading(false)
  }

  const completeTodo = async id => {
    setLoading(true)
    await axios({
      method: "put",
      url: `${baseUrl}/api/todo/complete/${id}`,
    })
      .then(res => {
        if (res.status) {
          getTodos()
        }
      })
      .catch(er => {
        console.log(er)
      })
    setLoading(false)
  }

  const editTodo = async (id, username, email, text) => {
    setLoading(true)
    await axios({
      method: "put",
      url: `${baseUrl}/api/todo/edit/${id}`,
      data: {
        username,
        email,
        text,
      },
    })
      .then(res => {
        console.log(res.data)
        if (res.data.status) {
          getTodos()
        }
      })
      .catch(er => {
        console.log(er)
      })
    setLoading(false)
  }

  const login = async (username, password) => {
    setLoading(true)
    await axios({
      method: "post",
      url: `${baseUrl}/api/login`,
      data: {
        username,
        password,
      },
    })
      .then(res => {
        if (res.data.status) {
          const { token } = res.data
          setToken(token)
          localStorage.setItem(storage, token)
          navigate("/")
        } else {
          setLoginError(res.data?.message)
        }
      })
      .catch(er => {
        console.log(er)
      })

    setLoading(false)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem(storage)
  }

  useEffect(() => {
    const data = localStorage.getItem(storage)
    if (data) {
      setToken(data)
    }
  }, [])

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <AppContext.Provider
      value={{
        todos,
        createTodo,
        loading,
        login,
        loginError,
        setLoginError,
        token,
        logout,
        completeTodo,
        sortings,
        changeSorting,
        page,
        setPage,
        editTodo,
        validateEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
