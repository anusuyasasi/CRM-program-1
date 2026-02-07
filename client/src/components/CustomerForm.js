import axios from "axios";
import { useState } from "react";

export default function CustomerForm({ refresh, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "Active"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCustomer = async () => {
    await axios.post(
      "http://localhost:5000/api/customers",
      form,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    );

    refresh && refresh();
    onClose && onClose();

    setForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      status: "Active"
    });
  };

  const styles = {
    card: {
      background: "#fff",
      padding: 20,
      borderRadius: 10,
      width: 400,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
    },
    title: {
      marginBottom: 15,
      fontSize: 18,
      fontWeight: "bold"
    },
    input: {
      width: "100%",
      padding: 10,
      marginBottom: 10,
      borderRadius: 6,
      border: "1px solid #ddd"
    },
    row: {
      display: "flex",
      gap: 10
    },
    buttonRow: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 10
    },
    addBtn: {
      background: "#f5c26b",
      border: "none",
      padding: "8px 14px",
      borderRadius: 6,
      cursor: "pointer",
      fontWeight: "bold"
    },
    cancelBtn: {
      background: "#eee",
      border: "none",
      padding: "8px 14px",
      borderRadius: 6,
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>Add Customer</div>

      <input
        style={styles.input}
        name="name"
        placeholder="Customer Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        style={styles.input}
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <div style={styles.row}>
        <input
          style={styles.input}
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
      </div>

      <select
        style={styles.input}
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <div style={styles.buttonRow}>
        {onClose && (
          <button style={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        )}
        <button style={styles.addBtn} onClick={addCustomer}>
          + Add Customer
        </button>
      </div>
    </div>
  );
}
