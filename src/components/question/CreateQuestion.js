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
      console.log("Question created successfully");
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const generateFormLink = async () => {
    try {
      await setFormLinkForFormApiService(userId, formId, token);
      navigate(`/user/${userId}/all-forms`);
    } catch (error) {
      console.error("Error generating form link:", error);
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
              <Button
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
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#def2fb")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              >
                Show Questions
              </Button>
              {showOptionsMessage && (
                <Alert
                  style={{ backgroundColor: "#deecf7" }}
                  className="text-center p-2 mb-3"
                >
                  To create a form, a link must be generated.
                </Alert>
              )}
              {/* <Button type="submit" variant="primary">
                Create Question
              </Button>
              <Button onClick={display} variant="secondary">
                Show Questions
              </Button> */}
              {/* <Button onClick={generateFormLink} variant="secondary">
                Generate Form Link
              </Button> */}
              <Button
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
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#def2fb")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              >
                Generate Form Link
              </Button>
            </div>
          </Form>
        )}
      </Card>
      {showQuestions && <AllQuestions />}
    </div>
  );
};

export default CreateQuestion;

// import React, { useState } from "react";
// import { createQuestionForFormApiService } from "../../api/QuestionApiService";
// import { useNavigate, useParams } from "react-router-dom";
// import AllQuestions from "./AllQuestions";
// import { setFormLinkForFormApiService } from "../../api/FormApiService";

// const CreateQuestion = () => {
//   const [questionText, setQuestionText] = useState("");
//   const [options, setOptions] = useState([""]);
//   const [showForm, setShowForm] = useState(false);
//   const [showQuestions, setShowQuestions] = useState(false);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const { formId } = useParams();
//   const userId = localStorage.getItem("userId");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       let question = {
//         text: questionText,
//       };

//       if (options.length > 0) {
//         question.options = options.map((option) => ({ optionData: option }));
//       }

//       await createQuestionForFormApiService(userId, formId, question, token);
//       setQuestionText("");
//       setOptions([""]);
//       setShowForm(false);
//       console.log("Question created successfully");
//     } catch (error) {
//       console.error("Error creating question:", error);
//     }
//   };

//   const generateFormLink = async () => {
//     try {
//       console.log("Token -> ", token, " user Id -> ", userId);
//       await setFormLinkForFormApiService(userId, formId, token);
//       console.log("Token -> ", token, " user Id -> ", userId);
//       navigate(`/user/${userId}/all-forms`);
//     } catch (error) {
//       console.error("Error generating form link:", error);
//     }
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const addOption = () => {
//     setOptions([...options, ""]);
//   };

//   const removeOption = (index) => {
//     const newOptions = [...options];
//     newOptions.splice(index, 1);
//     setOptions(newOptions);
//   };

//   const display = () => {
//     setShowQuestions(!showQuestions);
//   };

//   return (
//     <div>
//       <div
//         className="container card mt-5 md-5"
//         style={{ backgroundColor: "#e7e7fb", maxWidth: "600px" }}
//       >
//         <h2>Create Question</h2>
//         <button
//           type="button"
//           className="btn btn-primary mb-3"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Hide Form" : "Add Question"}
//         </button>
//         {showForm && (
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="questionText" className="form-label">
//                 Question Text:
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="questionText"
//                 value={questionText}
//                 onChange={(e) => setQuestionText(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Options:</label>
//               {options.map((option, index) => (
//                 <div key={index} className="input-group mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={option}
//                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                   />
//                   {index === options.length - 1 && (
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary"
//                       onClick={addOption}
//                     >
//                       Add
//                     </button>
//                   )}
//                   {index !== options.length - 1 && (
//                     <button
//                       type="button"
//                       className="btn btn-outline-danger"
//                       onClick={() => removeOption(index)}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <button type="submit" className="btn btn-primary">
//               Create Question
//             </button>
//           </form>
//         )}
//         <button onClick={display} className="btn btn-secondary">
//           Show Questions
//         </button>
//         <button onClick={generateFormLink} className="btn btn-secondary">
//           Generate Form Link
//         </button>
//       </div>
//       {showQuestions && <AllQuestions />}
//     </div>
//   );
// };

// export default CreateQuestion;
