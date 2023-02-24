const express = require('express')
const router_config = express.Router()
const multer = require('multer')
const properties_controller = require('../controllers/properties_controller')

//multer
const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter(req, file, cb) {
		if (file.mimetype.startsWith('image')) {
			cb(null, true)
		} else {
			cb('Please upload only images.', false)
		}
	},
}).array('images')
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
// const flash = require('connect-flash')

// router_usuarios.use(cookieParser('alert-cookies'))
// router_usuarios.use(
// 	session({
// 		secret: 'alert-cookies',
// 		cookie: { maxAge: 6000 },
// 		resave: true,
// 		saveUninitialized: true,
// 	})
// )

// router_usuarios.use(flash())

router_config.get('/', properties_controller.get_properties)
router_config.get('/config/new_property', properties_controller.view_new_property)
router_config.post('/config/new_property', upload, properties_controller.create_property)

module.exports = router_config
