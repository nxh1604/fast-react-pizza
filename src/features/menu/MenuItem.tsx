import { useDispatch } from "react-redux";
import Button from "../../ui/Button/Button";
import { formatCurrency } from "../../utils/helpers";

import styles from "./MenuItem.module.css";
import { addItem } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const handleAddPizza = () => {
    const newItem = {
      imageUrl,
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  };

  return (
    <li className={styles.item}>
      <div className={`${styles.imgContainer} ${soldOut && styles.soldOut}`}>
        <img src={imageUrl} alt={name} />
      </div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{name}</td>
          </tr>
          <tr>
            <th>Ingredients</th>
            <td>{ingredients.join(", ")}</td>
          </tr>
          <tr>
            <th>{soldOut ? "Status" : "Price"}</th>
            <td>{!soldOut ? `${formatCurrency(unitPrice)}` : "Sold Out"} </td>
          </tr>
        </tbody>
      </table>
      {!soldOut && (
        <Button onClick={handleAddPizza} className={styles.button}>
          Add to cart
        </Button>
      )}
    </li>
  );
}

export default MenuItem;
