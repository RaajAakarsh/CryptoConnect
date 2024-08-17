import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/navbar";
import Portfolio from "../components/Portfolio/portfolio";
import Footer from "../components/Footer/footer";

const AppRouter = () => {
	return (
		<React.StrictMode>
			<Router>
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
