import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import LoginForm from "../../components/forms/LoginForm";

import { login } from "../../features/auth/authSlice";
import { pushToast } from "../../features/ui/uiSlice";
import { getRoleHome } from "../../utils/roleRoutes";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading } = useSelector((state) => state.auth);
  const blockedAccountRoutes = {
    "Account pending approval": "pending",
    "Account suspended": "suspended",
    "Account rejected": "rejected",
  };

  const handleLogin = async (data) => {
    try {
      const result = await dispatch(login(data)).unwrap();
      const fallbackPath = getRoleHome(result.user?.role);
      const from = location.state?.from?.pathname;

      dispatch(pushToast({
        title: "Welcome back",
        message: `Signed in as ${result.user?.role || "user"}.`,
        type: "success",
      }));

      navigate(from || fallbackPath, {
        replace: true,
      });
    } catch (message) {
      const statusRoute = blockedAccountRoutes[message];

      if (statusRoute) {
        navigate(`/account-status/${statusRoute}`, {
          replace: true,
          state: { email: data.email },
        });
      }
    }
  };

  return (
    <LoginForm
      error={error}
      loading={loading}
      onSubmit={handleLogin}
    />
  );
};

export default Login;
