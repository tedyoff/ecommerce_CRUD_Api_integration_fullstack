import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Login successful!");
      navigate("/"); // redirect to home
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  const handleGuest = () => {
    // Set guest mode in localStorage
    localStorage.setItem("guest", true);
    setMessage("✅ Browsing as Guest");
    navigate("/"); // redirect to home
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <hr />
      <button onClick={handleGuest}>Continue as Guest</button>

      <p>{message}</p>
    </div>
  );
}

export default LoginPage;
