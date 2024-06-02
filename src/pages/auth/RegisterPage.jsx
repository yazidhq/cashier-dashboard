import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Auth from "../../components/auth/Auth";
import { setDoc, doc } from "firebase/firestore";

const RegisterPage = () => {
  const { currentUser } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      fullname: e.target.fullname.value,
      username: e.target.username.value,
      whatsapp: e.target.whatsapp.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const userId = userCredential.user.uid;

      await setDoc(doc(db, "users", userId), {
        fullname: data.fullname,
        username: data.username,
        whatsapp: data.whatsapp,
        email: data.email,
      });

      Swal.fire(
        "Success!",
        "You have registered successfully.",
        "success"
      ).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          setIsRegistered(true);
        }
      });
    } catch (error) {
      setIsInvalid(true);
    }
  };

  if (isRegistered) {
    return <Navigate to={"/"} />;
  }

  const handleInvalid = () => {
    setIsInvalid(false);
  };

  return (
    <Auth
      handleRegister={handleRegister}
      isInvalid={isInvalid}
      handleInvalid={handleInvalid}
    />
  );
};

export default RegisterPage;
