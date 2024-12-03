import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Auth from "../../components/auth/Auth";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { currentUser, isRegistered, handleRegister } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser || isRegistered) {
      navigate("/");
    }
  }, [currentUser, isRegistered, navigate]);

  return <Auth handleRegister={handleRegister} />;
};

export default RegisterPage;
