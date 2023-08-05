import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import Loading from "../../ui/Loading";

import styles from "./Menu.module.css";

function Menu() {
  const data = useLoaderData();

  return (
    <div className={styles.menu}>
      <Suspense fallback={<Loading />}>
        <Await resolve={data.pizzas}>
          {(pizzas) => pizzas.map((el) => <MenuItem pizza={el} key={el.id} />)}
        </Await>
      </Suspense>
    </div>
  );
}

const loader = () => {
  return defer({ pizzas: getMenu() });
};

export default Menu;
export { loader };
