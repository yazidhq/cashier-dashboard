import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase-config";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import Auth from "../../components/auth/Auth";

const LoginPage = () => {
  const { currentUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

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
      Swal.fire("Success!", "You have logged in successfully.", "success").then(
        (result) => {
          if (result.isConfirmed || result.isDismissed) {
            setIsLoggedIn(true);
          }
        }
      );
    } catch (error) {
      setIsInvalid(true);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleInvalid = () => {
    setIsInvalid(false);
  };

  return (
    <Auth
      handleLogin={handleLogin}
      isInvalid={isInvalid}
      handleInvalid={handleInvalid}
    />
  );
};

export default LoginPage;
