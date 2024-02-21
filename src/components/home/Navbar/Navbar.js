import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isAuthenticated = localStorage.getItem("isLoggedIn") === "100";
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role") === "ADMIN_ROLES";

  return (
    <nav className="shadow bg-white">
      <div className={`logo nameDisplay ${isMenuOpen ? "hide" : ""}`}>
        <h2
          className="ml-5"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Form Fusion
        </h2>
      </div>
      <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
        {/* <NavLink to="/" className="navItem">
          Home
        </NavLink> */}
        <button
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
          style={{
            color: "#1372c0",
            border: "none",
            fontWeight: "bold",
            marginTop: "5px",
            padding: "0.5rem 1rem",
            fontSize: "1.2rem",
            cursor: "pointer",
            backgroundColor: "transparent",
            transition: "background-color 0s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Home
        </button>
        {!isAuthenticated && (
          <>
            {/* <NavLink to="/login" className="navItem">
              Login
            </NavLink>
            <NavLink to="/register" className="navItem">
              Register
            </NavLink> */}
            <button
              onClick={() => {
                navigate("/login");
                closeMenu();
              }}
              style={{
                color: "#1372c0",
                border: "none",
                fontWeight: "bold",
                marginTop: "5px",
                padding: "0.5rem 1rem",
                fontSize: "1.2rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Login
            </button>{" "}
            <button
              onClick={() => {
                navigate("/register");
                closeMenu();
              }}
              style={{
                color: "#1372c0",
                border: "none",
                fontWeight: "bold",
                marginTop: "5px",
                padding: "0.5rem 1rem",
                fontSize: "1.2rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Register
            </button>
          </>
        )}
        {isAuthenticated && (
          <>
            {/* <NavLink to={`/user/${userId}/all-forms`} className="navItem">
              All Forms
            </NavLink>
            <NavLink to={`/user/${userId}/create-form`} className="navItem">
              Create Form
            </NavLink>
            <NavLink to="/logout" className="navItem">
              Logout
            </NavLink> */}
            <button
              onClick={() => {
                navigate(`/user/${userId}/all-forms`);
                closeMenu();
              }}
              style={{
                color: "#1372c0",
                border: "none",
                fontWeight: "bold",
                marginTop: "5px",
                padding: "0.5rem 1rem",
                fontSize: "1.2rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Go to Forms
            </button>
            {/* <button
              onClick={() => {
                navigate(`/user/${userId}/create-form`);
                closeMenu();
              }}
              style={{
                color: "#1372c0",
                border: "none",
                fontWeight: "bold",
                marginTop: "5px",
                padding: "0.5rem 1rem",
                fontSize: "1.2rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              New Form
            </button> */}
            <button
              onClick={() => {
                navigate(`/user/user-details/${userId}`);
                closeMenu();
              }}
              style={{
                color: "#1372c0",
                border: "none",
                fontWeight: "bold",
                marginTop: "5px",
                padding: "0.5rem 1rem",
                fontSize: "1.2rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              My Account
            </button>{" "}
          </>
        )}
        {
          <button
            onClick={() => {
              navigate("/contact-us");
              closeMenu();
            }}
            style={{
              color: "#1372c0",
              border: "none",
              fontWeight: "bold",
              marginTop: "5px",
              padding: "0.5rem 1rem",
              fontSize: "1.2rem",
              cursor: "pointer",
              backgroundColor: "transparent",
              transition: "background-color 0s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            About Us
          </button>
        }
        {isAuthenticated && role && (
          <button
            onClick={() => {
              navigate("/users/all-users-details");
              closeMenu();
            }}
            style={{
              color: "#1372c0",
              border: "none",
              fontWeight: "bold",
              marginTop: "5px",
              padding: "0.5rem 1rem",
              fontSize: "1.2rem",
              cursor: "pointer",
              backgroundColor: "transparent",
              transition: "background-color 0s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            All Users
          </button>
        )}
        {isAuthenticated && (
          <button
            onClick={() => {
              navigate("/logout");
              closeMenu();
            }}
            style={{
              color: "#1372c0",
              border: "none",
              fontWeight: "bold",
              marginTop: "5px",
              padding: "0.5rem 1rem",
              fontSize: "1.2rem",
              cursor: "pointer",
              backgroundColor: "transparent",
              transition: "background-color 0s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Logout
          </button>
        )}
      </ul>
      <div className="burger" onClick={toggleMenu}>
        <div className={`line ${isMenuOpen ? "open1" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "open2" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "open3" : ""}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
