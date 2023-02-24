const database = require('../database/database')
let ImageKit = require('imagekit')

let imagekit = new ImageKit({
	publicKey: 'public_/XY4Uk9ZkTDuO/csEFqmLNIum0k=',
	privateKey: 'private_4fUZ+uuRDIz/GE2G8zSw0XTM4aI=',
	urlEndpoint: 'https://ik.imagekit.io/ytnv3sjurl',
})
//NEW CONDO
// exports.create_property = async  (req, res) => {
// 	const tipo = req.body.tipo
// 	const nombre = req.body.nombre
// 	const ubicacion = req.body.ubicacion
// 	const precio = req.body.precio
// 	const descripcion = req.body.descripcion

// 	console.log(tipo, nombre, ubicacion, precio, descripcion)

// 	const images = req.files
// 	const url = []
// 	const location = ubicacion.replace(/\s/g, '')
// 	const name = nombre.replace(/\s/g, '')

// 	images.forEach((image, i) => {
// 		let base64img = image.buffer.toString('base64')
// 		// console.log(`image - ${i}: ` + base64img)

// 		imagekit.upload(
// 			{
// 				file: base64img,
// 				fileName: image.originalname,
// 				folder: '/properties/' + tipo + '/' + location + '/' + name,
// 			},
// 			function (error, result) {
// 				if (error) {
// 					console.error(`Error uploading file ${i}: ${error.message}`)
// 				} else {
// 					url[i] = result.url
// 					console.log(url)
// 				}
// 				if (url.length === 5) {
// 					const data = {
// 						tipo: req.body.tipo,
// 						nombre: req.body.nombre,
// 						ubicacion: req.body.ubicacion,
// 						precio: req.body.precio,
// 						descripcion: req.body.descripcion,
// 						picture_1: url[0],
// 						picture_2: url[1],
// 						picture_3: url[2],
// 						picture_4: url[3],
// 						picture_5: url[4],
// 					}
// 					database.query('INSERT INTO propiedades SET ?', data, (error, results) => {
// 						if (error) {
// 							console.log(error)
// 						}
// 						console.log(results)
// 					})
// 				}
// 			}
// 		)
// 	})
// }

exports.create_property = async (req, res) => {
	const tipo = req.body.tipo
	const nombre = req.body.nombre
	const ubicacion = req.body.ubicacion

	try {
		// 	console.log(tipo, nombre, ubicacion, precio, descripcion)

		// const image = req.files
		const location = ubicacion.replace(/\s/g, '')
		const name = nombre.replace(/\s/g, '')

		// let base64img = image.buffer.toString('base64')
		// upload images to ImageKit and get URLs
		const imageUrls = await Promise.all(
			req.files.map(async (file) => {
				const response = await imagekit.upload({
					file: file.buffer,
					fileName: file.originalname,
					folder: '/properties/' + tipo + '/' + location + '/' + name,
				})
				return response.url
			})
		)

		// insert data into MySQL database
		const data = {
			tipo: req.body.tipo,
			nombre: req.body.nombre,
			ubicacion: req.body.ubicacion,
			precio: req.body.precio,
			descripcion: req.body.descripcion,
			picture_1: imageUrls[0],
			picture_2: imageUrls[1],
			picture_3: imageUrls[2],
			picture_4: imageUrls[3],
			picture_5: imageUrls[4],
		}
		await query('INSERT INTO propiedades SET ?', data)

		// send response to client
		res.send('Images uploaded successfully')
	} catch (error) {
		console.error(error)
		res.status(500).send('Server error')
	}
}
////////////////////////////////////////////////////////
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
