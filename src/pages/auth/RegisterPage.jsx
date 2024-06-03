import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Auth from "../../components/auth/Auth";

const RegisterPage = () => {
  const {
    currentUser,
    handleRegister,
    isRegistered,
    isInvalid,
    handleInvalid,
  } = useAuth();

  if (currentUser || isRegistered) {
    return <Navigate to="/" />;
  }

  return (
    <Auth
      handleRegister={handleRegister}
      isInvalid={isInvalid}
      handleInvalid={handleInvalid}
    />
  );
};

export default RegisterPage;
