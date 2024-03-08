import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="navbar ">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/test">Test page</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
