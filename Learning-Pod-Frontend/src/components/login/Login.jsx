import "./Login.css";
import axios from "axios";
import React, { useState } from "react";
import { apiGeneral } from "../../utils/urls";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(apiGeneral.login, {
        email,
        password,
      });

      console.log("Login successful:", response.data);

      // Store access token and user ID in localStorage
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("user_id", response.data.user_id); // Store user_id in localStorage

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed:", error);

      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Error message:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className="title">Sign In</h1>
        <form className="form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="forgot">
            <a href="/">Forgot password?</a>
          </div>
          <button className="sign-in" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <br />
          <p className="log-in">
            Don't have an account? <a href="/sign-up">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
