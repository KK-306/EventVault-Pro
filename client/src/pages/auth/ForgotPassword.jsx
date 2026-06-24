import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthFeedback,
  forgot,
} from "../../features/auth/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const {
    actionLoading,
    error,
    message,
  } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(clearAuthFeedback());
    await dispatch(forgot(email));
  };

  return (
    <div className="auth-panel">
      <div className="auth-card">
        <span className="eyebrow">Account Recovery</span>
        <h1>Reset Password</h1>
        <p>Enter your email and EventVault will send a reset link.</p>

        {error && <div className="alert error">{error}</div>}
        {message && <div className="alert success">{message}</div>}

        <form className="stack-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <button className="button primary" disabled={actionLoading} type="submit">
            {actionLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <Link className="auth-link" to="/login">
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
