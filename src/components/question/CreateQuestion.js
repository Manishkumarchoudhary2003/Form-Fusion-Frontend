import React, { useEffect, useState } from "react";
import { createQuestionForFormApiService } from "../../api/QuestionApiService";
import { useNavigate, useParams } from "react-router-dom";
import AllQuestions from "./AllQuestions";
import { setFormLinkForFormApiService } from "../../api/FormApiService";
import {
  Button,
  Form,
  InputGroup,
  FormControl,
  Card,
  Alert,
} from "react-bootstrap";

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([""]);
  const [showForm, setShowForm] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showOptionsMessage, setShowOptionsMessage] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { formId } = useParams();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let question = {
        text: questionText,
      };

      if (options.length > 0) {
        question.options = options.map((option) => ({ optionData: option }));
      }

      await createQuestionForFormApiService(userId, formId, question, token);
      setQuestionText("");
      setOptions([""]);
      setShowForm(false);
      setShowOptionsMessage(true);
      // console.log("Question created successfully");
    } catch (error) {
      // console.error("Error creating question:", error);
    }
  };

  const generateFormLink = async () => {
    try {
      await setFormLinkForFormApiService(userId, formId, token);
      navigate(`/user/${userId}/all-forms`);
    } catch (error) {
      // console.error("Error generating form link:", error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
    setShowOptionsMessage(false);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const display = () => {
    setShowQuestions(!showQuestions);
  };

  return (
    <div className="container mt-5">
      <Card
        className="p-4 card border-0 shadow"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <h2 className="mb-4">Create Question</h2>
        {/* <Button
          variant="primary"
          className="mb-3"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Add Question"}
        </Button> */}
        <button
          type="submit"
          onClick={() => setShowForm(!showForm)}
          style={{
            borderColor: "black",
            borderRadius: "0.25rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#e0f1f5",
            transition: "background-color 0.1s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#e2eaf9")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          {showForm ? "Hide Form" : "Add Question"}
        </button>
        <Alert
          style={{ backgroundColor: "#eef4f8" }}
          className="text-center p-2 mt-3 mb-3"
        >
          To create a form, a link must be generated, and at least one question
          must be included.
        </Alert>
        <button
          onClick={generateFormLink}
          style={{
            borderColor: "white",
            borderRadius: "0.25rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            color: "black",
            backgroundColor: "transparent",
            transition: "background-color 0.1s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#def2fb")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
        >
          Generate Form Link
        </button>
        <button
          onClick={display}
          style={{
            borderColor: "white",
            borderRadius: "0.25rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            color: "black",
            backgroundColor: "transparent",
            transition: "background-color 0.1s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#def2fb")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
        >
          Show Questions
        </button>
        {showForm && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="questionText">
              <Form.Label>Question Text:</Form.Label>
              <Form.Control
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Options:</Form.Label>
              {options.map((option, index) => (
                <InputGroup key={index} className="mb-3">
                  <FormControl
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  {index === options.length - 1 ? (
                    <Button
                      style={{
                        borderColor: "white",
                        borderRadius: "0.25rem",
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                        backgroundColor: "#ccc",
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
                    </Button>
                  ) : (
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
                </InputGroup>
              ))}
            </Form.Group>
            {showOptionsMessage && (
              <Alert
                style={{ backgroundColor: "#f0d5d5" }}
                className="text-center p-2 mb-3"
              >
                Options are treated as single choices.
              </Alert>
            )}
            <div className="d-grid gap-2">
              {" "}
              <button
                type="submit"
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
                  (e.target.style.backgroundColor = "#def2fb")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Create Question
              </button>
            </div>
          </Form>
        )}
      </Card>
      {showQuestions && <AllQuestions />}
    </div>
  );
};

export default CreateQuestion;
