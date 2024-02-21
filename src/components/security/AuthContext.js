// import { createContext, useContext, useState } from "react";
// import { executeBasicAuthenticationService } from "../api/AuthenticationApiService";
// import { ApiClient } from "../api/ApiClient";

// export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export default function AuthProvider({ children }) {
//   const [isAuthenticated, setAuthenticated] = useState(false);
//   const [username, setusername] = useState(null);
//   const [token, setToken] = useState(null);

//   async function login(username, password) {
//     const baToken = "Basic " + window.btoa(username + ":" + password);

//     try {
//       const response = await executeBasicAuthenticationService(baToken);

//       if (response.status === 200) {
//         setAuthenticated(true);
//         setusername(username);
//         setToken(baToken);
//         ApiClient.interceptors.request.use((config) => {
//           console.log("Intercepting and adding a token");
//           config.headers.Authorization = baToken;
//           return config;
//         });
//         return true;
//       } else {
//         logout();
//         return false;
//       }
//     } catch (error) {
//       logout();
//       return false;
//     }
//   }

//   function logout() {
//     setAuthenticated(false);
//     setToken(null);
//     setusername(null);
//   }

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, login, logout, username, token }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
