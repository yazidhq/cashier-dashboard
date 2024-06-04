import { useAuth } from "../../context/AuthContext";
import Auth from "../../components/auth/Auth";

const LoginPage = () => {
  const { currentUser, isLoggedIn, handleLogin } = useAuth();

  if (currentUser || isLoggedIn) {
    window.location.href = "/";
    return null;
  }

  return <Auth handleLogin={handleLogin} />;
};

export default LoginPage;
