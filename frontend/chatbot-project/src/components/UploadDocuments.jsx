import { useRef, useState } from "react";
import {
  FaFilePdf,
  FaImage,
  FaMicrophone,
  FaGlobe,
} from "react-icons/fa";

import API from "../api/api";
import { toast } from "react-toastify";

function UploadDocuments() {
  const [pdf, setPdf] = useState(null);
  const [website, setWebsite] = useState("");

  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingWebsite, setLoadingWebsite] = useState(false);

  const fileInputRef = useRef(null);

  // ---------------- PDF Upload ----------------

  const uploadPDF = async () => {
    if (!pdf) {
      toast.warning("Please select a PDF.");
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
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(
        response.data.message || "PDF uploaded successfully!"
      );

      setPdf(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "PDF Upload Failed"
      );
    } finally {
      setLoadingPdf(false);
    }
  };

  // ---------------- Website Crawl ----------------

  const crawlWebsite = async () => {
    if (!website.trim()) {
      toast.warning("Please enter Website URL");
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

      toast.success(
        `${response.data.message}\nChunks Created: ${response.data.chunks}`
      );

      setWebsite("");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Website Crawl Failed"
      );
    } finally {
      setLoadingWebsite(false);
    }
  };

  return (
    <div className="upload-panel">

      <div className="panel-header">
        <h2>Upload Documents</h2>

        <p>
          Upload different types of documents to the
          platform
        </p>
      </div>

      <div className="upload-grid">

        {/* PDF Upload */}

        <label className="upload-box">
          <FaFilePdf className="upload-icon" />

          <h4>PDF Upload</h4>

          <p>Upload company PDF files</p>

          {pdf && (
            <p className="selected-file">
              📄 {pdf.name}
            </p>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) =>
              setPdf(e.target.files[0])
            }
          />
        </label>

        {/* Image Upload */}

        <div className="upload-box">
          <FaImage className="upload-icon" />

          <h4>Image Upload</h4>

          <p>Coming Soon</p>
        </div>

        {/* Audio Upload */}

        <div className="upload-box">
          <FaMicrophone className="upload-icon" />

          <h4>Audio Upload</h4>

          <p>Coming Soon</p>
        </div>

        {/* Website Upload */}

        <div className="upload-box url-box">
          <FaGlobe className="upload-icon" />

          <h4>Website URL</h4>

          <input
            type="text"
            placeholder="https://company.com"
            value={website}
            onChange={(e) =>
              setWebsite(e.target.value)
            }
          />

          <button
            className="url-btn"
            onClick={crawlWebsite}
            disabled={loadingWebsite}
          >
            {loadingWebsite
              ? "Crawling..."
              : "Crawl Website"}
          </button>
        </div>

      </div>

      <br />

      <button
        className="view-btn"
        onClick={uploadPDF}
        disabled={loadingPdf}
      >
        {loadingPdf
          ? "Uploading..."
          : "Upload PDF"}
      </button>

      {/* Recent Documents */}

      <div className="recent-documents">

        <h3>Recent Documents</h3>

        <div className="document-item">
          <div>
            <strong>Company_Profile.pdf</strong>
            <p>Uploaded today</p>
          </div>

          <button className="view-btn">
            View
          </button>
        </div>

        <div className="document-item">
          <div>
            <strong>Annual_Report.pdf</strong>
            <p>Uploaded yesterday</p>
          </div>

          <button className="view-btn">
            View
          </button>
        </div>

      </div>

    </div>
  );
}

export default UploadDocuments;