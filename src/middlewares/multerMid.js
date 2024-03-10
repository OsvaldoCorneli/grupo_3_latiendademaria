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


let upload = multer({
	fileFilter: function (req,file,cb) {
		const validTypes = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)
		const fileSize = file.size < 2048000;
		const files = req.files.length <= 5;
		if (validTypes && fileSize && files){
			cb(null, true)
		} else if (!validTypes && fileSize && files) {
			cb(new Error("los formatos de imagen permitidos son .jpeg, .jpg y .png"))
		} else if (validTypes && !fileSize && files) {
			cb(new Error("las imagenes deben pesar menos de 2MB"))
		} else if (validTypes && fileSize && !files) {
			cb(new Error("limite maximo de 5 imagenes en total"))
		} else {
			cb(null,false)
		}
	},
	storage: storage,
})

module.exports = upload