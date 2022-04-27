const { Model, DataTypes } = require("sequelize")
const sequelize = require("./database")

class Todo extends Model {}

Todo.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
    edited: {
      type: DataTypes.BOOLEAN,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "todo",
    timestamps: false,
  }
)

module.exports = Todo
