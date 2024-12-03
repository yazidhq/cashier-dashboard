import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
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
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      setIsInvalid(true);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          fullname: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }

      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          fullname: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }

      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      setIsInvalid(true);
      console.error("Facebook login error:", error);
    }
  };

  const handleInvalid = () => {
    setIsInvalid(false);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
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
        handleGoogleLogin,
        handleFacebookLogin,
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
