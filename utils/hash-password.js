const crypto = require('crypto');

module.exports = (password) => {
	const hash = crypto.createHash('sha256');
	console.log(typeof password);
	hash.update(password.toString());
	return hash.digest('hex');
};
