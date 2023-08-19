// Test ID: IIDSAT

import { Await, useFetcher, useLoaderData } from "react-router-dom";
import { Suspense, useEffect } from "react";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import Loading from "../../ui/Loading";
import { ICartItem } from "../cart/cartSlice";
import styles from "./Order.module.css";
import OrderItem from "./OrderItem";
import { IPizza } from "../menu/MenuItem";
import UpdateOrder from "./UpdateOrder";
interface IOrder {
  id: number;
  status: string;
  priority: boolean;
  customer: string;
  priorityPrice: number;
  estimatedDelivery: Date;
  orderPrice: number;
  cart: ICartItem[];
}

const OrderLoading = () => {
  const data = useLoaderData() as { order: Promise<IOrder> };

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data.order}>{(order) => <Order order={order} />}</Await>
    </Suspense>
  );
};

function Order({ order }: { order: IOrder }) {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.orderId}>Order #{id} Status</h2>
        <div className={styles.orderStatus}>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div className={styles.orderDeliveryTime}>
        <p className={styles.timeDeliveried}>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className={styles.estimatedDelivery}>
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <div className={styles.cartInfo}>
        {cart.map((el) => (
          <OrderItem
            item={el}
            key={el.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.pizzas.find(
                (item: IPizza) => item.id === el.pizzaId
              )?.ingredients ?? []
            }
          />
        ))}
      </div>

      <div className={styles.orderPrice}>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className={styles.pay}>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export default OrderLoading;
