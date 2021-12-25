const express = require('express')

const app = express()
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render("index"))


app.listen(5005,(err) => {
  if (!err) return console.log('Servidor Iniciado');
  return console.log('Erro:', err);
})