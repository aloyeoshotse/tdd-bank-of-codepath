import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TransactionDetail } from "../TransactionDetail/TransactionDetail";
import { useState } from "react";

export default function App() {

  // state variables and their handlers
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [error, setError] = useState();
  const [filterInputValue, setFilterInputValue] = useState("");

	return (
		<div className='App'>
			<BrowserRouter className='app'>
				<Navbar />
				<main>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/transactions/:transactionId' element={<TransactionDetail />} />
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}
