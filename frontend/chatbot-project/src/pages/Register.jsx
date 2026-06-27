import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = () => {
    if (password.length < 6) {
      return {
        text: "Weak",
        color: "#ff4d4d",
      };
    }

    if (password.length < 10) {
      return {
        text: "Medium",
        color: "#facc15",
      };
    }

    return {
      text: "Strong",
      color: "#22c55e",
    };
  };

  const handleRegister = async () => {
    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !role.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill all details");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await API.post("/users/register", {
        full_name: name,
        email: email,
        password: password,
        role: role.toLowerCase(),
      });

      console.log(response.data);

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 2500);

    } catch (error) {
      console.error(error);

      if (error.response) {
        setError(
          error.response.data.detail ||
          "Registration Failed"
        );
      } else {
        setError("Unable to connect to server.");
      }
    }
  };

  return (
    <div className="register-page">

      <div className="register-container">

        <h1 className="register-title">
          Create Account
        </h1>

        <p className="register-subtitle">
          Join your workspace today
        </p>

        <div className="input-group">
          <label>FULL NAME</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />
        </div>

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
          <label>ROLE</label>

          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setError("");
            }}
          >
            <option value="">
              Select Role
            </option>

            <option value="User">
              User
            </option>

            <option value="Admin">
              Admin
            </option>
          </select>
        </div>

        <div className="input-group">
          <label>PASSWORD</label>

          <div className="password-box">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              👁
            </span>

          </div>

          {password && (
            <p
              className="password-strength"
              style={{
                color:
                  getPasswordStrength().color,
              }}
            >
              Password Strength:{" "}
              {getPasswordStrength().text}
            </p>
          )}
        </div>

        <div className="input-group">

          <label>CONFIRM PASSWORD</label>

          <div className="password-box">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(
                  e.target.value
                );
                setError("");
              }}
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              👁
            </span>

          </div>

        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <button
          className="register-btn"
          onClick={handleRegister}
        >
          Create Account →
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Login
          </span>
        </p>

      </div>

      {showPopup && (
        <div className="popup-overlay">

          <div className="popup-box">

            <div className="success-icon">
              ✅
            </div>

            <h2>Account Created!</h2>

            <p>
              Your account has been
              created successfully.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default Register;