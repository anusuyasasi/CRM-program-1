import axios from "axios";
import { useState } from "react";

export default function CustomerForm({ refresh }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const addCustomer = async () => {
    await axios.post(
      "http://localhost:5000/api/customers",
      { name, email, phone, company },
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    );
    refresh();
  };

  return (
    <div>
      <h3>Add Customer</h3>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Phone" onChange={e => setPhone(e.target.value)} />
      <input placeholder="Company" onChange={e => setCompany(e.target.value)} />
      <button onClick={addCustomer}>Add</button>
    </div>
  );
}
