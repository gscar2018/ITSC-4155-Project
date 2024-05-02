import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../api/auth/authContext";
import Search from "./Search";
import logo from "./logo.png";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
const NavBar = () => {
    const { logout, userId } = useAuth();
    const [isBouncingLogo, setIsBouncingLogo] = useState(false);


    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logout successful!", {
                position: "bottom-right",
                autoClose: 2000,
                theme: "dark",
            });
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.", {
                position: "bottom-right",
                autoClose: 3000,
                theme: "dark",
            });
        }
    };
    const bounceAnimation = {
        scale: 0.8,
        transition: {
            yoyo: Number.POSITIVE_INFINITY,
            from: 0.8,
            duration: 0.2,
            ease: "easeOut",
        },
    };
    const handleLogoClick = () => {
        setIsBouncingLogo(true);
        setTimeout(() => {
            setIsBouncingLogo(false);
        }, 2000);
    }

    return (
        <>
            <div className="navbar bg-neutral px-4 py-2 w-full">
                <ToastContainer />
                <div className="navbar-start flex items-center">
                    <motion.div
                        className="flex items-center"
                        whileTap={{ scale: 0.8 }} // Remove the bounceAnimation here
                        animate={isBouncingLogo ? bounceAnimation : undefined}
                        onClick={handleLogoClick}
                    >
                        <NavLink to="/" className="cursor-pointer">
                            {/* Displaying the logo */}
                            {/* Displaying the logo with bounce animation */}
                            <img src={logo} alt="Logo" className="logo-img" />
                        </NavLink>
                        <NavLink to="/" className="cursor-pointer">
                            <h3 className="text-neutral-content hover: ml-2">Reaction Engine</h3>
                        </NavLink>
                    </motion.div>
                </div>

                <div className="navbar-center">
                    <div className="flex justify-center items-center">
                        <Search />
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="join join-horizontal mx-2 ">
                        {userId ? (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="btn btn-sm btn-outline text-neutral-content join-item"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="btn btn-sm btn-outline text-neutral-content join-item"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/signup"
                                    className="btn btn-sm btn-outline text-neutral-content join-item"
                                >
                                    Sign up
                                </NavLink>
                            </>
                        )}
                    </div>
                    <div id="dropdown" className="dropdown dropdown-left">
                        <div
                            tabIndex={0}
                            role="button"
                            className="text-neutral-content btn btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 hover:text-neutral-content"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <title>Menu</title>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul className="menu menu-sm px-1 dropdown-content dropdown-center mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52">
                            <li>
                                <NavLink to="/" className="text-base-content">
                                    Home
                                </NavLink>
                            </li>
                            {userId && (
                                <div>
                                    <li>
                                        <NavLink to="/upload" className="text-base-content">
                                            Upload
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={`/account/${userId}`}
                                            className="text-base-content"
                                        >
                                            Account
                                        </NavLink>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default NavBar;

