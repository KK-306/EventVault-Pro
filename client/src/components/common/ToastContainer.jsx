import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../../features/ui/uiSlice";

const ToastItem = ({ toast }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, 4200);

    return () => clearTimeout(timer);
  }, [dispatch, toast.id]);

  return (
    <button
      type="button"
      className={`toast toast-${toast.type}`}
      onClick={() => dispatch(removeToast(toast.id))}
    >
      <strong>{toast.title}</strong>
      {toast.message && <span>{toast.message}</span>}
    </button>
  );
};

const ToastContainer = () => {
  const toasts = useSelector((state) => state.ui.toasts);

  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
