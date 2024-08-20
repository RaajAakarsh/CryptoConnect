import "./navbar.css";
import navbar_logo from "../../assets/navbar-logo.png";
import { useContext, useState } from "react";
import { CoinContext } from "../../context/coinContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
	const { setCurrency } = useContext(CoinContext);
	const {
		showSignup,
		setShowSignup,
		showSignin,
		setShowSignin,
		isAuthenticated,
		setToken,
	} = useContext(AuthContext);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setToken("");
	};

	const handleAuthForm = () => {
		setShowSignup(!showSignup);
	};

	const handleAuthFormSignIn = () => {
		setShowSignin(!showSignin);
	};

	const notAuthenticated = () => {
		return !showSignin && !isAuthenticated ? (
			<button onClick={handleAuthForm}>SignUp</button>
		) : (
			<button onClick={handleAuthFormSignIn}>SignIn</button>
		);
	};

	const currencyHandler = (event) => {
		switch (event.target.value) {
			case "usd": {
				setCurrency({ name: "usd", symbol: "$" });
				break;
			}
			case "eur": {
				setCurrency({ name: "eur", symbol: "€" });
				break;
			}
			case "inr": {
				setCurrency({ name: "inr", symbol: "₹" });
				break;
			}
			case "jpy": {
				setCurrency({ name: "jpy", symbol: "¥" });
				break;
			}
			case "gbp": {
				setCurrency({ name: "gbp", symbol: "£" });
				break;
			}
			case "xau": {
				setCurrency({ name: "xau", symbol: "Au" });
				break;
			}
			case "xag": {
				setCurrency({ name: "xag", symbol: "Ag" });
				break;
			}
			case "try": {
				setCurrency({ name: "try", symbol: "₺" });
				break;
			}
			case "aed": {
				setCurrency({ name: "aed", symbol: "د.إ" });
				break;
			}
			default: {
				setCurrency({ name: "usd", symbol: "$" });
				break;
			}
		}
	};

	return (
		<>
			<div className="navbar-container">
				<div className="navbar-container-symbol">
					<div className="navbar-heading-logo">
						<img src={navbar_logo} alt="CryptoConnect Logo" />
					</div>
					<div className="navbar-heading-text">CRYPTOCONNECT</div>
				</div>
				<div className="navbar-right">
					<select onChange={currencyHandler}>
						<option value="usd">USD</option>
						<option value="eur">EUR</option>
						<option value="inr">INR</option>
						<option value="jpy">JPY</option>
						<option value="gbp">GBP</option>
						<option value="xau">XAU</option>
						<option value="xag">XAG</option>
						<option value="try">TRY</option>
						<option value="aed">AED</option>
					</select>

					{isAuthenticated ? (
						<button onClick={handleLogout}>Logout</button>
					) : (
						notAuthenticated()
					)}

					{/* {isAuthenticated && !setShowSignin && !setShowSignup && (
						
					)} */}

					{/* {showSignup && !showSignin && !isAuthenticated && (
						<button onClick={handleAuthForm}>SignUp</button>
					)}
					{showSignin && !isAuthenticated && !showSignup && (
						<button onClick={handleAuthFormSignIn}>SignIn</button>
					)}
					{isAuthenticated && !showSignin && !showSignup && (
						<button onClick={handleLogout}>Logout</button>
					)} */}
				</div>
			</div>
		</>
	);
};

export default Navbar;
