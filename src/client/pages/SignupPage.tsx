import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../api/auth/authContext";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
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
            toast.success("Signup successful! You will be redirected shortly", {
                position: "bottom-right",
                autoClose: 2000,
                theme: "dark",
            })
            navigate("/");
        } catch (error) {
            console.error("Signup failed:", error);
            toast.error("Signup failed. Please try again.", {
                position: "bottom-right",
                autoClose: 3000,
                theme: "dark",
            })
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-base-200 flex justify-center items-center h-screen w-screen">
            <div className=" border-t-8 rounded-sm border-neutral bg-base-100 p-12 shadow-2xl w-96">
                <h2 className="font-bold text-center block text-2xl">Signup</h2>
                {/* Display error message if exists */}
                <ToastContainer />
                <form onSubmit={handleSignup} className="form-control">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded px-3 py-2 mb-3"
                        required
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        className="btn bg-neutral hover:bg-primary text-neutral-content font-bold py-2 px-4 rounded mt-3"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </motion.div>
    );
}

export default SignupPage;
