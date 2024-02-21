import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GetStart = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const goToForm = () => {
    navigate(`/user/${userId}/all-forms`);
  };

  return (
    <Row className="justify-content-center mt-5" style={{marginBottom : "50px", padding : "50px"}}>
      <Col md={6} className="text-center">
        <h1 className="display-4">Ready to begin?</h1>
        <button
          onClick={goToForm}
          style={{
            borderColor: "white",
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
      </Col>
    </Row>
  );
};

export default GetStart;
