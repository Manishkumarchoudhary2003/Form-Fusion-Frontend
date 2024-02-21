import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { userLoginApiService } from "../../api/AuthApiService";
import { authActions } from "../../store/auth-slice";
import { retrieveUserByEmailApiService } from "../../api/UserApiService";
import { useNavigate } from "react-router-dom";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      dispatch(authActions.setToken(storedToken));
      dispatch(authActions.setUserId(storedUserId));
      dispatch(authActions.setAuthentication());
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await userLoginApiService(email, password);
      dispatch(authActions.setToken(token));
      localStorage.setItem("token", token);
      dispatch(authActions.setAuthentication());

      retrieveUserByEmailApiService(email, token)
        .then((response) => {
          const user = response;
          if (user && user.userId) {
            const userId = user.userId;
            console.log(user.role);
            dispatch(authActions.setUserId(userId));
            localStorage.setItem("userId", userId);
            if(user.role){
              localStorage.setItem("role", user.role);
              dispatch(authActions.setRole(user.role));
            }
          } else {
            console.error("User or userId not found in response:", response);
          }
          setEmail("");
          setPassword("");
          setError("");
          setSuccessMessage("Login successful.");
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/");
            window.location.reload();
          }, 1000);
          console.log("Login successful:", token);
        })
        .catch((error) => {
          console.error("Error fetching user by email data:", error);
        });
    } catch (error) {
      setError("Invalid email or password");
      console.error("Error logging in:", error);
    }
  };

  return (
    <Container className="mt-5 p-1">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="mb-4">Login</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <p>Please fill out the form to login:</p>
          <Form onSubmit={handleSubmit}>
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
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                style={{ backgroundColor: "#f0f0f0" }}
                className="text-secondary"
              />
            </Form.Group>
            <button
              type="submit"
              style={{
                marginTop: "30px",
                borderColor: "#c3d9e1",
                borderRadius: "0.25rem",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0.1s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f8fdff")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Login
            </button>
          </Form>
          <p>
            Don't have an account?{" "}
            <a
              href="/register"
              style={{ textDecoration: "none", color: "#1372c0" }}
              onMouseEnter={(e) => (e.target.style.color = "#000000")}
              onMouseLeave={(e) => (e.target.style.color = "#1372c0")}
            >
              Register here
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;

// import { useDispatch } from "react-redux";
// import React, { useState, useEffect } from "react";
// import { userLoginApiService } from "../../api/AuthApiService";
// import { authActions } from "../../store/auth-slice";
// import { retrieveUserByEmailApiService } from "../../api/UserApiService";
// import { useNavigate } from "react-router-dom";

// const LoginComponent = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUserId = localStorage.getItem("userId");

//     if (storedToken && storedUserId) {
//       dispatch(authActions.setToken(storedToken));
//       dispatch(authActions.setUserId(storedUserId));
//       dispatch(authActions.setAuthentication());
//     }
//   }, [dispatch]);

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const token = await userLoginApiService(email, password);
//       dispatch(authActions.setToken(token));
//       localStorage.setItem("token", token);
//       dispatch(authActions.setAuthentication());

//       retrieveUserByEmailApiService(email, token)
//         .then((response) => {
//           const user = response;
//           if (user && user.userId) {
//             const userId = user.userId;
//             localStorage.setItem("userId", userId);
//             dispatch(authActions.setUserId(userId));
//           } else {
//             console.error("User or userId not found in response:", response);
//           }
//           setEmail("");
//           setPassword("");
//           setError("");
//           setSuccessMessage("Login successful.");
//           setTimeout(() => {
//             setSuccessMessage("");
//             navigate("/");
//           }, 2000);
//           console.log("Login successful:", token);
//         })
//         .catch((error) => {
//           console.error("Error fetching user by email data:", error);
//         });
//     } catch (error) {
//       setError("Invalid username or password");
//       console.error("Error logging in:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="container card mt-5">
//         <h2 className="col-md-6 offset-md-3">Login</h2>
//         {error && <div className="alert alert-danger">{error}</div>}
//         {successMessage && (
//           <div className="alert alert-success">{successMessage}</div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="email"
//               value={email}
//               onChange={handleEmailChange}
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
//             />
//           </div>
//           <button type="submit" className="btn btn-primary mb-3">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginComponent;
