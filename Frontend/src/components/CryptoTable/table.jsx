import { useContext, useEffect, useState } from "react";
import "./table.css";
import { CoinContext } from "../../context/coinContext";

const CryptoTable = ({ displayCoin }) => {
	const { allCoin, currency } = useContext(CoinContext);

	return (
		<>
			<div className="crypto-table-outer-container">
				<div className="crypto-table-container">
					<div className="crypto-table-layout">
						<p id="table-col-1">#</p>
						<p id="table-col-2">Coin</p>
						<p id="table-col-3">Price</p>
						<p id="table-col-4">24h</p>
						<p id="table-col-5">24h - high</p>
						<p id="table-col-6">24h - low</p>
						<p id="table-col-7">Market Cap</p>
					</div>
					{displayCoin.slice(0, 10).map((item, index) => (
						<div className="crypto-table-layout" key={index}>
							<p id="table-col-1">{item.market_cap_rank}</p>
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
