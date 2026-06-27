import { useEffect, useState } from "react";
import API from "../api/api";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";

function WebsiteManagement() {
  const [websites, setWebsites] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadWebsites();
  }, []);

  const loadWebsites = async () => {
    try {
      const response = await API.get("/document/websites");
      setWebsites(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load websites.");
    }
  };

  const deleteWebsite = async (id) => {
    try {
      await API.delete(`/document/websites/${id}`);

      toast.success("Website deleted successfully.");

      loadWebsites();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete website.");
    }
  };

  // Search
  const filteredWebsites = websites.filter((website) =>
    (website.url ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // CSV Export
  const exportCSV = () => {
    if (filteredWebsites.length === 0) {
      toast.warning("No websites to export.");
      return;
    }

    const rows = filteredWebsites.map((website) => [
      website.id,
      `"${website.url}"`,
      website.crawled_at
        ? new Date(website.crawled_at).toLocaleString()
        : "-",
    ]);

    const csv =
      "ID,Website URL,Crawled Time\n" +
      rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "websites.csv";
    link.click();

    URL.revokeObjectURL(url);

    toast.success("CSV exported successfully.");
  };

  return (
    <div className="user-management">
      <h2>Crawled Websites</h2>

      <div className="table-header">
        <input
          type="text"
          placeholder="🔍 Search website..."
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
            <th>Website URL</th>
            <th>Crawled Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredWebsites.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#94a3b8",
                }}
              >
                No websites found.
              </td>
            </tr>
          ) : (
            filteredWebsites.map((website) => (
              <tr key={website.id}>
                <td>{website.id}</td>

                <td>{website.url}</td>

                <td>
                  {website.crawled_at
                    ? new Date(
                        website.crawled_at
                      ).toLocaleString()
                    : "-"}
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      setSelectedId(website.id);
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
        title="this website"
        onClose={() => {
          setOpen(false);
          setSelectedId(null);
        }}
        onConfirm={async () => {
          await deleteWebsite(selectedId);
          setOpen(false);
          setSelectedId(null);
        }}
      />
    </div>
  );
}

export default WebsiteManagement;