import { useProfile } from "../../context/ProfileContext";
import EditForm from "./EditForm";

const EditModalUser = () => {
  const { editButtonClick } = useProfile();

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="border-top border-3 border-danger">
          <div className="modal-content shadow-sm rounded-0 border-0">
            <div className="modal-header">
              <h5 className="modal-title px-2">Payment</h5>
              <button
                type="button"
                className="btn-close px-2"
                aria-label="Close"
                onClick={editButtonClick}
              ></button>
            </div>
            <div className="p-4">
              <EditForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModalUser;
