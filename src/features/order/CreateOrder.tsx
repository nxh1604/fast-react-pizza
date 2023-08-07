import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

import styles from "./CreateOrder.module.css";
import Button from "../../ui/Button/Button";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

interface IErrorObject {
  phone?: string;
}

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const userName = useSelector((state: IRootState) => state.user.userName);

  const [name, setName] = useState(userName);

  const cart = useSelector((state: IRootState) => state.cartSlice.cart);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData() as IErrorObject;

  const [phone, setPhone] = useState<null | string>(null);

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
          {phone && <div className={styles.error}>{!!formErrors?.phone && formErrors.phone}</div>}
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
          <Button type={"submit"} disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const errors: IErrorObject = {};

  if (!isValidPhone(data.phone)) {
    errors.phone = "Please give us your correct phone number. We might need it to contact you";
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
