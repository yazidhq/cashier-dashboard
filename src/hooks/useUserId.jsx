import { useEffect, useState } from "react";
import { useGetUser } from "../context/GetUserContext";

const useUserId = () => {
  const { userData } = useGetUser();
  const [userId, setUserId] = useState(null);
  const [getUser, setUser] = useState(null);

  useEffect(() => {
    if (userData && userData.id) {
      setUserId(userData.id);
      setUser(userData);
    }
  }, [userData]);

  return [userId, getUser, setUser];
};

export default useUserId;
