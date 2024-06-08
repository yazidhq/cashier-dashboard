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
    return unsubscribe;
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      setLoading(false);
      Swal.fire("Success!", "You have registered successfully.", "success");

      const userId = userCredential.user.uid;

      await setDoc(doc(db, "users", userId), {
        fullname: data.fullname,
        username: data.username,
        whatsapp: data.whatsapp,
        email: data.email,
      });
      setIsRegistered(true);
    } catch (error) {
      setLoading(false);
      setIsInvalid(true);
    }
  };

  const handleLogin = async (e) => {
    setIsLoggedIn(false);
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      await Swal.fire(
        "Success!",
        "You have logged in successfully.",
        "success"
      ).then(async (result) => {
        if (result.isConfirmed || result.isDismissed) {
          await signInWithEmailAndPassword(auth, data.email, data.password);
          setIsLoggedIn(true);
        }
      });
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
