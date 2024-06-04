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
    img: "",
  });

  const handleEditButton = (productImg) => {
    setEditButtonShow({ status: !editButtonShow.status, img: productImg });
  };

  return [editButtonShow, handleEditButton];
};
