import useUserId from "../../hooks/useUserId";
import LoadingSpinner from "../LoadingSpinner";
import TitleMenu from "../TitleMenu";

const UserProfile = () => {
  const [, getUser] = useUserId();

  if (!getUser) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-100" style={{ paddingLeft: "3rem" }}>
      <div className="flex-grow-1 px-5 pt-4 bg-light pb-1">
        <div className="mb-5">
          <TitleMenu firstWord={getUser.username + "'s"} lastWord={"Profile"} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
