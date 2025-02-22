import React, { useState } from "react";
import "./SignUp.css";
import { networkRequest } from "../../utils/network_request";
import { apiGeneral } from "../../utils/urls";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    bday: "",
    role: "student", // Default role
    password: "",
    confPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    setLoading(true);

    if (formData.password !== formData.confPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // Sending JSON data instead of FormData
      await networkRequest(
        apiGeneral.signup,
        (responseData) => {
          setLoading(false);
          console.log("Response:", responseData);
          alert("User registered successfully");
          navigate("/login");
        },
        "post",
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          bday: formData.bday,
          role: formData.role,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      alert("Sign-up failed. Please try again.");
      console.error("Sign-up error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h1 className="title">Sign Up</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group date-role">
            <input
              className="bday"
              type="date"
              name="bday"
              value={formData.bday}
              onChange={handleChange}
              required
            />
            <select
              className="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confPassword"
              placeholder="Re-Enter Password"
              value={formData.confPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className="sign-up" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>

          <p className="log-in">
            Already have an account? <a href="/login">Log In</a>
          </p>
        </form>
      </div>
    </div>
  );
}
