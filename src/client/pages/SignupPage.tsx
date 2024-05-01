import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../api/auth/authContext";

function SignupPage() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { signup } = useAuth();
	const navigate = useNavigate();

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			console.log(email, password, username);
			await signup(email, password, username);
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
		<div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
			<div className=" border-t-8 rounded-sm border-neutral bg-white p-12 shadow-2xl w-96">
				<h2 className="font-bold text-center block text-2xl">Signup</h2>
				{/* Display error message if exists */}
				{error && <p className="text-error">{error}</p>}
				<form onSubmit={handleSignup} className="form-control">
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border rounded px-3 py-2 mb-3"
						required
					/>

					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="border rounded px-3 py-2 mb-3"
						required
					/>

					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border rounded px-3 py-2 mb-3"
						required
					/>

					<button
						type="submit"
						className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded mt-3"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignupPage;
