import { useNavigate, useRouteError } from "react-router-dom";
import Button from "./Button/Button";
import { errorMessage } from "../utils/helpers";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);
  const message = errorMessage(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{message}</p>
      <Button onClick={() => navigate(-1)}>&larr; Go back</Button>
    </div>
  );
}

export default Error;
