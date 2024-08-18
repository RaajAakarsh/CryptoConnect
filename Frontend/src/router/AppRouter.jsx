import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/navbar";
import Portfolio from "../components/Portfolio/portfolio";
import Footer from "../components/Footer/footer";
import SignUp from "../components/Auth/signUp";
import SignIn from "../components/Auth/signIn";
import { AuthContext } from "../context/authContext";

const AppRouter = () => {
	const { showSignup, showSignin } = useContext(AuthContext);

	return (
		<React.StrictMode>
			<Router>
				{showSignup ? <SignUp /> : <></>}
				{showSignin ? <SignIn /> : <></>}
				<Navbar />
				<Routes>
					<Route path="/" element={<Portfolio />} />
				</Routes>
				<Footer />
			</Router>
		</React.StrictMode>
	);
};

export default AppRouter;
