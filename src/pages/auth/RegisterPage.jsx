import { useAuth } from "../../context/AuthContext";
import Auth from "../../components/auth/Auth";

const RegisterPage = () => {
  const { currentUser, isRegistered, handleRegister } = useAuth();

  if (currentUser || isRegistered) {
    window.location.href = "/";
    return null;
  }

  return <Auth handleRegister={handleRegister} />;
};

export default RegisterPage;
