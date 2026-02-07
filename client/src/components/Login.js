import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid Login ❌");
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>

      <div className="input-box">
        <input placeholder=" " onChange={e => setEmail(e.target.value)} />
        <label>Email Address</label>
      </div>

      <div className="input-box">
        <input type="password" placeholder=" " onChange={e => setPassword(e.target.value)} />
        <label>Password</label>
      </div>

      <button onClick={login}>Login</button>

      <p className="auth-link" onClick={() => navigate("/register")}>
        New User? Register
      </p>
    </div>
  );
}
