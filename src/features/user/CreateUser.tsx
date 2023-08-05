import { useState } from "react";
import styles from "./CreateUser.module.css";
import Button from "../../ui/Button/Button";

function CreateUser() {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.container}>
        <p>👋 Welcome! Please start by telling us your name:</p>
        <div className={styles.inputContainer}>
          <input
            className="input"
            type="text"
            placeholder="Your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      {username !== "" && (
        <div className={styles.btn}>
          <Button to="/menu" disabled={false}>
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
