import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import feature3 from "../../assets/feature3.jpg";

const Features3 = () => {
  return (
    <Container
      className="mt-15"
      style={{ marginTop: "250px", marginBottom: "250px" }}
    >
      <Row>
        <Col
          md={6}
          style={{
            backgroundImage: `url(${feature3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
          }}
        >
          {/* Empty column to apply background image */}
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center"
          style={{
            padding: "10px 50px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "2.5rem" }}>
              Simplify Survey Creation and Response with Form Fusion
            </h2>
            <p>
              Form Fusion enables easy creation and response to surveys from
              anywhere. Whether on desktop, tablet, or smartphone, access our
              platform seamlessly to create, edit, and manage forms. Respondents
              can conveniently answer from any device, ensuring flexibility and
              accessibility for all.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Features3;
