import { useState } from "react";
import API from "../api/api";

function PdfUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await API.post(
        "/document/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Upload Failed!");
    }
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "60px auto",
        textAlign: "center",
      }}
    >
      <h2>Upload Company PDF</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={uploadPDF}>
        Upload PDF
      </button>

      <br />
      <br />

      <h3>{message}</h3>
    </div>
  );
}

export default PdfUpload;