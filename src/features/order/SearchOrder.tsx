import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = (): JSX.Element => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    navigate(`/order/${value}`);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order # "
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchOrder;
