import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async () => {
    setError("");
    setSuccess("");

    if (!email || !newPassword || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await API.post(
        "/users/forgot-password",
        {
          email: email,
          new_password: newPassword,
        }
      );

      setSuccess(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong."
      );
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">

        <h1>Forgot Password</h1>

        <p>
          Enter your registered email and create a new password.
        </p>

        <div className="input-group">
          <label>EMAIL</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="input-group">
          <label>NEW PASSWORD</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="input-group">
          <label>CONFIRM PASSWORD</label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
          />
        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {success && (
          <p className="success-message">
            {success}
          </p>
        )}

        <button
          className="reset-btn"
          onClick={handleReset}
        >
          Reset Password
        </button>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;