import "./portfolio.css";
import ParticlesComponent from "../Background/particles";
import CryptoTable from "../CryptoTable/table";
import WatchlistTable from "../CryptoTable/watchListTable";
`2`;
import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/coinContext";
import { AuthContext } from "../../context/authContext";

const Portfolio = () => {
	const particless = React.useMemo(
		() => <ParticlesComponent id="portfolio-particles" />,
		[]
	);

	const { allCoin, currency } = useContext(CoinContext);
	const { isAuthenticated } = useContext(AuthContext);
	const [displayCoin, setDisplayCoin] = useState([]);
	const [showAllCoins, setShowAllCoins] = useState(true);
	const [coinSearch, setCoinSearch] = useState("");

	const handleShowAllCoins = () => {
		setShowAllCoins(true);
	};

	const handleShowWatchlist = () => {
		setShowAllCoins(false);
	};

	useEffect(() => {
		setDisplayCoin(allCoin);
	}, [allCoin]);

	const coinSearchFn = (event) => {
		setCoinSearch(event.target.value);
		if (event.target.value === "") {
			setDisplayCoin(allCoin);
		}
	};

	const handleCoinSearch = async (event) => {
		event.preventDefault();
		const coins = await allCoin.filter((item) => {
			return item.name.toLowerCase().includes(coinSearch.toLowerCase());
		});
		setDisplayCoin(coins);
	};

	return (
		<>
			<div className="portfolio-container">
				<div className="portfolio-header">
					<p>Explore, Invest and Connect with CryptoConnect</p>
					<form onSubmit={handleCoinSearch}>
						<input
							onChange={coinSearchFn}
							value={coinSearch}
							type="text"
							placeholder="Search"
							required
						/>
						<button type="submit">Search</button>
					</form>
				</div>
				{isAuthenticated && (
					<div className="portfolio-table-switch">
						<button
							onClick={handleShowAllCoins}
							style={{
								backgroundSize: showAllCoins ? undefined : "0% 0%",
								border: showAllCoins ? undefined : "orange solid 2px",
							}}
						>
							All Coins
						</button>
						<button
							onClick={handleShowWatchlist}
							style={{
								backgroundSize: !showAllCoins ? undefined : "0% 0%",
								border: !showAllCoins ? undefined : "orange solid 2px",
							}}
						>
							Your Watchlist
						</button>
					</div>
				)}

				<CryptoTable
					displayCoin={displayCoin}
					displayComponent={showAllCoins}
				/>
				<WatchlistTable
					displayCoin={displayCoin}
					displayComponent={showAllCoins}
				/>
			</div>
			{particless}
		</>
	);
};

export default Portfolio;
