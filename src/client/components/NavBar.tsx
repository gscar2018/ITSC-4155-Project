import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react";

function NavBar() {
  return (
    <>
      <div className="z-10 navbar bg-neutral px-4 py-2 flex-row justify-between items-center w-full">
        <div className="navbar-start">
          <NavLink to={"/"} className="cursor-pointer">
            <h3 className="text-neutral-content hover:">ITSC 4155</h3>
          </NavLink>
        </div>
        <div className="navbar-end mt-2 md:mt-0 flex justify-end space-x-4">
          <button className="btn btn-sm btn-outline text-neutral-content mr-4 mx-5">
            Login / Sign-in
          </button>
          <div id="dropdown" className=" dropdown dropdown-left">
            <div
              tabIndex={0}
              role="button"
              className="text-neutral-content btn btn-ghost "
              /* onClick={toggleDropdown} */
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {
              /* isOpen && ( */
              <ul className="menu menu-sm px-1 dropdown-content dropdown-center mt-3 z-[1] p-2  shadow-lg bg-base-100 rounded-box w-52">
                <li>
                  <NavLink to={"/"} /* onClick={toggleDropdown} */>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/test"} /* onClick={toggleDropdown} */>
                    Test Page
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/upload"} /* onClick={toggleDropdown} */>
                    Upload
                  </NavLink>
                </li>
              </ul>
              /* ) */
            }
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;
