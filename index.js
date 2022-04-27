const express = require("express")
const cors = require("cors")
const seq = require("./db/database")
const Todo = require("./db/Todo")
const admin = {
  username: "admin",
  password: "123",
}
seq.sync().then(() => console.log("ready"))

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())

app.use(express.json({ extended: false }))

app.get("/api/todos/", async (req, res) => {
  const todos = await Todo.findAll()
  res.json(todos)
})

app.post("/api/todos", async (req, res) => {
  await Todo.create(req.body).then(() => {
    res.json({ status: true, message: "todo created successfully" })
  })
})

app.put("/api/todo/complete/:id", async (req, res) => {
  const reqId = req.params.id
  const todo = await Todo.findOne({ where: { id: reqId } })
  console.log("todo:", todo)
  todo.completed = true
  await todo.save()
  res.json({ status: true, message: "updated" })
})

app.put("/api/todo/edit/:id", async (req, res) => {
  const reqId = req.params.id
  const todo = await Todo.findOne({ where: { id: reqId } })
  const { username, email, text } = req.body
  todo.username = username
  todo.email = email
  todo.text = text
  todo.edited = true
  await todo.save()
  res.json({ status: true, message: "edited" })
})

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body
    if (username === admin.username && password === admin.password) {
      res.json({ status: true, token: "admin" })
    } else {
      return res.json({
        status: false,
        message: "Неправильные реквизиты доступа.",
      })
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})

app.listen(PORT, () => {
  console.log(`server ${PORT}`)
})
