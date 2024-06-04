import { useState } from "react";

export const useAddButton = () => {
  const [addButtonShow, setAddButtonShow] = useState(false);

  const handleAddButton = () => {
    setAddButtonShow(!addButtonShow);
  };

  return [addButtonShow, handleAddButton];
};

export const useEditButton = () => {
  const [editButtonShow, setEditButtonShow] = useState({
    status: false,
    id: "",
  });

  const handleEditButton = (poductId) => {
    setEditButtonShow({ status: !editButtonShow.status, id: poductId });
  };

  return [editButtonShow, handleEditButton];
};
