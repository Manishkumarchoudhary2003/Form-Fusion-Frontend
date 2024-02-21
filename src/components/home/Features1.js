import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import feature1 from "../../assets/feature1.jpg";

const Features1 = () => {
  return (
    <Container
      className="mt-15"
      style={{ marginTop: "250px", marginBottom: "100px" }}
    >
      <Row>
        <Col
          md={6}
          style={{
            backgroundImage: `url(${feature1})`,
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
            <h1 style={{ fontSize: "2.5rem" }}>
              Create online forms effortlessly with Form Fusion
            </h1>
            <p>
              Our platform allows you to build forms as easily as drafting a
              document. Whether you're collecting feedback, conducting surveys,
              or gathering data, Form Fusion empowers you to design forms
              tailored to your requirements.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Features1;
