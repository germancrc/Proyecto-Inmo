const database = require('../database/database')
let ImageKit = require('imagekit')

let imagekit = new ImageKit({
	publicKey: 'public_/XY4Uk9ZkTDuO/csEFqmLNIum0k=',
	privateKey: 'private_4fUZ+uuRDIz/GE2G8zSw0XTM4aI=',
	urlEndpoint: 'https://ik.imagekit.io/ytnv3sjurl',
})
//NEW CONDO
exports.create_property = (req, res) => {
	const tipo = req.body.tipo
	const nombre = req.body.nombre
	const ubicacion = req.body.ubicacion
	const precio = req.body.precio
	const descripcion = req.body.descripcion

	console.log(tipo, nombre, ubicacion, precio, descripcion)

	database.query('INSERT INTO propiedades SET ?', { tipo, nombre, ubicacion, precio, descripcion }, (error, results) => {
		if (error) {
			console.log(error)
		}
		// req.flash('message', 'Tarifa agregada con éxito')
		console.log('Propiedad ID: ' + results.id)
	})

	const images = req.files
	const url = []
	const location = ubicacion.replace(/\s/g, '')
	const name = nombre.replace(/\s/g, '')

	images.forEach((image, i) => {
		let base64img = image.buffer.toString('base64')
		// console.log(`image - ${i}: ` + base64img)
		console.log(image)

		// imagekit.upload(
		// 	{
		// 		file: base64img,
		// 		fileName: image.originalname,
		// 		folder: '/properties/' + tipo + '/' + location + '/' + name,
		// 	},
		// 	function (error, result) {
		// 		if (error) {
		// 			console.error(`Error uploading file ${i}: ${error.message}`)
		// 		} else {
		// 			url[i] = result.url
		// 			console.log(url)
		// 		}
		// 		if (url.length === 5) {
		// 			const sql = `INSERT INTO propiedades (picture_1, picture_2, picture_3, picture_4, picture_5) VALUES (?, ?, ?, ?, ?)`
		// 			const values = url
		// 			database.query(sql, values, (err, result) => {
		// 				if (err) {
		// 					console.error(`Error inserting URLs into database: ${err.message}`)
		// 				}
		// 				console.log(result)
		// 				res.redirect('/')
		// 			})
		// 		}
		// 	}
		// )
	})
}

// exports.create_property = async (req, res) => {
// 	const images = req.file.buffer.toString('base64')
// 	const tipo = req.body.tipo
// 	const nombre = req.body.nombre
// 	const ubicacion = req.body.ubicacion
// 	const precio = req.body.precio
// 	const descripcion = req.body.descripcion
// 	console.log(tipo, nombre, ubicacion, precio, descripcion)
// 	try {
// 		if (err) {
// 			console.error(`Error uploading files: ${err}`)
// 			return res.status(500).send('Error uploading files')
// 		}

// 		await imagekit.upload(
// 			{
// 				file: image, //required
// 				fileName: req.file.originalname, //required
// 				folder: /properties/ + tipo + '/' + ubicacion,
// 			},
// 			function (error, result) {
// 				if (error) console.log(error)
// 				else console.log(result.url)

// 				let main_picture = result.url

// 		database.query('INSERT INTO propiedades SET ?', { tipo, nombre, ubicacion, precio, descripcion, main_picture }, (error, results) => {
// 			if (error) {
// 				console.log(error)
// 			}
// 			// req.flash('message', 'Tarifa agregada con éxito')
// 			res.redirect('/')
// 			console.log(results)
// 		})
// 	}
// )

// 		// console.log(main_picture)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }

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
