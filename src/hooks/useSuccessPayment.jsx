import { useState } from "react";

const useSuccessPayment = () => {
  const [successPayment, setSuccessPayment] = useState(false);
  return [successPayment, setSuccessPayment];
};

export default useSuccessPayment;
