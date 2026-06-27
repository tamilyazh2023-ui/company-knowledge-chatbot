import { useEffect, useState } from "react";
import API from "../api/api";
import DeleteModal from "./DeleteModal";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);

    try {
      const response = await API.get("/users/all");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);

      toast.success("User deleted successfully.");

      loadUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.full_name ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (user.email ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // CSV Export
  const exportUsers = () => {
    if (filteredUsers.length === 0) {
      toast.warning("No users to export.");
      return;
    }

    const headers = [
      "ID",
      "Name",
      "Email",
      "Role",
    ];

    const rows = filteredUsers.map((user) => [
      user.id,
      `"${user.full_name}"`,
      `"${user.email}"`,
      user.role,
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
    link.download = "users.csv";
    link.click();

    URL.revokeObjectURL(url);

    toast.success("Users exported successfully.");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-management">
      <h2>Registered Users</h2>

      <div className="table-header">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="export-btn"
          onClick={exportUsers}
        >
          ⬇ Export CSV
        </button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#94a3b8",
                }}
              >
                No users found.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>{user.full_name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      setSelectedId(user.id);
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
        title="this user"
        onClose={() => {
          setOpen(false);
          setSelectedId(null);
        }}
        onConfirm={async () => {
          await deleteUser(selectedId);
          setOpen(false);
          setSelectedId(null);
        }}
      />
    </div>
  );
}

export default UserManagement;