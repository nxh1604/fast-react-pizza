import CreateUser from "../../features/user/CreateUser";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>
          The best pizza.
          <br />
          Straight out of the oven, straight to you.
        </h1>
      </div>
      <div className={styles.userField}>
        <CreateUser />
      </div>
    </div>
  );
}

export default Home;
