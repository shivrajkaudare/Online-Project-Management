import axios from "axios";

const API_URL = "http://localhost:5000/api";

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "Login failed" };
  }
};

export default login;
