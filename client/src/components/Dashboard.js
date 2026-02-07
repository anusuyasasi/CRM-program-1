import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerForm from "./CustomerForm";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:5000/api/customers", {
      headers: { Authorization: localStorage.getItem("token") }
    });
    setCustomers(res.data);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    fetchCustomers();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>CRM Dashboard</h2>
        <button onClick={logout} style={{ padding: "6px 12px" }}>Logout</button>
      </div>

      {/* Stats / Cards */}
      <div style={{ display: "flex", gap: 10, marginTop: 20, marginBottom: 20 }}>
        <div style={{ background: "#4a90e2", padding: 20, borderRadius: 10, color: "#fff" }}>
          Total Customers <br /> {customers.length}
        </div>
        <div style={{ background: "#2ecc71", padding: 20, borderRadius: 10, color: "#fff" }}>
          New Leads <br /> 85
        </div>
        <div style={{ background: "#f39c12", padding: 20, borderRadius: 10, color: "#fff" }}>
          Active Deals <br /> 34
        </div>
        <div style={{ background: "#e91e63", padding: 20, borderRadius: 10, color: "#fff" }}>
          Pending Tasks <br /> 12
        </div>
      </div>

      {/* Add Customer Form toggle */}
      <button
        onClick={() => setShowForm(!showForm)}
        style={{ background: "#f5c26b", padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", marginBottom: 20 }}
      >
        + Add Customer
      </button>

      {showForm && <CustomerForm refresh={fetchCustomers} onClose={() => setShowForm(false)} />}

      {/* Customer List */}
      <h3 style={{ marginTop: 30 }}>Customer List</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#fdf6e3" }}>
            <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Phone</th>
            <th style={{ padding: 10, borderBottom: "1px solid #ddd" }}>Company</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c._id}>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{c.name}</td>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{c.email}</td>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{c.phone}</td>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{c.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
