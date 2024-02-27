import React, { useState, useEffect } from "react";
import {
  deleteFormForUserApiService,
  deleteFormsForUserHasNoLinkApiService,
  retrieveAllFormsForUserApiService,
} from "../../api/FormApiService";
import { useNavigate } from "react-router-dom";
import { Spinner, Card, Dropdown, Alert } from "react-bootstrap";
import form1 from "../../assets/form.jpg";

const AllForms = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedLink, setCopiedLink] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("isLoggedIn") === "100";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId || !token) {
          throw new Error("You are not logged in. Please log in!");
        }

        const response = await retrieveAllFormsForUserApiService(userId, token);
        console.log("Response: -> ", response);
        const formattedData = response.map((form) => ({
          ...form,
          link: form.link === "null" ? null : form.link,
        }));
        const sortedData = formattedData.sort((a, b) => b.formId - a.formId);
        setFormData(sortedData);
        setLoading(false);
        await deleteFormsForUserHasNoLinkApiService(userId, token);
      } catch (error) {
        console.error("Error fetching form data: ->", error);
        setError(error.message || "An error occurred while fetching form data");
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userId, token]);

  // Filter forms based on search query
  const filteredForms = formData
    ? formData.filter(
        (form) =>
          form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          form.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const copyLinkToClipboard = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("Link copied to clipboard:", link);
        console.log("Link copied to clipboard:", copiedLink);
        setCopiedLink(link);
        setTimeout(() => setCopiedLink(null), 500);
      })
      .catch((error) => {
        console.error("Error copying link to clipboard:", error);
      });
  };

  const shareViaWhatsApp = (link) => {
    const message = "Check out this form!";
    const whatsappLink = `whatsapp://send?text=${encodeURIComponent(
      `${message}\n${link}`
    )}`;
    window.open(whatsappLink, "_blank");
  };

  const shareViaEmail = (link) => {
    const subject = "Check out this form";
    const body = `Hi,\n\nI thought you might be interested in filling out this form:\n${link}`;
    const emailLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = emailLink;
  };

  const updateForm = (formId) => {
    navigate(`/user/${userId}/create-form/${formId}`);
  };

  const seeForm = (formId) => {
    navigate(`/all-questions/${formId}`);
  };

  const seeResponses = (formId) => {
    navigate(`/user/${userId}/responses/${userId}/${formId}`);
  };

  const seeSubmission = (formId) => {
    navigate(`/user/${userId}/responses-details/${userId}/${formId}`);
  };

  const deleteForm = async (formId) => {
    await deleteFormForUserApiService(userId, formId, token);
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <div
        className="container-fluid mb-5"
        style={{ marginBottom: "100px", borderRadius: "10px" }}
      >
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card className="h-100 border-0 shadow">
              <div className="row no-gutters">
                {/* Column containing the image */}
                <div className="col-md-6 mb-3 mb-md-0 d-flex justify-content-center align-items-center">
                  <img
                    onClick={() => isAuthenticated ? navigate(`/user/${userId}/create-form`) : navigate("/login")}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDqb9x57UAKjssqFJK_AfxNdsBMQDsmWWj8A&usqp=CAU"
                    alt="Create New Form"
                    style={{
                      width: "100px",
                      height: "100px",
                      cursor: "pointer",
                      borderRadius: "10px",
                      objectFit: "cover",
                      // border: "0.1px solid #000000",
                      transition: "all 0.3s",
                    }}
                    className="rounded-left"
                  />
                </div>

                {/* Column containing the text */}
                <div className="col d-flex justify-content-center align-items-center">
                  <Card.Body className="text-center">
                    <h2 className="text-primary">Create New Form</h2>
                  </Card.Body>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <hr />

      <div className="row align-items-center mb-5 ml-1 ">
        <div className="col-md-3">
          <h2>Recent Forms</h2>
        </div>
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control border-0 rounded-0"
              placeholder="Search by form title or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ height: "40px" }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="container mt-5 md-5">
          <Alert variant="danger">{error}</Alert>
        </div>
      ) : !Array.isArray(formData) ? (
        <div className="container card mt-5 md-5">
          <Alert variant="danger">
            Data received from the server is not in the expected format
          </Alert>
        </div>
      ) : formData.length === 0 ? (
        <div className="container mt-5 md-5">
          <Alert variant="info">No forms created yet</Alert>
        </div>
      ) : filteredForms.length === 0 ? (
        <div
          className="container text-center mt-5 md-5"
          style={{ maxWidth: "800px", minHeight: "100px", fontSize: "2rem" }}
        >
          <Alert style={{ backgroundColor: "#f8ffff", border: "none" }}>
            No Forms Found
          </Alert>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4">
          {filteredForms.map((form) => (
            <div key={form.formId} className="col mb-4">
              <Card className="h-100 p-1 m-3 shadow" style={{ position: "relative" }}>
                <Card.Img
                  style={{ cursor: "pointer" }}
                  onClick={() => seeForm(form.formId)}
                  variant="top"
                  src={form1}
                />
                <Card.Body>
                  <Card.Title>{form.title}</Card.Title>
                  <Card.Text>
                    {form.description.length > 20
                      ? `${form.description.slice(0, 50)}...`
                      : form.description}
                  </Card.Text>
                  <Dropdown
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      border: "none",
                    }}
                  >
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        transition: "background-color 0.3s, border 0.1s",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "50%",
                        alignItems: "center", // Align items vertically
                      }}
                    >
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "black",
                          marginTop: "2px",
                        }}
                      ></div>{" "}
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "black",
                          marginTop: "2px",
                        }}
                      ></div>
                      <div
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "black",
                          marginTop: "2px",
                        }}
                      ></div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        style={{
                          borderColor: "white",
                          borderRadius: "0.25rem",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          transition: "background-color 0.1s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#ececec")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => seeForm(form.formId)}
                      >
                        View
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{
                          borderColor: "white",
                          borderRadius: "0.25rem",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          transition: "background-color 0.1s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#ececec")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => updateForm(form.formId)}
                      >
                        Update
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{
                          borderColor: "white",
                          borderRadius: "0.25rem",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          transition: "background-color 0.1s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#ececec")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => deleteForm(form.formId)}
                      >
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{
                          borderColor: "white",
                          borderRadius: "0.25rem",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          transition: "background-color 0.1s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#ececec")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => seeResponses(form.formId)}
                      >
                        Responses
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{
                          borderColor: "white",
                          borderRadius: "0.25rem",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          transition: "background-color 0.1s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#ececec")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => seeSubmission(form.formId)}
                      >
                        Submissions
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{
                          borderColor: "white",
                          borderRadius: "0.25rem",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          transition: "background-color 0.1s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#ececec")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => copyLinkToClipboard(form.link)}
                      >
                        Copy Link
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{
                          borderColor: "white",
                          borderRadius: "0.25rem",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          transition: "background-color 0.1s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#ececec")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => shareViaWhatsApp(form.link)}
                      >
                        Share via WhatsApp
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{
                          borderColor: "white",
                          borderRadius: "0.25rem",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          transition: "background-color 0.1s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#ececec")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={() => shareViaEmail(form.link)}
                      >
                        Share via Email
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllForms;

