import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthFeedback,
  reset,
} from "../../features/auth/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const {
    actionLoading,
    error,
    message,
  } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(clearAuthFeedback());
    await dispatch(reset({
      token,
      password,
    }));
  };

  return (
    <div className="auth-panel">
      <div className="auth-card">
        <span className="eyebrow">Secure Reset</span>
        <h1>Choose New Password</h1>
        <p>Create a fresh password for your EventVault account.</p>

        {error && <div className="alert error">{error}</div>}
        {message && <div className="alert success">{message}</div>}

        <form className="stack-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>New password</span>
            <input
              type="password"
              value={password}
              minLength="6"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button className="button primary" disabled={actionLoading} type="submit">
            {actionLoading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <Link className="auth-link" to="/login">
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
