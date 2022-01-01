const sequelize = require('sequelize')
const conection = require('./database')


const ResponseModels = conection.define("responses", {
  body: {
    type: sequelize.TEXT,
    allowNull: false,
  },
  AskId: {
    type: sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = { ResponseModels }