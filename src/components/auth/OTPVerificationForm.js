import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userVerifyApiService } from "../../api/AuthApiService";

function OTPVerificationForm() {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setOTP(event.target.value);
    setError("");
  };

  const handleVerify = async () => {
    if (otp.trim() === "") { 
        setError("OTP field cannot be empty");
        return;
    }
    try {
        const response = await userVerifyApiService(email, otp);
        console.log("Verifying OTP:", otp);
        console.log("Verfied ", response);
        if (response === "User verified successfully") {
            navigate("/login");
        } else {
            setError("OTP verification failed. Please try again.");
        }
    } catch (error) {
        setError("OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Email Verification</h2>
              <form>
                <div className="form-group"> 
                  <input
                    type="text"
                    className="form-control"
                    id="otpInput"
                    value={otp}
                    required
                    onChange={handleInputChange}
                    placeholder="Enter OTP"
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button
                  type="button" style={{
                  marginTop: "10px",
                  borderColor: "#c3d9e1",
                  borderRadius: "0.25rem",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem", 
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  transition: "background-color 0.1s",
                }}
                  onClick={handleVerify}
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerificationForm;
 








// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { userVerifyApiService } from "../../api/AuthApiService";

// function OTPVerificationForm() {
//   const [otp, setOTP] = useState("");
//   const [error, setError] = useState("");
//   const { email } = useParams();
//   const navigate = useNavigate();

//   const handleInputChange = (event) => {
//     setOTP(event.target.value);
//     setError("");
//   };

//   const handleVerify = async () => {
//     if (otp.trim() === "") { 
//         setError("OTP field cannot be empty");
//         return;
//       }
//     try {
//       const response = await userVerifyApiService(email, otp);
//       console.log("Verifying OTP:", otp);
//       console.log("Verfied ", response);
//       navigate("/login");
//     } catch (error) {
//       setError("OTP verification failed. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow mt-5">
//             <div className="card-body">
//               <h2 className="card-title text-center">Email Verification</h2>
//               <form>
//                 <div className="form-group"> 
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="otpInput"
//                     value={otp}
//                     required
//                     onChange={handleInputChange}
//                     placeholder="Enter OTP"
//                   />
//                 </div>
//                 {error && <div className="alert alert-danger">{error}</div>}
//                 <button
//                   type="button" style={{
//                   marginTop: "10px",
//                   borderColor: "#c3d9e1",
//                   borderRadius: "0.25rem",
//                   padding: "0.5rem 1rem",
//                   fontSize: "1rem", 
//                   cursor: "pointer",
//                   backgroundColor: "transparent",
//                   transition: "background-color 0.1s",
//                 }}
//                   onClick={handleVerify}
//                 >
//                   Verify
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OTPVerificationForm;
