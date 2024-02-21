import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ShareableForms = () => {
  return (
    <Container className="mt-5 bg-light rounded" style={{marginTop : "200px", marginBottom : "100px"}}>
      <Row>
        <Col md={4} className="mb-4">
          <div className="p-4">
            <h3 className="mb-4">Build forms and analyze results together</h3>
            <p>
              Collaborate with team members in real-time to create and analyze
              forms. Just like with Google Docs, Sheets, and Slides, you can
              work together seamlessly without the hassle of sharing multiple
              versions.
            </p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="p-4 ">
            <h3 className="mb-4">Work with clean response data</h3>
            <p>
              Utilize intelligent response validation rules to ensure clean and
              accurate data. Set rules such as email format validation or
              numeric value ranges to maintain data integrity effortlessly.
            </p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="p-4 ">
            <h3 className="mb-4">Share forms via email, link, or WhatsApp</h3>
            <p>
              Share your forms effortlessly via email, link, or embed them on
              your website. Whether you need to collaborate with specific
              individuals or reach a broader audience, sharing your forms is
              simple and efficient.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ShareableForms;
