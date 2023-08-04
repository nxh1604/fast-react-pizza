import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

const Header = (): JSX.Element => {
  return (
    <header>
      <Link to={"/"}>Fast react co.</Link>
      <SearchOrder />
      <p>User name</p>
    </header>
  );
};

export default Header;
