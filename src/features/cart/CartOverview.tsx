import { Link } from "react-router-dom";
import styles from "./CartOverview.module.css";

function CartOverview() {
  return (
    <div className={styles.container}>
      <p>
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
