import React, { useState, useEffect } from "react";
import { retrieveAllQuestionsForFormApiService } from "../../api/QuestionApiService";
import { useNavigate, useParams } from "react-router-dom";
import { responseForFormApiService } from "../../api/ResponseApiService";
import { submitAnswerForQuestionForFormApiService } from "../../api/AnswerApiService";
import { retrieveFormForUserApiService } from "../../api/FormApiService";
import { Spinner, Alert } from "react-bootstrap";

const Form = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const { userId, formId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formResponse = await retrieveFormForUserApiService(
          userId,
          formId
        );
        const questionsResponse = await retrieveAllQuestionsForFormApiService(
          userId,
          formId
        );
        setForm(formResponse);
        setQuestions(questionsResponse);
        setLoading(false);
      } catch (error) {
        setError(
          error.message ||
            "An error occurred while fetching form and questions data"
        );
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userId, formId]);

  document.body.style.backgroundColor = "#f6f1fa";

  const handleSubmit = async (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    const isAnyAnswerEmpty = Object.values(answers).some(
      (answer) => !answer.trim()
    );

    if (isAnyAnswerEmpty) {
      alert("Please fill out all the answers before submitting the form.");
    } else {
      try {
        await Promise.all(
          questions.map((question) =>
            submitAnswerForQuestionForFormApiService(
              userId,
              formId,
              question.questionId,
              { answer: answers[question.questionId] || "" }
            )
          )
        );

        await responseForFormApiService(userId, formId);
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
          navigate(-1);
        }, 1000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setError("An error occurred while submitting the form");
      }
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

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
    <div className="p-4" style={{ backgroundColor: "#f6f1fa" }}>
      {successMessageVisible && (
        <div className="mt-2 text-center">
          <Alert
            style={{
              backgroundColor: "#f6f1fa",
              border: "none",
              fontSize: "1.2rem",
            }}
          >
            Form submitted successfully!
          </Alert>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="container mt-2 card shadow"
        style={{
          maxWidth: "450px",
          backgroundColor: "#fdfaff",
          padding: "30px",
        }}
      >
        <div
          style={{
            marginBottom: "50px",
            border: "1px solid #6c757d",
            padding: "10px",
          }}
        >
          <h1 style={{ color: "#080c56" }}>{form.title}</h1>
          <p style={{ color: "#293650" }}>{form.description}</p>
        </div>
        {questions.map((question, index) => (
          <div key={question.questionId} className="mb-3">
            <p
              className="mb-3"
              style={{ color: "#7D91D8", fontSize: "18px", fontWeight: "bold" }}
            >{`${index + 1}. ${question.text}`}</p>
            <div className="mb-3">
              {question.options.length === 0 ? (
                <input
                  style={{ maxWidth: "300px" }}
                  type="text"
                  className="form-control"
                  id={`answer-${question.questionId}`}
                  placeholder="Your answer here..."
                  required
                  value={answers[question.questionId] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.questionId, e.target.value)
                  }
                />
              ) : (
                question.options.map((option, i) => (
                  <div key={i} className="form-check">
                    {option.optionData ? (
                      <>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`answer-${question.questionId}`}
                          id={`option-${question.questionId}-${i}`}
                          value={option.optionData}
                          required
                          checked={
                            answers[question.questionId] === option.optionData
                          }
                          onChange={() =>
                            handleAnswerChange(
                              question.questionId,
                              option.optionData
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`option-${question.questionId}-${i}`}
                        >
                          {option.optionData}
                        </label>
                      </>
                    ) : (
                      <input
                        style={{ maxWidth: "300px" }}
                        type="text"
                        className="form-control"
                        id={`answer-${question.questionId}`}
                        placeholder="Your answer here..."
                        required
                        value={answers[question.questionId] || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            question.questionId,
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}

        <div className=" gap-2  mx-auto">
          <button
            type="submit"
            style={{
              marginTop: "40px",
              borderColor: "white",
              borderRadius: "0.25rem",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              cursor: "pointer",
              backgroundColor: "transparent",
              transition: "background-color 0.1s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e4ecef")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
