const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')

let port = process.env.PORT || 3000

//cors
app.use(cors())

//motor plantillas
app.set('view engine', 'ejs')

//carpeta public
app.use(express.static('public'))

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Variables entorno
dotenv.config({ path: './env/.env' })

// //cookies
// app.use(cookieParser())

// //llamar router
app.use('/', require('./routes/router_config'))
// app.use('/', require('./routes/router.opera_codes'))
// app.use('/', require('./routes/router.guias'))
// app.use('/', require('./routes/router.tarifas'))
// app.use('/', require('./routes/router.tarifas_minig'))
// app.use('/', require('./routes/router.servicios'))
// app.use('/', require('./routes/router.ttoo'))
// app.use('/', require('./routes/router.usuarios'))
// app.use('/', require('./routes/router.views'))

app.get('/', (req, res) => {
	res.render('index')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
