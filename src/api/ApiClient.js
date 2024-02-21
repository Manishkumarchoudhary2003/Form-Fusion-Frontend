import axios from "axios";

// export const ApiClient = axios.create({
//     baseURL: "http://localhost:8080",
// });


export const ApiClient = axios.create({
    baseURL: "https://form-fusion-backend-production.up.railway.app",
});