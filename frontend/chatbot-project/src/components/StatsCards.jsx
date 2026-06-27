import { useEffect, useState } from "react";
import {
  FaUsers,
  FaComments,
  FaFileAlt,
  FaGlobe,
} from "react-icons/fa";

import API from "../api/api";

function StatsCards() {
  const [stats, setStats] = useState({
    users: 0,
    chats: 0,
    documents: 0,
    websites: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await API.get("/dashboard/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    }
  };

  return (
    <div className="stats-grid">

      {/* Users */}
      <div className="stat-card purple">
        <div className="stat-icon">
          <FaUsers />
        </div>

        <div className="stat-info">
          <h4>Total Users</h4>
          <h2>{stats.users}</h2>
          <p>Registered users</p>
        </div>
      </div>

      {/* Chats */}
      <div className="stat-card blue">
        <div className="stat-icon">
          <FaComments />
        </div>

        <div className="stat-info">
          <h4>Total Chats</h4>
          <h2>{stats.chats}</h2>
          <p>Questions asked</p>
        </div>
      </div>

      {/* Documents */}
      <div className="stat-card green">
        <div className="stat-icon">
          <FaFileAlt />
        </div>

        <div className="stat-info">
          <h4>Total Documents</h4>
          <h2>{stats.documents}</h2>
          <p>Uploaded PDFs</p>
        </div>
      </div>

      {/* Websites */}
      <div className="stat-card orange">
        <div className="stat-icon">
          <FaGlobe />
        </div>

        <div className="stat-info">
          <h4>Total Websites</h4>
          <h2>{stats.websites}</h2>
          <p>Crawled Websites</p>
        </div>
      </div>

    </div>
  );
}

export default StatsCards;