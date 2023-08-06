import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

import styles from "./CreateOrder.module.css";
import Button from "../../ui/Button/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

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

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  console.log(formErrors);

  const [phone, setPhone] = useState(null);

  useEffect(() => {
    if (formErrors && Object.keys(formErrors).length > 0) {
      setPhone(formErrors.phone);
    }
  }, [formErrors, setPhone]);

  console.log(phone);
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
            <span className={styles.error}>
              {!!formErrors?.phone && formErrors.phone}
            </span>
          )}
        </div>

        <div className={styles.row2}>
          <label htmlFor="address">Address</label>
          <div className={styles.inputContainer}>
            <input
              className="input"
              id="address"
              type="text"
              name="address"
              required
              autoComplete="off"
            />
          </div>
        </div>

        <div className={styles.priority}>
          <input
            type="checkbox"
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
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }: any) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const errors = {};

  if (!isValidPhone(data.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you";
  }

  if (Object.keys(errors).length > 0) return errors;

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
