"use client";
import { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

interface LoginResponse {
  token?: string;
  user?: {
    id: number;
    username: string;
    full_name: string;
    email: string;
    role: string;
  };
  message?: string;
}

const AuthForm = () => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const url = isRegister
        ? "http://localhost:4000/api/auth/register"
        : "http://localhost:4000/api/auth/login";

      const body = isRegister
        ? { username, full_name: fullName, email, password }
        : { email, password };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            (isRegister ? "Registration failed" : "Login failed")
        );
        return;
      }

      if (!isRegister && data.token && data.user) {
        login(data.token, data.user); // Update AuthContext
      } else if (isRegister) {
        setIsRegister(false); // Switch to login form after registration
        setError("Registration successful! Please log in.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="card p-4" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2 className="text-center mb-4">
        {isRegister ? "Register" : "Login"}
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <div className="text-center mt-3">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don’t have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
