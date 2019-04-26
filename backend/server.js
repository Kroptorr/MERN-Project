const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const itemRoutes = express.Router();
const PORT = 4000;

let Item = require("./item.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/local", {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once("open", function () {
	console.log("MongoDB database connection established successfully");
});

itemRoutes.route("/").get(function (req, res) {
	Item.find(function (err, items) {
		if (err) {
			console.log(err);
		}
		else {
			res.json(items);
		}
	});
});

itemRoutes.route("/:id").get(function (req, res) {
	let id = req.params.id;
	Item.findById(id, function (err, todo) {
		res.json(todo);
	});
});

itemRoutes.route("/add").post(function (req, res) {
	let item = new Item(req.body);
	item.save()
		.then(item => {
			res.status(200).json({"Item": "Item added successfully"});
		})
		.catch(err => {
			res.status(400).send("adding new Item failed");
		});
});
itemRoutes.route("/delete/:id").get(function (req, res) {
	Item.findOneAndDelete({_id: req.params.id}, function (err, item) {
		if (err) {
			res.json(err);
		}
		else {
			res.json("Successfully removed");
		}
	});
});
app.use("/local", itemRoutes);

app.listen(PORT, function () {
	console.log("Server is running on Port: " + PORT);
});

