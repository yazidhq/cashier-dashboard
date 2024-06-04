import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getUserById } from "../utils/getDocUser";

const GetUserContext = createContext();

export const useGetUser = () => useContext(GetUserContext);

export const GetUserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const userData = await getUserById(currentUser.uid);
          setUserData(userData);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();

    return () => {
      setUserData(null);
    };
  }, [currentUser]);

  return (
    <GetUserContext.Provider value={{ userData }}>
      {children}
    </GetUserContext.Provider>
  );
};
