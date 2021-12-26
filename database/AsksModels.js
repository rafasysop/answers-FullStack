const sequelize = require('sequelize')
const conection = require('./database')

const AsksModels = conection.define('asks', {
  titulo: {
    type: sequelize.STRING,
    allowNull: false
  },
  desc: {
    type: sequelize.TEXT,
    allowNull: false
  }
})

module.exports = AsksModels