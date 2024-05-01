import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../api/auth/authContext";
import { Icon } from "@iconify/react";
import Search from "./Search";
import logo from "./logo.png"; 

const NavBar = () => {
  const { logout, userId } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="navbar bg-neutral px-4 py-2 w-full">
        <div className="navbar-start flex items-center">
          <div className="flex items-center">
            <NavLink to="/" className="cursor-pointer">
              {/* Displaying the logo */}
              <img src={logo} alt="Logo" className="logo-img" />
            </NavLink>
            <NavLink to="/" className="cursor-pointer">
              <h3 className="text-neutral-content hover: ml-2">ITSC 4155</h3>
            </NavLink>
          </div>
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
              <li>
                <NavLink to="/test" className="text-base-content">
                  Test Page
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

