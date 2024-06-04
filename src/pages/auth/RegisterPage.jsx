import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Auth from "../../components/auth/Auth";

const RegisterPage = () => {
  const { currentUser, isRegistered, handleRegister } = useAuth();

  if (currentUser || isRegistered) {
    return <Navigate to="/" />;
  }

  return <Auth handleRegister={handleRegister} />;
};

export default RegisterPage;
