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
                <div className="col-auto" style={{ marginRight: "10px" }}>
                  <img
                    onClick={() => navigate(`/user/${userId}/create-form`)}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDqb9x57UAKjssqFJK_AfxNdsBMQDsmWWj8A&usqp=CAU"
                    alt="Create New Form"
                    style={{
                      width: "200px",
                      height: "200px",
                      cursor: "pointer",
                      borderRadius: "10px 0 0 10px",
                      objectFit: "cover",
                      border: "0.1px solid #000000",
                      transition: "all 0.3s",
                    }}
                    className="rounded-left"
                  />
                </div>
                <div className="col">
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <h1 className="text-primary">Create New Form</h1>
                    <Card.Text
                      className="text-center"
                      style={{
                        maxWidth: "500px",
                        color: "#495057",
                        fontSize: "1.2rem",
                      }}
                    >
                      Click on the + icon to create a new form. You'll be
                      redirected to the form creation page to design your form
                      with fields and settings.
                    </Card.Text>
                  </Card.Body>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <hr />

      <div className="row align-items-center mb-5 ml-2 ">
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
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filteredForms.map((form) => (
            <div key={form.formId} className="col mb-4">
              <Card className="h-100 shadow" style={{ position: "relative" }}>
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
                    <Dropdown.Menu >
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

// import React, { useState, useEffect } from "react";
// import {
//   deleteFormForUserApiService,
//   deleteFormsForUserHasNoLinkApiService,
//   retrieveAllFormsForUserApiService,
// } from "../../api/FormApiService";
// import { useNavigate } from "react-router-dom";
// import { Spinner, Card, Dropdown, Alert } from "react-bootstrap";
// import form1 from "../../assets/form.jpg"

// const AllForms = () => {
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [copiedLink, setCopiedLink] = useState(null);

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!userId || !token) {
//           throw new Error("You are not logged in. Please log in!");
//         }

//         const response = await retrieveAllFormsForUserApiService(userId, token);
//         console.log("Response: -> ", response);
//         const formattedData = response.map((form) => ({
//           ...form,
//           link: form.link === "null" ? null : form.link,
//         }));
//         const sortedData = formattedData.sort((a, b) => b.formId - a.formId);
//         setFormData(sortedData);
//         setLoading(false);
//         await deleteFormsForUserHasNoLinkApiService(userId, token);
//       } catch (error) {
//         console.error("Error fetching form data: ->", error);
//         setError(error.message || "An error occurred while fetching form data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId, token]);

//   const copyLinkToClipboard = (link) => {
//     navigator.clipboard
//       .writeText(link)
//       .then(() => {
//         console.log("Link copied to clipboard:", link);
//         setCopiedLink(link);
//         setTimeout(() => setCopiedLink(null), 500);
//       })
//       .catch((error) => {
//         console.error("Error copying link to clipboard:", error);
//       });
//   };

//   const shareViaWhatsApp = (link) => {
//     const message = "Check out this form!";
//     const whatsappLink = `whatsapp://send?text=${encodeURIComponent(
//       `${message}\n${link}`
//     )}`;
//     window.open(whatsappLink, "_blank");
//   };

//   const shareViaEmail = (link) => {
//     const subject = "Check out this form";
//     const body = `Hi,\n\nI thought you might be interested in filling out this form:\n${link}`;
//     const emailLink = `mailto:?subject=${encodeURIComponent(
//       subject
//     )}&body=${encodeURIComponent(body)}`;
//     window.location.href = emailLink;
//   };

//   const updateForm = (formId) => {
//     navigate(`/user/${userId}/create-form/${formId}`);
//   };

//   const seeForm = (formId) => {
//     navigate(`/all-questions/${formId}`);
//   };

//   const seeResponses = (formId) => {
//     navigate(`/user/${userId}/responses/${userId}/${formId}`);
//   };

//   const seeSubmission = (formId) => {
//     navigate(`/user/${userId}/responses-details/${userId}/${formId}`);
//   };

//   const deleteForm = async (formId) => {
//     await deleteFormForUserApiService(userId, formId, token);
//     window.location.reload();
//   };

//   return (
//     <div className="container mt-5">
//       <div
//         className="container-fluid mb-5"
//         style={{ marginBottom: "100px", borderRadius: "10px" }}
//       >
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <Card className="h-100 border-0 shadow">
//               <div className="row no-gutters">
//                 <div className="col-auto" style={{ marginRight: "10px" }}>
//                   <img
//                     onClick={() => navigate(`/user/${userId}/create-form`)}
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDqb9x57UAKjssqFJK_AfxNdsBMQDsmWWj8A&usqp=CAU"
//                     alt="Create New Form"
//                     style={{
//                       width: "200px",
//                       height: "200px",
//                       cursor: "pointer",
//                       borderRadius: "10px 0 0 10px",
//                       objectFit: "cover",
//                       border: "0.1px solid #000000", // Add border to the image
//                       transition: "all 0.3s", // Add transition effect for smooth hover
//                     }}
//                     className="rounded-left"
//                   />
//                 </div>
//                 <div className="col">
//                   <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//                     <h1 className="text-primary">Create New Form</h1>
//                     <Card.Text
//                       className="text-center"
//                       style={{
//                         maxWidth: "500px",
//                         color: "#495057",
//                         fontSize: "1.2rem",
//                       }}
//                     >
//                       Click on the + icon to create a new form. You'll be
//                       redirected to the form creation page to design your form
//                       with fields and settings.
//                     </Card.Text>
//                   </Card.Body>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//       <hr />

//       <h4 className="mb-4">Recent Forms</h4>

//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       ) : error ? (
//         <Alert variant="danger">{error}</Alert>
//       ) : !Array.isArray(formData) ? (
//         <div className="container card mt-5 md-5">
//           <Alert variant="danger">Data received from the server is not in the expected format</Alert>
//         </div>
//       ) : formData.length === 0 ? (
//         <div className="container mt-5 md-5">
//           <Alert variant="info">No forms created yet</Alert>
//         </div>
//       ) : (
//         <div className="row row-cols-1 row-cols-md-4 g-4">
//           {formData.map((form) => (
//             <div key={form.formId} className="col mb-4">
//               <Card className="h-100 shadow" style={{ position: "relative" }}>
//                 {/* Top Row */}
//                 <Card.Img
//                   style={{ cursor: "pointer" }}
//                   onClick={() => seeForm(form.formId)}
//                   variant="top"
//                   // src="https://www.aihr.com/wp-content/uploads/employee-write-up-form-cover.png"
//                   src={form1}
//                 />
//                 {/* Second Row */}
//                 <Card.Body>
//                   <Card.Title>{form.title}</Card.Title>
//                   <Card.Text>
//                     {form.description.length > 20
//                       ? `${form.description.slice(0, 40)}...`
//                       : form.description}
//                   </Card.Text>
//                   <Dropdown
//                     style={{
//                       position: "absolute",
//                       bottom: "10px",
//                       right: "10px",
//                     }}
//                   >
//                     <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                       <i className="fas fa-ellipsis-v">more</i>
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item
//                         onClick={() => seeForm(form.formId)}
//                         className="text-secondary"
//                       >
//                         See Form
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         onClick={() => updateForm(form.formId)}
//                         className="text-secondary"
//                       >
//                         Update Form
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         onClick={() => deleteForm(form.formId)}
//                         className="text-secondary"
//                       >
//                         Delete Form
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         onClick={() => seeResponses(form.formId)}
//                         className="text-secondary"
//                       >
//                         See Responses
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         onClick={() => seeSubmission(form.formId)}
//                         className="text-secondary"
//                       >
//                         See Submission
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         onClick={() => copyLinkToClipboard(form.link)}
//                         className="text-secondary"
//                       >
//                         Copy Link
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         onClick={() => shareViaWhatsApp(form.link)}
//                         className="text-secondary"
//                       >
//                         Share via WhatsApp
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         onClick={() => shareViaEmail(form.link)}
//                         className="text-secondary"
//                       >
//                         Share via Email
//                       </Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </Card.Body>
//               </Card>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllForms;

// import React, { useState, useEffect } from "react";
// import {
//   deleteFormForUserApiService,
//   deleteFormsForUserHasNoLinkApiService,
//   retrieveAllFormsForUserApiService,
// } from "../../api/FormApiService";
// import { useNavigate } from "react-router-dom";
// import { Spinner } from "react-bootstrap";
// import { Alert } from "react-bootstrap";

// const AllForms = () => {
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [copiedLink, setCopiedLink] = useState(null);

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!userId || !token) {
//           throw new Error("User ID or token is missing");
//         }
//         const response = await retrieveAllFormsForUserApiService(userId, token);
//         console.log("Response: -> ", response);
//         const formattedData = response.map((form) => ({
//           ...form,
//           link: form.link === "null" ? null : form.link,
//         }));
//         const sortedData = formattedData.sort((a, b) => b.formId - a.formId);
//         setFormData(sortedData);
//         setLoading(false);
//         await deleteFormsForUserHasNoLinkApiService(userId, token);
//       } catch (error) {
//         console.error("Error fetching form data: ->", error);
//         setError(error.message || "An error occurred while fetching form data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId, token]);

//   const copyLinkToClipboard = (link) => {
//     navigator.clipboard
//       .writeText(link)
//       .then(() => {
//         console.log("Link copied to clipboard:", link);
//         setCopiedLink(link);
//         setTimeout(() => setCopiedLink(null), 500);
//       })
//       .catch((error) => {
//         console.error("Error copying link to clipboard:", error);
//       });
//   };

//   const shareViaWhatsApp = (link) => {
//     const message = "Check out this form!";
//     const whatsappLink = `whatsapp://send?text=${encodeURIComponent(
//       `${message}\n${link}`
//     )}`;
//     window.open(whatsappLink, "_blank");
//   };

//   const shareViaEmail = (link) => {
//     const subject = "Check out this form";
//     const body = `Hi,\n\nI thought you might be interested in filling out this form:\n${link}`;
//     const emailLink = `mailto:?subject=${encodeURIComponent(
//       subject
//     )}&body=${encodeURIComponent(body)}`;
//     window.location.href = emailLink;
//   };

//   if (loading) {
//     return (
//       <div>
//         <div className="text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <div className="container mt-5">
//           <Alert variant="danger">{error}</Alert>
//         </div>
//       </div>
//     );
//   }

//   if (!Array.isArray(formData)) {
//     return (
//       <div>
//         <div className="container card mt-5 md-5">
//           <div>Data received from the server is not in the expected format</div>
//         </div>
//       </div>
//     );
//   }

//   const updateForm = (formId) => {
//     navigate(`/user/${userId}/create-form/${formId}`);
//   };

//   const seeForm = (formId) => {
//     navigate(`/all-questions/${formId}`);
//   };

//   const seeResponses = (formId) => {
//     navigate(`/user/${userId}/responses/${userId}/${formId}`);
//   };

//   const seeSubmission = (formId) => {
//     navigate(`/user/${userId}/responses-details/${userId}/${formId}`);
//   };

//   const deleteForm = async (formId) => {
//     await deleteFormForUserApiService(userId, formId, token);
//     window.location.reload();
//   };

//   return (
//     <div>
//       <div
//         className="container card mt-5 md-5"
//         style={{ backgroundColor: "#e4ebfd" }}
//       >
//         {formData.length > 0 ? (
//           <table className="table">
//             <thead className="thead-dark">
//               <tr>
//                 <th scope="col">Form ID</th>
//                 <th scope="col">Title</th>
//                 <th scope="col">Description</th>
//                 <th scope="col">Copy Link</th>
//                 <th scope="col">Update</th>
//                 <th scope="col">Delete</th>
//                 <th scope="col">Responses</th>
//                 <th scope="col">Submission</th>
//                 <th scope="col">Share via WhatsApp</th>
//                 <th scope="col">Share via Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formData.map((form) => (
//                 <tr key={form.formId}>
//                   <td>{form.formId}</td>
//                   <td onClick={() => seeForm(form.formId)}>{form.title}</td>
//                   <td onClick={() => seeForm(form.formId)}>
//                     {form.description}
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => copyLinkToClipboard(form.link)}
//                       disabled={copiedLink === form.link}
//                     >
//                       {copiedLink === form.link ? "Copied" : "Copy"}
//                     </button>
//                   </td>
//                   <td>
//                     <button onClick={() => updateForm(form.formId)}>
//                       Update
//                     </button>
//                   </td>
//                   <td>
//                     <button onClick={() => deleteForm(form.formId)}>
//                       Delete
//                     </button>
//                   </td>
//                   <td>
//                     <button onClick={() => seeResponses(form.formId)}>
//                       Response
//                     </button>
//                   </td>
//                   <td>
//                     <button onClick={() => seeSubmission(form.formId)}>
//                       Submission
//                     </button>
//                   </td>
//                   <td>
//                     <button onClick={() => shareViaWhatsApp(form.link)}>
//                       Share
//                     </button>
//                   </td>
//                   <td>
//                     <button onClick={() => shareViaEmail(form.link)}>
//                       Share
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div>No form data available</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllForms;
