const { Schema } = require("mongoose");
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

if (month < 10) {
	month = "0" + month;
}
if (day < 10) {
	day = "0" + day;
}

let currentDate = year + "-" + month + "-" + day;

const EmotionSchema = new Schema({
	email: {
		type: String,
	},
	emotion: {
		type: String,
		default: null,
	},
	date: {
		type: String,
		default: currentDate,
	},
});

module.exports = EmotionSchema;
