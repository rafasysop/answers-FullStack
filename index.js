const express = require('express')

const app = express()
app.set('view engine', 'ejs')

app.get('/:user?/:lang?', (req, res) => {
  const { nome } = req.params
  const { lang } = req.params
  res.render("index", {
    nome: nome || 'Gulmine',
    lang: lang || 'JavaScript'
  })
})


app.listen(5005,(err) => {
  if (!err) return console.log('Servidor Iniciado');
  return console.log('Erro:', err);
})