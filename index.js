require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const jsonwebtoken = require('jsonwebtoken')

const User = require('./UserModel')

const app = express()
// const fs = require('fs-extra');  // file system
const PORT = process.env.PORT
const HOST = process.env.HOST

app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
	//authenticate user
	//si ok, générer token
	User.login(req.body.email, req.body.password)
		.then(user => {
			const token = jsonwebtoken.sign({ user }, process.env.SECRET_KEY)
			res.json({success : 'Authentication succeeded! ', token})
		})
})

app.post('/register', (req, res) => {
	User.register(req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.password_confirmation)
		.then(user => {
			res.json({ success: 'User account created! You can log in!' })
		})
		.catch(error => {
			res.status(500).send(error.join(', '))
		})
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
