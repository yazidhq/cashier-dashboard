import Button from "../Button";
import OrderInputNominal from "./OrderInputNominal";
import OrderTotal from "./OrderTotal";

const OrderModal = ({
  orderButton,
  totalPrice,
  taxPrice,
  handleChange,
  changeOrder,
}) => {
  const total = totalPrice + taxPrice;

  const nominals = [total, 50000, 100000, 150000, 200000, 250000];

  const nominalInput = nominals.map((nominal) => (
    <OrderInputNominal
      key={nominal}
      changeOrder={changeOrder}
      nominal={nominal}
      handleChange={handleChange}
    />
  ));

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
                onClick={orderButton}
                aria-label="Close"
              ></button>
            </div>
            <div className="px-4 mt-2">
              <div className="row row-cols-3 px-2 pt-3 mb-3">
                {nominalInput}
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
            <div className="px-4 pb-4">
              <Button text="Pay Now" color={"danger"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
