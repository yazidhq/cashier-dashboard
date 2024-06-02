import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase-config";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Auth from "../../components/auth/Auth";

const LoginPage = () => {
  const { currentUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setIsLoggedIn(true);
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Auth handleLogin={handleLogin} />;
};

export default LoginPage;
