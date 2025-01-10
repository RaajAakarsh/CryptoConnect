import React, { useState } from "react";

const useChat = () => {
	const [chatHistory, setChatHistory] = useState([]);
	return { chatHistory, setChatHistory };
};

export { useChat };
