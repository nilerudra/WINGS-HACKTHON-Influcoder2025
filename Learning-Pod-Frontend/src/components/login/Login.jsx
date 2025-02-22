import { useNavigate } from "react-router-dom";
import "./Login.css";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Login successful:");
    setLoading(false);
    navigate("/dashboard");
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
