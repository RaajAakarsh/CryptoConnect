import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
	const [showSignup, setShowSignup] = useState(false);
	const [showSignin, setShowSignin] = useState(false);
	const [isAuthenticated, SetisAuthenticated] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("token") || "");

	useEffect(() => {
		if (localStorage.getItem("token")) {
		  SetisAuthenticated(true);
		  setShowSignin(false);
		  setShowSignup(false);
		} else {
		  setShowSignup(true);
		  setShowSignin(false);
		  SetisAuthenticated(false);
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
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
