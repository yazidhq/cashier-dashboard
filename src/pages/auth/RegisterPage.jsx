import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Auth from "../../components/auth/Auth";

const RegisterPage = () => {
  const { currentUser } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      setIsRegistered(true);
    } catch (error) {
      alert("Error registering: " + error.message);
    }
  };

  if (isRegistered) {
    return <Navigate to={"/"} />;
  }

  return <Auth handleRegister={handleRegister} />;
};

export default RegisterPage;
