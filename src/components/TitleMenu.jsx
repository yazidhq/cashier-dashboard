const TitleMenu = ({ firstWord, lastWord }) => {
  return (
    <p className="fs-1 mb-4">
      <span className="fw-bold">{firstWord}</span> {lastWord}
    </p>
  );
};

export default TitleMenu;
