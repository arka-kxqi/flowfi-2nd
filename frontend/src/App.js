import './App.css';
import TablePage from './TablePage';
import ModalComponent from './ModalComponent';
import MainPage from './MainPage';
import LandingPage from './LandingPage';
import Navbar from './Navbar';
import { Routes, Route, Outlet, Link } from "react-router-dom";

export default function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="table" element={<TablePage />} />
				<Route path="main" element={<MainPage />} />
			</Routes>
		</div>
	);
}


