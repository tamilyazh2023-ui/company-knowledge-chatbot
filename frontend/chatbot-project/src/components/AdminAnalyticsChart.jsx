import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useEffect, useState } from "react";
import API from "../api/api";

function AdminAnalyticsChart() {

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
    const res = await API.get("/dashboard/stats");
    setStats(res.data);
  };

  const data = [
    {
      name: "Users",
      count: stats.users,
    },
    {
      name: "Chats",
      count: stats.chats,
    },
    {
      name: "Documents",
      count: stats.documents,
    },
    {
      name: "Websites",
      count: stats.websites,
    },
  ];

  return (
    <div className="analytics-card">

      <h3>Platform Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="name"/>

          <YAxis/>

          <Tooltip/>

          <Bar
            dataKey="count"
            fill="#8B5CF6"
            radius={[10,10,0,0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AdminAnalyticsChart;