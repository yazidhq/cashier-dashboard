const Button = ({ text, color }) => {
  return (
    <div className="d-grid mt-5">
      <button className={`btn btn-${color}`}>{text}</button>
    </div>
  );
};

export default Button;
