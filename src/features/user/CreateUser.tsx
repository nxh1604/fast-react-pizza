import { useState } from "react";
import styles from "./CreateUser.module.css";
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

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
          <Button onClick={() => navigate("/menu")}>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
