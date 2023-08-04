import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import SearchOrder from "../../features/order/SearchOrder";

const Header = (): JSX.Element => {
  return (
    <header className={styles.container}>
      <Link className={styles.link} to={"/"}>
        Fast react pizzas co.
      </Link>
      <SearchOrder />
      <p className={styles.user}>User name</p>
    </header>
  );
};

export default Header;
