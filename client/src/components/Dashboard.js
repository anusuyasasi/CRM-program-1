import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerForm from "./CustomerForm";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/customers",
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    );
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
    <div>
      <h2>CRM Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <CustomerForm refresh={fetchCustomers} />

      <h3>Customer List</h3>
      <ul>
        {customers.map(c => (
          <li key={c._id}>
            {c.name} - {c.company}
          </li>
        ))}
      </ul>
    </div>
  );
}
