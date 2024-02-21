import React, { useState, useEffect } from "react";
import {
  retrieveAllUsersApiService,
  delteUserApiService,
} from "../../api/UserApiService";
import { Card, Alert, Spinner, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await retrieveAllUsersApiService(token);
        setUsers(response.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchUsers();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [token]);

  const deleteUser = async (userId) => {
    try {
      await delteUserApiService(userId, token);
      setUsers(users.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="container shadow p-4">
      <h1 className="text-center mb-4" style={{ color: "#3e3a4d" }}>
        All Users of Form Fusion
      </h1>

      {error && (
        <Alert
          style={{
            backgroundColor: "#f5f5f5",
            border: "none",
            textAlign: "center",
          }}
        >
          Error: {error}
        </Alert>
      )}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="row">
          {users.map((user, index) => (
            <div key={index} className="col-lg-4 mb-4">
              <Card style={{ cursor: "pointer" }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>{user.username} </Card.Title>
                    <Dropdown>
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
                        {" "}
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
                          onClick={() => {
                            navigate(`/users/all-users-details/${user.userId}`);
                          }}
                        >
                          View Details
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
                          onClick={() => deleteUser(user.userId)}
                        >
                          Delete User
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <Card.Text>
                    <strong>Email:</strong> {user.email}
                  </Card.Text>

                  <Card.Text>
                    <strong>Contact:</strong> {user.contact}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;

// import React, { useState, useEffect } from "react";
// import { retrieveAllUsersApiService } from "../../api/UserApiService";
// import { Card, Alert, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await retrieveAllUsersApiService(token);
//         setUsers(response);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setError("Error fetching user data");
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [token]);

//   return (
//     <div className="container shadow p-4" style={{maxWidth : "1000px"}}>
//       {error && <Alert variant="danger">Error: {error}</Alert>}
//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       ) : (
//         <div className="row">
//           {users.map((user, index) => (
//             <div key={index} className="col-lg-4 mb-4">
//               <Card onClick={() => {navigate(`/users/all-users-details/${user.userId}`)}} style={{cursor : "pointer"}}>
//                 <Card.Body>
//                   <Card.Title>{user.username}</Card.Title>
//                   <Card.Text>
//                     <strong>Email:</strong> {user.email}
//                   </Card.Text>
//                   <Card.Text>
//                     <strong>Role:</strong> {user.role}
//                   </Card.Text>
//                   <Card.Text>
//                     <strong>Contact:</strong> {user.contact}
//                   </Card.Text>
//                   <Card.Text>
//                     <strong>Country:</strong> {user.country}
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllUsers;
