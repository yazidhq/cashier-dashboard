import { useEffect, useState } from "react";
import { useGetUser } from "../context/GetUserContext";

const useUserId = () => {
  const { userData } = useGetUser();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (userData && userData.id) {
      setUserId(userData.id);
    }
  }, [userData]);

  return [userId];
};

export default useUserId;
