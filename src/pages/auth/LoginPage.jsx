import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Auth from "../../components/auth/Auth";

const LoginPage = () => {
  const { currentUser, isLoggedIn, handleLogin } = useAuth();

  if (currentUser || isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Auth handleLogin={handleLogin} />;
};

export default LoginPage;
