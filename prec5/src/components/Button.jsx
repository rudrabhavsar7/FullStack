const Button = ({ text, bgColor, setInputVal, inputVal }) => {
  const handleChange = () => {
    if (text === "DEL") {
      setInputVal((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (text === "=") {
      try {
        const result = eval(inputVal);
        setInputVal(result.toString());
      } catch {
        setInputVal("Error");
      }
    } else {
      setInputVal((prev) => {
        if (prev === "0" && text !== ".") return text;

        const lastChar = prev.slice(-1);
        if (
          ["+", "-", "*", "/"].includes(lastChar) &&
          ["+", "-", "*", "/"].includes(text)
        ) {
          return prev.slice(0, -1) + text;
        }

        return prev + text;
      });
    }
  };

  return (
    <button
      className="calcButton"
      style={{ backgroundColor: bgColor }}
      onClick={handleChange}
    >
      {text}
    </button>
  );
};

export default Button;
