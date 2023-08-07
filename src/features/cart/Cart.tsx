import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

import styles from "./Cart.module.css";
import Button from "../../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { clearCart } from "./cartSlice";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const username = useSelector((state) => state.user.userName);
  const cart = useSelector((state) => state.cartSlice.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  if (cart.length === 0) return <EmptyCart />;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button onClick={() => navigate("/menu")}>&larr; Back to menu</Button>
        <h2 className={styles.cartTitle}>Your cart, {username}</h2>
      </div>
      <ul className={styles.cartList}>
        {cart.map((el) => (
          <CartItem item={el} key={el.pizzaId} />
        ))}
      </ul>
      <div className={styles.footer}>
        <Button onClick={() => navigate("/order/new")}>Order Pizzas</Button>
        <Button onClick={handleClearCart} className={styles.clearButton}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
