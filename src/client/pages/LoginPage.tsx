import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loginSuccess, setLoginSuccess] = useState(false); // State to track successful login

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3000/api/auth/login",
				{ email, password },
			);
			console.log(response.data);
			setLoginSuccess(true); // Set login success state
		} catch (error) {
			console.error("Login failed:", error);
			setError("Login failed. Please try again."); // Set error message
		}
	};

	// Render success message and redirect to homepage after successful login
	if (loginSuccess) {
		return (
			<div className="p-5">
				<h2 className="text-2xl font-bold mb-4">Login Successful!</h2>
				<p>
					You have successfully logged in. You may go to{" "}
					<NavLink to="/" className="text-blue-500">
						homepage
					</NavLink>{" "}
					now{" "}
				</p>
			</div>
		);
	}

	// Render login form
	return (
		<div className="p-5">
			<h2 className="text-2xl font-bold mb-4">Login</h2>
			{error && <p className="text-error">{error}</p>}{" "}
			{/* Display error message if exists */}
			<input
				type="text"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="border rounded px-3 py-2 mb-3"
			/>
			<br />
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="border rounded px-3 py-2 mb-3"
			/>
			<br />
			<button
				type="submit"
				onClick={handleLogin}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Login
			</button>
		</div>
	);
}

export default LoginPage;
