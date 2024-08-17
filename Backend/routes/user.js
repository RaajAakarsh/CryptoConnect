const { Router } = require("express");
const router = Router();
const { User } = require("../db");
const bcrypt = require("bcrypt");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signup_schema = zod.object({
	email: zod.string().email(),
	firstname: zod.string(),
	password: zod.string().min(8),
	city: zod.string(),
});

const signin_schema = zod.object({
	email: zod.string().email(),
	password: zod.string().min(8),
});

router.post("/signup", async (req, res) => {
    console.log("signup detected");
	const request = req.body;
	const result = signup_schema.safeParse(request);

	if (!result.success) {
		res
			.status(400)
			.json({ message: "Invalid request", errors: result.error.issues });
	} else {
		try {
			const existingUser = await User.findOne({ email: result.data.email });
			if (existingUser) {
				res.status(403).json({ message: "email already exists" });
			} else {
				const hashedPassword = await bcrypt.hash(result.data.password, 10);
				const user = await User.create({
					email: result.data.email,
					firstname: result.data.firstname,
					password: hashedPassword,
					city: result.data.city,
				});
				res.json({ message: "User successfully created" });
			}
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Error creating user" });
		}
	}
});

router.post("/signin", async (req, res) => {
    console.log("signin detected");
	const request = req.body;
	const result = signin_schema.safeParse(request);

	if (!result.success) {
		res
			.status(400)
			.json({ message: "Invalid request", errors: result});
	} else {
		try {
			const user = await User.findOne({ email: result.data.email });
			if (!user) {
				res.status(401).json({ message: "Invalid email or password" });
			} else {
				const isValidPassword = await bcrypt.compare(
					result.data.password,
					user.password
				);
				if (!isValidPassword) {
					res.status(401).json({ message: "Invalid email or password" });
				} else {
					const token = jwt.sign(
						{ userId: user._id, email: user.email },
						JWT_SECRET,
						{ expiresIn: "1h" }
					);
					res.json({ message: "User signed in successfully", token });
				}
			}
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Error signing in user" });
		}
	}
});

module.exports = router;
