import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({
  error,
  loading,
  message,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
    adminSecretKey: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => {
      const nextState = {
        ...current,
        [name]: value,
      };

      if (name === "role" && value !== "admin") {
        nextState.adminSecretKey = "";
      }

      return nextState;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="auth-panel">
      <div className="auth-card">
        <span className="eyebrow">EventVault Pro</span>
        <h1>Create Account</h1>
        <p>Join the workspace with the right access role.</p>

        {error && <div className="alert error">{error}</div>}
        {message && <div className="alert success">{message}</div>}

        <form className="stack-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Name</span>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </label>

          <label className="field">
            <span>Role</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="viewer">Viewer</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {formData.role === "admin" && (
            <label className="field">
              <span>Admin Secret Key</span>
              <input
                type="password"
                name="adminSecretKey"
                value={formData.adminSecretKey}
                onChange={handleChange}
                required
              />
            </label>
          )}

          <button className="button primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <Link className="auth-link" to="/login">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
