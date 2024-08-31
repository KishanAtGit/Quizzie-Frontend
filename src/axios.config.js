import axios from "axios";

const token = localStorage.getItem("token");
// Create an instance of axios with default configuration
const apiClient = axios.create({
  baseURL: "https://quizzie-backend-lhsz.onrender.com/api/", // Base URL for all requests
  headers: {
    "auth-token": token, // Include the auth token in the headers
    "Content-Type": "application/json", // Optional: Set default content type
  },
});

// Export the instance to use in other parts of your application
export default apiClient;
