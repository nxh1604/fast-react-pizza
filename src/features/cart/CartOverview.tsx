import { Link } from "react-router-dom";
import styles from "./CartOverview.module.css";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartPrice) return null;

  return (
    <div className={styles.container}>
      <p>
        <span>{totalQuantity} pizzas</span>{" "}
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
