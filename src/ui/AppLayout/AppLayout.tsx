import { Outlet } from "react-router-dom";
import CartOverview from "../../features/cart/CartOverview";
import Header from "../Header/Header";
import styles from "./AppLayout.module.css";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";

const AppLayout = (): JSX.Element => {
  const userName = useSelector((state: IRootState) => state.user.userName);

  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      {userName && <CartOverview />}
    </div>
  );
};

export default AppLayout;
