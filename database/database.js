const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const connection = mysql.createConnection(process.env.DATABASE_URL, {
	timezone: 'local',
})

connection.connect((error) => {
	if (error) {
		console.log('Error de conexion: ' + error)
		return
	}
	console.log('Conectado a DB Planetscale Inmobiliaria')
})

module.exports = connection
