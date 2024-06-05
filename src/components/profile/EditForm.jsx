import { useProfile } from "../../context/ProfileContext";
import Button from "../Button";

const EditForm = () => {
  const { getUser, updateUser } = useProfile();

  return (
    <form method="POST" onSubmit={updateUser}>
      <div className="row">
        <div className="col-12">
          <label htmlFor="fullname" className="form-label">
            Fullname
          </label>
          <input
            type="text"
            id="fullname"
            className="form-control"
            name="fullname"
            defaultValue={getUser.fullname}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-6">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            name="username"
            defaultValue={getUser.username}
          />
        </div>
        <div className="col-6">
          <label htmlFor="whatsapp" className="form-label">
            WhatsApp
          </label>
          <input
            type="text"
            id="whatsapp"
            className="form-control"
            name="whatsapp"
            defaultValue={getUser.whatsapp}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            name="email"
            defaultValue={getUser.email}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="form-control"
            name="password"
          />
        </div>
      </div>
      <br />
      <Button type="submit" text={"Update"} color={"danger"} />
    </form>
  );
};

export default EditForm;
