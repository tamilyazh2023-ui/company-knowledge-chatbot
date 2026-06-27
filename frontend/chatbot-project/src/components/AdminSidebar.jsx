import {
  FaHome,
  FaUsers,
  FaComments,
  FaFileAlt,
  FaGlobe,
  FaChartLine,
  FaCog,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteModal from "./DeleteModal";

function AdminSidebar({ activePage, setActivePage }) {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admin-sidebar">

      {/* Logo */}

      <div className="sidebar-logo">
        <h2>
          ⚡ NexaBot
          <span className="admin-badge">
            Admin
          </span>
        </h2>
      </div>

      {/* Dashboard */}

      <button
        className="dashboard-btn"
        onClick={() => setActivePage("dashboard")}
      >
        <FaHome />
        Dashboard
      </button>

      {/* MAIN */}

      <div className="sidebar-section">

        <p className="section-title">
          MAIN
        </p>

        <ul>

          <li onClick={() => setActivePage("users")}>
            <FaUsers />
            Users
          </li>

          <li onClick={() => setActivePage("documents")}>
            <FaFileAlt />
            Documents
          </li>

          <li onClick={() => setActivePage("websites")}>
            <FaGlobe />
            Websites
          </li>

          <li onClick={() => setActivePage("analytics")}>
            <FaChartLine />
            Analytics
          </li>

        </ul>

      </div>

      {/* MANAGEMENT */}

      <div className="sidebar-section">

        <p className="section-title">
          MANAGEMENT
        </p>

        <ul>

          <li onClick={() => setActivePage("users")}>
            <FaUsers />
            View Users
          </li>

          <li onClick={() => setActivePage("history")}>
            <FaComments />
            Chat History
          </li>

        </ul>

      </div>

      {/* SYSTEM */}

      <div className="sidebar-section">

        <p className="section-title">
          SYSTEM
        </p>

        <ul>

          <li onClick={() => setActivePage("settings")}>
            <FaCog />
            Settings
          </li>

          <li onClick={() => setActivePage("logs")}>
            <FaClipboardList />
            Logs
          </li>

        </ul>

      </div>

      {/* Profile */}

      <div
        className="admin-profile-card"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      >
        <div className="admin-avatar">
          👤
        </div>

        <div>
          <h4>Admin</h4>
          <span>Super Admin</span>
        </div>
      </div>

      {showProfileMenu && (
        <div className="profile-dropdown">

          <button
            onClick={() => {
              setActivePage("settings");
              setShowProfileMenu(false);
            }}
          >
            ⚙ Settings
          </button>

          <button
            onClick={() => {
              setShowProfileMenu(false);
              setLogoutOpen(true);
            }}
          >
            🚪 Logout
          </button>

        </div>
      )}

      {/* Logout Button */}

      <button
        className="admin-logout-btn"
        onClick={() => setLogoutOpen(true)}
      >
        <FaSignOutAlt />
        Logout
      </button>

      {/* Logout Modal */}

      <DeleteModal
        isOpen={logoutOpen}
        title="your account"
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          logout();
        }}
      />

    </div>
  );
}

export default AdminSidebar;