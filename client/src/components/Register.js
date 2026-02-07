import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      alert("Registered Successfully ✅");
      navigate("/");
    } catch {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <div className="input-box">
        <input placeholder=" " onChange={e => setName(e.target.value)} />
        <label>Full Name</label>
      </div>

      <div className="input-box">
        <input placeholder=" " onChange={e => setEmail(e.target.value)} />
        <label>Email Address</label>
      </div>

      <div className="input-box">
        <input type="password" placeholder=" " onChange={e => setPassword(e.target.value)} />
        <label>Password</label>
      </div>

      <button onClick={register}>Register</button>

      <p className="auth-link" onClick={() => navigate("/")}>
        Already have an account? Login
      </p>
    </div>
  );
}
