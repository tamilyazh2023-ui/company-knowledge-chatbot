import {
  FaSignInAlt,
  FaFileUpload,
  FaGlobe,
  FaTrash,
  FaComments,
} from "react-icons/fa";

function AdminLogs() {
  const logs = [
    {
      icon: <FaSignInAlt />,
      title: "Admin Login",
      description: "Admin logged into the dashboard.",
      time: "Today • 09:15 AM",
    },
    {
      icon: <FaFileUpload />,
      title: "PDF Uploaded",
      description: "Company_Profile.pdf uploaded successfully.",
      time: "Today • 09:42 AM",
    },
    {
      icon: <FaGlobe />,
      title: "Website Crawled",
      description: "https://openai.com indexed into knowledge base.",
      time: "Today • 10:05 AM",
    },
    {
      icon: <FaComments />,
      title: "New Chat",
      description: "A user asked a company-related question.",
      time: "Today • 10:18 AM",
    },
    {
      icon: <FaTrash />,
      title: "Document Deleted",
      description: "Old_Report.pdf removed from storage.",
      time: "Yesterday • 05:20 PM",
    },
  ];

  return (
    <div className="logs-panel">

      <div className="panel-header">
        <h2>System Logs</h2>
        <p>Recent administrator and system activities</p>
      </div>

      <div className="logs-list">

        {logs.map((log, index) => (

          <div
            key={index}
            className="log-item"
          >

            <div className="log-icon">
              {log.icon}
            </div>

            <div className="log-content">

              <strong>{log.title}</strong>

              <p>{log.description}</p>

              <span>{log.time}</span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminLogs;