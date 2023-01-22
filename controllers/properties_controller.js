const database = require('../database/database')
let ImageKit = require('imagekit')

let imagekit = new ImageKit({
	publicKey: 'public_/XY4Uk9ZkTDuO/csEFqmLNIum0k=',
	privateKey: 'private_4fUZ+uuRDIz/GE2G8zSw0XTM4aI=',
	urlEndpoint: 'https://ik.imagekit.io/ytnv3sjurl',
})
//NEW CONDO
exports.create_property = async (req, res) => {
	const images = req.file.buffer.toString('base64')
	const tipo = req.body.tipo
	const nombre = req.body.nombre
	const ubicacion = req.body.ubicacion
	const precio = req.body.precio
	const descripcion = req.body.descripcion
	console.log(tipo, nombre, ubicacion, precio, descripcion)
	try {
		await imagekit.upload(
			{
				file: images, //required
				fileName: req.file.originalname, //required
				folder: /properties/ + tipo + '/' + ubicacion,
			},
			function (error, result) {
				if (error) console.log(error)
				else console.log(result.url)

				let main_picture = result.url

				database.query('INSERT INTO propiedades SET ?', { tipo, nombre, ubicacion, precio, descripcion, main_picture }, (error, results) => {
					if (error) {
						console.log(error)
					}
					// req.flash('message', 'Tarifa agregada con éxito')
					res.redirect('/')
					console.log(results)
				})
			}
		)

		// console.log(main_picture)
	} catch (error) {
		console.log(error)
	}
}

exports.get_properties = (req, res) => {
	try {
		database.query('SELECT * FROM propiedades', (error, results) => {
			if (results) {
				res.render('index', { results: results })
				// console.log(results)
			} else {
				res.send('NO Hay propiedades')
				throw error
			}
		})
	} catch (error) {
		console.log(error)
	}
}

exports.view_new_property = (req, res) => {
	res.render('config/new_property')
}
