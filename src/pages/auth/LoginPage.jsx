import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Auth from "../../components/auth/Auth";

const LoginPage = () => {
  const { currentUser, handleLogin, isLoggedIn, isInvalid, handleInvalid } =
    useAuth();

  if (currentUser || isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Auth
      handleLogin={handleLogin}
      isInvalid={isInvalid}
      handleInvalid={handleInvalid}
    />
  );
};

export default LoginPage;
