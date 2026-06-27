import { useEffect, useState } from "react";
import API from "../api/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function AnalyticsPage() {

    const [summary, setSummary] = useState({
        users: 0,
        chats: 0,
        documents: 0,
        websites: 0,
    });

    const [chatData, setChatData] = useState([]);

    useEffect(() => {

        loadSummary();
        loadChatAnalytics();

    }, []);

    const loadSummary = async () => {

        try {

            const response = await API.get("/analytics/summary");

            setSummary(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    const loadChatAnalytics = async () => {

        try {

            const response = await API.get("/analytics/chats");

            setChatData(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    const barData = {

        labels: [
            "Users",
            "Chats",
            "Documents",
            "Websites"
        ],

        datasets: [

            {

                label: "Platform Summary",

                data: [

                    summary.users,
                    summary.chats,
                    summary.documents,
                    summary.websites

                ],

            },

        ],

    };

    const lineData = {

        labels: chatData.map(item => item.date),

        datasets: [

            {

                label: "Chats Per Day",

                data: chatData.map(item => item.count),

            },

        ],

    };

    return (

        <div className="analytics-page">

            <h2>Analytics Dashboard</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <div className="stat-card">

                    <h3>{summary.users}</h3>

                    <p>Total Users</p>

                </div>

                <div className="stat-card">

                    <h3>{summary.chats}</h3>

                    <p>Total Chats</p>

                </div>

                <div className="stat-card">

                    <h3>{summary.documents}</h3>

                    <p>Documents</p>

                </div>

                <div className="stat-card">

                    <h3>{summary.websites}</h3>

                    <p>Websites</p>

                </div>

            </div>

            <div
                style={{
                    background: "#1d2433",
                    padding: "20px",
                    borderRadius: "12px",
                    marginBottom: "30px"
                }}
            >

                <Bar data={barData} />

            </div>

            <div
                style={{
                    background: "#1d2433",
                    padding: "20px",
                    borderRadius: "12px"
                }}
            >

                <Line data={lineData} />

            </div>

        </div>

    );

}

export default AnalyticsPage;