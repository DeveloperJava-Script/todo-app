const { Sequelize } = require("sequelize")

const seq = new Sequelize("test-db", "user", "pass", {
  dialect: "sqlite",
  host: "./dev.sqlite",
})

module.exports = seq
