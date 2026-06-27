import { useState } from "react";
import { FaSyncAlt } from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";
import StatsCards from "../components/StatsCards";
import UploadDocuments from "../components/UploadDocuments";
import AdminAnalyticsChart from "../components/AdminAnalyticsChart";
import UserManagement from "../components/UserManagement";
import RecentActivity from "../components/RecentActivity";
import AdminSettings from "../components/AdminSettings";
import AdminLogs from "../components/AdminLogs";
import ChatHistory from "../components/ChatHistory";
import DocumentsManagement from "../components/DocumentsManagement";
import WebsiteManagement from "../components/WebsiteManagement";
import AnalyticsPage from "../components/AnalyticsPage";

import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshDashboard = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>Welcome back, Admin! 👋</h1>
            <p>
              Here's what's happening with your chatbot platform today.
            </p>
          </div>

          <div className="header-right">
            <button
              className="refresh-btn"
              onClick={refreshDashboard}
            >
              <FaSyncAlt />
              &nbsp;Refresh
            </button>

            <button className="date-btn">
              📅 {new Date().toLocaleDateString()}
            </button>

            <div className="notification">
              🔔
              <span>3</span>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        {activePage === "dashboard" && (
          <>
            <StatsCards key={`stats-${refreshKey}`} />

            <div className="dashboard-row">
              <UploadDocuments key={`upload-${refreshKey}`} />
              <AdminAnalyticsChart key={`chart-${refreshKey}`} />
            </div>

            <div className="dashboard-row">
              <UserManagement key={`users-${refreshKey}`} />
              <RecentActivity key={`activity-${refreshKey}`} />
            </div>
          </>
        )}

        {/* Users */}
        {activePage === "users" && (
          <UserManagement key={`users-page-${refreshKey}`} />
        )}

        {/* Chat History */}
        {activePage === "history" && (
          <ChatHistory key={`chat-${refreshKey}`} />
        )}

        {/* Documents */}
        {activePage === "documents" && (
          <DocumentsManagement key={`documents-${refreshKey}`} />
        )}

        {/* Websites */}
        {activePage === "websites" && (
          <WebsiteManagement key={`websites-${refreshKey}`} />
        )}

        {/* Analytics */}
        {activePage === "analytics" && (
          <AnalyticsPage key={`analytics-${refreshKey}`} />
        )}

        {/* Settings */}
        {activePage === "settings" && (
          <AdminSettings />
        )}

        {/* Logs */}
        {activePage === "logs" && (
          <AdminLogs />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;