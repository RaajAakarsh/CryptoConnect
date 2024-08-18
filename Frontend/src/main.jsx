import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CoinContextProvider from "./context/coinContext.jsx";
import AuthContextProvider from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthContextProvider>
			<CoinContextProvider>
				<App />
			</CoinContextProvider>
		</AuthContextProvider>
	</StrictMode>
);
