import TitleMenu from "../TitleMenu";
import Button from "../Button";
import { useProfile } from "../../context/ProfileContext";
import EditModalUser from "./EditModalUser";

const UserProfile = () => {
  const { getUser, editButton, editButtonClick } = useProfile();

  const username = getUser ? getUser.username : "user";

  return (
    <div className="w-100" style={{ paddingLeft: "3rem" }}>
      <div className="flex-grow-1 px-5 pt-4 bg-light pb-1">
        <div className="mb-5 d-flex justify-content-between">
          <TitleMenu firstWord={username + "'s"} lastWord={"Profile"} />
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
    </div>
  );
};

export default UserProfile;
