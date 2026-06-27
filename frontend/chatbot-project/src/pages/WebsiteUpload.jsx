import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function WebsiteUpload() {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const crawlWebsite = async () => {
    if (!url.trim()) {
      alert("Please enter a website URL.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await API.post("/document/website", {
        url,
      });

      setMessage(
        `${response.data.message}\nChunks Created: ${response.data.chunks}`
      );
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.detail || "Website crawling failed.");
      } else {
        alert("Unable to connect to the backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "700px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Crawl Company Website</h1>

      <p>
        Enter the company website URL. The system will crawl the website,
        generate embeddings, and store them in the knowledge base.
      </p>

      <br />

      <input
        type="text"
        placeholder="https://www.company.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
        }}
      />

      <br />
      <br />

      <button
        onClick={crawlWebsite}
        disabled={loading}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Crawling Website..." : "Crawl Website"}
      </button>

      <button
        onClick={() => navigate("/admin")}
        style={{
          padding: "10px 20px",
          marginLeft: "15px",
          cursor: "pointer",
        }}
      >
        Back
      </button>

      <br />
      <br />

      {message && (
        <div
          style={{
            border: "1px solid green",
            backgroundColor: "#f0fff0",
            padding: "15px",
            borderRadius: "8px",
            whiteSpace: "pre-line",
          }}
        >
          <strong>{message}</strong>
        </div>
      )}
    </div>
  );
}

export default WebsiteUpload;