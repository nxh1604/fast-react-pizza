import { useState } from "react";

import Button from "../../ui/Button/Button";
import { formatCurrency } from "../../utils/helpers";
import styles from "./CartItem.module.css";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice, imageUrl } = item;
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState<string | number>("");
  const handleInputAdding = (e) => {
    if (!Number(e.target.value) && e.target.value.length !== 0) return;

    const inputValue =
      e.target.value.length === 0
        ? 0
        : Number(e.target.value) > 100
        ? 100
        : Number(e.target.value);
    setValue(inputValue);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setIsAdding(false);
    setValue("");
  };

  return (
    <li className={styles.itemContainer}>
      <div className={`${styles.imgContainer} + ${styles.gridChild}`}>
        <img src={imageUrl} alt="stania" />
      </div>
      <div className={`${styles.itemInfo} + ${styles.gridChild}`}>
        <p>
          {quantity}&times; {name}
        </p>
        <div className={styles.adding}>
          {!isAdding && (
            <>
              <Button onClick={() => setIsAdding(true)}>Add</Button>
              <Button>Delete</Button>
            </>
          )}
          {isAdding && (
            <form className={styles.formContainer} onSubmit={handleSubmit}>
              <div className={styles.addingForm}>
                <Button
                  onClick={() => setValue((e) => (+e === 0 ? 0 : +e - 1))}>
                  -
                </Button>
                <input
                  type="text"
                  className="input"
                  value={value}
                  onChange={handleInputAdding}
                />
                <Button
                  onClick={() => setValue((e) => (+e === 100 ? 100 : +e + 1))}>
                  +
                </Button>
              </div>
              <div className={styles.submitForm}>
                <Button
                  onClick={() => {
                    setValue("");
                    setIsAdding(false);
                  }}>
                  Cancel
                </Button>
                <Button type="submit">confirm</Button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className={`${styles.itemPrice} + ${styles.gridChild}`}>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
