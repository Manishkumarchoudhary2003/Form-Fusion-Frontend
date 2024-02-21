import { useEffect, useState } from "react";
import {
  retrieveQuestionForFormApiService,
  updateQuestionForFormApiService,
} from "../../api/QuestionApiService";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Alert, Button } from "react-bootstrap";

const UpdateQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { formId, questionId } = useParams();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retrieveQuestionForFormApiService(
          userId,
          formId,
          questionId,
          token
        );
        console.log(response.text);
        console.log(response.options);
        setQuestionText(response.text);
        // setOptions(response.optionData.map(option => option.optionData));
        if (Array.isArray(response.options)) {
          setOptions(response.options.map((option) => option.optionData));
        } else {
          setOptions([response.options.optionData]);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred while fetching form data");
        setLoading(false);
      }
    };

    if (questionId !== undefined) {
      fetchData();
    } else {
      setLoading(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userId, formId, questionId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let question = {
        text: questionText,
      };

      if (options.length > 0) {
        question.options = options.map((option) => ({ optionData: option }));
      }

      await updateQuestionForFormApiService(
        userId,
        formId,
        questionId,
        token,
        question
      );
      //   navigate(`/all-questions/${formId}`);
      navigate(-1);
    } catch (error) {
      console.error("Error creating/updating question:", error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
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

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  return (
    <div>
      <div
        className="container shadow card mt-5 md-5"
        style={{ backgroundColor: "#fdffff", maxWidth: "600px" }}
      >
        <h2>Update Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="questionText" className="form-label">
              Question Text:
            </label>
            <input
              type="text"
              className="form-control"
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Options:</label>
            {options.map((option, index) => (
              <div key={index} className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                {index === options.length - 1 && (
                  <button
                    style={{
                      borderColor: "white",
                      borderRadius: "0.25rem",
                      padding: "0.5rem 1rem",
                      fontSize: "1rem",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      transition: "background-color 0.1s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#939090")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ccc")
                    }
                    onClick={addOption}
                  >
                    Add
                  </button>
                )}
                {index !== options.length - 1 && (
                  <Button
                      style={{
                        borderColor: "white",
                        borderRadius: "0.25rem",
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                        backgroundColor: "#f3cfcf",
                        transition: "background-color 0.1s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#fd8b8b")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#f3cfcf")
                      }
                      onClick={() => removeOption(index)}
                    >
                      Remove
                    </Button>
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            style={{
              marginTop: "20px",
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
            Update Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuestion;
