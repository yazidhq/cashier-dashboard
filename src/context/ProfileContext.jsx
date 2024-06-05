import { createContext, useContext, useState } from "react";
import useUserId from "../hooks/useUserId";
import { Navigate } from "react-router-dom";

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [userId, getUser] = useUserId();
  const [editButton, setEditButton] = useState({ status: false, id: userId });

  if (!getUser) {
    <Navigate to="/login" />;
  }

  const editButtonClick = () => {
    setEditButton({ status: !editButton.status });
  };

  const updateUser = (e) => {
    e.preventDefault();
    const data = {
      fullname: e.target.fullname.value,
      username: e.target.username.value,
      email: e.target.email.value,
      whatsapp: e.target.whatsapp.value,
    };
    console.log(data);
  };

  return (
    <ProfileContext.Provider
      value={{ getUser, editButton, editButtonClick, updateUser }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
