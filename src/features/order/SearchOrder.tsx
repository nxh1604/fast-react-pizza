import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchOrder.module.css";

const SearchOrder = (): JSX.Element => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    navigate(`/order/${value}`);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          className="input"
          placeholder="Search order # "
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchOrder;
