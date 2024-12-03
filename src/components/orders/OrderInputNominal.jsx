import useRupiah from "../../hooks/useRupiah";

const OrderInputNominal = ({ changeOrder, nominal, handleChange }) => {
  return (
    <input
      type="button"
      className={`btn ${
        changeOrder === nominal ? "btn-grey" : "btn-white"
      } rounded-0 py-3 card-body border text-center`}
      value={useRupiah(nominal)}
      onClick={() => handleChange(nominal)}
    />
  );
};

export default OrderInputNominal;
