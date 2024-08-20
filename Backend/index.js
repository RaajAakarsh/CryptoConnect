const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./routes/user");
const watchlistRouter = require("./routes/watchlist");
const cors = require("cors");

app.options("*", cors());
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/watchlist", watchlistRouter);

// const PORT = 3000;
// app
// 	.listen(PORT, () => {
// 		console.log(`Server is running on port ${PORT}`);
// 	})
// 	.on("error", (err) => {
// 		console.error("Error starting server:", err);
// 	});

module.exports = async (req, res) => {
	return app(req, res);
};
