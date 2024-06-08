import { createContext, useContext, useState } from "react";
import useUserId from "../hooks/useUserId";
import { Navigate } from "react-router-dom";
import { app, db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
} from "firebase/auth";
import Swal from "sweetalert2";
import useLoading from "../hooks/useLoading";

const auth = getAuth(app);

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [userId, getUser] = useUserId();
  const [editButton, setEditButton] = useState({ status: false, id: userId });
  const [isLoading, setIsLoading] = useLoading();

  if (!getUser) {
    <Navigate to="/login" />;
  }

  const editButtonClick = () => {
    setEditButton({ status: !editButton.status });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      fullname: e.target.fullname.value,
      username: e.target.username.value,
      email: e.target.email.value,
      whatsapp: e.target.whatsapp.value,
      password: e.target.password.value,
    };

    const user = auth.currentUser;
    const newEmail = data.email;
    const password = data.password;
    const credential = EmailAuthProvider.credential(user.email, password);

    const userRef = doc(db, "users", userId);
    try {
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, newEmail);
      await updateDoc(userRef, data);
      setEditButton({ status: false });
      setIsLoading(false);
      Swal.fire("Success!", "Your profile has been updated!", "success");
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Failed!", "Please check your password verification", "error");
    }
  };

  return (
    <ProfileContext.Provider
      value={{ getUser, editButton, editButtonClick, updateUser, isLoading }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
