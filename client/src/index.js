import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LandingPage from './LandingPage';

import { BrowserRouter, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import GraphQLProvider from "./graphql";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path=":id/*" element={<GraphQLApp />} />
				<Route path="*" element={<LandingPage />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

function GraphQLApp() {
	const { id } = useParams();
	const [searchParams] = useSearchParams();
	let port = searchParams.get("port");
	if (port == null) {
		port = 8080;
	}
	return (
		<GraphQLProvider appId={"e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65040000000000000000000000e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65060000000000000000000000"} port={id}>
			<App />
		</GraphQLProvider>
	);
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
