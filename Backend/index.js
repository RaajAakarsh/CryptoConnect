const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./routes/user");

app.use(bodyParser.json());
app.use("/api/v1/user", userRouter);

const PORT = 3000;
app
	.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	})
	.on("error", (err) => {
		console.error("Error starting server:", err);
	});
