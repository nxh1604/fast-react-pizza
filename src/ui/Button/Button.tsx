import styles from "./Button.module.css";

const Button = ({
  children,
  className = "",
  type = "button",
  disabled = false,
  onClick = () => undefined,
}: {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  disabled?: boolean;
  onClick?: (e?: unknown) => void | unknown | undefined;
}): JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
