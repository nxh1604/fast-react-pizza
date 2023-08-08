import { defer } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";

export const loader = ({ params }) => {
  return defer({
    order: getOrder(params.orderId),
  });
};
