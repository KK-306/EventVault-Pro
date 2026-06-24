import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ToastContainer from "./components/common/ToastContainer";
import { fetchMe } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isBootstrapped, token } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.ui);

  useEffect(() => {
    if (token && !isBootstrapped) {
      dispatch(fetchMe());
    }
  }, [dispatch, isBootstrapped, token]);

  return (
    <ErrorBoundary>
      <div className={`app-root theme-${theme}`}>
        <AppRoutes />
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
