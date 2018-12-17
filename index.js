const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
// const fs = require('fs-extra');  // file system
const PORT = process.env.PORT
const HOST = process.env.HOST

app.post('/login', (req, res) => {
	//...
})

app.post('/register', (req, res) => {
	//...
})

// app.listen(PORT, HOST, () => console.log("app démarrée sur localhost:9000"))

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const startApp = app => {
	return new Promise((resolve, reject) => {
		const server = app.listen(PORT, HOST, resolve)
		server.on('error', reject)
	})
}
