const mongoose = require("mongoose");

mongoose
	.connect(
		process.env.DB_URL
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
