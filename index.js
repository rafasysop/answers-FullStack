const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  const resp = {
    status: res.statusCode,
    date: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'long'}).format(new Date()),
    message: 'Bem Vindo ao Servidor Rafael Moura',
    site: `http://${req.headers.host}/site`,
    api: `http://${req.headers.host}/api`,

  }
  return res.status(200).json(resp)
})

app.get('/api', (req, res) => {
  return res.status(200).json({ apiVersion: '1.0' })
})

app.get('/site', (req, res) => {
  return res.render('index')
})

app.get('/perguntar', (req, res) => {
  return res.render('perguntar')
})

app.post('/save-ask', (req, res) => {
  return res.json({ status: 'ok', newAsk: req.body })
})


app.listen(5005,(err) => {
  if (!err) return console.log('Servidor Iniciado');
  return console.log('Erro:', err);
})