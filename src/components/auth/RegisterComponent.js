import React, { useState } from "react";
import { userRegisterApiService } from "../../api/AuthApiService";
import { useNavigate } from "react-router-dom";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const login = () =>{
    navigate("/login")
  }

  const handleContactChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
      if (value.length === 10) {
        setErrorMessage("");
      } else {
        setErrorMessage("Contact number must be 10 digits long.");
      }
    } else {
      setErrorMessage("Contact number must contain only digits.");
    }
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
      setErrorMessage("Password must contain at least one digit, one lowercase, one uppercase, and one special character.");
      return;
    }
    if (contact.length !== 10) {
      setErrorMessage("Contact number must be 10 digits long.");
      return;
    }
    const user = { username, password, email, contact, country };
    try {
      const response = await userRegisterApiService(user);
      console.log("User registered successfully:", response.data);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setContact("");
      setCountry("");
      setErrorMessage("");
      setSuccessMessage("User registered successfully.");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/login");
      }, 500);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(
          "Email is already registered. Please choose a different email."
        );
      } else {
        console.error("Error registering user:", error);
        setErrorMessage("An error occurred during registration.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container className="p-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h1 className="mb-4">Register</h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            <p>Please fill out the form to register:</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  style={{ backgroundColor: "#f0f0f0" }}
                  className="text-secondary"
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  style={{ backgroundColor: "#f0f0f0" }}
                  className="text-secondary"
                />
              </Form.Group>

              <Form.Group controlId="contactNo">
                <Form.Label>Contact No:</Form.Label>
                <Form.Control
                  type="text"
                  value={contact}
                  onChange={handleContactChange}
                  required
                  style={{ backgroundColor: "#f0f0f0" }}
                  className="text-secondary"
                />
              </Form.Group>

              <Form.Group controlId="country">
                <Form.Label>Country:</Form.Label>
                <Form.Control
                  type="text"
                  value={country}
                  onChange={handleCountryChange}
                  required
                  style={{ backgroundColor: "#f0f0f0" }}
                  className="text-secondary"
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  style={{ backgroundColor: "#f0f0f0" }}
                  className="text-secondary"
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  style={{ backgroundColor: "#f0f0f0" }}
                  className="text-secondary"
                />
              </Form.Group>

              <Form.Group controlId="showPasswordCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Show Password"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
              </Form.Group>
              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  borderColor: "#c3d9e1",
                  borderRadius: "0.25rem",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  transition: "background-color 0.1s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f8fdff")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Register
              </button>
            </Form>
            <p>
              Already have an account?
              <span
              onClick={login}
              style={{
                textDecoration: "none",
                color: "#1372c0",
                marginLeft: "5px", // Adjust the margin as needed
                cursor: "pointer", // Add cursor pointer to indicate it's clickable
              }}
              onMouseEnter={(e) => (e.target.style.color = "#000000")}
              onMouseLeave={(e) => (e.target.style.color = "#1372c0")}
            >
              Login here
            </span>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterComponent;







// import React, { useState } from "react";
// import { userRegisterApiService } from "../../api/AuthApiService";
// import { useNavigate } from "react-router-dom";

// const RegisterComponent = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const user = { username, password, email, role };
//     try {
//       const response = await userRegisterApiService(user);
//       console.log("User registered successfully:", response.data);
//       setUsername("");
//       setPassword("");
//       setEmail("");
//       setRole("");
//       setErrorMessage("");
//       setSuccessMessage("User registered successfully.");
//       setTimeout(() => {
//         setSuccessMessage("Registered successfully.");
//         navigate("/login");
//       }, 2000);

//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         setErrorMessage(
//           "Email is already registered. Please choose a different email."
//         );
//       } else {
//         console.error("Error registering user:", error);
//         setErrorMessage("An error occurred during registration.");
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="container card mt-5 md-5">
//         <h1 className="col-md-6 offset-md-3">Register</h1>
//         {errorMessage && (
//           <div className="alert alert-danger" role="alert">
//             {errorMessage}
//           </div>
//         )}
//         {successMessage && (
//           <div className="alert alert-success" role="alert">
//             {successMessage}
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">
//               Username:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="username"
//               value={username}
//               onChange={handleUsernameChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password:
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               value={password}
//               onChange={handlePasswordChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email:
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               value={email}
//               onChange={handleEmailChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="role" className="form-label">
//               Role:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="role"
//               value={role}
//               onChange={handleRoleChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <button type="submit" className="btn btn-primary">
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterComponent;
