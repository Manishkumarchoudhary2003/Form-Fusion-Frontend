import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GetStart = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "100";

  const register = () => {
    navigate("/register");
  };

  const goToForm = () => {
    navigate(`/user/${userId}/all-forms`);
  };

  return (
    <Row
      className="justify-content-center mt-5"
      style={{ marginBottom: "50px", padding: "50px" }}
    >
      <Col md={6} className="text-center">
        <h1 className="display-4">Ready to begin?</h1>
        <button
          onClick={goToForm}
          style={{
            borderColor: "white",
            marginBottom : "20px",
            borderRadius: "0.25rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "transparent",
            transition: "background-color 0.1s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7f6f6")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Go to Forms
        </button>
        {!isAuthenticated && (
          <p>
            Don't have an account?{" "}
            <span
              onClick={register}
              style={{
                textDecoration: "none",
                color: "#1372c0",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#000000")}
              onMouseLeave={(e) => (e.target.style.color = "#1372c0")}
            >
              Register here
            </span>
          </p>
        )}
      </Col>
    </Row>
  );
};

export default GetStart;
