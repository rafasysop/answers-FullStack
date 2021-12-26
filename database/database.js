const sequelize = require('sequelize')

const conection = new sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD, 
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
  }
)

module.exports = conection