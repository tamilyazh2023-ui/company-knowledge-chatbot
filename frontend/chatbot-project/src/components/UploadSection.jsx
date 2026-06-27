import { useState } from "react";
import {
  FaFilePdf,
  FaGlobe,
} from "react-icons/fa";

import API from "../api/api";
import "../styles/UploadSection.css";

function UploadSection() {
  const [pdf, setPdf] = useState(null);
  const [website, setWebsite] = useState("");

  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingWebsite, setLoadingWebsite] =
    useState(false);

  // PDF Upload
  const uploadPDF = async () => {
    if (!pdf) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdf);

    try {
      setLoadingPdf(true);

      const response = await API.post(
        "/document/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      setPdf(null);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Upload Failed"
      );

    } finally {
      setLoadingPdf(false);
    }
  };

  // Website Crawl
  const crawlWebsite = async () => {
    if (!website.trim()) {
      alert("Enter Website URL");
      return;
    }

    try {
      setLoadingWebsite(true);

      const response = await API.post(
        "/document/website",
        {
          url: website,
        }
      );

      alert(
        `${response.data.message}

Chunks Created : ${response.data.chunks}`
      );

      setWebsite("");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Website Crawl Failed"
      );

    } finally {
      setLoadingWebsite(false);
    }
  };

  return (
    <div className="upload-section">

      <h3>Knowledge Sources</h3>

      <div className="upload-grid">

        {/* PDF */}

        <div className="upload-card">

          <FaFilePdf className="upload-icon" />

          <h4>Upload PDF</h4>

          <p>Select Company PDF</p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setPdf(e.target.files[0])
            }
          />

          {pdf && (
            <p className="file-name">
              {pdf.name}
            </p>
          )}

          <button
            onClick={uploadPDF}
            disabled={loadingPdf}
          >
            {loadingPdf
              ? "Uploading..."
              : "Upload PDF"}
          </button>

        </div>

        {/* Website */}

        <div className="upload-card">

          <FaGlobe className="upload-icon" />

          <h4>Website</h4>

          <p>Crawl Company Website</p>

          <div className="url-upload-box">

            <input
              type="text"
              placeholder="https://company.com"
              value={website}
              onChange={(e) =>
                setWebsite(e.target.value)
              }
            />

            <button
              onClick={crawlWebsite}
              disabled={loadingWebsite}
            >
              {loadingWebsite
                ? "..."
                : "Crawl"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UploadSection;