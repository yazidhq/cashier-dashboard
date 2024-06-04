import { useGetUser } from "../../context/GetUserContext";
import LoadingSpinner from "../LoadingSpinner";
import TitleMenu from "../TitleMenu";

const UserProfile = () => {
  const { userData } = useGetUser();
  const username =
    userData &&
    userData.username.charAt(0).toUpperCase() + userData.username.slice(1);

  return (
    <div className="w-100" style={{ paddingLeft: "3rem" }}>
      <div className="flex-grow-1 px-5 pt-4 bg-light pb-1">
        <div className="mb-5">
          {!userData ? (
            <LoadingSpinner />
          ) : (
            <TitleMenu firstWord={username + "'s"} lastWord={"Profile"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
