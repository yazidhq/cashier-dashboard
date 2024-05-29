const Button = ({ grid = "d-grid", text, color, handleClick = () => {} }) => {
  return (
    <div className={grid}>
      <button className={`btn btn-${color}`} onClick={handleClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
