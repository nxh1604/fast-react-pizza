import { useSelector } from "react-redux";

const UserName = ({ className = "" }): JSX.Element | null => {
  const userName = useSelector((state) => state.user.userName);
  return <p className={`${className}`}>{userName}</p>;
};

export default UserName;
