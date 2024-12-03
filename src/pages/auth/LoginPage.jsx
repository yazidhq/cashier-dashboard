import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Auth from "../../components/auth/Auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { currentUser, isLoggedIn, handleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser || isLoggedIn) {
      navigate("/");
    }
  }, [currentUser, isLoggedIn, navigate]);

  return <Auth handleLogin={handleLogin} />;
};

export default LoginPage;
