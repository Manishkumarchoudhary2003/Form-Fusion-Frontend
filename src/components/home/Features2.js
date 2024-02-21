import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import feature2 from "../../assets/feature2.png";

const Features2 = () => {
  return (
    <Container
      className="mt-15"
      style={{ marginTop: "200px", marginBottom: "100px" }}
    >
      <Row>
        <Col
          md={6}
          className="d-flex align-items-center"
          style={{
            padding: "10px 50px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "2.5rem" }}>
              Effortlessly analyze responses with Form Fusion's automatic
              summaries feature
            </h2>
            <p>
              Gain insights at a glance by viewing charts with response data
              that update in real-time. Whether you're tracking survey results,
              collecting feedback, or conducting research, our platform provides
              you with clear visualizations to understand your data better.
            </p>
          </div>
        </Col>
        <Col
          md={6}
          style={{
            backgroundImage: `url(${feature2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "370px",
            maxWidth: "100%",
            padding : "50px"
          }}
        ></Col>
      </Row>
    </Container>
  );
};

export default Features2;
