const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Item = new Schema({
	item_Text: {
		type: String
	}
});

module.exports = mongoose.model("Item", Item);