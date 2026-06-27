import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [eyesClosed, setEyesClosed] = useState(false);
  const [pupilX, setPupilX] = useState(0);
  const [pupilY, setPupilY] = useState(0);

  useEffect(() => {
    const moveEyes = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;

      setPupilX(x);
      setPupilY(y);
    };

    window.addEventListener("mousemove", moveEyes);

    return () => {
      window.removeEventListener("mousemove", moveEyes);
    };
  }, []);

  const trackEyes = (value) => {
    setEmail(value);

    const shift = Math.min(value.length * 0.3, 6);
    setPupilX(shift);
    setPupilY(0);
  };

  const adminDemo = () => {
    setEmail("admin@gmail.com");
    setPassword("admin123");
  };

  const userDemo = () => {
    setEmail("user@gmail.com");
    setPassword("user123");
  };

  const login = async () => {
    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      const response = await API.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/chat");
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          error.response.data.detail ||
          "Invalid Email or Password"
        );
      } else {
        alert("Unable to connect to server.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="box">

        {/* Robot */}
        <div className="head">
          <div className={`eye left ${eyesClosed ? "closed" : ""}`}>
            <div
              className="pupil"
              style={{
                transform: `translate(${pupilX}px, ${pupilY}px)`,
              }}
            />
          </div>

          <div className={`eye right ${eyesClosed ? "closed" : ""}`}>
            <div
              className="pupil"
              style={{
                transform: `translate(${pupilX}px, ${pupilY}px)`,
              }}
            />
          </div>
        </div>

        <h1 className="welcome-title">
          Welcome Back
        </h1>

        <p className="welcome-subtitle">
          Sign in to your workspace
        </p>

        {/* Demo Buttons */}
        <div className="role-toggle">
          <button
            className="active-role"
            onClick={adminDemo}
          >
            Admin Demo
          </button>

          <button onClick={userDemo}>
            User Demo
          </button>
        </div>

        {/* Email */}
        <label className="input-label">
          EMAIL
        </label>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onFocus={() => setEyesClosed(false)}
          onChange={(e) => trackEyes(e.target.value)}
        />

        {/* Password */}
        <label className="input-label">
          PASSWORD
        </label>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setEyesClosed(true)}
          onBlur={() => setEyesClosed(false)}
        />

        {/* Remember + Forgot */}
        <div className="options-row">
          <label className="remember-box">
            <input type="checkbox" />
            Remember me
          </label>

          <span
            className="forgot-link"
            onClick={() => navigate("/forgot-password")}
            style={{ cursor: "pointer" }}
          >
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button
          className="login-btn"
          onClick={login}
        >
          Sign In →
        </button>

        {/* Register */}
        <p className="register-text">
          Don't have an account?{" "}
          <span
            className="register-link"
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer" }}
          >
            Create Account
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;