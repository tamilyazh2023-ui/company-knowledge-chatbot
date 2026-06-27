import { useEffect, useState } from "react";
import API from "../api/api";
import DeleteModal from "./DeleteModal";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

function ChatHistory() {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    setLoading(true);

    try {
      const response = await API.get("/chat/all");
      setChats(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load chat history.");
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (id) => {
    try {
      await API.delete(`/chat/${id}`);

      toast.success("Chat deleted successfully.");

      loadChats();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat.");
    }
  };

  const filteredChats = chats.filter(
    (chat) =>
      (chat.message ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (chat.reply ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const exportCSV = () => {
    if (filteredChats.length === 0) {
      toast.warning("No chats to export.");
      return;
    }

    const headers = [
      "ID",
      "User ID",
      "Question",
      "Reply",
      "Created At",
    ];

    const rows = filteredChats.map((chat) => [
      chat.id,
      chat.user_id,
      `"${(chat.message ?? "").replace(/"/g, '""')}"`,
      `"${(chat.reply ?? "").replace(/"/g, '""')}"`,
      chat.created_at
        ? new Date(chat.created_at).toLocaleString()
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
    link.download = "chat_history.csv";
    link.click();

    URL.revokeObjectURL(url);

    toast.success("Chat history exported successfully.");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-management">
      <h2>Chat History</h2>

      <div className="table-header">
        <input
          type="text"
          placeholder="🔍 Search question or reply..."
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
            <th>User ID</th>
            <th>Question</th>
            <th>Reply</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredChats.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#94a3b8",
                }}
              >
                No chats found.
              </td>
            </tr>
          ) : (
            filteredChats.map((chat) => (
              <tr key={chat.id}>
                <td>{chat.id}</td>

                <td>{chat.user_id}</td>

                <td>{chat.message}</td>

                <td>{chat.reply}</td>

                <td>
                  {chat.created_at
                    ? new Date(chat.created_at).toLocaleString()
                    : "-"}
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      setSelectedId(chat.id);
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
        title="this chat"
        onClose={() => {
          setOpen(false);
          setSelectedId(null);
        }}
        onConfirm={async () => {
          await deleteChat(selectedId);
          setOpen(false);
          setSelectedId(null);
        }}
      />
    </div>
  );
}

export default ChatHistory;