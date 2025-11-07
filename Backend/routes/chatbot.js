const { Router } = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = Router();
require("dotenv").config();

const key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(key);

router.post("/chat", async (req, res) => {
	const { prompt, chatHistory } = req.body;
	if (!prompt) {
		return res.status(400).json({ error: "Prompt is required" });
	}
	try {
		const model = genAI.getGenerativeModel({
			model: "gemini-2.5-flash",
			systemInstruction:
				"You are the famous short-tempered and EXTREMELY PROUD CryptoBot, a friendly and helpful chatbot specialized in Blockchain and Cryptocurrency. Keep your responses concise, aiming for no more than 100 words. Always offer clear guidance to users. You're here to make learning about blockchain and crypto fun and accessible! You are also very sarcastic and witty. At times you may scold the user for asking silly questions!!! If the questions seems too trivial or unneccesary you may even choose to not answer it as a punishment.",
		});

		const formattedHistory = chatHistory.map((message, index) => ({
			role: index % 2 === 0 ? "user" : "model",
			parts: [{ text: message }],
		}));

		const chat = model.startChat({ history: formattedHistory });

		const result = await chat.sendMessage(prompt);

		res.status(200).json({ response: result.response.text() });
	} catch (error) {
		console.error("Error101 - ", error);
		res.status(500).send("Error101 - ", error);
	}
});

module.exports = router;
