import React, { useEffect, useState } from "react";
import { getSubscriptions, deleteSubscription } from "../api/api";
import AddSubscription from "./AddSubscription";

const Dashboard = ({ token, setToken }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  const fetchSubs = async () => {
    const res = await getSubscriptions(token);
    setSubscriptions(res.data);

    const now = new Date();
    const monthTotal = res.data
      .filter(sub => new Date(sub.endDate).getMonth() === now.getMonth())
      .reduce((sum, sub) => sum + (sub.amount || 0), 0);
    setMonthlyTotal(monthTotal);
  };

  useEffect(() => { fetchSubs(); }, []);

  const handleDelete = async (id) => {
    await deleteSubscription(id, token);
    fetchSubs();
  };

  const isExpiringSoon = (endDate) => {
    const today = new Date();
    const date = new Date(endDate);
    const diffDays = Math.ceil((date - today) / (1000*60*60*24));
    return diffDays >= 0 && diffDays <= 3;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>My Subscriptions</h2>
        <button className="logout-btn" onClick={() => {localStorage.removeItem("token"); setToken("");}}>Logout</button>
      </div>

      <div className="summary-card">Monthly Spending: ₹{monthlyTotal}</div>

      <AddSubscription token={token} refresh={fetchSubs} />

      <div className="subscriptions-grid">
        {subscriptions.map(sub => (
          <div key={sub._id} className={`subscription-card ${isExpiringSoon(sub.endDate) ? "expiring" : ""}`}>
            {sub.logoUrl && <img className="sub-logo" src={sub.logoUrl} alt={sub.serviceName} />}
            <h4>{sub.serviceName}</h4>
            <p>₹{sub.amount}</p>
            {sub.category && <p>{sub.category}</p>}
            <p>Ends: {new Date(sub.endDate).toDateString()}</p>
            {isExpiringSoon(sub.endDate) && <p className="alert">⚠️ Expiring Soon</p>}
            <button className="delete-btn" onClick={() => handleDelete(sub._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
