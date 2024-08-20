import { useContext, useState } from "react";
import "./table.css";
import { CoinContext } from "../../context/coinContext";
import { AuthContext } from "../../context/authContext";
import watchlist from "../../assets/watchlist.png";
import starred from "../../assets/starred.png";
import not_starred from "../../assets/not_starred.png";

const CryptoTable = ({ displayCoin }) => {
	const { allCoin, currency, track, setTrack, watchList } =
		useContext(CoinContext);
	const { isAuthenticated, token, setToken } = useContext(AuthContext);

	const handleStarred = (coinId) => {
		setToken(localStorage.getItem("token"));

		if (token && coinId) {
			const url = "http://localhost:3000/api/v1/watchlist/starred";
			const headers = {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			};

			fetch(url, {
				method: "PATCH",
				headers,
				body: JSON.stringify({ coinId }),
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error(`Error updating watched coins: ${response.status}`);
					}
				})
				.then((updatedUser) => {
					// console.log(updatedUser);
					setTrack(track + 1);
				})
				.catch((error) => {
					console.error("Error updating watched coins:", error);
				});
		}
	};

	return (
		<>
			<div className="crypto-table-outer-container">
				<div className="crypto-table-container">
					<div
						className="crypto-table-layout"
						style={
							isAuthenticated
								? {
										gridTemplateColumns:
											"0.5fr 0.5fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr",
								  }
								: {
										gridTemplateColumns:
											"0.5fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr",
								  }
						}
					>
						<p id="table-col-1">#</p>
						{isAuthenticated && (
							<p id="table-col-8">
								<img src={watchlist} alt="" />
							</p>
						)}
						<p id="table-col-2">Coin</p>
						<p id="table-col-3">Price</p>
						<p id="table-col-4">24h</p>
						<p id="table-col-5">24h - high</p>
						<p id="table-col-6">24h - low</p>
						<p id="table-col-7">Market Cap</p>
					</div>
					{displayCoin &&
						displayCoin.slice(0, 10).map((item, index) => (
							<div
								className="crypto-table-layout"
								key={index}
								style={
									isAuthenticated
										? {
												gridTemplateColumns:
													"0.5fr 0.5fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr",
										  }
										: {
												gridTemplateColumns:
													"0.5fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr",
										  }
								}
							>
								<p id="table-col-1">{item.market_cap_rank}</p>
								{isAuthenticated && (
									<p id="table-col-8">
										<button onClick={() => handleStarred(item.id)}>
											<img
												src={
													watchList.includes(item.id) ? starred : not_starred
												}
												alt=""
											/>
										</button>
									</p>
								)}
								<div>
									<img src={item.image} alt="" />
									<p>{item.name + "  " + item.symbol.toUpperCase()}</p>
								</div>
								<p id="table-col-3">
									{currency.symbol} {item.current_price.toLocaleString()}
								</p>
								<p
									id="table-col-4"
									className={
										item.price_change_percentage_24h > 0
											? "crypto-table-layout-green"
											: "crypto-table-layout-red"
									}
								>
									{Math.floor(item.price_change_percentage_24h * 100) / 100}
								</p>
								<p id="table-col-5">{item.high_24h}</p>
								<p id="table-col-6">{item.low_24h}</p>
								<p id="table-col-7">
									{currency.symbol} {item.market_cap.toLocaleString()}
								</p>
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default CryptoTable;
