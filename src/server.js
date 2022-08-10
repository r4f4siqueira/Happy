//importar dependencias
const express = require('express');
const path = require('path');
const pages = require('./pages.js')

//iniciando a biblioteca express
const server = express()

server
//utilizando body do req
.use(express.urlencoded({extended: true}))
//criando os arquivos estáticos
.use(express.static('public'))

//configurar template engine
.set('views', path.join(__dirname, "views"))
.set('view engine', 'hbs')

//rotas da aplicacao
.get('/', pages.index)
.get('/orphanage', pages.orphanage)
.get('/orphanages', pages.orphanages)
.get('/create-orphanage', pages.createOrphanage)
.post('/save-orphanage', pages.saveOrphanage)

// ligar o servidor
console.log('\nAcesse-> http://localhost:5000/')
server.listen(5000)