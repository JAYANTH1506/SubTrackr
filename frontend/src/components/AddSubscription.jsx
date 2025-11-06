import React, { useState } from "react";
import { addSubscription } from "../api/api";

const AddSubscription = ({ token, refresh }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [billingCycle, setBillingCycle] = useState("Monthly");

  const handleAdd = async (e) => {
    e.preventDefault();
    await addSubscription({ serviceName: name, amount, category, startDate, endDate, billingCycle }, token);
    refresh();
    setName(""); setAmount(""); setCategory(""); setStartDate(""); setEndDate(""); setBillingCycle("Monthly");
  };

  return (
    <div className="add-sub-card">
      <h3>Add Subscription</h3>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Service Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input type="date" placeholder="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
        <input type="date" placeholder="End Date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
        <select value={billingCycle} onChange={e => setBillingCycle(e.target.value)}>
          <option>Monthly</option>
          <option>Yearly</option>
          <option>Weekly</option>
        </select>
        <button type="submit" className="primary">Add</button>
      </form>
    </div>
  );
};

export default AddSubscription;
