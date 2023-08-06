import CreateUser from "../../features/user/CreateUser";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.animatedGif}></div>
      <div className={styles.png}></div>
      <div className={styles.mainContent}>
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>
            <span className={styles.title}>The best pizza.</span>
            <br />
            Straight out of the oven, straight to you.
          </h1>
        </div>
        <div className={styles.userField}>
          <CreateUser />
        </div>
      </div>
    </div>
  );
}

export default Home;
