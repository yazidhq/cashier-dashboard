const Button = ({
  grid = "d-grid",
  text,
  color,
  handleClick = () => {},
  type = "button",
  rounded,
}) => {
  return (
    <div className={grid}>
      <button
        type={type}
        className={`btn btn-sm btn-${color} ${rounded}`}
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
