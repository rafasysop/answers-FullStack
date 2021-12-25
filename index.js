const express = require('express')

const app = express()
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const nome = 'rafa'
  const lang = 'Javascript'
  res.render("index", {
    nome,
    lang
  })
})


app.listen(5005,(err) => {
  if (!err) return console.log('Servidor Iniciado');
  return console.log('Erro:', err);
})