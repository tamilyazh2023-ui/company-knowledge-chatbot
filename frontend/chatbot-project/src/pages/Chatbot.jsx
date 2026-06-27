import { useState, useEffect } from "react";
import API from "../api/api";

import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import UploadSection from "../components/UploadSection";
import Conversation from "../components/Conversation";

import "../styles/Chatbot.css";

function Chatbot() {

  const [activeMenu, setActiveMenu] =
    useState("chat");

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [isTyping, setIsTyping] =
    useState(false);

  const [user, setUser] = useState({
    full_name: "",
    email: "",
    role: "",
  });

  const [darkMode, setDarkMode] =
    useState(true);

  const [themeColor, setThemeColor] =
    useState("#8b5cf6");

  // ------------------------

  useEffect(() => {
    loadProfile();
  }, []);
  
  const loadProfile = async () => {
    try {
      const res = await API.get("/users/me");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {

    if (message.trim() === "") return;

    const question = message;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");

    setIsTyping(true);

    try {

      const response = await API.post(
        "/chat/",
        {
          message: question,
        }
      );

      const aiMessage = {
        sender: "ai",
        text: response.data.reply,
      };
      console.log(response.data);
      console.log(aiMessage);

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      console.log(messages);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [

        ...prev,

        {
          sender: "ai",
          text: "Unable to connect to server.",
        },

      ]);

    } finally {

      setIsTyping(false);

    }

  };

  // ------------------------

  const saveChat = () => {

    localStorage.setItem(
      "savedChats",
      JSON.stringify(messages)
    );

    alert("Chat Saved");

  };

  // ------------------------

  const clearChat = () => {

    if (
      window.confirm(
        "Clear all chats?"
      )
    ) {

      setMessages([]);

    }

  };

  // ------------------------

  const newChat = () => {

    setMessages([]);

    setMessage("");

    setActiveMenu("chat");

  };

  // ------------------------

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    window.location.href = "/";

  };

  const clearSavedChats = () => {
    localStorage.removeItem("savedChats");
    alert("Saved chats cleared successfully.");
    window.location.reload();
  };
    return (
    <div
      className={
        darkMode
          ? "chatbot-page"
          : "chatbot-page light-mode"
      }
      style={{
        "--theme": themeColor,
      }}
    >

      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        newChat={newChat}
      />

      <div className="main-content">

        {/* ---------------- CHAT ---------------- */}

        {activeMenu === "chat" && (
          <>

            <div className="page-header">
              <h1>
                👋 Welcome {user.full_name || "User"}
              </h1>
              <p>
                Ask anything about your company knowledge base.
              </p>
            </div>

            <ChatInput
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />

            <div className="chat-actions">

              <button
                className="save-btn"
                onClick={saveChat}
              >
                Save Chat
              </button>

              <button
                className="clear-btn"
                onClick={clearChat}
              >
                Clear Chat
              </button>

            </div>

            <UploadSection />

            <Conversation
              messages={messages}
            />

            {isTyping && (

              <div className="typing-box">

                🤖 NexaBot is typing...

              </div>

            )}

          </>
        )}

        {/* ---------------- HISTORY ---------------- */}

        {activeMenu === "history" && (

          <div className="section-card">

            <h2>Chat History</h2>

            {messages.length === 0 ? (

              <p>No Chat History Available</p>

            ) : (

              messages.map((msg, index) => (

                <div
                  className="history-item"
                  key={index}
                >

                  <strong>
                    {msg.sender === "user"
                      ? "You"
                      : "AI"}
                  </strong>

                  <p>{msg.text}</p>

                </div>

              ))

            )}

          </div>

        )}

        {/* ---------------- SAVED ---------------- */}

        {activeMenu === "saved" && (

          <div className="section-card">

            <h2>Saved Chats</h2>

            <button
              className="clear-btn"
              onClick={clearSavedChats}
              style={{ marginBottom: "20px" }}
            >
              Clear Saved Chats
            </button>

            {(JSON.parse(
              localStorage.getItem("savedChats")
            ) || []).length === 0 ? (

              <p>No Saved Chats</p>

            ) : (

              (JSON.parse(
                localStorage.getItem("savedChats")
              ) || []).map((msg, index) => (

                <div
                  className="history-item"
                  key={index}
                >

                  <strong>
                    {msg.sender === "user"
                      ? "You"
                      : "AI"}
                  </strong>

                  <p>{msg.text}</p>

                </div>

              ))

            )}

          </div>

        )}

        {/* ---------------- PROFILE ---------------- */}
        
        {activeMenu === "profile" && (
          <div className="profile-card">
            <h2>User Profile</h2>
            <label>Full Name</label>
            <input
              value={user.full_name}
              readOnly
            />
            
            <label>Email</label>
            <input
              value={user.email}
              readOnly
            />
            
            <label>Role</label>
            <input
              value={user.role}
              readOnly
            />
          </div>

        )}

        {/* ---------------- SETTINGS ---------------- */}

        {activeMenu === "settings" && (

          <div className="settings-card">

            <h2>Settings</h2>

            <div className="setting-item">

              <span>🌙 Dark Mode</span>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() =>
                  setDarkMode(!darkMode)
                }
              />

            </div>

            <div className="setting-item">

              <span>
                🎨 Theme Color
              </span>

              <input
                type="color"
                value={themeColor}
                onChange={(e) =>
                  setThemeColor(
                    e.target.value
                  )
                }
              />

            </div>

            <button
              className="logout-all-btn"
              onClick={logout}
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Chatbot;