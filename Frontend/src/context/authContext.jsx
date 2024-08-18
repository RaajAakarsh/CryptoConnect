import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
	const [showSignup, setShowSignup] = useState(false);
	const [showSignin, setShowSignin] = useState(false);
	const [isAuthenticated, SetisAuthenticated] = useState(false);

	// const fetchAllCoin = async() =>{
	//     const options = {
	//         method: 'GET',
	//         headers: {accept: 'application/json', 'x-cg-demo-api-key': COINGECKO_API_KEY}
	//       };

	//       fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
	//         .then(response => response.json())
	//         .then(response => setAllCoin(response))
	//         .catch(err => console.error(err));
	// }

	// useEffect(()=>{
	//     fetchAllCoin();
	// },[currency])

	const contextValue = {
		showSignup,
		showSignin,
		isAuthenticated,
		setShowSignup,
		setShowSignin,
		SetisAuthenticated,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
