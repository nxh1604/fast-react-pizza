import { useSelector } from "react-redux";
import { IRootState } from "../../store";

const UserName = ({ className = "" }): JSX.Element | null => {
  const userName = useSelector((state: IRootState) => state.user.userName);
  return <p className={`${className}`}>{userName}</p>;
};

export default UserName;
