const Form = ({ children, handleSubmit, sx = {}, ...props }) => {
  return (
    <form onSubmit={handleSubmit} style={{ ...sx }} {...props}>
      {children}
    </form>
  );
};

export default Form;
