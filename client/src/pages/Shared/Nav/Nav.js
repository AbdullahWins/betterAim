import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Button, Image } from "react-bootstrap";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="navbar bg-base-100 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden d-lg-none">
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
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="my-2">
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              {user?.uid ? (
                <>
                  <Link to="myreviews">
                    <Button className="btn btn-ghost">My Reviews</Button>
                  </Link>
                  <Link to="addservice">
                    <Button className="btn btn-ghost">Add Service</Button>
                  </Link>
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Link className="m-2" to="login">
                  <Button className="btn btn-ghost">Login</Button>
                </Link>
              )}
            </ul>
          </div>
          <Link className="btn btn-ghost normal-case text-xl">Better Aim</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="mx-2">
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
          </ul>
          <div>
            {user?.uid ? (
              <div className="d-flex align-items-center justify-content-end m-2">
                <Image
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title={user.displayName}
                  referrerPolicy="no-referrer"
                  roundedCircle
                  style={{ height: "30px", marginRight: "15px" }}
                  src={user.photoURL}
                  alt="profile picture"
                />
                <Link to="/myreviews">
                  <Button className="btn btn-ghost">My Reviews</Button>
                </Link>
                <Link to="/addservice">
                  <Button className="btn btn-ghost mx-2">Add Service</Button>
                </Link>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link className="m-2" to="login">
                <Button className="btn btn-ghost">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
