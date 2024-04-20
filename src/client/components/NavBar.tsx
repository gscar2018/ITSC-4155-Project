import { NavLink, Outlet } from "react-router-dom";
import { checkLogin } from "../api/apiCalls";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../api/auth/authContext";
const NavBar = () => {
	const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

	const handleLogout = async () => {
		try {
			await axios.post("/api/auth/logout");
			setIsLoggedIn(false);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const isLoggedIn = await checkLogin();
				setIsLoggedIn(isLoggedIn);
			} catch (error) {
				console.error("Error checking login status:", error);
			}
		};
		checkLoginStatus();
	}, [setIsLoggedIn]);
	return (
		<>
			<div className="navbar bg-neutral px-4 py-2 w-full">
				<div className="navbar-start">
					<NavLink to="/" className="cursor-pointer">
						<h3 className="text-neutral-content hover:">ITSC 4155</h3>
					</NavLink>
				</div>
				<div className="navbar-center lg:flex">
					<label className="input input-bordered input-sm md:input-md flex items-center gap-2">
						<input type="text" className="grow" placeholder="Search" />
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="w-4 h-4 opacity-70"
						>
							<title>Search</title>
							<path
								fillRule="evenodd"
								d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
								clipRule="evenodd"
							/>
						</svg>
					</label>
				</div>
				<div className="navbar-end">
					<div className="join join-horizontal mx-2 ">
						{isLoggedIn ? (
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
							<li>
								<NavLink to="/test" className="text-base-content">
									Test Page
								</NavLink>
							</li>
							<li>
								<NavLink to="/upload" className="text-base-content">
									Upload
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default NavBar;
