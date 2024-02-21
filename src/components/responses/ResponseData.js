import React, { useState, useEffect } from "react";
import { retrieveAllResponsesApiService } from "../../api/ResponseApiService";
import { Table, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import XLSX from "xlsx";

const ResponseData = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { formId } = useParams();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await retrieveAllResponsesApiService(
          userId,
          formId,
          token
        );
        setResponses(responseData);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching responses");
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userId, formId, token]);

  const generatePDF = () => {
    const generateButton = document.getElementById("generate-pdf-button");
    if (generateButton) {
      generateButton.style.display = "none";
    }

    const responseData = document.getElementById("response-data");
    if (responseData) {
      html2canvas(responseData).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save("submissions.pdf");

        if (generateButton) {
          generateButton.style.display = "block";
        }
        window.location.reload();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else {
      console.error("Response data element not found.");
    }
  };

  // const downloadExcel = () => {
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet(responses);
  //   XLSX.utils.book_append_sheet(wb, ws, "Responses");
  //   XLSX.writeFile(wb, "responses.xlsx");
  // };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5" id="response-data">
      <h2 className="text-center mb-4">Response Data</h2>
      {responses.length > 0 ? (
        <>
          <div className="mb-4">
            <h3 className="text-center">{responses[0].form.title}</h3>
            <p className="text-center">{responses[0].form.description}</p>
          </div>
          <Table
            striped
            bordered
            hover
            className="mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Response ID</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response, index) => {
                const timestamp = new Date(response.timestamp);
                const date = timestamp.toLocaleDateString();
                const time = timestamp.toLocaleTimeString();
                return (
                  <tr key={response.responseId}>
                    <td>{index + 1}</td>
                    <td>{response.responseId}</td>
                    <td>{date}</td>
                    <td>{time}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="text-center">
            <button
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
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e9f2f5")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
              id="generate-pdf-button"
              onClick={generatePDF}
            >
              Download PDF
            </button>
          </div>
        
        </>
      ) : (
        <div className="text-center mt-5">
          <Alert
            style={{
              backgroundColor: "#f9ffff",
              border: "none",
              padding: "50px",
            }}
          >
            No responses available for this form.
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ResponseData;


// import React, { useState, useEffect } from "react";
// import { retrieveAllResponsesApiService } from "../../api/ResponseApiService";
// import { Table, Spinner, Alert } from "react-bootstrap";
// import { useParams } from "react-router-dom";

// const ResponseData = () => {
//   const [responses, setResponses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { formId } = useParams();
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responseData = await retrieveAllResponsesApiService(
//           userId,
//           formId,
//           token
//         );
//         setResponses(responseData);
//         setLoading(false);
//       } catch (error) {
//         setError("An error occurred while fetching responses");
//         setLoading(false);
//       }
//     };

//     fetchData();
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [userId, formId, token]);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Response Data</h2>
//       {responses.length > 0 ? (
//         <>
//           <div className="mb-4">
//             <h3 className="text-center">{responses[0].form.title}</h3>
//             <p className="text-center">{responses[0].form.description}</p>
//           </div>
//           <Table striped bordered hover className="mx-auto" style={{ maxWidth: "600px" }}>
//             <thead>
//               <tr>
//                 <th>Sr. No</th>
//                 <th>Response ID</th>
//                 <th>Date</th>
//                 <th>Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {responses.map((response, index) => {
//                 const timestamp = new Date(response.timestamp);
//                 const date = timestamp.toLocaleDateString();
//                 const time = timestamp.toLocaleTimeString();
//                 return (
//                   <tr key={response.responseId}>
//                     <td>{index + 1}</td>
//                     <td>{response.responseId}</td>
//                     <td>{date}</td>
//                     <td>{time}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </>
//       ) : (
//         <div className="text-center mt-5">
//           <Alert style={{backgroundColor : "#f9ffff", border : "none", padding : "50px"}}>No responses available for this form.</Alert>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResponseData;
