import { useContext, useState } from "react";
import "./watchlistTable.css";
import { CoinContext } from "../../context/coinContext";
import { AuthContext } from "../../context/authContext";
import watchlist from "../../assets/watchlist.png";
import starred from "../../assets/starred.png";
import next from "../../assets/next.png";
import previous from "../../assets/Previous.png";
import not_starred from "../../assets/not_starred.png";

const WatchlistTable = ({ displayCoin }) => {
	const [startData, setStartData] = useState(0);
	const [endData, setEndData] = useState(10);
	const { currency, track, setTrack, watchList } = useContext(CoinContext);
	const { isAuthenticated, token, setToken } = useContext(AuthContext);

	const handleNext = () => {
		if (endData === 100) {
			setStartData(0);
			setEndData(10);
		} else {
			setStartData(startData + 10);
			setEndData(endData + 10);
		}
	};

	const handlePrev = () => {
		if (startData === 0) {
			setStartData(90);
			setEndData(100);
		} else {
			setStartData(startData - 10);
			setEndData(endData - 10);
		}
	};

	const handleStarred = (coinId) => {
		setToken(localStorage.getItem("token"));

		if (token && coinId) {
			const url =
				"https://crypto-connect-api.vercel.app/api/v1/watchlist/starred";
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
			<div className="watchlist-table-container">
				<div className="watchlist-crypto-table-outer-container">
					<div className="watchlist-crypto-table-container">
						<div
							className="watchlist-crypto-table-layout"
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
						{Array.isArray(displayCoin) ? (
							displayCoin.slice(startData, endData).map((item, index) => (
								<div
									className="watchlist-crypto-table-layout"
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
												? "watchlist-crypto-table-layout-green"
												: "watchlist-crypto-table-layout-red"
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
							))
						) : (
							<></>
						)}
						<div className="watchlist-crypto-table-pagination-container">
							<div className="watchlist-crypto-table-pagination">
								<button className="pagination-prev" onClick={handlePrev}>
									<img src={previous} alt="" />
								</button>
								<p>
									{startData} - {endData}
								</p>
								<button className="pagination-next" onClick={handleNext}>
									<img src={next} alt="" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WatchlistTable;
