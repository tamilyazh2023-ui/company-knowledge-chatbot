import { useState } from "react";
import API from "../api/api";

function AdminSettings() {

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const changePassword = async () => {

    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {

      const response = await API.post(
        "/users/change-password",
        {
          current_password: currentPassword,
          new_password: newPassword,
        }
      );

      setMessage(response.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {

      if (error.response) {

        setMessage(
          error.response.data.message ||
          error.response.data.detail ||
          "Password change failed."
        );

      } else {

        setMessage("Unable to connect to server.");

      }

    }

  };

  return (

    <div className="settings-panel">

      <div className="panel-header">

        <h2>Settings</h2>

        <p>
          Manage your administrator preferences
        </p>

      </div>

      {/* Theme */}

      <div className="setting-row">

        <div>

          <h4>Theme Color</h4>

          <p>Select your preferred dashboard theme.</p>

        </div>

        <div className="theme-colors">

          <div className="color purple"></div>

          <div className="color blue"></div>

          <div className="color green"></div>

          <div className="color orange"></div>

        </div>

      </div>

      {/* Dark Mode */}

      <div className="setting-row">

        <div>

          <h4>Dark Mode</h4>

          <p>Enable or disable dark mode.</p>

        </div>

        <label className="switch">

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />

          <span className="slider"></span>

        </label>

      </div>

      {/* Notifications */}

      <div className="setting-row">

        <div>

          <h4>Email Notifications</h4>

          <p>Receive email alerts for important events.</p>

        </div>

        <label className="switch">

          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />

          <span className="slider"></span>

        </label>

      </div>

      {/* Change Password */}

      <div className="setting-row">

        <div style={{ width: "100%" }}>

          <h4>Change Password</h4>

          <br />

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
            }}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
            }}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          />

          <button
            className="change-pass-btn"
            onClick={changePassword}
          >
            Change Password
          </button>

          {message && (

            <p
              style={{
                marginTop: "15px",
                color: "#22c55e",
                fontWeight: "bold",
              }}
            >
              {message}
            </p>

          )}

        </div>

      </div>

    </div>

  );

}

export default AdminSettings;