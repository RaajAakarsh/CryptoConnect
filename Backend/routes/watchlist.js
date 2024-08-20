const { Router } = require("express");
const router = Router();
const { User } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const watchlist_schema = zod.object({
	coinId: zod.string(),
});

router.get("/", async (req, res) => {
	const token = req.header("Authorization").replace("Bearer ", "");
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const decodedToken = jwt.verify(token, JWT_SECRET);
		const userId = decodedToken.userId;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const watchlistCoins = user.watchedCoins;
		res.json(watchlistCoins);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error getting watchlist coins" });
	}
});

router.patch("/starred", async (req, res) => {
	console.log("patch detected");
	const request = req.body;
	const result = watchlist_schema.safeParse(request);

	const token = req.header("Authorization").replace("Bearer ", "");
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	if (!result.success) {
		res.status(400).json({ message: "Invalid request", errors: result });
	} else {
		try {
			const decodedToken = jwt.verify(token, JWT_SECRET);
			const userId = decodedToken.userId;

			const user = await User.findById(userId);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			const coinId = req.body.coinId;
			if (!coinId) {
				return res.status(400).json({ message: "Coin ID is required" });
			}

			const watchedCoins = user.watchedCoins;
			const index = watchedCoins.indexOf(coinId);

			if (index === -1) {
				watchedCoins.push(coinId);
			} else {
				watchedCoins.splice(index, 1);
			}

			await user.save();

			res.json({ message: "Watchlist updated successfully" });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Error updating watchlist" });
		}
	}
});

module.exports = router;
