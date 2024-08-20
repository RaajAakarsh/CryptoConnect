import { AuthContext } from "../../context/authContext";
import "./signUp.css";
import { useContext, useState } from "react";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [successMsg, setSuccessMsg] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const {
		setShowSignup,
		showSignin,
		setShowSignin,
		setToken
	} = useContext(AuthContext);

	const handleHaveAcc = () => {
		setShowSignin(false);
		setShowSignup(true);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = {
			email,
			password,
		};

		fetch(`https://crypto-connect-api.vercel.app/api/v1/user/signin`,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message === "User signed in successfully") {
					const token = data.token; 
					localStorage.setItem("token", token); 
					console.log("User signed in successfully!");
					setSuccessMsg(true);
					setErrorMsg("User signed in successfully!");
					setTimeout(() => {
						setShowSignin(false);
						setToken(token);
					}, 3000);
				} else {
					console.error("Error signing up:", data.message);
					setPasswordError(true);
					setErrorMsg(data.message);
				}
			})
			.catch((error) => {
				console.error("Error signing up: catch :", error);
			});
	};

	return (
		<div className="sign-up-container">
			<div className="sign-up-inner-container">
				<h2>Sign In</h2>
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

					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
					/>

					{passwordError && !successMsg && (
						<p style={{ color: "red" }}>{errorMsg}</p>
					)}
					{successMsg && <p style={{ color: "green" }}>{errorMsg}</p>}

					<button type="submit">Sign In</button>
				</form>
				<div className="go-to-sign-in">
					<p>Create a new account!</p>
					<button className="sign-up-form-have-acc" onClick={handleHaveAcc}>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
