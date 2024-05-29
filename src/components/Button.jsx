const Button = ({
  grid = "d-grid",
  text,
  color,
  handleClick = () => {},
  type = "button",
}) => {
  return (
    <div className={grid}>
      <button type={type} className={`btn btn-${color}`} onClick={handleClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
