require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
// const fs = require('fs-extra');  // file system
const PORT = process.env.PORT
const HOST = process.env.HOST

app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
	//authenticate user
	//si ok, générer token
})

app.post('/register', (req, res) => {
	//...
})

// app.listen(PORT, HOST, () => console.log("app démarrée sur localhost:9000"))

const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;


const startApp = app => {
	return new Promise((resolve, reject) => {
		const server = app.listen(PORT, HOST, resolve)
		server.on('error', reject)
	})
}

mongoose.connect( connectionString )
	.then(() => startApp(app))
	.catch(err => console.log(err));
