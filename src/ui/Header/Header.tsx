import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import SearchOrder from "../../features/order/SearchOrder";
import UserName from "../../features/user/UserName";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";

const Header = (): JSX.Element => {
  const userName = useSelector((state: IRootState) => state.user.userName);

  return (
    <header className={`${userName ? styles.container : styles.alone}`}>
      <Link className={styles.link} to={"/"}>
        Fast react pizzas co.
      </Link>
      {userName && (
        <>
          <SearchOrder />
          <UserName className={styles.user} />
        </>
      )}
    </header>
  );
};

export default Header;
