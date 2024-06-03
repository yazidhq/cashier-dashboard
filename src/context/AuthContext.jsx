import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    const handleBeforeUnload = async () => {
      await signOut(auth);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
      console.log(error);
      setIsInvalid(true);
    }
  };

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

  const handleInvalid = () => {
    setIsInvalid(false);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleLogin,
        isLoggedIn,
        handleRegister,
        isRegistered,
        handleInvalid,
        isInvalid,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
