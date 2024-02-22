import React, { useState, useEffect } from "react";
import { retrieveUserApiService } from "../../api/UserApiService";
import { Alert, Spinner } from "react-bootstrap";
import avatar from "../../assets/user.jpeg";
import gif from "../../assets/gif.gif";
import { retrieveAllFormsForUserApiService } from "../../api/FormApiService";

const Account = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await retrieveUserApiService(userId, token);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred while fetching user data");
        setLoading(false);
      }
    };

    const fetchFormDetails = async () => {
      try {
        const fetchedFormData = await retrieveAllFormsForUserApiService(
          userId,
          token
        );
        console.log("fetchedFormData: -> ", fetchedFormData);
        const formattedData = fetchedFormData.map((form) => ({
          ...form,
          link: form.link === "null" ? null : form.link,
        }));
        setFormData(formattedData);
      } catch (error) {
        setError(error.message || "An error occurred while fetching user data");
        setLoading(false);
      }
    };

    fetchUser();
    fetchFormDetails();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userId, token]);

  if (loading) {
    return (
      <div>
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="container mt-5">
          <Alert variant="danger">{error}</Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2
        className="text-center mb-5"
        style={{ color: "#0093b1", fontSize: "3rem" }}
      >
        Personal Profile
      </h2>
      <div className="row ml-5">
        <div className="col-md-4">
          {user && (
            <img
              //   src="https://user-images.githubusercontent.com/55389276/140866485-8fb1c876-9a8f-4d6a-98dc-08c4981eaf70.gif"
              src={gif}
              alt="User"
              className="img-fluid mt-5 mb-5"
            />
          )}
        </div>
        <div className="col-md-8 justify-content-center">
          <div className="row mb-3">
            <div className="col mb-5" style={{ marginRight: "250px" }}>
              {user && (
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={avatar}
                    alt="User"
                    width="200px"
                    height="150px"
                    className="img-fluid mr-3"
                  />
                  <div>
                    <h1>{user.username}</h1>
                    <p style={{color : "#11485a"}}>
                      You Logged in as{" "}
                      {role === "USER_ROLES" ? "User" : "Admin"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p className="mb-3" style={{ color: "#2f2f33" }}>
                Contact Info:
              </p>
              <p>
                <strong style={{ color: "#2818d1" }}>Email:</strong>{" "}
                {user && user.email}
              </p>
              <p>
                <strong style={{ color: "#2818d1" }}>Phone:</strong>{" "}
                {user && user.contact}
              </p>
              <p>
                <strong style={{ color: "#2818d1" }}>Country:</strong>{" "}
                {user && user.country}
              </p>
              <p>
                <strong style={{ color: "#2818d1" }}>
                  No of forms made by user:
                </strong>{" "}
                {formData && formData.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
