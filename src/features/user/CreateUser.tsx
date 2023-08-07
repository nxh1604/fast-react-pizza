import { useState } from "react";
import styles from "./CreateUser.module.css";
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "./userSlice";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username));
    setUsername("");
    navigate("/menu");
  }

  if (userName)
    return (
      <div className={styles.container}>
        <p>👋 Welcome back {userName.toUpperCase()}!</p>
        <Button className={styles.btnWelcome} onClick={() => navigate("/menu")}>
          Let's start ordering
        </Button>
      </div>
    );

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
      <div className={`${styles.btn} ${username && styles.display}`}>
        <Button type={"submit"}>Start ordering</Button>
      </div>
    </form>
  );
}

export default CreateUser;
