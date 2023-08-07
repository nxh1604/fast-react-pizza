import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button/Button";
import { formatCurrency } from "../../utils/helpers";

import styles from "./MenuItem.module.css";
import {
  ICartItem,
  addItem,
  decItemQuantity,
  deleteItem,
  incItemQuantity,
} from "../cart/cartSlice";
import { IRootState } from "../../store";

export interface IPizza {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
}

function MenuItem({ pizza }: { pizza: IPizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const getQuantity = useSelector((state: IRootState) => {
    const item = state.cartSlice.cart.find((item: ICartItem) => item.pizzaId === id);
    return item ? item.quantity : 0;
  });

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
      {!soldOut &&
        (!getQuantity ? (
          <Button onClick={handleAddPizza} className={styles.button}>
            Add to cart
          </Button>
        ) : (
          <div className={styles.updateContainer}>
            <Button
              className={styles.updateButton}
              onClick={() => {
                dispatch(decItemQuantity(id));
              }}
            >
              -
            </Button>
            <span>{getQuantity}</span>
            <Button
              className={styles.updateButton}
              onClick={() => {
                dispatch(incItemQuantity(id));
              }}
            >
              +
            </Button>
            <Button className={styles.deleteButton} onClick={() => dispatch(deleteItem(id))}>
              Delete
            </Button>
          </div>
        ))}
    </li>
  );
}

export default MenuItem;
