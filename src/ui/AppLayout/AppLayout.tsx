import { Outlet } from "react-router-dom";
import CartOverview from "../../features/cart/CartOverview";
import Header from "../Header/Header";
import styles from "./AppLayout.module.css";

const AppLayout = (): JSX.Element => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
};

export default AppLayout;
