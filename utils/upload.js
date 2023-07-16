const multer = require("multer");

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, "public/");
		},
		filename(req, file, callback) {
			const extension = file.originalname.split(".").pop();
			callback(null, req.user.nickName + "." + extension);
		},
	}),
});

module.exports = upload;
