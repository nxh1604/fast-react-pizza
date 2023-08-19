import { Suspense, lazy } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const Home = lazy(() => import("./ui/Home/Home"));
const Menu = lazy(() => import("./features/menu/Menu"));
const Cart = lazy(() => import("./features/cart/Cart"));
const CreateOrder = lazy(() => import("./features/order/CreateOrder"));
const OrderLoading = lazy(() => import("./features/order/Order"));

import { loader as MenuLoader } from "./features/menu/Menu";
import { action as OrderAction } from "./features/order/CreateOrder";
import { loader as OrderLoader } from "./features/order/OrderLoader";
import { action as UpdateOrderAction } from "./features/order/UpdateOrder";

import Loading from "./ui/Loading";
import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout/AppLayout";

const router = createBrowserRouter(
  createRoutesFromElements([
    <>
      <Route path="/" element={<AppLayout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route
          path="menu"
          element={<Menu />}
          errorElement={<Error />}
          loader={MenuLoader}
        />
        <Route path="cart" element={<Cart />} />
        <Route
          path="order/new"
          element={<CreateOrder />}
          action={OrderAction}
        />
        <Route
          path="order/:orderId"
          element={<OrderLoading />}
          loader={OrderLoader}
          errorElement={<Error />}
          action={UpdateOrderAction}
        />
      </Route>
    </>,
  ])
);

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />;
    </Suspense>
  );
};

export default App;
