import "./portfolio.css";
import ParticlesComponent from "../Background/particles";
import CryptoTable from "../CryptoTable/table";
import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/coinContext";

const Portfolio = () => {
	const particless = React.useMemo(
		() => <ParticlesComponent id="portfolio-particles" />,
		[]
	);

	const { allCoin, currency } = useContext(CoinContext);
	const [displayCoin, setDisplayCoin] = useState([]);
	const [coinSearch, setCoinSearch] = useState("");

	useEffect(()=>{
		setDisplayCoin(allCoin);
	},[allCoin])

	const coinSearchFn = (event) => {
		setCoinSearch(event.target.value);
		if(event.target.value === ""){
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
				<CryptoTable displayCoin={displayCoin}/>
			</div>
			{particless}
		</>
	);
};

export default Portfolio;
