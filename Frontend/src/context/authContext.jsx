import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
	const [showSignup, setShowSignup] = useState(false);
	const [showSignin, setShowSignin] = useState(false);
	const [isAuthenticated, SetisAuthenticated] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("token") || "");
	const [user, setUser] = useState("");
	const [chat, setChat] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			SetisAuthenticated(true);
			setShowSignin(false);
			setShowSignup(false);
		} else {
			setShowSignup(false);
			setShowSignin(false);
			SetisAuthenticated(false);
		}

		if (token && typeof token === "string" && token !== "") {
			try {
				const decodedToken = jwtDecode(token);
				if (decodedToken) {
					setUser(decodedToken.name);
				}
			} catch (error) {
				console.error("Failed to decode token:", error);
			}
		}
	}, [token]);

	const contextValue = {
		showSignup,
		showSignin,
		isAuthenticated,
		token,
		setShowSignup,
		setShowSignin,
		SetisAuthenticated,
		setToken,
		setUser,
		user,
		chat,
		setChat,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
