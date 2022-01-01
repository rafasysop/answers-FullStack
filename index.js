const express = require('express')
const bodyParser = require('body-parser')
const conection = require('./database/database');
const AsksModels = require('./database/AsksModels');
const { ResponseModels } = require('./database/ResponseModels');

const portServer = 5005

conection
  .authenticate()
  .then(() => {
    console.log('Conectado no Banco de Dados:', process.env.MYSQL_HOST);
    AsksModels.sync({ force: false })
    ResponseModels.sync({ force: false })
  })
  .catch((e) => {
    console.log('Erro ao conectar no Banco', e);
  })

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
    repositoryGitHub: 'https://github.com/rafasysop/answers-FullStack',
    site: `http://${req.headers.host}/site`,
    api: `http://${req.headers.host}/api`,

  }
  return res.status(200).json(resp)
})

app.get('/api', (req, res) => {
  return res.status(200).json({ apiVersion: '1.0' })
})

app.get('/site', (req, res) => {
  AsksModels.findAll({ raw: true, limit: 5, order: [['id', 'DESC']]})
    .then((asks) => {
    return res.render('index', { asks })
    })
})

app.get('/perguntar', (req, res) => {
  return res.render('perguntar')
})

app.post('/save-ask', (req, res) => {
  const {titulo, desc} = req.body 
  AsksModels.create({
    titulo,
    desc
  }).then(()=>{
    /*
    return res.status(201).json({ 
      status: 201,
      message: 'Pergunta Criada com Sucesso',
      newAsk: req.body 
    })*/
    res.redirect('/site')
  }).catch((err) => res.status(400)
    .json({ status: 400, error: err.message }))
})

app.get('/pergunta/:id', (req, res) => {
  const { id } = req.params
   AsksModels.findOne({ where: { id }})
    .then((ask) => {
      if (!ask) return res.redirect('/site')
      ResponseModels.findAll({ where: { AskId: id }, order: [['id', 'DESC']] })
        .then((responses) => {
        return res.render('pergunta', {
          ask,
          responses,
          criado: Intl.DateTimeFormat('pt-BR',{ dateStyle: 'short', timeStyle: 'short' }).format(ask.createdAt)
        })
      })
    })

})

app.post('/save-response', (req, res) => {
  const { response, ask } = req.body
  ResponseModels.create({ body: response, AskId: ask })
    .then(() => res.redirect(`/pergunta/${ask}`))
})


app.listen(portServer,(err) => {
  if (!err) return console.log(`Servidor Iniciado na porta: ${portServer}`);
  return console.log('Erro:', err);
})