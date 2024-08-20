import { createContext, useContext, useEffect, useState } from "react";
import COINGECKO_API_KEY from "../../config";
import CONNECTION_URL from "../../config";
import { AuthContext } from "./authContext";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
	const { token, setToken } = useContext(AuthContext);
    const [track, setTrack] = useState(1);
	const [allCoin, setAllCoin] = useState([]);
	const [watchList, setWatchList] = useState([]);
	const [currency, setCurrency] = useState({
		name: "usd",
		symbol: "$",
	});

	const fetchAllCoin = async () => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				"x-cg-demo-api-key": COINGECKO_API_KEY,
			},
		};

		fetch(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
			options
		)
			.then((response) => response.json())
			.then((response) => setAllCoin(response))
			.catch((err) => console.error(err));
	};

	const getWatchlistCoins = () => {
		setToken(localStorage.getItem("token"));

		if (token) {
			const url = "https://crypto-connect-api.vercel.app/api/v1/watchlist/";
			const headers = {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			};

			fetch(url, {
				method: "GET",
				headers,
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error(
							`Error getting watchlist coins: ${response.status}`
						);
					}
				})
				.then((watchlistCoins) => {
					console.log("Watchlist fetched successfully");
					setWatchList(watchlistCoins);
				})
				.catch((error) => {
					console.error("Error getting watchlist coins:", error);
				});
		}
	};

	useEffect(()=>{
	    fetchAllCoin();
	},[currency])

	useEffect(() => {
		getWatchlistCoins();
	}, [token, track]);

	const contextValue = {
		allCoin,
		currency,
		setCurrency,
        watchList,
        track,
        setTrack
	};

	return (
		<CoinContext.Provider value={contextValue}>
			{props.children}
		</CoinContext.Provider>
	);
};

export default CoinContextProvider;
