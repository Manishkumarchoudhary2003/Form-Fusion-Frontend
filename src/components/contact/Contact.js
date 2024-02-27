import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import avatar from "../../assets/avatar.jpeg";
// import Manish from "../../assets/Manish.png"
import Navbar from "../home/Navbar/Navbar";

const Contact = () => { 
  return (
    <>
      <Navbar />
      <Container
        className="py-4 rounded p-5"
        style={{ backgroundColor: "#f9fdff" }}
      >
        <Row>
          <Col lg={6} className="py-4">
            <a
              href="https://manish-kumar-choudhary.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={avatar}
                alt="Avatar"
                width="300px"
                className="img-fluid rounded-circle ml-5 mt-5 mb-5"
              />
            </a>
          </Col>
          <Col lg={6} className="py-4 mt-2">
            <div>
              {/* Form Fusion: Seamlessly merge user responses with dynamic forms for
            streamlined data collection and analysis. Simplify feedback
            processes. */}
              <h1 style={{ color: "#1c4bab",textAlign : "center",fontSize: "2.5rem" }}>
                I'm Manish Kumar Choudhary
              
              </h1>

              <p style={{ color: "#565a5a" }}>
                I'm a 3rd-year Computer Science student at JIET Group of
                Institutions, Jodhpur with hands-on experience in JAVA,
                JavaScript, React.js, Spring Boot, and Hibernate.
              </p>
              <p>Let's create something extraordinary together! 🚀</p>
            </div>
            <h3 className="mb-4 mt-5">Contact Info</h3>
            <p className="mb-1">+91 8955946276</p>
            <p className="mb-1">
              <a
                href="mailto:cmanishkumar193@gmail.com"
                style={{ textDecoration: "none", color: "#1138bb" }}
              >
                cmanishkumar193@gmail.com
              </a>
            </p>
            <p className="mb-1">Jodhpur, India-342802</p>
            <p>
              Visit my{" "}
              <a
                href="https://manish-kumar-choudhary.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#560ad1" }}
              >
                portfolio
              </a>{" "}
              for more information.
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/manishkumarchoudhary/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#0a85d1" }}
              >
                Linkedln
              </a>{" "}
              <a
                className="ml-2"
                href="https://github.com/Manishkumarchoudhary2003"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#0a85d1" }}
              >
                Github
              </a>{" "}
              <a
                className="ml-2"
                href="https://www.instagram.com/manish_.96/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#0a85d1" }}
              >
                Instagram
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
