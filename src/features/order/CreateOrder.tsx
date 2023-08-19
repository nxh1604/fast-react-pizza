import { useEffect, useState } from "react";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

import styles from "./CreateOrder.module.css";
import Button from "../../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, store } from "../../store";
import { ICartItem, clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

interface IErrorObject {
  phone?: string;
}

function CreateOrder() {
  const {
    userName,
    address: userAddress,
    status,
    position,
    error: AddressError,
  } = useSelector((state: IRootState) => state.user);

  const isLoadingUserAddress = status === "loading";

  const cart = useSelector((state: IRootState) => state.cartSlice.cart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();

  const [phone, setPhone] = useState<null | string>(null);
  const [name, setName] = useState(userName);
  const [withPriority, setWithPriority] = useState(false);

  const formErrors = useActionData() as IErrorObject;
  const navigation = useNavigation();

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (formErrors && Object.keys(formErrors).length > 0) {
      if (formErrors.phone) setPhone(formErrors.phone);
    }
  }, [formErrors, setPhone]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Ready to order? Let's go!</h2>
      </div>

      <Form method="POST" className={styles.form}>
        <div className={styles.row2}>
          <label htmlFor="name">First Name</label>
          <div className={styles.inputContainer}>
            <input
              id="name"
              type="text"
              name="customer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
              autoComplete="off"
            />
          </div>
        </div>
        <div className={styles.row2}>
          <label htmlFor="phone">Phone number</label>
          <div className={styles.inputContainer}>
            <input
              className={`input ${phone && styles.errorContainer}`}
              id="phone"
              type="tel"
              name="phone"
              autoComplete="off"
              required
              onChange={() => {
                if (phone) setPhone(null);
              }}
            />
          </div>
          {phone && (
            <div className={styles.error}>
              {!!formErrors?.phone && formErrors.phone}
            </div>
          )}
        </div>

        <div className={styles.row2}>
          <label htmlFor="address">Address</label>
          <div className={styles.inputContainer}>
            <input
              className={`input ${isLoadingUserAddress ? styles.disabled : ""}`}
              id="address"
              type="text"
              defaultValue={userAddress}
              name="address"
              disabled={isLoadingUserAddress}
              required
              autoComplete="off"
            />
            {!position.latitude && !position.longitude && (
              <Button
                disabled={isLoadingUserAddress || isSubmitting}
                className={`${styles.geoBtn} ${
                  isLoadingUserAddress ? styles.disabled : ""
                }`}
                onClick={(
                  e: React.MouseEvent<HTMLButtonElement> | undefined
                ) => {
                  e && e.preventDefault();
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  dispatch<any>(fetchAddress());
                }}>
                {isLoadingUserAddress ? "Getting position..." : "Get position"}
              </Button>
            )}
          </div>
          {status === "error" && (
            <div className={styles.error}>{AddressError}</div>
          )}
        </div>

        <div className={styles.priority}>
          <input
            type="checkbox"
            onClick={() => setWithPriority(!withPriority)}
            name="priority"
            id="priority"
            autoComplete="off"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button
            type={"submit"}
            className={isLoadingUserAddress ? styles.disabled : ""}
            disabled={isSubmitting || isLoadingUserAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(
                  totalCartPrice + priorityPrice
                )}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const errors: IErrorObject = {};

  console.log(typeof data.phone);

  if (typeof data.phone === "string" && !isValidPhone(data.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you";
  }

  if (Object.keys(errors).length > 0) return errors;

  const order = {
    ...data,
    cart:
      typeof data.cart === "string" &&
      JSON.parse(data.cart).map((el: ICartItem) => {
        return {
          pizzaId: el.pizzaId,
          name: el.name,
          quantity: el.quantity,
          unitPrice: el.unitPrice,
          totalPrice: el.totalPrice,
        };
      }),
    priority: data.priority === "on",
  };
  console.log(order);
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
