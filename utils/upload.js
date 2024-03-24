const multer = require("multer");

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, "public/image");
		},
		filename(req, file, callback) {
			const extension = file.originalname.split(".").pop();
			// console.log(`파일이름은 ${ req.user.nickName + "." + extension} 입니다.`);
			callback(null, req.user.nickName + "." + extension);
		},
	}),
});

module.exports = upload;
