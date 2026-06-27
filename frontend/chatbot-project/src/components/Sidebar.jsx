import {
  FaComments,
  FaHistory,
  FaBookmark,
  FaUser,
  FaCog,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({
  activeMenu,
  setActiveMenu,
  newChat,
}) {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <h2>⚡ NexaBot</h2>
      </div>

      <button
        className="new-chat-btn"
        onClick={newChat}
      >
        <FaPlus />
        New Chat
      </button>

      <ul className="sidebar-menu">

        <li
          className={
            activeMenu === "chat"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveMenu("chat")
          }
        >
          <FaComments />
          Chat
        </li>

        <li
          className={
            activeMenu === "history"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveMenu("history")
          }
        >
          <FaHistory />
          History
        </li>

        <li
          className={
            activeMenu === "saved"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveMenu("saved")
          }
        >
          <FaBookmark />
          Saved Chats
        </li>

        <li
          className={
            activeMenu === "profile"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveMenu("profile")
          }
        >
          <FaUser />
          Profile
        </li>

        <li
          className={
            activeMenu === "settings"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveMenu("settings")
          }
        >
          <FaCog />
          Settings
        </li>

      </ul>

      <button
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;