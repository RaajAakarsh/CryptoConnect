import { AuthContext } from "../../context/authContext";
import "./signUp.css";
import { useContext, useState } from "react";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [firstname, setFirstname] = useState("");
	const [city, setCity] = useState("");
	const [password, setPassword] = useState("");
	const [recheckPassword, setRecheckPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [successMsg, setSuccessMsg] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const { showSignup, setShowSignup, showSignin, setShowSignin } =
		useContext(AuthContext);

	const handleHaveAcc = () => {
		setShowSignin(true);
		setShowSignup(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (password !== recheckPassword) {
			setPasswordError(true);
			setErrorMsg("Passwords Do Not Match");
		} else {
			const formData = {
				email,
				firstname,
				password,
				city,
			};

			fetch(`http://localhost:3000/api/v1/user/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.message === "User successfully created") {
						console.log("User signed up successfully!");
						setSuccessMsg(true);
						setErrorMsg("User signed up successfully!");
						setTimeout(() => {
							setShowSignup(!showSignup);
						}, 5000);
					} else {
						console.error("Error signing up:", data.message);
						setPasswordError(true);
						setErrorMsg(data.message);
					}
				})
				.catch((error) => {
					console.error("Error signing up: catch :", error);
				});
		}
	};

	return (
		<div className="sign-up-container">
			<div className="sign-up-inner-container">
				<h2>Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>

					<label htmlFor="firstname">First Name:</label>
					<input
						type="text"
						id="firstname"
						name="firstname"
						value={firstname}
						onChange={(event) => setFirstname(event.target.value)}
						required
					/>

					<label htmlFor="city">City:</label>
					<input
						type="text"
						id="city"
						name="city"
						value={city}
						onChange={(event) => setCity(event.target.value)}
						required
					/>

					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
					/>

					<label htmlFor="recheckPassword">Re-enter Password:</label>
					<input
						type="password"
						id="recheckPassword"
						name="recheckPassword"
						value={recheckPassword}
						onChange={(event) => setRecheckPassword(event.target.value)}
						required
					/>
					{passwordError && !successMsg && (
						<p style={{ color: "red" }}>{errorMsg}</p>
					)}
					{successMsg && <p style={{ color: "green" }}>{errorMsg}</p>}

					<button type="submit">Sign Up</button>
				</form>

				<div className="go-to-sign-in">
					<p>Already have an account?</p>
					<button className="sign-up-form-have-acc" onClick={handleHaveAcc}>
						Sign In
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
