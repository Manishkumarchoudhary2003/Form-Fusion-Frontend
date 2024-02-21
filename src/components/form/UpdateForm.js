import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  retrieveFormForUserApiService,
  updateFormForUserApiService,
} from "../../api/FormApiService";

const UpdateForm = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { formId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retrieveFormForUserApiService(
          userId,
          formId,
          token
        );
        setForm(response);
        setLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred while fetching form data");
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, formId, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(
        "user id -> ",
        userId,
        " token -> ",
        token,
        " form id -> ",
        formId
      );
      updateFormForUserApiService(userId, formId, token, form);
      console.log(
        "user id -> ",
        userId,
        " token -> ",
        token,
        " form id -> ",
        formId
      );
      navigate("/all-forms");
    } catch (error) {
      setError(error.message || "An error occurred while updating form");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
