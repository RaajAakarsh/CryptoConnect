import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CoinContextProvider from "./context/coinContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<CoinContextProvider>
			<App />
		</CoinContextProvider>
	</StrictMode>
);
