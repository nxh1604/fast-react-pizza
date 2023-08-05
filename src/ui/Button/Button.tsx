import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({
  children,
  className = "",
  to = "",
  disabled = false,
  onClick = () => undefined,
}: {
  children?: React.ReactNode;
  to?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void | undefined;
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
      disabled={disabled}>
      {to ? (
        <Link className={styles.link} to={to}>
          {children}
        </Link>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
