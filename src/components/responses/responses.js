import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { retrieveAllQuestionsForFormApiService } from "../../api/QuestionApiService";
import { retrieveFormForUserApiService } from "../../api/FormApiService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner, Alert } from "react-bootstrap";

const Responses = () => {
  const { formId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = await retrieveFormForUserApiService(
          userId,
          formId,
          token
        );
        setTitle(formData.title);
        setDescription(formData.description);
        setLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred while fetching form data");
        setLoading(false);
      }
    };

    const fetchQuestionsData = async () => {
      try {
        const fetchedQuestions = await retrieveAllQuestionsForFormApiService(
          userId,
          formId
        );
        setQuestions(fetchedQuestions);
        setChartData(
          fetchedQuestions.map((question) => ({
            seriesData: [],
            options: {
              chart: {
                width: 380,
                type: "pie",
              },
              labels: [],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            },
          }))
        );
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("An error occurred while fetching responses");
      }
    };

    fetchData();
    fetchQuestionsData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userId, formId, token]);

  

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

  const handleShowChart = (index) => {
    if (selectedQuestionIndex === index) {
      setSelectedQuestionIndex(null);
    } else {
      setSelectedQuestionIndex(index);
      const selectedQuestion = questions[index];
      const updatedChartData = [...chartData];

      if (selectedQuestion) {
        const series = selectedQuestion.answers.reduce((acc, answer) => {
          const existingIndex = acc.findIndex(
            (item) => item.label === answer.answerData
          );
          if (existingIndex !== -1) {
            acc[existingIndex].value++;
          } else {
            acc.push({ label: answer.answerData, value: 1 });
          }
          return acc;
        }, []);
        const labels = series.map((item) => {
          return `${item.label} (${item.value})`;
        });

        updatedChartData[index].seriesData = series.map((item) => item.value);
        updatedChartData[index].options.labels = labels;

        setChartData(updatedChartData);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <header
          className="mb-3 mx-auto"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px 0",
            maxWidth: "600px",
          }}
        >
          <h1
            className="text-center mb-5"
            style={{ color: "#3b6da2", fontSize: "2rem" }}
          >
            Form Responses
          </h1>
          <h1
            className="ml-5"
            style={{
              color: "#292fa0",
              fontWeight: "bold",
              fontSize: "1.5rem",
              marginBottom: "10px",
            }}
          >
            {title}
          </h1>
          <p
            className="lead ml-5"
            style={{ color: "#5a6168", fontWeight: "bolder", fontSize: "1rem" }}
          >
            {description}
          </p>
        </header>
        {questions.map((question, index) => (
          <div
            key={question.questionId}
            className="card mb-3 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <h5 className="card-title">{`${index + 1}. ${question.text}`}</h5>
            
              <button
                type="submit"
                onClick={() => handleShowChart(index)}
                style={{ 
                  borderColor: "white",
                  borderRadius: "0.25rem",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  transition: "background-color 0.1s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#d3e4eb")}
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                 {selectedQuestionIndex === index ? "Hide" : "Show"}
              </button>
            </div>
            {selectedQuestionIndex === index && (
              <div className="chart-container mt-3">
                {chartData[index].seriesData.length > 0 ? (
                  <ReactApexChart
                    options={chartData[index].options}
                    series={chartData[index].seriesData}
                    type="pie"
                    width={380}
                  />
                ) : (
                  <p className="text-danger text-center">
                    No answers available for this question.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responses;
