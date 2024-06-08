import TitleMenu from "../TitleMenu";
import Button from "../Button";
import { useProfile } from "../../context/ProfileContext";
import EditModalUser from "./EditModalUser";
import LoadingSpinner from "../LoadingSpinner";

const UserProfile = () => {
  const { getUser, editButton, editButtonClick } = useProfile();

  return (
    <div className="w-100" style={{ paddingLeft: "3rem" }}>
      {getUser ? (
        <div
          className="flex-grow-1 px-5 pt-4 bg-light"
          style={{ minHeight: "calc(100vh)" }}
        >
          <div className="mb-5 d-flex justify-content-between">
            <TitleMenu
              firstWord={getUser.username + "'s"}
              lastWord={"Profile"}
            />
            <div className="mt-3">
              <Button
                text={"Edit Profile"}
                color={"danger"}
                handleClick={editButtonClick}
              />
            </div>
          </div>
          <div>{editButton.status && <EditModalUser />}</div>
        </div>
      ) : (
        <div className="position-absolute top-50 start-50 translate-middle">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
