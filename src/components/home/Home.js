import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const goToForm = () => {
    navigate(`/user/${userId}/all-forms`);
  };
  return (
    <Container className="mt-5" style={{ marginBottom: "100px" }}>
      <Row>
        <Col
          md={6}
          className="d-flex align-items-center"
          style={{
            padding: "10px 50px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "3rem" }}>
              Get insights quickly, with Form Fusion
            </h1>
            <p>
              Form Fusion empowers you to gather valuable insights from your
              audience quickly and efficiently.
            </p>
            <button
              onClick={goToForm}
              style={{
                marginBottom: "20px",
                borderColor: "white",
                borderRadius: "0.25rem",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0.1s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7f6f6")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Go to Forms
            </button>
            <p>
              Don't have an account?{" "}
              <a
                href="/register"
                style={{ textDecoration: "none", color: "#1372c0" }}
                onMouseEnter={(e) => (e.target.style.color = "#000000")}
                onMouseLeave={(e) => (e.target.style.color = "#1372c0")}
              >
                Sign up for free
              </a>
            </p>
          </div>
        </Col>

        <Col
          md={6}
          style={{
            backgroundImage:
              'url("https://internal.mobrog.com/assets/images/image-main/Anyone-Can-Make-Money-with-Online-Surveys-article-page.webp")',
            //   'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpOPEiNaC7IguGps40-ZWBblImkL4INs9kSw&usqp=CAU")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
          }}
        >
          {/* Empty column to apply background image */}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
