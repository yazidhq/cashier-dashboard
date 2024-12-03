import { useOrder } from "../../context/OrderContext";
import { useReports } from "../../context/ReportsContext";
import Button from "../Button";
import LoadingSpinner from "../LoadingSpinner";
import OrderInputNominal from "./OrderInputNominal";
import OrderTotal from "./OrderTotal";
import { FaCheckCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const OrderModal = ({
  changeOrder,
  orderItemsId,
  orderItemsName,
  orderItemsQty,
}) => {
  const { handleSaveReport, successPayment, isLoading } = useReports();
  const {
    totalPrice,
    taxPrice,
    handleOrderButton,
    handleChange,
    handleDoneButtonPayment,
  } = useOrder();

  const total = totalPrice + taxPrice;
  const nominals = [total, 50000, 100000, 150000, 200000, 250000];
  const changeBack = changeOrder - total;

  const payNow =
    changeOrder && changeOrder > totalPrice ? (
      <Button
        text="Pay Now"
        color={"danger"}
        handleClick={() =>
          handleSaveReport(
            totalPrice,
            orderItemsId,
            orderItemsName,
            orderItemsQty,
            changeOrder,
            changeBack
          )
        }
      />
    ) : changeOrder < totalPrice ? (
      <p className="text-center fw-bold">Choose the appropriate amount</p>
    ) : (
      <p className="text-center fw-bold">Select the amount first</p>
    );

  const nominalInput = isLoading ? (
    <div className="d-flex align-item-center justify-content-center py-5">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      {successPayment ? (
        <div>
          <div className="d-flex flex-column justify-content-center align-items-center mb-4">
            <FaCheckCircle
              className="text-success mb-3 mt-4"
              style={{ fontSize: "150px" }}
            />
            <p className="text-success fs-3">Payment Successful!</p>
            <div className="input-group px-4 mb-3">
              <input
                type="text"
                className="form-control border-success rounded-0"
                placeholder="send receipt to email"
              />
              <Button
                text={"send"}
                color={"outline-success"}
                rounded={"rounded-0"}
              />
            </div>
            <Button
              text={"Print Receipt"}
              color={"outline-success"}
              rounded={"rounded-0"}
            />
          </div>
          <div className="px-4 pb-4 pt-4 border-top border-secondary">
            <Button
              text="Done"
              color={"danger"}
              handleClick={handleDoneButtonPayment}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="px-4 mt-2">
            <div className="row row-cols-3 px-2 pt-3 mb-3">
              {nominals.map((nominal) => (
                <OrderInputNominal
                  key={nominal}
                  changeOrder={changeOrder}
                  nominal={nominal}
                  handleChange={handleChange}
                />
              ))}
              <input
                type="number"
                className="form-control rounded-0"
                placeholder="Nominal amount (ex: 500000)"
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
            <OrderTotal
              price={totalPrice}
              tax={taxPrice}
              changeOrder={changeOrder}
            />
          </div>
          <div className="px-4 pb-4">{payNow}</div>
        </div>
      )}
    </>
  );

  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      handleOrderButton();
    }, 500);
  };

  return (
    <div
      className={`modal fade-in bg-soft-dark  ${isClosing ? "fade-out" : ""}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="border-top border-3 border-danger">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header">
              <h5 className="modal-title px-2">Payment</h5>
              {!successPayment && (
                <button
                  type="button"
                  className="btn-close px-2"
                  onClick={handleClose}
                  aria-label="Close"
                ></button>
              )}
            </div>
            {nominalInput}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
