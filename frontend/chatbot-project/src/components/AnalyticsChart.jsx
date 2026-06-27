import {
  FaUsers,
  FaComments,
  FaFileAlt
} from "react-icons/fa";

function AnalyticsChart() {
  return (
    <div className="analytics-panel">

      <div className="panel-header">
        <h2>Analytics Overview</h2>
        <p>Platform performance summary</p>
      </div>

      {/* Chart Area */}

      <div
        style={{
          height: "220px",
          borderRadius: "15px",
          background: "#0f172a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#94a3b8",
          fontSize: "18px"
        }}
      >
        📈 Analytics Chart Coming Soon
      </div>

      {/* Summary */}

      <div className="analytics-summary">

        <div className="summary-card">
          <FaUsers
            style={{
              fontSize: "28px",
              color: "#8b5cf6",
              marginBottom: "10px"
            }}
          />

          <h3>1,248</h3>

          <p>Total Users</p>

        </div>

        <div className="summary-card">

          <FaComments
            style={{
              fontSize: "28px",
              color: "#3b82f6",
              marginBottom: "10px"
            }}
          />

          <h3>3,682</h3>

          <p>Total Chats</p>

        </div>

        <div className="summary-card">

          <FaFileAlt
            style={{
              fontSize: "28px",
              color: "#22c55e",
              marginBottom: "10px"
            }}
          />

          <h3>2,153</h3>

          <p>Documents</p>

        </div>

      </div>

    </div>
  );
}

export default AnalyticsChart;