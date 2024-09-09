import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

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

  const handleSubmit = async (event) => {
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
      try {
        const response = await axios.post("http://localhost:8080/login", {
          email,
          password,
        });

        if (response.status === 200) {
          // if jwt token matches then
          navigate("/dashboard");
        }
      } catch (error) {
        setLoginError(
          <div className="Invalid-Credential">
            <h4>Invalid Credentials</h4>
          </div>
        );
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src="/src/assets/images/Logo.svg" alt="Logo" />
        <h2> Online Project Management </h2>
      </div>
      <div className="login-box">
        <img
          src="/src/assets/images/login-bg-1.svg"
          alt="Logo"
          className="login-bg"
        />
        <h2> Online Project Management </h2>
        <img src="/src/assets/images/Logo.svg" alt="Logo" className="logo" />
        <h3 className="heading">Login to get started</h3>
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
