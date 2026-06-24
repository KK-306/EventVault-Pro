import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaChartLine,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaUserCheck,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import StarField from "../common/StarField";

const CountUpValue = ({
  end,
  decimals = 0,
  duration = 1400,
  suffix = "",
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const startTime = performance.now();

    const animate = (timestamp) => {
      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );
      const eased =
        1 - Math.pow(1 - progress, 3);
      const nextValue = end * eased;

      setValue(nextValue);

      if (progress < 1) {
        animationFrameId =
          requestAnimationFrame(animate);
      }
    };

    animationFrameId =
      requestAnimationFrame(animate);

    return () =>
      cancelAnimationFrame(animationFrameId);
  }, [duration, end]);

  return (
    <>
      {value.toFixed(decimals)}
      {suffix}
    </>
  );
};

const LoginForm = ({
  error,
  loading,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const stats = [
    {
      key: "events",
      end: 500,
      suffix: "+",
      label: "Events Managed",
    },
    {
      key: "users",
      end: 50,
      suffix: "+",
      label: "Active Users",
    },
    {
      key: "uptime",
      end: 99.9,
      decimals: 1,
      suffix: "%",
      label: "Uptime",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="login-scene">
      <StarField />

      <div className="login-container">
        <section className="login-hero">
          <div className="brand-mark">
            <span className="brand-mark__shield">
              <FaShieldAlt />
            </span>
            <span className="brand-mark__text">
              EV
            </span>
          </div>

          <div>
            <div className="logo">
              EventVault
            </div>

            <p className="tagline">
              Enterprise Event Management Platform
            </p>
          </div>

          <h1>
            Manage secure event operations from one command center.
          </h1>

          <p className="hero-copy">
            Coordinate approvals, audit user access,
            and monitor event performance with role-based
            workflows built for growing teams.
          </p>

          <div className="feature-grid">
            <div className="feature-item">
              <FaChartLine />
              <span>Live analytics</span>
            </div>

            <div className="feature-item">
              <FaUserCheck />
              <span>User roles</span>
            </div>

            <div className="feature-item">
              <FaCalendarCheck />
              <span>Event approval</span>
            </div>

            <div className="feature-item">
              <FaShieldAlt />
              <span>RBAC security</span>
            </div>
          </div>
        </section>

        <div className="login-card">
          <div className="form-header">
            <div className="logo">
              EventVault
            </div>

            <p className="tagline">
              Enterprise Event Management Platform
            </p>
          </div>

          <h1>Welcome Back</h1>

          <p className="form-copy">
            Sign in to manage events,
            users and analytics.
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert error">
                {error}
              </div>
            )}

            <div className="input-group">
              <FaEnvelope />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaLock />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="links">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>

            <Link
              to="/register"
              className="login-link-cta"
            >
              Create Account
            </Link>
          </div>

          <div className="stats-section">
            {stats.map((stat) => (
              <div className="stat-item" key={stat.key}>
                <span className="stat-value">
                  <CountUpValue
                    end={stat.end}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix}
                  />
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="footer-section">
            &copy; 2026 EventVault Pro<br />
            Built with MERN Stack + RBAC + JWT + Cloudinary
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
