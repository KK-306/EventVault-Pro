import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";
import {
  clearAuthFeedback,
  register,
} from "../../features/auth/authSlice";
import { pushToast } from "../../features/ui/uiSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    actionLoading,
    error,
    message,
  } = useSelector((state) => state.auth);

  const handleRegister = async (data) => {
    dispatch(clearAuthFeedback());

    const result = await dispatch(register(data)).unwrap();

    const isPendingAccount =
      result.user?.status === "pending";

    dispatch(pushToast({
      title: "Account created",
      message: result.message,
      type: "success",
    }));

    if (isPendingAccount) {
      navigate("/account-status/pending", {
        replace: true,
        state: {
          email: result.user?.email,
          role: result.user?.role,
        },
      });
      return;
    }

    navigate("/login", { replace: true });
  };

  return (
    <RegisterForm
      error={error}
      loading={actionLoading}
      message={message}
      onSubmit={handleRegister}
    />
  );
};

export default Register;
