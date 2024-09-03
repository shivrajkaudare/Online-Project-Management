import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // State for invalid credentials

  const handleInputChange = (event) => {
    setFormData((currData) => ({
      ...currData,
      [event.target.name]: event.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = formData.email;
    const password = formData.password;

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setEmailError(emailError);
    setPasswordError(passwordError);

    if (emailError || passwordError) {
      setLoginError(""); // Clear previous login errors
    } else {
      // login check
      if (email === "shiv@gmail.com" && password === "password123") {
        navigate("/dashboard"); // Redirect to the dashboard after successful login
      } else {
        setLoginError(
          <div className="Invalid-Credential">
            <h4>Invalid Credentials</h4>
          </div>
        ); // Set login error message
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src="/src/assets/images/Logo.svg" alt="Logo" />
        <h3>Project Management System</h3>
      </div>
      <div className="login-box">
        <h3>Login to get started</h3>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="input1">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={emailError ? "input-error" : ""}
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
          </div>
          <div className="input2">
            <div className="input-group password-container">
              <label htmlFor="password">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={passwordError ? "input-error" : ""}
              />
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
              <span
                className={`toggle-password ${
                  passwordVisible ? "visible" : ""
                }`}
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fa-regular ${
                    passwordVisible ? "fa-eye" : "fa-eye-slash"
                  }`}
                ></i>
              </span>
            </div>
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {loginError && (
            <div className="login-error-message">{loginError}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
