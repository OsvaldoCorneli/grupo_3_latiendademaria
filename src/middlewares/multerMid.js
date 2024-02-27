const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let pathImagen;
		console.log(req.url)
		if (req.url == '/register' || req.url.includes('/update?_method=PUT') ) {
			pathImagen = path.join(__dirname,`../../public/images/users`)
		} else {
			pathImagen = path.join(__dirname,`../../public/images/uploads`)
		}
		cb(null, pathImagen)
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
	}
})

let upload = multer({storage: storage})

module.exports = upload