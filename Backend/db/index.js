const mongoose = require("mongoose");
// const DB_URL = require("../config");

mongoose
	.connect(
		"mongodb+srv://aak07:!QZd2Ce4_Ya5Aap@cryptoconnect.mdwg0.mongodb.net/"
	)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

const UserSchema = new mongoose.Schema({
	email: String,
	firstname: String,
	password: String,
	city: String,
	watchedCoins: [{ type: String }],
});

const User = mongoose.model("User", UserSchema);

module.exports = {
	User,
};
