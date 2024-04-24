import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../api/auth/authContext";

function SignupPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { signup } = useAuth();
	const navigate = useNavigate();

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signup(email, password);
			navigate("/");
		} catch (error) {
			console.error("Signup failed:", error);
			setError("Signup failed. Please try again."); // Set error message
		}
	};

	// Render success message and redirect to login page after successful signup
	//   if (signupSuccess) {
	//     return (
	//       <div className="p-5">
	//         <h2 className="text-2xl font-bold mb-4">Signup Successful!</h2>
	//         <p>You have successfully signed up. Please proceed to <NavLink to="/login" className="text-blue-500">login</NavLink>.</p>
	//       </div>
	//     );
	//   }

	// Render signup form
	return (
		<div className="p-5">
			<h2 className="text-2xl font-bold mb-4">Signup</h2>
			{/* Display error message if exists */}
			{error && <p className="text-error">{error}</p>}
			<form onSubmit={handleSignup} className="form-control">
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
					Signup
				</button>
			</form>
		</div>
	);
}

export default SignupPage;
