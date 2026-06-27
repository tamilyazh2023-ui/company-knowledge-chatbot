import { useEffect, useState } from "react";
import API from "../api/api";

function RecentActivity() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await API.get("/activity");
      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const icon = (type) => {

    switch(type){

      case "user":
        return "👤";

      case "chat":
        return "💬";

      case "document":
        return "📄";

      case "website":
        return "🌐";

      default:
        return "📌";
    }

  };

  return (

    <div className="recent-card">

      <h2>Recent Activity</h2>

      {activities.map((item,index)=>(

        <div
          key={index}
          className="activity-item"
        >

          <span>

            {icon(item.type)}

          </span>

          <div>

            <p>{item.message}</p>

            <small>

              {new Date(item.time).toLocaleString()}

            </small>

          </div>

        </div>

      ))}

    </div>

  );

}

export default RecentActivity;