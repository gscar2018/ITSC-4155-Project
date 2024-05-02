import type React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../api/auth/authContext";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
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
            toast.success("Login successful! you will be redirected shortly", {
                position: "bottom-right",
                autoClose: 2000,
                theme: "dark",
            })
            // Redirect to homepage
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please try again.");
            toast.error("Login failed. Please try again.", {
                position: "bottom-right",
                autoClose: 3000,
                theme: "dark",
            })
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
        //make appear on start
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-base-200 flex justify-center items-center h-screen w-screen">
            <ToastContainer />
            <div className=" border-t-8 rounded-sm border-neutral bg-base-100 p-12 shadow-2xl w-96">
                <h2 className="font-bold text-center block text-2xl" >Login</h2>
                {/* Display error message if exists */}
                <form onSubmit={handleLogin} className="form-control">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded px-3 py-2 mb-3"
                        required
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded px-3 py-2 mb-3"
                        required
                    />
                    <br />

                    <button
                        type="submit"
                        className="btn bg-neutral hover:bg-primary text-neutral-content font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </motion.div>
    );
}

export default LoginPage;
