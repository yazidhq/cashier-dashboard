const Button = ({ text, color, handleCancel = () => {} }) => {
  return (
    <div className="d-grid">
      <button className={`btn btn-${color}`} onClick={handleCancel}>
        {text}
      </button>
    </div>
  );
};

export default Button;
