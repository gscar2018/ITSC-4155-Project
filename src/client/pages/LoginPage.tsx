import type React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../api/auth/authContext";

function LoginPage() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			// Redirect to homepage
			navigate("/");
		} catch (error) {
			console.error("Login failed:", error);
			setError("Login failed. Please try again.");
		}
	};

	// // Render success message and redirect to homepage after successful login
	// if (loginSuccess) {
	// 	return (
	// 		<div className="p-5">
	// 			<h2 className="text-2xl font-bold mb-4">Login Successful!</h2>
	// 			<p>
	// 				You have successfully logged in. You may go to{" "}
	// 				<NavLink to="/" className="text-info">
	// 					homepage
	// 				</NavLink>{" "}
	// 				now{" "}
	// 			</p>
	// 		</div>
	// 	);
	// }

	// Render login form
	return (
		<div className="p-5">
			<h2 className="font-bold mb-4">Login</h2>
			{/* Display error message if exists */}
			{error && <p className="text-error">{error}</p>}{" "}
			<form onSubmit={handleLogin} className="form-control">
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
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Login
				</button>
			</form>
		</div>
	);
}

export default LoginPage;
