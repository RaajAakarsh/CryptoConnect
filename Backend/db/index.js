const mongoose = require("mongoose");
const DB_URL = import.meta.env.DB_URL;

mongoose
	.connect(
		DB_URL
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
