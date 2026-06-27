import { useEffect, useState } from "react";
import API from "../api/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await API.get("/chat/history");
      setHistory(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load chat history.");
    }
  };

  return (
    <div
      style={{
        width: "900px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Chat History</h1>

      <br />

      {history.length === 0 ? (
        <p>No Chat History Found.</p>
      ) : (
        history.map((chat, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <p>
              <strong>Question:</strong>
            </p>
            <p>{chat.message}</p>

            <br />

            <p>
              <strong>Answer:</strong>
            </p>
            <p>{chat.reply}</p>

            <br />

            <small>
              {new Date(chat.created_at).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default History;