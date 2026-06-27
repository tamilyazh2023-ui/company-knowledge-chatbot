import { useEffect, useState } from "react";
import API from "../api/api";
import DeleteModal from "./DeleteModal";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

function DocumentsManagement() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);

    try {
      const response = await API.get("/document/all");
      setDocuments(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await API.delete(`/document/${id}`);

      toast.success("Document deleted successfully.");

      loadDocuments();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete document.");
    }
  };

  const filteredDocuments = documents.filter((doc) =>
    (doc.file_name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // CSV Export
  const exportCSV = () => {
    if (filteredDocuments.length === 0) {
      toast.warning("No documents to export.");
      return;
    }

    const headers = [
      "ID",
      "Filename",
      "Uploaded Time",
    ];

    const rows = filteredDocuments.map((doc) => [
      doc.id,
      `"${doc.file_name ?? ""}"`,
      doc.uploaded_at
        ? new Date(doc.uploaded_at).toLocaleString()
        : "-",
    ]);

    const csv =
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "documents.csv";
    link.click();

    URL.revokeObjectURL(url);

    toast.success("Documents exported successfully.");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-management">
      <h2>Uploaded Documents</h2>

      <div className="table-header">
        <input
          type="text"
          placeholder="🔍 Search document..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="export-btn"
          onClick={exportCSV}
        >
          ⬇ Export CSV
        </button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Filename</th>
            <th>Uploaded Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredDocuments.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#94a3b8",
                }}
              >
                No documents found.
              </td>
            </tr>
          ) : (
            filteredDocuments.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>

                <td>{doc.file_name}</td>

                <td>
                  {doc.uploaded_at
                    ? new Date(doc.uploaded_at).toLocaleString()
                    : "-"}
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      setSelectedId(doc.id);
                      setOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <DeleteModal
        isOpen={open}
        title="this document"
        onClose={() => {
          setOpen(false);
          setSelectedId(null);
        }}
        onConfirm={async () => {
          await deleteDocument(selectedId);
          setOpen(false);
          setSelectedId(null);
        }}
      />
    </div>
  );
}

export default DocumentsManagement;