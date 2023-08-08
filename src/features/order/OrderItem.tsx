import { formatCurrency } from "../../utils/helpers";
import { ICartItem } from "../cart/cartSlice";
import styles from "./OrderItem.module.css";

function OrderItem({
  item,
  ingredients,
  isLoadingIngredients,
}: {
  item: ICartItem;
  ingredients: Array<string>;
  isLoadingIngredients: boolean;
}) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className={styles.orderItemContainer}>
      <div className={styles.info}>
        <p className={styles.name}>
          <span className={styles.quantity}>{quantity}&times;</span> {name}
        </p>
        <p className={styles.price}>{formatCurrency(totalPrice)}</p>
      </div>
      <div className={styles.ingredients}>
        {isLoadingIngredients
          ? "loading ingredients..."
          : ingredients.join(", ")}
      </div>
    </li>
  );
}

export default OrderItem;
